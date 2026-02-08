"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    lifespan: number;
    startTime: number;
}

export function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let lastSpawnTime = Date.now();
        // High frequency spawn: 100ms - 400ms
        let nextSpawnDelay = Math.random() * 300 + 100;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const spawnStar = (now: number) => {
            const x = Math.random() * canvas.width;
            const y = -100; // Start above screen

            // Velocity
            const vx = (Math.random() - 0.5) * 0.5; // Slight diagonal
            const vy = 0.8 + Math.random() * 0.8; // Faster fall

            const length = 50 + Math.random() * 100; // Longer trails
            const lifespan = 3000 + Math.random() * 2000;

            stars.push({
                x, y, vx, vy, length, lifespan, startTime: now
            });

            lastSpawnTime = now;
            nextSpawnDelay = Math.random() * 300 + 100;
        };

        // Spawn a burst immediately
        for (let i = 0; i < 5; i++) spawnStar(Date.now() - i * 200);

        const render = () => {
            const now = Date.now();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn Falling Stars
            if (now - lastSpawnTime > nextSpawnDelay) {
                spawnStar(now);
            }

            // Draw Falling Stars
            for (let i = stars.length - 1; i >= 0; i--) {
                const star = stars[i];
                const age = now - star.startTime;

                if (age > star.lifespan || star.y > canvas.height + 100) {
                    stars.splice(i, 1);
                    continue;
                }

                star.x += star.vx;
                star.y += star.vy;

                const progress = age / star.lifespan;
                const opacity = Math.sin(Math.PI * progress); // Full curve 0->1->0

                if (opacity <= 0) continue;

                const angle = Math.atan2(star.vy, star.vx);
                const tailX = star.x - Math.cos(angle) * star.length;
                const tailY = star.y - Math.sin(angle) * star.length;

                const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
                gradient.addColorStop(0, `rgba(210, 190, 255, 0)`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`); // Bright white head

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2; // Visibly thicker
                ctx.lineCap = "round";
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(star.x, star.y);
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
