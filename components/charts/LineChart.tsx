"use client";

import { motion } from "framer-motion";

export type ChartPoint = {
  label: string;
  value: number;
};

type LineChartProps = {
  data: ChartPoint[];
  accentColor?: string;
  height?: number;
  className?: string;
};

export default function LineChart({
  data,
  accentColor = "#c9a84c",
  height = 220,
  className,
}: LineChartProps) {
  const width = 640;
  const padding = 28;
  const values = data.map((point) => point.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);

  const points = data.map((point, index) => {
    const x =
      padding +
      (index * (width - padding * 2)) / Math.max(1, data.length - 1);
    const y =
      height -
      padding -
      ((point.value - min) / range) * (height - padding * 2);
    return { x, y, label: point.label, value: point.value };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? width - padding} ${height - padding} L ${points[0]?.x ?? padding} ${height - padding} Z`;

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.34" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((row) => {
          const y = padding + ((height - padding * 2) * row) / 3;
          return (
            <line
              key={row}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="4 8"
            />
          );
        })}

        <path d={areaPath} fill="url(#chartAreaGradient)" />

        <motion.path
          d={linePath}
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        {points.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill={accentColor}
              stroke="rgba(10,10,15,0.9)"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-6 gap-2 text-[10px] text-[#7f8797]">
        {data.map((point) => (
          <div key={point.label} className="truncate">
            {point.label}
          </div>
        ))}
      </div>
    </div>
  );
}
