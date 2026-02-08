"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FlashCardItem } from "./types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RefreshCw, CheckCircle2 } from "lucide-react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FlashCardProps {
    card: FlashCardItem;
    isFlipped: boolean;
    onFlip: () => void;
    onResult: (result: 'review' | 'mastered') => void;
}

export function FlashCard({ card, isFlipped, onFlip, onResult }: FlashCardProps) {
    return (
        <div className="w-full h-80 relative perspective-1000 group cursor-pointer" onClick={onFlip}>
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 backface-hidden w-full h-full bg-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-blue-500/40 transition-colors"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {card.front.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={card.front.image}
                            alt="visual"
                            className="w-20 h-20 mb-6 rounded-full object-cover border-2 border-blue-500/30"
                        />
                    )}
                    <h3 className="text-3xl font-bold text-white mb-2">{card.front.term}</h3>
                    {card.front.subtext && (
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{card.front.subtext}</p>
                    )}

                    <div className="absolute bottom-6 text-xs text-slate-500 font-medium animate-pulse">
                        Tap to reveal
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 backface-hidden w-full h-full bg-slate-800/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                    }}
                >
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <p className="text-xl text-white font-medium leading-relaxed mb-4">
                            {card.back.definition}
                        </p>
                        {card.back.nuance && (
                            <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3 text-sm text-purple-200 italic">
                                {card.back.nuance}
                            </div>
                        )}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 mt-6" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onResult('review')}
                            className="flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/50 text-orange-200 py-3 rounded-xl transition-all font-semibold text-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Show Again
                        </button>
                        <button
                            onClick={() => onResult('mastered')}
                            className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 py-3 rounded-xl transition-all font-semibold text-sm"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            I Knew This
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
