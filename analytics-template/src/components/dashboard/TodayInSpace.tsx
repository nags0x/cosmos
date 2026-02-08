"use client";

import { Moon, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function TodayInSpace() {
    return (
        <section className="mb-8 group relative overflow-hidden rounded-3xl bg-card border border-border transition-colors shadow-xl dark:shadow-none">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-accent/5 to-transparent opacity-50 dark:from-accent/10 dark:via-accent/5" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-20 bg-center" />

            <div className="relative p-8 flex flex-col md:flex-row items-center gap-8">

                {/* Visual Side */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                    {/* Glowing Moon Effect */}
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
                    {/* Hardcoded Zinc colors for the moon to ensure it looks like a moon regardless of theme */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-zinc-200 to-white dark:from-zinc-500 dark:to-zinc-200 border-2 border-zinc-300 dark:border-zinc-400 flex items-center justify-center shadow-2xl overflow-hidden">
                        <div className="absolute inset-2 rounded-full bg-zinc-100 dark:bg-zinc-300" />
                        {/* Moon Phase Representation - Dark Shadow */}
                        <div className="absolute right-0 top-0 bottom-0 w-[70%] bg-zinc-400/80 dark:bg-black/85 rounded-l-full blur-[2px]" />
                    </div>

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-card/80 backdrop-blur-md rounded-full border border-border text-[10px] font-mono text-foreground whitespace-nowrap shadow-sm">
                        WAXING GIBBOUS
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-xs font-mono text-accent uppercase">Live Data</span>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">
                        78% Illumination
                    </h2>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1.5 bg-muted py-1 px-3 rounded-lg border border-border">
                            <span className="opacity-70">Visible:</span>
                            <span className="text-foreground font-medium">14:20 - 02:45</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-muted py-1 px-3 rounded-lg border border-border">
                            <span className="opacity-70">Dist:</span>
                            <span className="text-foreground font-medium">398,000 km</span>
                        </span>
                    </div>

                    <Link href="/chat" className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 shadow-lg shadow-black/5">
                        <span>Open Observatory</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
