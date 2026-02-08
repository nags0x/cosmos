"use client";

import { Moon, ArrowRight, Play, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMoonPhase, MoonData } from "@/app/actions/getMoonPhase";
import { motion } from "framer-motion";

export function TodayInSpace() {
    const [data, setData] = useState<MoonData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const moonData = await getMoonPhase();
                setData(moonData);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Helper to determine shadow offset based on phase name (simple visual hack)
    const getShadowStyle = (phase: string) => {
        const p = phase?.toLowerCase() || "";
        if (p.includes("new")) return "inset -2px -2px 20px rgba(0,0,0,0.9)"; // Dark
        if (p.includes("full")) return "inset 0 0 20px rgba(255,255,255,0.2)"; // Bright
        if (p.includes("crescent")) return "inset 10px 0 20px rgba(0,0,0,0.8)"; // Crescent
        if (p.includes("quarter")) return "inset 20px 0 20px rgba(0,0,0,0.8)"; // Half
        if (p.includes("gibbous")) return "inset 5px 0 10px rgba(0,0,0,0.6)"; // Mostly full
        return "";
    };

    return (
        <section className="mb-8 group relative overflow-hidden rounded-3xl bg-[#f0f0f0]/5 border border-[#f0f0f0]/10 transition-colors shadow-2xl shadow-purple-900/10 hover:bg-[#f0f0f0]/10">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d2beff]/5 via-transparent to-transparent opacity-50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center" />

            <div className="relative p-8 flex flex-col md:flex-row items-center gap-8">

                {/* Visual Side */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                    {/* Glowing Moon Effect - Lavender/White */}
                    <div className="absolute inset-0 bg-[#d2beff]/20 rounded-full blur-3xl animate-pulse-slow" />

                    {/* The Moon Itself */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#d2beff] to-white border border-[#f0f0f0]/20 flex items-center justify-center shadow-2xl overflow-hidden">
                        {/* Crater Texture (Simulated) */}
                        <div className="absolute inset-0 opacity-20 bg-[url('/noise.svg')] mix-blend-overlay" />

                        {/* Dynamic Shadow based on Phase */}
                        <div
                            className="absolute inset-0 rounded-full transition-all duration-1000 bg-black/80 mix-blend-multiply blur-[4px]"
                            style={{
                                maskImage: loading ? 'none' : 'linear-gradient(to right, black 50%, transparent 100%)', // Simple fallback mask
                                clipPath: loading ? 'none' : undefined, // Could use intricate clip paths here for true phases
                                boxShadow: data ? getShadowStyle(data.phase) : ""
                            }}
                        />
                        {/* Manual "Shadow" overlay for better aesthetics than just box-shadow */}
                        <div className={`absolute inset-0 rounded-full bg-black/40 ${data?.phase.includes('Full') ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                            style={{
                                background: data?.phase.includes('Crescent')
                                    ? 'radial-gradient(circle at 30% 50%, transparent 30%, #0a0a0a 40%)'
                                    : data?.phase.includes('Gibbous')
                                        ? 'radial-gradient(circle at 70% 50%, transparent 60%, #0a0a0a 70%)'
                                        : 'none'
                            }}
                        />
                    </div>

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-md rounded-full border border-[#f0f0f0]/10 text-[10px] font-mono text-[#d2beff] whitespace-nowrap shadow-lg">
                        {loading ? "CALCULATING..." : data?.phase?.toUpperCase()}
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-[#d2beff] animate-pulse" />
                        <span className="text-xs font-mono text-[#d2beff] uppercase">Real-time Telemetry</span>
                    </div>

                    <h2 className="text-3xl font-bold text-[#f0f0f0] tracking-tight mb-2">
                        {loading ? "Scanning Sky..." : `${data?.illumination} Illumination`}
                    </h2>

                    <p className="text-sm text-[#f0f0f0]/60 mb-6 italic max-w-md mx-auto md:mx-0">
                        {data?.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-[#f0f0f0]/60 mb-6">
                        <span className="flex items-center gap-1.5 bg-[#f0f0f0]/5 py-1 px-3 rounded-lg border border-[#f0f0f0]/10">
                            <span className="opacity-70">Rise/Set:</span>
                            <span className="text-[#f0f0f0] font-medium">{data?.moonRise} / {data?.moonSet}</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-[#f0f0f0]/5 py-1 px-3 rounded-lg border border-[#f0f0f0]/10">
                            <span className="opacity-70">Dist:</span>
                            <span className="text-[#f0f0f0] font-medium">{data?.distance}</span>
                        </span>
                    </div>

                    <Link href="/chat" className="inline-flex items-center gap-2 bg-[#f0f0f0] hover:bg-white text-black px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        <span>Open Observatory</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
