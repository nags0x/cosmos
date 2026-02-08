"use client";

export function NasaLiveStream() {
    return (
        <div className="mt-8 rounded-xl overflow-hidden border border-border relative group aspect-video bg-black shadow-2xl">
            <div className="absolute top-2 left-2 bg-destructive/90 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase animate-pulse z-10">
                Live
            </div>
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/fO9e9jnhYK8?autoplay=1&mute=1&controls=0&modestbranding=1"
                title="NASA Live"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
            />
            {/* Scanlines Overlay - made more subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-10" />
        </div>
    );
}
