"use client";

import { CloudMoon, Telescope, Star } from "lucide-react";

export function ContextPanel() {
    return (
        <aside className="w-80 border-l border-white/5 bg-slate-900/30 p-6 hidden xl:block">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Tonight's Sky</h3>

            <div className="space-y-4">
                {/* Card 1 */}
                <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <CloudMoon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium">Visibility</h4>
                        <p className="text-xs text-slate-400 mt-1">Low moonlight interference. Good conditions for deep sky observation.</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Telescope className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium">Planets</h4>
                        <p className="text-xs text-slate-400 mt-1">Jupiter visible in South-East. Mars rising at 10 PM.</p>
                    </div>
                </div>

                {/* Card 3 - Score */}
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-500/20 rounded-2xl p-6 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                    <h4 className="text-slate-400 text-xs uppercase tracking-widest mb-2 relative z-10">Sky Quality Score</h4>
                    <div className="flex items-center justify-center gap-2 mb-1 relative z-10">
                        <span className="text-4xl font-bold text-white">8.2</span>
                        <span className="text-lg text-slate-500">/ 10</span>
                    </div>
                    <div className="flex justify-center gap-1 mt-2 relative z-10">
                        {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <h4 className="text-orange-200 text-sm font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    ISS Flyover
                </h4>
                <p className="text-xs text-orange-200/70 mt-2">
                    Visible for 4 min at 21:45 this evening. Look West-Northwest.
                </p>
            </div>
        </aside>
    );
}
