"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Package, Sparkles } from "lucide-react";

const FLOATING_CARDS = [
  {
    id: 1,
    playerName: "陳偉殷",
    team: "洋基",
    year: 2023,
    rarity: "ULTRA_RARE",
    color: "#f59e0b",
    rotate: "-8deg",
    delay: "0s",
    position: "left-[5%] top-[20%]",
    scale: 1,
  },
  {
    id: 2,
    playerName: "王建民",
    team: "洋基",
    year: 2006,
    rarity: "SUPER_RARE",
    color: "#a855f7",
    rotate: "5deg",
    delay: "1s",
    position: "right-[8%] top-[15%]",
    scale: 0.9,
  },
  {
    id: 3,
    playerName: "郭泓志",
    team: "道奇",
    year: 2010,
    rarity: "RARE",
    color: "#3b82f6",
    rotate: "-3deg",
    delay: "2s",
    position: "right-[22%] bottom-[10%]",
    scale: 0.8,
  },
];

function FloatingCard({
  playerName,
  team,
  year,
  rarity,
  color,
  rotate,
  delay,
  position,
  scale,
}: (typeof FLOATING_CARDS)[0]) {
  const rarityLabel: Record<string, string> = {
    ULTRA_RARE: "ULTRA RARE",
    SUPER_RARE: "SUPER RARE",
    RARE: "RARE",
    UNCOMMON: "UNCOMMON",
    COMMON: "COMMON",
  };

  return (
    <div
      className={`absolute hidden lg:block ${position}`}
      style={{
        transform: `rotate(${rotate}) scale(${scale})`,
        animation: `float 4s ease-in-out ${delay} infinite`,
        transformOrigin: "center",
        zIndex: 2,
      }}
    >
      <div
        className="w-40 h-56 rounded-2xl relative overflow-hidden cursor-pointer"
        style={{
          background: `linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 60%, #1e1e2e 100%)`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${color}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
          border: `1px solid ${color}30`,
        }}
      >
        {/* 卡片光暈 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${color} 0%, transparent 70%)`,
          }}
        />

        {/* 全息條紋 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)`,
          }}
        />

        {/* 卡片內容 */}
        <div className="absolute inset-0 p-3 flex flex-col justify-between">
          {/* 稀有度 */}
          <div
            className="text-[9px] font-black tracking-[0.2em] px-2 py-1 rounded-full border self-start"
            style={{ color, borderColor: `${color}50`, backgroundColor: `${color}10` }}
          >
            {rarityLabel[rarity]}
          </div>

          {/* 球員圖示（placeholder） */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
              style={{
                background: `radial-gradient(circle, ${color}20, transparent)`,
                border: `2px solid ${color}30`,
                color: color,
                fontFamily: "var(--font-barlow)",
              }}
            >
              {playerName[0]}
            </div>
          </div>

          {/* 球員資訊 */}
          <div>
            <div
              className="text-sm font-black text-white tracking-wide"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              {playerName}
            </div>
            <div className="text-[10px] text-[#5a5a7a]">
              {team} · {year}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const cards = container.querySelectorAll<HTMLElement>(".floating-card-wrapper");
      cards.forEach((card, i) => {
        const depth = 0.02 + i * 0.01;
        card.style.transform = `translate(${x * 30 * depth * 100}px, ${y * 20 * depth * 100}px)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden particle-bg"
    >
      {/* 背景光暈 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 60%)" }}
        />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 60%)" }}
        />
      </div>

      {/* 浮動卡牌 */}
      {FLOATING_CARDS.map((card) => (
        <div key={card.id} className="floating-card-wrapper" style={{ transition: "transform 0.3s ease-out" }}>
          <FloatingCard {...card} />
        </div>
      ))}

      {/* 主體文字 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 標籤 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#c9a84c]/20 mb-8">
          <Sparkles className="w-3 h-3 text-[#c9a84c]" />
          <span className="text-xs font-medium text-[#c9a84c] tracking-widest uppercase">
            台灣頂級球員卡收藏平台
          </span>
        </div>

        {/* 標題 */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight mb-6"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          <span className="block text-white">COLLECT</span>
          <span className="block text-gradient-gold">THE LEGENDS</span>
        </h1>

        {/* 副標題 */}
        <p className="text-lg text-[#a0a0b8] max-w-xl mx-auto mb-10 leading-relaxed">
          購買、抽卡、交易頂級棒球員卡。扭蛋開盲盒，每次都是驚喜。
          加入 CardVault，開始你的收藏之旅。
        </p>

        {/* CTA 按鈕 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/gacha"
            className="flex items-center gap-3 px-8 py-4 rounded-xl btn-primary text-base font-bold tracking-wide"
          >
            <Package className="w-5 h-5" />
            開啟神秘盲盒
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-3 px-8 py-4 rounded-xl btn-secondary text-base"
          >
            瀏覽卡牌市場
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 統計 */}
        <div className="flex items-center justify-center gap-8 mt-16">
          {[
            { value: "10,000+", label: "卡牌收藏" },
            { value: "5,000+", label: "活躍會員" },
            { value: "NT$ 1M+", label: "成交總額" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl font-black text-gradient-gold"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {value}
              </div>
              <div className="text-xs text-[#5a5a7a] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部漸層 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }}
      />
    </section>
  );
}
