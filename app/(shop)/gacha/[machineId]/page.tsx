"use client";

import { use, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Package, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { rarityColor, rarityLabel } from "@/lib/utils";
import {
  DEMO_GACHA_POOL_BY_MACHINE,
  type DemoGachaPoolItem,
} from "@/lib/mock-data";

const MACHINE_META: Record<string, { name: string; price: number; color: string; emoji: string }> = {
  "1": { name: "黃金傳奇箱", price: 500, color: "#c9a84c", emoji: "✦" },
  "2": { name: "紫晶神秘箱", price: 200, color: "#a855f7", emoji: "◈" },
  "3": { name: "藍色精英箱", price: 80, color: "#3b82f6", emoji: "◆" },
  "4": { name: "入門探索箱", price: 30, color: "#6b7280", emoji: "◇" },
};

type DrawResult = Omit<DemoGachaPoolItem, "weight">;
type AnimationState = "idle" | "shaking" | "opening" | "flipping" | "revealed";
type Particle = { left: number; top: number; delay: number };

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    left: 20 + Math.random() * 60,
    top: 20 + Math.random() * 60,
    delay: index * 0.1,
  }));
}

function drawFromPool(pool: DemoGachaPoolItem[]): DrawResult {
  const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
  if (!totalWeight) return pool[0];

  let random = Math.random() * totalWeight;
  for (const item of pool) {
    random -= item.weight;
    if (random <= 0) {
      return {
        name: item.name,
        player: item.player,
        team: item.team,
        rarity: item.rarity,
        imageUrl: item.imageUrl,
      };
    }
  }

  const last = pool[pool.length - 1];
  return {
    name: last.name,
    player: last.player,
    team: last.team,
    rarity: last.rarity,
    imageUrl: last.imageUrl,
  };
}

