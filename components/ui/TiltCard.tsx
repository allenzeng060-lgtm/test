"use client";

import { useMemo, useRef } from "react";
import type { CSSProperties, HTMLAttributes, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = HTMLAttributes<HTMLDivElement> & {
  glowColor?: string;
  maxTilt?: number;
};

function hexToRgbTuple(hex: string): string {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;

  if (normalized.length !== 6) {
    return "201, 168, 76";
  }

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function TiltCard({
  children,
  className,
  style,
  glowColor = "#c9a84c",
  maxTilt = 9,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const baseStyle = useMemo(
    () =>
      ({
        "--rx": "0deg",
        "--ry": "0deg",
        "--mx": "50%",
        "--my": "50%",
        "--glow-color": hexToRgbTuple(glowColor),
      }) as CSSProperties,
    [glowColor]
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;

    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
    card.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };

  return (
    <div
      ref={cardRef}
      className={cn("tilt-card", className)}
      style={{ ...baseStyle, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
