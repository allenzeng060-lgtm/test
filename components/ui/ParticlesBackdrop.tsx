"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

type ParticlesBackdropProps = {
  className?: string;
  count?: number;
};

export default function ParticlesBackdrop({
  className,
  count = 56,
}: ParticlesBackdropProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: count,
          density: {
            enable: true,
            width: 1200,
            height: 800,
          },
        },
        color: {
          value: ["#c9a84c", "#00d4ff", "#ffffff"],
        },
        opacity: {
          value: { min: 0.08, max: 0.32 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 0.25,
          direction: "none" as const,
          outModes: {
            default: "out" as const,
          },
        },
        links: {
          enable: false,
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.03,
            opacity: 0.8,
            color: {
              value: "#ffffff",
            },
          },
        },
        shadow: {
          enable: true,
          blur: 6,
          color: "#c9a84c",
          offset: {
            x: 0,
            y: 0,
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: false,
          },
          resize: {
            enable: true,
          },
        },
      },
    }),
    [count]
  );

  if (!ready) {
    return null;
  }

  return (
    <Particles
      id="collector-particles"
      className={cn("absolute inset-0 h-full w-full pointer-events-none", className)}
      options={options}
    />
  );
}
