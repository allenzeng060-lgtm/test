"use client";

import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows, Sparkles } from "@react-three/drei";
import CollectibleCard from "@/components/three/CollectibleCard";
import { HERO_FLOATING_CARDS } from "@/lib/mock-data";

export default function HeroCardScene() {
  return (
    <div className="absolute inset-0 hidden lg:block">
      <Canvas camera={{ position: [0, 0, 7.8], fov: 34 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#05060a", 7, 14]} />

        <ambientLight intensity={0.95} />
        <spotLight position={[0, 4, 6]} angle={0.42} penumbra={0.85} intensity={48} color="#ffe7a4" />
        <spotLight position={[-4, 2, 3]} angle={0.36} penumbra={1} intensity={22} color="#7c3aed" />
        <pointLight position={[4, -1, 3]} intensity={14} color="#00d4ff" />

        <Float speed={1.7} rotationIntensity={0.22} floatIntensity={0.45}>
          <group position={[-2.35, 0.3, -0.9]} rotation={[-0.1, 0.25, -0.18]}>
            <CollectibleCard
              imageUrl={HERO_FLOATING_CARDS[0].imageUrl}
              accentColor={HERO_FLOATING_CARDS[0].color}
            />
          </group>
        </Float>

        <Float speed={1.25} rotationIntensity={0.14} floatIntensity={0.34}>
          <group position={[0.2, -0.4, 0.4]} rotation={[0.08, -0.15, 0.06]}>
            <CollectibleCard
              imageUrl={HERO_FLOATING_CARDS[1].imageUrl}
              accentColor={HERO_FLOATING_CARDS[1].color}
            />
          </group>
        </Float>

        <Float speed={1.55} rotationIntensity={0.18} floatIntensity={0.42}>
          <group position={[2.5, 0.25, -0.8]} rotation={[0.12, -0.24, 0.16]}>
            <CollectibleCard
              imageUrl={HERO_FLOATING_CARDS[2].imageUrl}
              accentColor={HERO_FLOATING_CARDS[2].color}
            />
          </group>
        </Float>

        <Sparkles count={42} speed={0.28} opacity={0.42} scale={[8, 4, 4]} color="#fef3c7" size={2.2} />
        <Sparkles count={22} speed={0.18} opacity={0.18} scale={[10, 5, 6]} color="#60a5fa" size={3} />
        <ContactShadows position={[0, -2.15, 0]} opacity={0.42} scale={10} blur={2.4} far={5} />
      </Canvas>
    </div>
  );
}
