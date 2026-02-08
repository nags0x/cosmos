"use client";

import { AlertTriangle, Radio, Satellite, Globe, Zap, LucideIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSpaceNews, SpaceNewsItem } from "@/app/actions/getSpaceNews";

const ICON_MAP: Record<string, LucideIcon> = {
    alert: AlertTriangle,
    status: Satellite,
    info: Globe,
    data: Zap
};

export function CosmicNewsFeed() {
    const [items, setItems] = useState<SpaceNewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const news = await getSpaceNews();
                setItems(news);
            } catch (error) {
                console.error("Failed to load space news", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <section className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Radio className="w-3 h-3 animate-pulse text-destructive" />
                    Live Feed
                </h2>
                <span className="text-[10px] text-muted-foreground font-mono">NET.LINK.V2</span>
            </div>

            <div className="space-y-4 relative min-h-[200px]">
                {/* Connection Line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-[#f0f0f0]/10" />

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-[#f0f0f0]/50 gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs font-mono animate-pulse">Scanning frequencies...</span>
                    </div>
                ) : (
                    items.map((item, i) => {
                        const Icon = ICON_MAP[item.type] || Zap;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-8"
                            >
                                <div className="absolute left-[9px] top-2 w-1.5 h-1.5 rounded-full bg-[#f0f0f0]/30 border border-[#f0f0f0]/50 z-10" />

                                <div className="p-3 bg-[#f0f0f0]/5 border border-[#f0f0f0]/10 rounded-lg hover:bg-[#f0f0f0]/10 transition-colors cursor-default group shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <Icon className={`w-4 h-4 mt-0.5 text-[#d2beff] shrink-0`} />
                                        <div>
                                            <p className="text-sm text-[#f0f0f0] font-medium leading-tight group-hover:text-[#d2beff] transition-colors">
                                                {item.text}
                                            </p>
                                            <p className="text-xs text-[#f0f0f0]/50 mt-1 font-mono">{item.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </section>
    );
}
