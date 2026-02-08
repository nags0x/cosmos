"use client";

import {
    LayoutGrid,
    CalendarDays,
    GraduationCap,
    Gamepad2,
    Terminal,
    Settings
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type DashboardView = 'home' | 'calendar' | 'flashcards' | 'quiz' | 'skills' | 'settings';

interface DashboardSidebarProps {
    activeView: DashboardView;
    onSelectView: (view: DashboardView) => void;
}

export function DashboardSidebar({ activeView, onSelectView }: DashboardSidebarProps) {
    const items = [
        { id: 'home', label: 'Launchpad', icon: LayoutGrid },
        { id: 'calendar', label: 'Moon Calendar', icon: CalendarDays },
        { id: 'flashcards', label: 'Space Academy', icon: GraduationCap },
        { id: 'quiz', label: 'Cosmic Quiz', icon: Gamepad2 },
        { id: 'skills', label: 'Ship\'s Log', icon: Terminal },
    ];

    return (
        <aside className="w-64 border-r border-white/5 bg-slate-900/30 flex flex-col p-4">
            <div className="space-y-1">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelectView(item.id as DashboardView)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            activeView === item.id
                                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-white/5">
                <button
                    onClick={() => onSelectView('settings')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        activeView === 'settings'
                            ? "bg-slate-800 text-white"
                            : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <Settings className="w-5 h-5" />
                    Settings
                </button>
            </div>
        </aside>
    );
}
