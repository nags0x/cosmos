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

    // Fix Hydration Mismatch: Only render date on client
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Update date every minute
        const timer = setInterval(() => setDate(new Date()), 60000);

        // Fetch Daily Fact
        const fetchFact = async () => {
            setIsLoading(true);
            try {
                const data = await getDailySpaceFact();
                // Handle potential legacy string response (if cache weirdness) or new object
                if (typeof data === 'string') {
                    setFactData({ text: data as string, source: 'archive', model: 'legacy' });
                } else {
                    setFactData({ ...data, model: data.model || 'unknown' } as { text: string; source: string; model: string });
                }
            } catch (error) {
                setFactData({ text: "Communication array offline. Using cached data.", source: "error", model: "offline" });
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
                                ${isToday ? 'bg-[#d2beff] scale-150' : ''}
                                ${isPast ? 'bg-[#f0f0f0]/30' : 'bg-[#f0f0f0]/10'}
                            `}
                        />
                    );
                })}
            </div>
        );
    };

    if (!mounted) return null;

    return (
        <div className="font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-[#d2beff]">
                <Calendar className="w-4 h-4" />
                <span className="uppercase tracking-widest text-xs font-bold">Stardate Log</span>
            </div>

            <div className="text-4xl font-bold text-[#f0f0f0] tracking-tighter mb-1">
                {date.getDate()}
            </div>
            <div className="text-[#f0f0f0]/60 uppercase text-xs tracking-widest mb-4">
                {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>

            {renderCalendarGrid()}

            <div className="mt-8 pt-6 border-t border-[#f0f0f0]/10">
                <div className="flex items-center gap-2 mb-2 group cursor-pointer" onClick={runDiagnostics} title="Click to run system diagnostics">
                    {isLoading ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d2beff] animate-ping" />
                    ) : (
                        <Sparkles className={`w-3 h-3 ${factData.source === 'gemini' ? 'text-[#d2beff]' : 'text-[#f0f0f0]/30'}`} />
                    )}
                    <span className="text-[10px] uppercase tracking-widest text-[#f0f0f0]/60 group-hover:text-[#d2beff] transition-colors">
                        {isLoading ? "Receiving Transmission..." :
                            factData.source === 'gemini' ? `Gemini ${factData.model?.replace('gemini-', '').replace('-flash', ' Flash').replace('-exp', '')} Analysis` : "System Archive (Click to Fix)"}
                    </span>
                </div>
                <motion.p
                    key={factData.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-[#f0f0f0]/60 leading-relaxed italic"
                >
                    &quot;{factData.text}&quot;
                </motion.p>
            </div>

            <div className="mt-4 text-[10px] text-[#f0f0f0]/30">
                SYNCED: {date.toLocaleTimeString()}
            </div>
        </div>
    );
}