export default function GachaMachinePage({
  params,
}: {
  params: Promise<{ machineId: string }>;
}) {
  const { machineId } = use(params);
  const machine = MACHINE_META[machineId] ?? MACHINE_META["1"];
  const fallbackPool = DEMO_GACHA_POOL_BY_MACHINE["1"];
  const machinePool: DemoGachaPoolItem[] = DEMO_GACHA_POOL_BY_MACHINE[machineId] ?? fallbackPool;

  const [animState, setAnimState] = useState<AnimationState>("idle");
  const [result, setResult] = useState<DrawResult | null>(null);
  const [history, setHistory] = useState<DrawResult[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [flashVisible, setFlashVisible] = useState(false);

  const handleDraw = async () => {
    if (animState !== "idle") return;

    setAnimState("shaking");
    await new Promise((resolve) => setTimeout(resolve, 650));

    setAnimState("opening");
    setFlashVisible(true);
    await new Promise((resolve) => setTimeout(resolve, 360));

    const drawn = drawFromPool(machinePool);
    setResult(drawn);
    setAnimState("flipping");

    await new Promise((resolve) => setTimeout(resolve, 820));
    setFlashVisible(false);
    setAnimState("revealed");
    setParticles(createParticles(8));
    setHistory((prev) => [drawn, ...prev.slice(0, 9)]);
  };

  const handleReset = () => {
    setAnimState("idle");
    setResult(null);
    setParticles([]);
    setFlashVisible(false);
  };

  const resultColor = result ? rarityColor(result.rarity) : machine.color;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#12121a] border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/gacha" className="flex items-center gap-2 text-[#a0a0b8] hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            返回扭蛋大廳
          </Link>
          <div className="divider-gold w-px h-4 bg-white/10" />
          <h1 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-barlow)", color: machine.color }}>
            {machine.name}
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[560px]">
          <div className="relative w-80 h-80 flex items-center justify-center mb-8">
            <motion.div
              className="absolute inset-0 rounded-full opacity-20"
              animate={{ scale: animState === "revealed" ? [1, 1.15, 1] : 1, opacity: animState === "revealed" ? [0.15, 0.5, 0.2] : 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{ background: `radial-gradient(circle, ${machine.color}60 0%, transparent 70%)` }}
            />

            <AnimatePresence mode="wait">
              {animState !== "revealed" ? (
                <motion.button
                  key="box"
                  className="relative w-56 h-56 rounded-3xl overflow-hidden cursor-pointer"
                  onClick={animState === "idle" ? handleDraw : undefined}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={
                    animState === "shaking"
                      ? { opacity: 1, scale: [1, 1.04, 1.08, 1.03, 1], rotate: [0, -4, 5, -3, 0] }
                      : animState === "opening"
                        ? { opacity: 1, scale: 1.18, rotate: 0, filter: "brightness(1.35)" }
                        : { opacity: 1, scale: 1, rotate: 0 }
                  }
                  exit={{ opacity: 0, scale: 1.26, filter: "brightness(1.8)" }}
                  transition={{ duration: 0.52, ease: "easeInOut" }}
                  style={{
                    border: `3px solid ${machine.color}60`,
                    boxShadow: `0 0 40px ${machine.color}30, 0 0 80px ${machine.color}10`,
                  }}
                >
                  <img
                    src={machinePool[0].imageUrl}
                    alt={`${machine.name} 盲盒封面`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-[#0a0a0f]/35 to-transparent" />

                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    animate={animState === "opening" ? { scale: 1.05 } : { scale: 1 }}
                  >
                    <div className="text-7xl font-black select-none" style={{ color: machine.color, fontFamily: "var(--font-barlow)" }}>
                      {animState === "idle" ? machine.emoji : "?"}
                    </div>
                    {animState === "idle" && (
                      <div className="mt-3 text-sm font-bold" style={{ color: machine.color }}>
                        點擊開盒
                      </div>
                    )}
                  </motion.div>
                </motion.button>
              ) : (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, rotateY: 180, scale: 0.7 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  transition={{ duration: 0.84, ease: "easeOut" }}
                  className="relative w-52 h-72 rounded-2xl overflow-hidden"
                  style={{
                    border: `2px solid ${resultColor}60`,
                    boxShadow: `0 0 40px ${resultColor}40, 0 20px 60px rgba(0,0,0,0.6)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img src={result!.imageUrl} alt={`${result!.player} ${result!.name}`} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/45 to-transparent" />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${resultColor}10, transparent 40%, ${resultColor}08)` }}
                  />

                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div
                      className="text-[9px] font-black tracking-[0.2em] px-2 py-1 rounded-full border self-start"
                      style={{ color: resultColor, borderColor: `${resultColor}50`, backgroundColor: `${resultColor}10` }}
                    >
                      {rarityLabel(result!.rarity)}
                    </div>

                    <div>
                      <div className="text-lg font-black text-white" style={{ fontFamily: "var(--font-barlow)" }}>
                        {result!.player}
                      </div>
                      <div className="text-xs text-[#c5cedd]">{result!.team}</div>
                      <div className="text-xs text-[#d7dce7] mt-1 line-clamp-2">{result!.name}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {flashVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.95, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.96) 0%, ${machine.color}35 40%, transparent 72%)`,
                    filter: "blur(12px)",
                  }}
                />
              )}
            </AnimatePresence>

            {animState === "revealed" && (
              <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.7], y: [-6, -26, -44] }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: particle.delay }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: resultColor,
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {animState === "idle" && (
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <motion.button
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDraw}
                className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${machine.color}, ${machine.color}cc)`,
                  color: "#0a0a0f",
                  boxShadow: `0 4px 20px ${machine.color}40`,
                }}
              >
                <Package className="w-5 h-5" />
                單抽（NT$ {machine.price}）
              </motion.button>
              <motion.button
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 glass-panel border"
                style={{ borderColor: `${machine.color}30`, color: machine.color }}
              >
                <Sparkles className="w-5 h-5" />
                十連抽（NT$ {machine.price * 10}）
              </motion.button>
            </div>
          )}

          {animState === "revealed" && (
            <div className="flex gap-3 w-full max-w-xs">
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 glass-panel border border-white/10 hover:border-white/20 transition-all text-white"
              >
                <RotateCcw className="w-4 h-4" />
                再抽一次
              </motion.button>
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl text-sm font-bold btn-primary"
              >
                加入收藏
              </motion.button>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-white/[0.06] p-6">
            <h3 className="text-sm font-black text-white mb-4 uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow)" }}>
              本次抽卡記錄
            </h3>
            <div className="space-y-2">
              {history.map((item, index) => {
                const color = rarityColor(item.rarity);
                return (
                  <motion.div
                    key={`${item.name}-${index}`}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="glass-panel rounded-xl p-3 flex items-center gap-3"
                  >
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-12 rounded-lg object-cover border border-white/10 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{item.player}</div>
                      <div className="text-[10px]" style={{ color }}>
                        {rarityLabel(item.rarity)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
