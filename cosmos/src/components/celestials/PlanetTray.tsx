
"use client";

import { useThree, ThreeEvent } from "@react-three/fiber";
import { PlanetObject } from "./PlanetObject";
import { PlanetProps } from "./planetSchema";
import { useGameStore } from "@/store/game";
import { Html } from "@react-three/drei";

export function PlanetTray(props: PlanetProps) {
    const { viewport } = useThree();
    const setDraggingPlanet = useGameStore((state) => state.setDraggingPlanet);
    const draggingPlanet = useGameStore((state) => state.draggingPlanet);

    // Responsive scale similar to original Planets.tsx
    const baseScale = props.scale ?? 1;
    const responsiveScale = (Math.min(viewport.width, viewport.height) / 4) * baseScale; // Slightly larger in the tray

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        // Start dragging this planet
        setDraggingPlanet(props);
    };

    const isDraggingThis = draggingPlanet?.name === props.name;

    return (
        <group>
            {/* 
        If we are dragging this planet, maybe we dim it or hide it in the tray? 
        The prompt says "The tray never moves". 
        Let's keep it visible but maybe ghosted to indicate it's being picked up.
      */}
            <group
                onPointerDown={handlePointerDown}
                onPointerOver={() => document.body.style.cursor = 'grab'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
                scale={isDraggingThis ? 0.9 : 1}
            >
                <PlanetObject
                    {...props}
                    scale={responsiveScale}
                />
            </group>

            {/* Label for the planet */}
            <Html position={[0, -2, 0]} center>
                <div className="bg-black/50 text-white px-2 py-1 rounded text-sm backdrop-blur-sm pointer-events-none">
                    {props.name}
                </div>
            </Html>
        </group>
    );
}
