
"use client";

import { useGameStore } from "@/store/game";
import { PlanetObject } from "./PlanetObject";
import { Line } from "@react-three/drei";
import { useThree, ThreeEvent } from "@react-three/fiber";
import { useState } from "react";

const ORBITS = [
    { name: "mercury", radius: 3, color: "#A5A5A5" },
    { name: "venus", radius: 5, color: "#E3BB76" },
    { name: "earth", radius: 7, color: "#4B90E3" },
    { name: "mars", radius: 9, color: "#E35B4B" },
    { name: "jupiter", radius: 12, color: "#B89B72" },
    { name: "saturn", radius: 15, color: "#C5AB6E" },
    { name: "uranus", radius: 18, color: "#D1F3F8" },
    { name: "neptune", radius: 21, color: "#5B5DDF" },
];

function OrbitRing({ radius, color }: { radius: number; color: string }) {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI;
        points.push([Math.cos(theta) * radius, 0, Math.sin(theta) * radius] as [number, number, number]);
    }

    return (
        <Line
            points={points}
            color={color}
            opacity={0.3}
            transparent
            lineWidth={1}
        />
    );
}

export function OrbitBoard() {
    const placedPlanets = useGameStore((state) => state.placedPlanets);
    const draggingPlanet = useGameStore((state) => state.draggingPlanet);
    const setDraggingPlanet = useGameStore((state) => state.setDraggingPlanet);
    const placePlanet = useGameStore((state) => state.placePlanet);

    const [dragPos, setDragPos] = useState<[number, number, number] | null>(null);

    const droppedPlanet = (e: ThreeEvent<PointerEvent>) => {
        if (!draggingPlanet) return;
        e.stopPropagation();

        const point = e.point;
        const distance = Math.sqrt(point.x * point.x + point.z * point.z);

        // Find closest orbit
        let closestOrbit = null;
        let minDiff = Infinity;

        for (const orbit of ORBITS) {
            const diff = Math.abs(distance - orbit.radius);
            if (diff < minDiff) {
                minDiff = diff;
                closestOrbit = orbit;
            }
        }

        // Validation Threshold
        if (closestOrbit && minDiff < 1.5) {
            if (draggingPlanet.correctOrbit && draggingPlanet.correctOrbit !== closestOrbit.name) {
                console.log("Wrong orbit!", draggingPlanet.correctOrbit, closestOrbit.name);
                setDraggingPlanet(null);
            } else {
                placePlanet(closestOrbit.name, draggingPlanet);
                setDraggingPlanet(null);
            }
        } else {
            setDraggingPlanet(null);
        }
        setDragPos(null);
    };

    return (
        <group>
            {/* Interactive Plane for Dragging */}
            {/* Interactive Plane for Dragging removed in favor of global window listeners */}

            {/* The Sun */}
            <PlanetObject
                object="sun"
                name="Sun"
                modelPath="/models/sun.glb"
                scale={2}
                autoHover={false}
                allowRotate={true}
            />

            {/* Orbit Rings & Placed Planets */}
            {ORBITS.map((orbit) => {
                const planet = placedPlanets[orbit.name];

                return (
                    <group key={orbit.name}>
                        <OrbitRing radius={orbit.radius} color={orbit.color} />

                        {planet && (
                            <group position={[orbit.radius, 0, 0]}>
                                <PlanetObject {...planet} scale={0.5} />
                            </group>
                        )}
                    </group>
                );
            })}

            {/* Dragging Ghost Planet */}
            {draggingPlanet && dragPos && (
                <group position={dragPos}>
                    <PlanetObject
                        {...draggingPlanet}
                        scale={0.5}
                    />
                </group>
            )}
        </group>
    );
}
