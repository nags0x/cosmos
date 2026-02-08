import { CelestialCalendar } from "@/components/calendar/CelestialCalendar";

export default function CalendarPage() {
    return (
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[url('/bg-stars.png')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-950 pointer-events-none" />

            <div className="z-10 w-full max-w-4xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Celestial Schedule</h1>
                    <p className="text-slate-400">Sync your life with the cosmos.</p>
                </div>
                <CelestialCalendar />
            </div>
        </main>
    );
}
