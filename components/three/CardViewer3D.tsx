"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import CollectibleCard from "@/components/three/CollectibleCard";

type CardViewer3DProps = {
  imageUrl: string;
  accentColor?: string;
};

export default function CardViewer3D({
  imageUrl,
  accentColor = "#c9a84c",
}: CardViewer3DProps) {
  return (
    <div className="h-[420px] w-full rounded-[28px] overflow-hidden bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.16),transparent_42%),linear-gradient(180deg,#151620_0%,#0a0b10_100%)]">
      <Canvas camera={{ position: [0, 0.1, 4.5], fov: 34 }}>
        <ambientLight intensity={1} />
        <spotLight position={[0, 3.4, 4]} intensity={42} angle={0.42} penumbra={0.85} color="#ffe2a9" />
        <pointLight position={[-2, 0, 3]} intensity={10} color="#60a5fa" />

        <CollectibleCard imageUrl={imageUrl} accentColor={accentColor} autoFloat={false} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.42} scale={8} blur={2.6} far={5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={1.8}
        />
      </Canvas>
    </div>
  );
}
