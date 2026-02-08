"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb, ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface QuizFeedbackCardProps {
    isCorrect: boolean;
    correctAnswer: string;
    funFact: string;
    onNext: () => void;
}

export function QuizFeedbackCard({
    isCorrect,
    correctAnswer,
    funFact,
    onNext,
}: QuizFeedbackCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "w-full max-w-md mx-auto rounded-2xl p-6 shadow-2xl space-y-6 border backdrop-blur-md",
                isCorrect
                    ? "bg-emerald-950/80 border-emerald-500/30"
                    : "bg-rose-950/80 border-rose-500/30"
            )}
        >
            <div className="flex items-center gap-3">
                {isCorrect ? (
                    <div className="p-2 bg-emerald-500/20 rounded-full">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                ) : (
                    <div className="p-2 bg-rose-500/20 rounded-full">
                        <XCircle className="w-8 h-8 text-rose-400" />
                    </div>
                )}
                <div>
                    <h2 className={cn("text-xl font-bold", isCorrect ? "text-emerald-100" : "text-rose-100")}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                    </h2>
                    <p className={cn("text-xs font-medium uppercase tracking-wider", isCorrect ? "text-emerald-400" : "text-rose-400")}>
                        {isCorrect ? "Great job!" : "Maybe next time"}
                    </p>
                </div>
            </div>

            {!isCorrect && (
                <div className="bg-slate-900/50 rounded-lg p-3 border border-white/5">
                    <p className="text-xs text-slate-400 mb-1">Correct Answer:</p>
                    <p className="text-sm font-semibold text-white">{correctAnswer}</p>
                </div>
            )}

            {/* Fun Fact Section */}
            <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-xs font-bold text-blue-300 uppercase tracking-wide">Did you know?</p>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        {funFact}
                    </p>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
            </motion.button>
        </motion.div>
    );
}
