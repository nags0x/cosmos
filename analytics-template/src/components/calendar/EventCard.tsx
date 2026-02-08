"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Moon, Sun, Star, Rocket, Info } from "lucide-react";
import { CelestialEvent, CelestialEventType } from "./types";
import { generateGoogleCalendarUrl } from "./calendar-utils";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface EventCardProps {
    event: CelestialEvent;
}

const EVENT_ICONS: Record<CelestialEventType, React.ReactNode> = {
    moon: <Moon className="w-5 h-5 text-blue-200" />,
    eclipse: <Sun className="w-5 h-5 text-orange-400" />, // Sun being covered
    meteor: <Star className="w-5 h-5 text-yellow-300" />,
    planet: <div className="w-4 h-4 rounded-full bg-red-400" />, // Mars-ish
    launch: <Rocket className="w-5 h-5 text-white" />
};

export function EventCard({ event }: EventCardProps) {
    const calendarUrl = generateGoogleCalendarUrl(event);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 flex items-center justify-between transition-all hover:bg-slate-800/60 hover:border-slate-600"
        >
            <div className="flex items-center gap-4">
                {/* Date Box */}
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-900/50 rounded-lg border border-white/5">
                    <span className="text-xs uppercase text-slate-500 font-bold">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-xl font-bold text-white">
                        {new Date(event.date).getDate()}
                    </span>
                </div>

                {/* Content */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        {EVENT_ICONS[event.type]}
                        <h4 className="font-semibold text-slate-200">{event.title}</h4>
                    </div>
                    {event.description && (
                        <p className="text-sm text-slate-400 line-clamp-1 group-hover:line-clamp-none transition-all">
                            {event.description}
                        </p>
                    )}
                    {event.location && <span className="text-xs text-slate-500">{event.location}</span>}
                </div>
            </div>

            {/* Action Button (Hidden until hover on desktop, always visible on mobile if needed) */}
            <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                title="Add to Google Calendar"
            >
                <CalendarPlus className="w-5 h-5" />
            </a>
        </motion.div>
    );
}
