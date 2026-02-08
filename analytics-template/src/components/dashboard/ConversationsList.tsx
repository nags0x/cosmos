"use client";

import Link from "next/link";

const SESSIONS = [
    { id: '1', title: 'Orbit Simulator Experiment', date: 'Yesterday' },
    { id: '2', title: 'Celestial Calendar Setup', date: '2 days ago' },
    { id: '3', title: 'Stargazing Planner', date: 'Feb 4' },
    { id: '4', title: 'Mars Climate Analysis', date: 'Jan 30' },
];

export function ConversationsList() {
    return (
        <section className="mb-16">
            <h2 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-6">Conversations</h2>

            <div className="space-y-1">
                {SESSIONS.map((session) => (
                    <Link
                        key={session.id}
                        href={`/chat/${session.id}`}
                        className="group block"
                    >
                        <div className="flex items-baseline justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="text-slate-400 group-hover:text-slate-200 transition-colors font-medium">
                                {session.title}
                            </span>
                            <span className="text-xs text-slate-600 group-hover:text-slate-500 font-mono">
                                {session.date}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
