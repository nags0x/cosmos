"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ContinueCard() {
    return (
        <section className="mb-16">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">Continue</h2>

            <Link href="/chat" className="block group">
                <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between py-4 border-b border-border group-hover:border-foreground/20 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div>
                            <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">Exploring Moon Phases</h3>
                            <p className="text-sm text-muted-foreground">Last opened · Today at 1:14 PM</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors">
                        <span>Open</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </motion.div>
            </Link>
        </section>
    );
}
