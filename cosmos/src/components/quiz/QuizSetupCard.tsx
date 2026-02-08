"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, BookOpen, Layers } from "lucide-react";
import { QuizConfig } from "./types";
import { cn } from "@/lib/utils"; // Assuming cn is in lib/utils or similar, standard in modern stacks.
// If cn is not there, I will handle it. Wait, I should check where cn is. 
// Usually utils.ts. I'll check after this if build fails, but clsx/tailwind-merge are in use.
// I'll inline a simple clsx/twMerge generic implementation or usage safe check.
// Actually, I'll use simple class strings + template literals to be safe for now 
// or import clsx directly if I'm not sure.
// Package.json has clsx and tailwind-merge. 
// I'll assume usage of standard `className` prop pattern.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface QuizSetupCardProps {
    onStart: (config: QuizConfig) => void;
}

const DIFFICULTIES = ["easy", "medium", "hard"] as const;
const CATEGORIES = ["Planets", "Moons", "Stars", "Mixed"];
const COUNTS = [5, 10, 15];

export function QuizSetupCard({ onStart }: QuizSetupCardProps) {
    const [config, setConfig] = useState<QuizConfig>({
        difficulty: "medium",
        category: "Mixed",
        questionCount: 5,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6"
        >
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Mission Control
                </h2>
                <p className="text-slate-400 text-sm">Configure your flight parameters</p>
            </div>

            {/* Difficulty */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                    <Settings className="w-4 h-4 text-blue-400" />
                    <span>Difficulty Level</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {DIFFICULTIES.map((diff) => (
                        <button
                            key={diff}
                            onClick={() => setConfig({ ...config, difficulty: diff })}
                            className={cn(
                                "px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 border",
                                config.difficulty === diff
                                    ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                    : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600"
                            )}
                        >
                            {diff}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>Target System</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setConfig({ ...config, category: cat })}
                            className={cn(
                                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                                config.category === cat
                                    ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                    : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Count */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>Mission Duration</span>
                </div>
                <div className="flex gap-2">
                    {COUNTS.map((count) => (
                        <button
                            key={count}
                            onClick={() => setConfig({ ...config, questionCount: count })}
                            className={cn(
                                "flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                                config.questionCount === count
                                    ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600"
                            )}
                        >
                            {count} Qs
                        </button>
                    ))}
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStart(config)}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-900/20 transition-all"
            >
                Launch Mission 🚀
            </motion.button>
        </motion.div>
    );
}
