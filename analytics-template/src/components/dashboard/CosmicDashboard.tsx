"use client";

import { useEffect, useState } from "react";
import { Skill } from "@/app/actions/getSkills";
import { DashboardHeader } from "./DashboardHeader";
import { TodayInSpace } from "./TodayInSpace";
import { ContinueCard } from "./ContinueCard";
import { DailyBriefing } from "./DailyBriefing";
import { SpaceJourney } from "./SpaceJourney";
import { SkillsLog } from "./SkillsLog";
import { ThemeToggle } from "./ThemeToggle";
import { AstronomicalCalendar } from "./AstronomicalCalendar";
import { CosmicNewsFeed } from "./CosmicNewsFeed";
import { NasaLiveStream } from "./NasaLiveStream";
import { motion } from "framer-motion";

interface CosmicDashboardProps {
    skills: Skill[];
}

export function CosmicDashboard({ skills }: CosmicDashboardProps) {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        // Use globals.css tokens: bg-background (Washi), text-foreground (Sumi)
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 overflow-x-hidden transition-colors duration-500">

            {/* Background - True Void Look */}
            {/* Subtle Gradient - Adapts to theme via opacity */}
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-black/40 pointer-events-none" />

            {/* Main Container */}
            <div className="max-w-[1600px] mx-auto px-6 py-8 relative z-10">

                {/* Top Bar */}
                <div className="flex items-center justify-between mb-12">
                    <DashboardHeader />
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">System Time</div>
                            <div className="text-sm font-mono text-foreground min-w-[100px] text-right">
                                {time || <span className="opacity-0">00:00:00 AM</span>}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-border hidden md:block" />
                        <ThemeToggle />
                    </div>
                </div>

                {/* Tri-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Column: Navigation & Identity (20%) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="p-6 rounded-2xl bg-card border border-border backdrop-blur-sm transition-colors shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Online</span>
                            </div>
                            <div className="dark:opacity-100 opacity-100 transition-opacity">
                                <AstronomicalCalendar />
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <SpaceJourney />
                            <div className="mt-8 pt-8 border-t border-border">
                                <SkillsLog skills={skills} />
                            </div>
                        </div>
                    </div>

                    {/* Center Column: Main Action (60%) */}
                    <main className="lg:col-span-6 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <TodayInSpace />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <DailyBriefing />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <ContinueCard />
                        </motion.div>

                        {/* Mobile only footer items */}
                        <div className="lg:hidden space-y-8">
                            <SpaceJourney />
                            <SkillsLog skills={skills} />
                        </div>
                    </main>

                    {/* Right Column: Live Data (20%) */}
                    <aside className="lg:col-span-3 space-y-8">
                        {/* Nasa Live Stream takes priority visual spot */}
                        <NasaLiveStream />
                        <CosmicNewsFeed />
                    </aside>

                </div>
            </div>
        </div>
    );
}
