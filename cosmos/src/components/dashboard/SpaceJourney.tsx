"use client";

import { useJourneyStore } from "@/store/journey";
import { useEffect, useState } from "react";

export function SpaceJourney() {
    // Client-side only to avoid hydration mismatch with local storage
    const [mounted, setMounted] = useState(false);
    const { sessions, totalTimeMinutes, getTopicCount, getMostExplored } = useJourneyStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <SpaceJourneySkeleton />
    );

    return (
        <section className="mb-16">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Your Space Journey</h2>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-[#f0f0f0]/60">
                <div>
                    <span className="text-[#f0f0f0] font-semibold">{sessions}</span> sessions
                </div>
                <div>
                    <span className="text-[#f0f0f0] font-semibold">{getTopicCount()}</span> topics
                </div>
                <div>
                    <span className="text-[#f0f0f0] font-semibold">{totalTimeMinutes}</span> minutes total
                </div>
                <div className="w-px h-4 bg-[#f0f0f0]/20 hidden sm:block" />
                <div>
                    Most explored: <span className="text-[#f0f0f0] font-medium">{getMostExplored()}</span>
                </div>
            </div>
        </section>
    );
}

function SpaceJourneySkeleton() {
    return (
        <section className="mb-16 animate-pulse">
            <div className="h-4 w-32 bg-muted rounded mb-6" />
            <div className="flex gap-8">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
            </div>
        </section>
    );
}
