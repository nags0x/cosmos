"use server";

import { unstable_cache } from "next/cache";
import * as lune from "lune";

export interface MoonData {
    phase: string;
    illumination: string;
    nextFullMoon: string;
    moonRise: string;
    moonSet: string;
    distance: string;
    description: string;
}

// Helper to format phase name from age/phase
function getPhaseName(phase: number): string {
    // phase is 0.0 to 1.0
    // 0.0 = New Moon
    // 0.25 = First Quarter
    // 0.5 = Full Moon
    // 0.75 = Last Quarter

    // Allow for some wiggle room around the exact quarters
    const buffer = 0.02;

    if (phase < buffer || phase > 1 - buffer) return "New Moon";
    if (phase < 0.25 - buffer) return "Waxing Crescent";
    if (phase < 0.25 + buffer) return "First Quarter";
    if (phase < 0.5 - buffer) return "Waxing Gibbous";
    if (phase < 0.5 + buffer) return "Full Moon";
    if (phase < 0.75 - buffer) return "Waning Gibbous";
    if (phase < 0.75 + buffer) return "Last Quarter";
    return "Waning Crescent";
}

async function calculateMoonPhase(): Promise<MoonData> {
    const now = new Date();
    const moonInfo = lune.phase(now);
    const hunt = lune.phase_hunt(now);

    const phaseName = getPhaseName(moonInfo.phase);
    const illumination = Math.round(moonInfo.illuminated * 100);

    // Calculate distance in km (lune returns earth radii? or km? usually km or AU)
    // lune documentation says distance is in kilometers
    const distanceKm = Math.round(moonInfo.distance);

    // Format next full moon
    const nextFull = hunt.full_date;
    // If we passed the full moon in this cycle, we need the next one? 
    // phase_hunt returns the dates for the cycle containing the input date.
    // If today is after the full moon of this cycle, we might want the next cycle's full moon.
    // Actually simplicity: just show the full moon date from the current cycle or check if it's past.
    let targetFullMoon = hunt.full_date;
    if (targetFullMoon < now) {
        // Calculate next cycle
        const nextHunt = lune.phase_hunt(new Date(now.getTime() + 29.5 * 24 * 60 * 60 * 1000));
        targetFullMoon = nextHunt.full_date;
    }

    const nextFullMoonStr = targetFullMoon.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    // Moon Rise/Set is complex without lat/long. 
    // For now, we'll approximate or leave generic, or use a fixed offset based on phase.
    // New Moon rises at sunrise, Full Moon rises at sunset.
    // This is a rough approximation for UI purposes without geolocation.
    const r = (moonInfo.phase * 24 + 6) % 24; // Rise time (approx)
    const s = (r + 12) % 24; // Set time (approx)

    const formatTime = (h: number) => {
        const hh = Math.floor(h);
        const mm = Math.floor((h - hh) * 60);
        const ampm = hh >= 12 ? 'PM' : 'AM';
        const h12 = hh % 12 || 12;
        return `${h12}:${mm.toString().padStart(2, '0')} ${ampm}`;
    };

    return {
        phase: phaseName,
        illumination: `${illumination}%`,
        nextFullMoon: nextFullMoonStr,
        moonRise: formatTime(r),
        moonSet: formatTime(s),
        distance: `${distanceKm.toLocaleString()} km`,
        description: `The Moon is currently in a ${phaseName} phase, illuminated ${illumination}%.`
    };
}

export const getMoonPhase = unstable_cache(
    async () => {
        return calculateMoonPhase();
    },
    ["moon-phase-lune-v1"],
    { revalidate: 3600 } // Cache for 1 hour
);
