"use client";

import { useEffect, useState } from "react";
import { Calendar, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { getDailySpaceFact, testGeminiConnection } from "@/app/actions/getDailyFact";

export function AstronomicalCalendar() {
    const [date, setDate] = useState(new Date());
    const [factData, setFactData] = useState({ text: "Calibrating sensors...", source: "loading", model: "unknown" });
    const [isLoading, setIsLoading] = useState(true);

    const runDiagnostics = async () => {
        const result = await testGeminiConnection();
        alert(JSON.stringify(result, null, 2));
    };

    useEffect(() => {
        // Update date every minute
        const timer = setInterval(() => setDate(new Date()), 60000);

        // Fetch Daily Fact
        const fetchFact = async () => {
            setIsLoading(true);
            try {
                const data = await getDailySpaceFact();
                // Handle potential legacy string response (if cache weirdness) or new object
                if (typeof data === 'string') {
                    setFactData({ text: data, source: 'archive' });
                } else {
                    setFactData(data as any);
                }
            } catch (error) {
                setFactData({ text: "Communication array offline. Using cached data.", source: "error" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchFact();

        return () => clearInterval(timer);
    }, []);

    // Calendar Grid Generation (Current Month)
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const currentDay = date.getDate();

    // Create a simple visual grid wrapper
    const renderCalendarGrid = () => {
        // Just show a 7x5ish representation for aesthetics
        return (
            <div className="grid grid-cols-7 gap-1 mt-4 opacity-80">
                {Array.from({ length: 30 }).map((_, i) => {
                    const dayNum = i + 1;
                    const isToday = dayNum === currentDay;
                    const isPast = dayNum < currentDay;

                    return (
                        <div
                            key={i}
                            className={`
                                h-1.5 w-1.5 rounded-full transition-all
                                ${isToday ? 'bg-accent scale-150' : ''}
                                ${isPast ? 'bg-muted-foreground/30' : 'bg-muted-foreground/10'}
                            `}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-accent">
                <Calendar className="w-4 h-4" />
                <span className="uppercase tracking-widest text-xs font-bold">Stardate Log</span>
            </div>

            <div className="text-4xl font-bold text-foreground tracking-tighter mb-1">
                {date.getDate()}
            </div>
            <div className="text-muted-foreground uppercase text-xs tracking-widest mb-4">
                {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>

            {renderCalendarGrid()}

            <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-2 group cursor-pointer" onClick={runDiagnostics} title="Click to run system diagnostics">
                    {isLoading ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    ) : (
                        <Sparkles className={`w-3 h-3 ${factData.source === 'gemini' ? 'text-accent' : 'text-muted-foreground'}`} />
                    )}
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
                        {isLoading ? "Receiving Transmission..." :
                            factData.source === 'gemini' ? `Gemini ${factData.model?.replace('gemini-', '').replace('-flash', ' Flash').replace('-exp', '')} Analysis` : "System Archive (Click to Fix)"}
                    </span>
                </div>
                <motion.p
                    key={factData.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground leading-relaxed italic"
                >
                    "{factData.text}"
                </motion.p>
            </div>

            <div className="mt-4 text-[10px] text-muted-foreground/50">
                SYNCED: {date.toLocaleTimeString()}
            </div>
        </div>
    );
}
