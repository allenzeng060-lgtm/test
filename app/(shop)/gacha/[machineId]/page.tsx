"use client";

import { useState, useCallback } from "react";
import { RotateCcw, Package, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { rarityColor, rarityLabel } from "@/lib/utils";

const MACHINE_DATA: Record<string, { name: string; price: number; color: string; emoji: string; pool: Array<{ name: string; player: string; team: string; rarity: string; weight: number }> }> = {
  "1": {
    name: "黃金傳奇箱",
    price: 500,
    color: "#c9a84c",
    emoji: "✦",
    pool: [
      { name: "2023 Topps 金色簽名卡", player: "陳偉殷", team: "洋基", rarity: "ULTRA_RARE", weight: 2 },
      { name: "2006 Topps Chrome 新秀卡", player: "王建民", team: "洋基", rarity: "SUPER_RARE", weight: 8 },
      { name: "2022 Bowman 前景卡", player: "林子偉", team: "紅襪", rarity: "RARE", weight: 20 },
      { name: "2010 Upper Deck 特別版", player: "郭泓志", team: "道奇", rarity: "UNCOMMON", weight: 30 },
      { name: "2023 Topps 基礎卡", player: "陳冠宇", team: "洋基", rarity: "COMMON", weight: 40 },
    ],
  },
};

type DrawResult = {
  name: string;
  player: string;
  team: string;
  rarity: string;
};

type AnimationState = "idle" | "shaking" | "opening" | "flipping" | "revealed";

function drawFromPool(pool: typeof MACHINE_DATA["1"]["pool"]): DrawResult {
  const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  for (const item of pool) {
    random -= item.weight;
    if (random <= 0) {
      return { name: item.name, player: item.player, team: item.team, rarity: item.rarity };
    }
  }
  const last = pool[pool.length - 1];
  return { name: last.name, player: last.player, team: last.team, rarity: last.rarity };
}

export default function GachaMachinePage({ params }: { params: { machineId: string } }) {
  const machine = MACHINE_DATA[params.machineId] ?? MACHINE_DATA["1"];
  const [animState, setAnimState] = useState<AnimationState>("idle");
  const [result, setResult] = useState<DrawResult | null>(null);
  const [history, setHistory] = useState<DrawResult[]>([]);

  const handleDraw = useCallback(async () => {
    if (animState !== "idle") return;

    setAnimState("shaking");
    await new Promise((r) => setTimeout(r, 600));

    setAnimState("opening");
    await new Promise((r) => setTimeout(r, 400));

    const drawn = drawFromPool(machine.pool);
    setResult(drawn);

    setAnimState("flipping");
    await new Promise((r) => setTimeout(r, 800));

    setAnimState("revealed");
    setHistory((prev) => [drawn, ...prev.slice(0, 9)]);
  }, [animState, machine.pool]);

  const handleReset = () => {
    setAnimState("idle");
    setResult(null);
  };

  const resultColor = result ? rarityColor(result.rarity) : machine.color;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 頂部導航 */}
      <div className="bg-[#12121a] border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/gacha" className="flex items-center gap-2 text-[#a0a0b8] hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            返回扭蛋大廳
          </Link>
          <div className="divider-gold w-px h-4 bg-white/10" />
          <h1
            className="text-lg font-black text-white"
            style={{ fontFamily: "var(--font-barlow)", color: machine.color }}
          >
            {machine.name}
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* 主要抽卡區 */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[500px]">
          {/* 動畫區域 */}
          <div className="relative w-80 h-80 flex items-center justify-center mb-8">
            {/* 背景光環 */}
            <div
              className="absolute inset-0 rounded-full opacity-20 animate-pulse-glow"
              style={{ background: `radial-gradient(circle, ${machine.color}60 0%, transparent 70%)` }}
            />

            {/* 盲盒 / 卡片 */}
            {animState !== "revealed" ? (
              /* 盲盒 */
              <div
                className="relative w-52 h-52 rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-200"
                onClick={animState === "idle" ? handleDraw : undefined}
                style={{
                  background: `linear-gradient(135deg, ${machine.color}20, ${machine.color}05)`,
                  border: `3px solid ${machine.color}60`,
                  boxShadow: `0 0 40px ${machine.color}30, 0 0 80px ${machine.color}10`,
                  animation: animState === "shaking"
                    ? "shake 0.5s ease-in-out"
                    : animState === "opening"
                    ? "scale(1.2)"
                    : undefined,
                  transform: animState === "shaking"
                    ? undefined
                    : animState === "opening"
                    ? "scale(1.15)"
                    : "scale(1)",
                }}
              >
                <div
                  className="text-8xl font-black select-none"
                  style={{ color: machine.color, fontFamily: "var(--font-barlow)" }}
                >
                  {animState === "idle" ? machine.emoji : "?"}
                </div>

                {animState === "idle" && (
                  <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-bold"
                    style={{ color: machine.color }}>
                    點擊開盒
                  </div>
                )}
              </div>
            ) : (
              /* 揭曉的卡片 */
              <div
                className="relative w-48 h-64 rounded-2xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 60%, #1e1e2e 100%)`,
                  border: `2px solid ${resultColor}60`,
                  boxShadow: `0 0 40px ${resultColor}40, 0 20px 60px rgba(0,0,0,0.6)`,
                  animation: "flip-in 0.8s ease-out",
                }}
              >
                {/* 全息效果 */}
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

                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black mx-auto"
                    style={{
                      background: `radial-gradient(circle, ${resultColor}20, transparent)`,
                      border: `2px solid ${resultColor}30`,
                      color: resultColor,
                      fontFamily: "var(--font-barlow)",
                    }}
                  >
                    {result!.player[0]}
                  </div>

                  <div>
                    <div
                      className="text-base font-black text-white"
                      style={{ fontFamily: "var(--font-barlow)" }}
                    >
                      {result!.player}
                    </div>
                    <div className="text-[10px] text-[#5a5a7a]">{result!.team}</div>
                    <div className="text-[10px] text-[#a0a0b8] mt-1 line-clamp-2">{result!.name}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 粒子效果（揭曉時） */}
            {animState === "revealed" && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-float"
                    style={{
                      backgroundColor: resultColor,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.1}s`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 控制按鈕 */}
          {animState === "idle" && (
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <button
                onClick={handleDraw}
                className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${machine.color}, ${machine.color}cc)`,
                  color: "#0a0a0f",
                  boxShadow: `0 4px 20px ${machine.color}40`,
                }}
              >
                <Package className="w-5 h-5" />
                單抽（NT$ {machine.price}）
              </button>
              <button
                className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 glass-panel border transition-all hover:border-white/30"
                style={{ borderColor: `${machine.color}30`, color: machine.color }}
              >
                <Sparkles className="w-5 h-5" />
                十連抽（NT$ {machine.price * 10}）
              </button>
            </div>
          )}

          {animState === "revealed" && (
            <div className="flex gap-3 w-full max-w-xs">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 glass-panel border border-white/10 hover:border-white/20 transition-all text-white"
              >
                <RotateCcw className="w-4 h-4" />
                再抽一次
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-bold btn-primary">
                加入收藏
              </button>
            </div>
          )}
        </div>

        {/* 側邊：抽卡記錄 */}
        {history.length > 0 && (
          <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-white/[0.06] p-6">
            <h3
              className="text-sm font-black text-white mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              本次抽卡記錄
            </h3>
            <div className="space-y-2">
              {history.map((item, idx) => {
                const c = rarityColor(item.rarity);
                return (
                  <div key={idx} className="glass-panel rounded-xl p-3 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
                      style={{ background: `${c}15`, border: `1px solid ${c}30`, color: c, fontFamily: "var(--font-barlow)" }}
                    >
                      {item.player[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{item.player}</div>
                      <div className="text-[10px]" style={{ color: c }}>{rarityLabel(item.rarity)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-5deg) scale(1.05); }
          40% { transform: rotate(5deg) scale(1.08); }
          60% { transform: rotate(-5deg) scale(1.05); }
          80% { transform: rotate(5deg) scale(1.03); }
        }
        @keyframes flip-in {
          0% { transform: rotateY(180deg) scale(0.5); opacity: 0; }
          60% { transform: rotateY(-10deg) scale(1.05); }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
