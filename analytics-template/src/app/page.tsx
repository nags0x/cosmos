import { StarBackground } from "@/components/landing/StarBackground";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2b1f3a] to-[#0a0a0a] text-[#f0f0f0] overflow-hidden font-sans selection:bg-[#d2beff]/20">

      {/* Background Layer: Stars & Noise */}
      <StarBackground />
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"></div>

      {/* Content Layer */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Focal Point */}
        <div className="max-w-xl w-full text-center space-y-12 animate-in fade-in duration-1000 slide-in-from-bottom-4">

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide leading-relaxed text-[#f0f0f0]/90">
              <span>COSMOS</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide leading-relaxed text-[#f0f0f0]/90">
              <span>A calm place to explore the universe.</span>
            </h2>
            <p className="text-sm md:text-base text-[#d2beff]/60 tracking-widest uppercase font-mono">
              The Observatory is Open
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[#f0f0f0]/10 hover:border-[#d2beff]/30 bg-[#f0f0f0]/5 hover:bg-[#d2beff]/10 transition-all duration-500 backdrop-blur-sm"
            >
              <span className="text-sm font-medium tracking-wider text-[#f0f0f0]/80 group-hover:text-[#d2beff]">
                Enter
              </span>
              <ArrowRight className="w-4 h-4 text-[#f0f0f0]/50 group-hover:text-[#d2beff] group-hover:translate-x-1 transition-all duration-500" />
            </Link>
          </div>

        </div>

        {/* Footer Whisper */}
        <div className="absolute bottom-8 text-[10px] text-[#f0f0f0]/20 font-mono tracking-[0.2em] uppercase">
          Tambo Space v2.0
        </div>

      </main>
    </div>
  );
}
