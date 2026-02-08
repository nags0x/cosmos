"use client";

import { Info, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getDailyBriefing, BriefingData } from "@/app/actions/getDailyBriefing";

export function DailyBriefing() {
    const [data, setData] = useState<BriefingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const briefing = await getDailyBriefing();
                setData(briefing);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <section className="mb-8">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Daily Briefing</h2>

            <div className="bg-[#f0f0f0]/5 border border-[#f0f0f0]/10 rounded-2xl p-6 relative overflow-hidden group shadow-sm transition-colors hover:bg-[#f0f0f0]/10">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Info className="w-24 h-24 text-[#d2beff]" />
                </div>

                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-[#f0f0f0] mb-2">
                        {loading ? "Incoming Transmission..." : data?.title}
                    </h3>
                    <p className="text-sm text-[#f0f0f0]/80 leading-relaxed mb-4 max-w-lg min-h-[60px]">
                        {loading ? (
                            <span className="flex items-center gap-2 opacity-50">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Decoding signal...
                            </span>
                        ) : (
                            data?.content
                        )}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-[#f0f0f0]/60">
                        <span className="bg-[#f0f0f0]/5 px-2 py-1 rounded border border-[#f0f0f0]/10">
                            SOURCE: {loading ? "..." : data?.source}
                        </span>
                        <span className="bg-[#f0f0f0]/5 px-2 py-1 rounded border border-[#f0f0f0]/10 uppercase">
                            TOPIC: {loading ? "..." : data?.topic}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
