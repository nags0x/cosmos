
"use client";

import { Canvas } from '@react-three/fiber';
import { Environment } from "@react-three/drei";
import { PlanetTray } from './PlanetTray';
import { OrbitBoard } from './OrbitBoard';
import { Suspense } from 'react';
import type { PlanetProps } from './planetSchema';

const ALL_PLANETS: PlanetProps[] = [
    { object: "planet", name: "Mercury", modelPath: "/bodies/mercury_planet.glb", correctOrbit: "mercury", scale: 1, autoHover: true, allowRotate: true },
    { object: "planet", name: "Venus", modelPath: "/bodies/mars_planet.glb", correctOrbit: "venus", scale: 1, autoHover: true, allowRotate: true },
    { object: "planet", name: "Earth", modelPath: "/bodies/earth_planet.glb", correctOrbit: "earth", scale: 1, autoHover: true, allowRotate: true },
    { object: "planet", name: "Mars", modelPath: "/bodies/mars_planet.glb", correctOrbit: "mars", scale: 1, autoHover: true, allowRotate: true },
    { object: "planet", name: "Jupiter", modelPath: "/bodies/jupiter_planet.glb", correctOrbit: "jupiter", scale: 1, autoHover: true, allowRotate: true },
    { object: "planet", name: "Saturn", modelPath: "/bodies/saturn_planet.glb", correctOrbit: "saturn", scale: 1, autoHover: true, allowRotate: true },
    { object: "planet", name: "Uranus", modelPath: "/bodies/uranus_planet.glb", correctOrbit: "uranus", scale: 1, autoHover: true, allowRotate: true },
    { object: "planet", name: "Neptune", modelPath: "/bodies/neptune_planet.glb", correctOrbit: "neptune", scale: 1, autoHover: true, allowRotate: true },
];

export function PlanetGame() {
    return (
        <div className='w-full h-[600px] flex flex-col gap-4 p-4 bg-slate-900 text-white rounded-xl'>
            <div className='flex justify-between items-center px-2'>
                <h2 className='text-lg font-semibold'>Solar System builder</h2>
                <span className='text-sm text-slate-400'>Drag planets to their correct orbits</span>
            </div>

            <div className='flex flex-1 gap-4 overflow-hidden'>
                {/* Full Tray */}
                <div className='w-1/3 bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-col'>
                    <div className='p-2 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-700/50'>Planet Tray</div>
                    <div className='flex-1 relative overflow-y-auto no-scrollbar'>
                        {/* 
                           We need a way to render multiple planets in a grid or list in 3D.
                           Or separate canvases for each? Separate canvases is heavy but easiest for layout.
                           Single canvas with grid layout is better for performance.
                        */}
                        <Canvas
                            camera={{ position: [0, 0, 10], fov: 45 }}
                            gl={{ preserveDrawingBuffer: true }}
                        >
                            <Suspense fallback={null}>
                                <Environment preset="city" />
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} intensity={1.5} />

                                {/* Render planets in a grid */}
                                <group position={[0, 2, 0]}>
                                    {ALL_PLANETS.map((planet, index) => {
                                        const x = (index % 2) * 3 - 1.5;
                                        const y = -Math.floor(index / 2) * 3;
                                        return (
                                            <group key={planet.name} position={[x, y, 0]}>
                                                <PlanetTray {...planet} scale={1} />
                                            </group>
                                        );
                                    })}
                                </group>
                            </Suspense>
                        </Canvas>
                    </div>
                </div>

                {/* Game Board */}
                <div className='flex-1 bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-col'>
                    <div className='p-2 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-700/50'>Solar System</div>
                    <div className='flex-1 relative'>
                        <Canvas
                            camera={{ position: [0, 20, 0], fov: 45 }}
                            gl={{ preserveDrawingBuffer: true }}
                        >
                            <Suspense fallback={null}>
                                <Environment preset="sunset" />
                                <ambientLight intensity={0.2} />
                                <pointLight position={[0, 0, 0]} intensity={2} />
                                <OrbitBoard />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}
