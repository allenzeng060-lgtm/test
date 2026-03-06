import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

const GACHA_BOXES = [
  {
    id: 1,
    name: "黃金傳奇箱",
    description: "含 ULTRA RARE 保底，極品卡牌只在此",
    price: 500,
    color: "#c9a84c",
    glowClass: "box-glow-gold",
    rarity: "ULTRA RARE",
    guarantee: "每 10 抽保底",
    emoji: "✦",
  },
  {
    id: 2,
    name: "紫晶神秘箱",
    description: "SUPER RARE 稀有卡牌，超高爆率",
    price: 200,
    color: "#a855f7",
    glowClass: "box-glow-purple",
    rarity: "SUPER RARE",
    guarantee: "每 20 抽保底",
    emoji: "◈",
  },
  {
    id: 3,
    name: "藍色精英箱",
    description: "RARE 等級以上，性價比首選",
    price: 80,
    color: "#3b82f6",
    glowClass: "box-glow-blue",
    rarity: "RARE",
    guarantee: "每 30 抽保底",
    emoji: "◆",
  },
  {
    id: 4,
    name: "入門探索箱",
    description: "適合新手，普通到稀有隨機",
    price: 30,
    color: "#6b7280",
    glowClass: "box-glow-gray",
    rarity: "COMMON+",
    guarantee: "無保底",
    emoji: "◇",
  },
];

export default function FeaturedGacha() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題 */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold text-[#c9a84c] tracking-[0.3em] uppercase mb-2">
              Mystery Box
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              神秘盲盒
            </h2>
            <p className="text-[#a0a0b8] mt-2">每次開箱都是驚喜，稀有卡牌等你發現</p>
          </div>
          <Link
            href="/gacha"
            className="hidden sm:flex items-center gap-2 text-[#c9a84c] hover:text-[#e8c96b] transition-colors text-sm font-medium"
          >
            查看全部 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 盲盒網格 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GACHA_BOXES.map((box) => (
            <Link key={box.id} href={`/gacha/${box.id}`}>
              <div
                className={`relative rounded-2xl p-6 glass-panel cursor-pointer group transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${box.glowClass} hover:border-white/20`}
                style={{
                  borderColor: `${box.color}20`,
                }}
              >
                {/* 背景光暈 */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${box.color}15 0%, transparent 70%)`,
                  }}
                />

                {/* 盒子圖示 */}
                <div className="relative mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-3xl font-black group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${box.color}20, ${box.color}05)`,
                      border: `2px solid ${box.color}40`,
                      color: box.color,
                      boxShadow: `0 0 20px ${box.color}20`,
                      fontFamily: "var(--font-barlow)",
                    }}
                  >
                    {box.emoji}
                  </div>
                </div>

                {/* 稀有度徽章 */}
                <div
                  className="text-[9px] font-black tracking-[0.2em] px-2 py-0.5 rounded-full border mb-3 w-fit mx-auto"
                  style={{
                    color: box.color,
                    borderColor: `${box.color}40`,
                    backgroundColor: `${box.color}10`,
                  }}
                >
                  {box.rarity}
                </div>

                {/* 名稱 */}
                <h3
                  className="text-base font-black text-white text-center mb-1"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {box.name}
                </h3>
                <p className="text-[11px] text-[#5a5a7a] text-center mb-4 leading-relaxed">
                  {box.description}
                </p>

                {/* 保底說明 */}
                <div className="text-[10px] text-[#a0a0b8] text-center mb-4">
                  {box.guarantee}
                </div>

                {/* 價格 */}
                <div className="text-center">
                  <span
                    className="text-xl font-black"
                    style={{ fontFamily: "var(--font-barlow)", color: box.color }}
                  >
                    NT$ {box.price}
                  </span>
                  <span className="text-xs text-[#5a5a7a]"> / 抽</span>
                </div>

                {/* 開盒按鈕 */}
                <div
                  className="mt-4 w-full py-2.5 rounded-xl text-sm font-bold text-center transition-all duration-200 group-hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${box.color}, ${box.color}cc)`,
                    color: "#0a0a0f",
                    boxShadow: `0 0 0 rgba(${box.color},0)`,
                  }}
                >
                  <Package className="w-3.5 h-3.5 inline mr-1.5" />
                  立即開盒
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
