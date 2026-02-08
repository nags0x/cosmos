"use client";

import { Info, ExternalLink } from "lucide-react";

export function DailyBriefing() {
    return (
        <section className="mb-8">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Daily Briefing</h2>

            <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden group shadow-sm transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Info className="w-24 h-24 text-accent" />
                </div>

                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-foreground mb-2">The Great Red Spot</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-lg">
                        Jupiter's iconic storm is currently shrinking. Recent observations from the Hubble Space Telescope suggest the winds in the outermost lane of the storm are accelerating.
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                        <span className="bg-muted px-2 py-1 rounded border border-border">SOURCE: NASA/JPL</span>
                        <span className="bg-muted px-2 py-1 rounded border border-border">TOPIC: PLANETARY SCIENCE</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
