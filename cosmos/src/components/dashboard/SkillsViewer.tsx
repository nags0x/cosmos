"use client";

import { Skill } from "@/app/actions/getSkills";
import { Terminal, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillsViewerProps {
    skills: Skill[];
}

export function SkillsViewer({ skills }: SkillsViewerProps) {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0] || null);

    return (
        <div className="flex h-full gap-6">
            {/* Skill List */}
            <div className="w-1/3 space-y-3">
                {skills.map((skill) => (
                    <button
                        key={skill.id}
                        onClick={() => setSelectedSkill(skill)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${selectedSkill?.id === skill.id
                                ? "bg-blue-600/10 border-blue-500/30 text-white shadow-lg"
                                : "bg-slate-800/30 border-white/5 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold">{skill.name}</span>
                            <ChevronRight className={`w-4 h-4 transition-transform ${selectedSkill?.id === skill.id ? "rotate-90 text-blue-400" : "text-slate-600"}`} />
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{skill.description}</p>
                    </button>
                ))}
            </div>

            {/* Skill Content */}
            <div className="flex-1 bg-slate-900 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    {selectedSkill ? (
                        <motion.div
                            key={selectedSkill.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex-1 flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-white/5">
                                    <Terminal className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{selectedSkill.name}</h2>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                                        <span>v{selectedSkill.version}</span>
                                        <span>•</span>
                                        <span>{selectedSkill.path}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto custom-scrollbar">
                                <div className="prose prose-invert prose-sm max-w-none">
                                    {/* Render content - simple whitespace preserve for now */}
                                    <pre className="whitespace-pre-wrap font-mono text-xs text-slate-300 bg-black/30 p-4 rounded-lg border border-white/5">
                                        {selectedSkill.content}
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                            <FileText className="w-12 h-12 mb-4 opacity-20" />
                            <p>Select a skill to view logs</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
