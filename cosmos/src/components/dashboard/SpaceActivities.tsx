"use client";

import Link from "next/link";
import { CalendarDays, GraduationCap, Gamepad2, Rocket } from "lucide-react";

const ACTIVITIES = [
    { id: 'calendar', title: 'Moon Calendar', href: '/calendar', icon: CalendarDays },
    { id: 'flashcards', title: 'Space Academy', href: '/flashcards', icon: GraduationCap },
    { id: 'quiz', title: 'Cosmic Quiz', href: '/quiz', icon: Gamepad2 },
    { id: 'planner', title: 'Stargazing Planner', href: '/chat/planner', icon: Rocket },
];

export function SpaceActivities() {
    return (
        <section className="mb-16">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Space Activities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                {ACTIVITIES.map((activity) => (
                    <Link
                        key={activity.id}
                        href={activity.href}
                        className="group relative bg-[#0F0F10] p-4 hover:bg-slate-900 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <activity.icon className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                            <span className="text-slate-400 group-hover:text-slate-200 transition-colors font-medium">
                                {activity.title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
