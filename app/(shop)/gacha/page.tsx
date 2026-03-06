import Link from "next/link";
import { rarityColor } from "@/lib/utils";

const GACHA_MACHINES = [
  {
    id: "1",
    name: "黃金傳奇箱",
    description: "含 ULTRA RARE 保底，極品卡牌只在此。每 10 抽保底一張 ULTRA RARE。",
    price: 500,
    color: "#c9a84c",
    glowClass: "box-glow-gold",
    topRarity: "ULTRA_RARE",
    guarantee: "10抽保底",
    emoji: "✦",
    totalPulls: 1248,
    odds: [
      { rarity: "ULTRA_RARE", percent: "2%" },
      { rarity: "SUPER_RARE", percent: "8%" },
      { rarity: "RARE", percent: "20%" },
      { rarity: "UNCOMMON", percent: "30%" },
      { rarity: "COMMON", percent: "40%" },
    ],
  },
  {
    id: "2",
    name: "紫晶神秘箱",
    description: "SUPER RARE 稀有卡牌，超高爆率。每 20 抽保底一張 SUPER RARE。",
    price: 200,
    color: "#a855f7",
    glowClass: "box-glow-purple",
    topRarity: "SUPER_RARE",
    guarantee: "20抽保底",
    emoji: "◈",
    totalPulls: 3621,
    odds: [
      { rarity: "SUPER_RARE", percent: "10%" },
      { rarity: "RARE", percent: "25%" },
      { rarity: "UNCOMMON", percent: "35%" },
      { rarity: "COMMON", percent: "30%" },
    ],
  },
  {
    id: "3",
    name: "藍色精英箱",
    description: "RARE 等級以上保證，性價比超高選擇。",
    price: 80,
    color: "#3b82f6",
    glowClass: "box-glow-blue",
    topRarity: "RARE",
    guarantee: "30抽保底",
    emoji: "◆",
    totalPulls: 8432,
    odds: [
      { rarity: "RARE", percent: "30%" },
      { rarity: "UNCOMMON", percent: "40%" },
      { rarity: "COMMON", percent: "30%" },
    ],
  },
  {
    id: "4",
    name: "入門探索箱",
    description: "適合新手收藏家，隨機驚喜從此開始。",
    price: 30,
    color: "#6b7280",
    glowClass: "box-glow-gray",
    topRarity: "UNCOMMON",
    guarantee: "無保底",
    emoji: "◇",
    totalPulls: 15890,
    odds: [
      { rarity: "UNCOMMON", percent: "20%" },
      { rarity: "COMMON", percent: "80%" },
    ],
  },
];

const rarityLabelMap: Record<string, string> = {
  ULTRA_RARE: "ULTRA RARE",
  SUPER_RARE: "SUPER RARE",
  RARE: "RARE",
  UNCOMMON: "UNCOMMON",
  COMMON: "COMMON",
};

