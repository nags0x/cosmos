"use client";

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { PlanetProps } from './planetSchema';
import { PlanetObject } from './PlanetObject';
import { Environment } from "@react-three/drei";

function PlanetScene(props: PlanetProps) {
    const { viewport } = useThree();
    const baseScale = props.scale ?? 1;
    // Keeping responsive scale logic
    const responsiveScale = (Math.min(viewport.width, viewport.height) / 7.5) * baseScale;

    return (
        <>
            <PlanetObject {...props} scale={responsiveScale} />
            {props.allowRotate && (
                <OrbitControls
                    enableZoom={true}
                    enablePan={false} />
            )}
        </>
    );
}

export function Planets(props: PlanetProps) {
    return (
        <div className='w-full h-[420px] rounded-lg overflow-hidden bg-slate-900'>
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <Environment preset="sunset" />
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 0, 0]} intensity={2} />

                <PlanetScene {...props} />
            </Canvas>
        </div>
    )
}
