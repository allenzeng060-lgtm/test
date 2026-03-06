"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import type { Group, Mesh } from "three";

type CollectibleCardProps = {
  imageUrl: string;
  accentColor?: string;
  autoFloat?: boolean;
};

export default function CollectibleCard({
  imageUrl,
  accentColor = "#c9a84c",
  autoFloat = true,
}: CollectibleCardProps) {
  const groupRef = useRef<Group>(null);
  const foilRef = useRef<Mesh>(null);
  const texture = useTexture(imageUrl);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    const foil = foilRef.current;
    if (!group) return;

    const elapsed = clock.getElapsedTime();
    if (autoFloat) {
      group.rotation.x = pointer.y * 0.18 + Math.sin(elapsed * 0.7) * 0.05;
      group.rotation.y = pointer.x * 0.24 + Math.cos(elapsed * 0.45) * 0.12;
      group.position.y = Math.sin(elapsed * 0.9) * 0.08;
    }

    if (foil) {
      foil.rotation.z = elapsed * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.82, 2.58, 0.09]} radius={0.08} smoothness={6}>
        <meshPhysicalMaterial
          color="#171722"
          metalness={0.85}
          roughness={0.26}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.047]}>
        <planeGeometry args={[1.68, 2.42]} />
        <meshStandardMaterial map={texture} metalness={0.15} roughness={0.72} />
      </mesh>

      <mesh ref={foilRef} position={[0, 0, 0.051]}>
        <planeGeometry args={[1.7, 2.44]} />
        <meshPhysicalMaterial
          color={accentColor}
          transparent
          opacity={0.13}
          metalness={1}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>

      <mesh position={[0, 0, -0.048]}>
        <planeGeometry args={[1.7, 2.44]} />
        <meshStandardMaterial color="#0c0d13" metalness={0.6} roughness={0.45} />
      </mesh>
    </group>
  );
}
