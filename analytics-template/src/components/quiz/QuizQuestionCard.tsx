"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { QuizQuestion } from "./types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface QuizQuestionCardProps {
    question: QuizQuestion;
    onAnswer: (option: string) => void;
    currentQuestionIndex: number;
    totalQuestions: number;
}

export function QuizQuestionCard({
    question,
    onAnswer,
    currentQuestionIndex,
    totalQuestions,
}: QuizQuestionCardProps) {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6"
        >
            <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-slate-500 uppercase">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-slate-400">
                    Easy {/* Dynamic difficulty could be passed here */}
                </span>
            </div>

            <div className="space-y-4">
                {question.image && (
                    <div className="w-full h-32 rounded-lg bg-slate-800 overflow-hidden relative mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={question.image} alt="Question visual" className="w-full h-full object-cover opacity-80" />
                    </div>
                )}
                <h3 className="text-xl font-bold text-white leading-tight">
                    {question.question}
                </h3>

                <div className="space-y-3">
                    {question.options.map((option, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onAnswer(option)}
                            className={cn(
                                "w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left group",
                                "bg-slate-800/40 border-slate-700 hover:border-blue-500/50"
                            )}
                        >
                            <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/20 transition-colors">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-slate-200 font-medium group-hover:text-blue-100 transition-colors">
                                {option}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
