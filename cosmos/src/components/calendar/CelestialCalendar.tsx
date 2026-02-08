"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CelestialEvent, CelestialEventType } from "./types";
import { EventCard } from "./EventCard";
import { generateGoogleCalendarUrl } from "./calendar-utils";

// Mock Data - In a real app, this would be passed via props from AI
const MOCK_EVENTS: CelestialEvent[] = [
    {
        id: "1",
        date: "2026-02-14",
        title: "Full Snow Moon 🌕",
        description: "The full moon in February is known as the Snow Moon due to heavy snowfall.",
        type: "moon",
        startTime: "18:00",
        endTime: "23:59"
    },
    {
        id: "2",
        date: "2026-02-20",
        title: "Lunar Occultation of Mars",
        description: "The Moon will pass in front of Mars, hiding it from view.",
        type: "eclipse",
        location: "Visible from South America & Africa"
    },
    {
        id: "3",
        date: "2026-03-20",
        title: "Spring Equinox",
        description: "Day and night are of approximately equal duration all over the planet.",
        type: "planet"
    },
    {
        id: "4",
        date: "2026-04-22",
        title: "Lyrids Meteor Shower 🌠",
        description: "Peaking with up to 20 meteors per hour.",
        type: "meteor",
        startTime: "22:00",
        endTime: "04:00"
    }
];

interface CelestialCalendarProps {
    initialEvents?: CelestialEvent[];
    title?: string;
}

export function CelestialCalendar({ initialEvents = MOCK_EVENTS, title = "Celestial Schedule" }: CelestialCalendarProps) {
    const [events, setEvents] = useState<CelestialEvent[]>(initialEvents);

    // Group by month for a cleaner view if we had more data, 
    // but for now a simple list is better for a chat UI component.

    const handleAddAll = () => {
        // This is a bit tricky with web intents as it opens multiple tabs.
        // For a hackathon, we can just open the first one or show a toast.
        // Alternatively, we could generate a .ics file download for "Add All".
        // Let's stick to adding individually for better UX in a web-intent world,
        // but maybe just alert the user.
        alert("For the best experience, add events individually to your calendar!");
    };

    return (
        <div className="w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-400" />
                    <h2 className="font-bold text-white tracking-wide">{title}</h2>
                </div>
                {/* 
                <button 
                    onClick={handleAddAll}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                    Add All
                </button>
                */}
            </div>

            {/* Event List */}
            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {events.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <p>No celestial events found in this sector.</p>
                    </div>
                ) : (
                    events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))
                )}
            </div>

            {/* Footer / Context */}
            <div className="p-3 bg-slate-900/50 border-t border-white/5 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                    synchronizing with local spacetime
                </p>
            </div>
        </div>
    );
}
