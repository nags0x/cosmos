"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Skill } from "@/app/actions/getSkills";
import { AnimatePresence, motion } from "framer-motion";
import { X, Terminal } from "lucide-react";

interface SkillsLogProps {
    skills: Skill[];
}

export function SkillsLog({ skills }: SkillsLogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section>
            <button
                onClick={() => setIsOpen(true)}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            >
                <Terminal className="w-3 h-3 group-hover:text-accent transition-colors" />
                <span>System Capabilities</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                                <h3 className="text-sm font-medium text-foreground">Ship's Log (AGENTS.md)</h3>
                                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto p-6 bg-card">
                                {skills.map(skill => (
                                    <div key={skill.id} className="mb-8 last:mb-0">
                                        <h4 className="text-accent font-mono text-sm mb-2"># {skill.name}</h4>
                                        <div className="text-muted-foreground text-xs font-mono mb-4">v{skill.version}</div>
                                        <pre className="text-xs text-muted-foreground/80 whitespace-pre-wrap font-mono leading-relaxed bg-muted/50 p-4 rounded-lg border border-border">
                                            {skill.content?.slice(0, 1000)}...
                                            {(!skill.content) && "No log content available."}
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
