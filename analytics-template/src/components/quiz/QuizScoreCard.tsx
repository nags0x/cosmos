"use client";

import { motion } from "framer-motion";
import { Star, RefreshCw, Share2, Trophy } from "lucide-react";
import { QuizResult } from "./types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface QuizScoreCardProps {
    result: QuizResult;
    onRestart: () => void;
}

export function QuizScoreCard({ result, onRestart }: QuizScoreCardProps) {
    const percentage = Math.round((result.score / result.total) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl text-center space-y-6"
        >
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center p-1 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                    <Trophy className="w-10 h-10 text-white" fill="white" />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">Mission Complete!</h2>
                <p className="text-slate-400">Here is your flight report</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5 space-y-4">
                <div className="space-y-1">
                    <p className="text-5xl font-black text-white">{percentage}%</p>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Accuracy</p>
                </div>

                <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={cn(
                                "w-6 h-6 transition-all duration-500",
                                star <= result.rating
                                    ? "text-yellow-400 fill-yellow-400 scale-100" // filled
                                    : "text-slate-600 fill-slate-900/50 scale-90" // empty
                            )}
                        />
                    ))}
                </div>

                <p className="text-sm text-blue-200 italic px-4">
                    &quot;{result.summary}&quot;
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={onRestart}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Replay</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-all">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                </button>
            </div>
        </motion.div>
    );
}