export default function GachaPage() {
  return (
    <div className="min-h-screen">
      {/* 頁首 */}
      <div className="relative bg-[#12121a] border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% -30%, rgba(124,58,237,0.2) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-xs font-semibold text-[#a855f7] tracking-[0.3em] uppercase mb-3">
            Mystery Box
          </div>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            扭蛋盲盒
          </h1>
          <p className="text-[#a0a0b8] max-w-lg">
            選擇你的盲盒，開啟收藏之路。稀有卡牌隨機入手，每次都是新驚喜。
            所有機率均已公開，誠信經營。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {GACHA_MACHINES.map((machine) => (
            <div
              key={machine.id}
              className={`relative rounded-3xl glass-panel border border-white/[0.06] overflow-hidden group transition-all duration-300 hover:border-white/20 hover:scale-[1.01]`}
            >
              {/* 背景光暈 */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${machine.color}10 0%, transparent 70%)` }}
              />

              <div className="p-8">
                <div className="flex items-start gap-6">
                  {/* 盲盒圖示 */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-black ${machine.glowClass} group-hover:scale-110 transition-transform duration-300`}
                      style={{
                        background: `linear-gradient(135deg, ${machine.color}20, ${machine.color}05)`,
                        border: `2px solid ${machine.color}40`,
                        color: machine.color,
                        fontFamily: "var(--font-barlow)",
                      }}
                    >
                      {machine.emoji}
                    </div>
                    <div className="mt-3 text-center">
                      <div className="text-xs text-[#5a5a7a]">總開箱數</div>
                      <div
                        className="text-sm font-black"
                        style={{ fontFamily: "var(--font-barlow)", color: machine.color }}
                      >
                        {machine.totalPulls.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* 內容 */}
                  <div className="flex-1">
                    <div
                      className="text-[9px] font-black tracking-[0.2em] px-2 py-0.5 rounded-full border mb-2 w-fit"
                      style={{ color: machine.color, borderColor: `${machine.color}40`, backgroundColor: `${machine.color}10` }}
                    >
                      {rarityLabelMap[machine.topRarity]}
                    </div>
                    <h2
                      className="text-2xl font-black text-white mb-2"
                      style={{ fontFamily: "var(--font-barlow)" }}
                    >
                      {machine.name}
                    </h2>
                    <p className="text-sm text-[#a0a0b8] mb-4 leading-relaxed">
                      {machine.description}
                    </p>

                    {/* 機率表 */}
                    <div className="glass-panel rounded-xl p-3 mb-4">
                      <div className="text-[10px] text-[#5a5a7a] uppercase tracking-wider mb-2">機率公告</div>
                      <div className="space-y-1.5">
                        {machine.odds.map(({ rarity, percent }) => {
                          const color = rarityColor(rarity);
                          const pct = parseInt(percent);
                          return (
                            <div key={rarity} className="flex items-center gap-2">
                              <span
                                className="text-[9px] font-black w-20 flex-shrink-0"
                                style={{ color }}
                              >
                                {rarityLabelMap[rarity]}
                              </span>
                              <div className="flex-1 h-1.5 rounded-full bg-white/5">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%`, backgroundColor: color, boxShadow: `0 0 4px ${color}50` }}
                                />
                              </div>
                              <span className="text-[10px] font-mono text-[#a0a0b8] w-8 text-right">{percent}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 價格和按鈕 */}
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-xs text-[#5a5a7a]">每抽價格</div>
                        <div
                          className="text-3xl font-black"
                          style={{ fontFamily: "var(--font-barlow)", color: machine.color }}
                        >
                          NT$ {machine.price}
                        </div>
                      </div>
                      <div className="flex-1 flex gap-2">
                        <Link
                          href={`/gacha/${machine.id}`}
                          className="flex-1 py-3 rounded-xl text-center text-sm font-bold transition-all duration-200 hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${machine.color}, ${machine.color}cc)`,
                            color: "#0a0a0f",
                            boxShadow: `0 4px 15px ${machine.color}30`,
                          }}
                        >
                          單抽 ×1
                        </Link>
                        <Link
                          href={`/gacha/${machine.id}?count=10`}
                          className="flex-1 py-3 rounded-xl text-center text-sm font-bold glass-panel border transition-all duration-200 hover:border-white/30"
                          style={{ borderColor: `${machine.color}30`, color: machine.color }}
                        >
                          十連抽
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 保底標示 */}
              <div
                className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full"
                style={{ backgroundColor: `${machine.color}15`, color: machine.color, border: `1px solid ${machine.color}30` }}
              >
                {machine.guarantee}
              </div>
            </div>
          ))}
        </div>

        {/* 說明區 */}
        <div className="mt-12 glass-panel rounded-2xl p-8">
          <h3
            className="text-xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            開盒說明
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-[#a0a0b8]">
            <div>
              <div className="text-[#c9a84c] font-semibold mb-2">💳 付款方式</div>
              <p>使用錢包餘額即時抽取，或直接信用卡/ATM付款。儲值越多，享受更流暢的抽卡體驗。</p>
            </div>
            <div>
              <div className="text-[#c9a84c] font-semibold mb-2">📦 卡牌配送</div>
              <p>抽到的實體卡牌將於 3-5 個工作天內出貨。電子記錄即時存入你的收藏中心。</p>
            </div>
            <div>
              <div className="text-[#c9a84c] font-semibold mb-2">🔒 機率公開</div>
              <p>所有機率均已公開揭示，符合消費者保護法規。每次抽取均由伺服器端公正隨機決定。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
