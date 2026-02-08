"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { PlanetProps } from "./planetSchema";

type PlanetObjectInnerProps = PlanetProps & {
  modelPath: string;
};

function PlanetObjectInner({
  object,
  modelPath,
  scale,
autoHover,
}: PlanetObjectInnerProps) {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (!autoHover || !ref.current) return;

    if (object === "planet") {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={ref} scale={scale}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

export function PlanetObject(props: PlanetProps) {
  const normalizedName = props.name?.toLowerCase?.() ?? "";
  const directModelPath = props.modelPath?.startsWith("/bodies/")
    ? props.modelPath
    : undefined;
  const resolvedModelPath =
    directModelPath ??
    (normalizedName === "sun"
    ? "/bodies/sun.glb"
      : normalizedName === "moon"
        ? "/bodies/moon.glb"
        : normalizedName === "mercury"
          ? "/bodies/mercury_planet.glb"
          : normalizedName === "earth"
            ? "/bodies/earth_planet.glb"
            : normalizedName === "mars"
              ? "/bodies/mars_planet.glb"
              : normalizedName === "jupiter"
                ? "/bodies/jupiter_planet.glb"
                : normalizedName === "saturn"
                  ? "/bodies/saturn_planet.glb"
                  : normalizedName === "uranus"
                    ? "/bodies/uranus_planet.glb"
                    : normalizedName === "neptune"
                      ? "/bodies/neptune_planet.glb"
                      : "/bodies/earth_planet.glb");

  if (!resolvedModelPath) {
    if (process.env.NODE_ENV !== "production") {
      console.error("PlanetObject requires a valid modelPath.");
    }
    return null;
  }

  return <PlanetObjectInner {...props} modelPath={resolvedModelPath} />;
}
