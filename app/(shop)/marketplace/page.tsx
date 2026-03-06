"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, TrendingUp } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { DEMO_MARKETPLACE_LISTINGS } from "@/lib/mock-data";
import { formatPrice, rarityColor, rarityLabel } from "@/lib/utils";

const conditionLabel: Record<string, string> = {
  MINT: "全新",
  NEAR_MINT: "近全新",
  EXCELLENT: "極佳",
  GOOD: "良好",
  FAIR: "普通",
};

const SORT_OPTIONS = [
  { value: "trending", label: "熱門排序" },
  { value: "price_desc", label: "價格高到低" },
  { value: "price_asc", label: "價格低到高" },
  { value: "recent", label: "最新上架" },
  { value: "most_traded", label: "成交次數" },
] as const;

const HEAT_META = {
  HOT: { label: "Hot", icon: "🔥", className: "collector-badge collector-badge-hot" },
  RISING: { label: "Rising", icon: "📈", className: "collector-badge collector-badge-rising" },
  LOW: { label: "Low Activity", icon: "💤", className: "collector-badge collector-badge-low" },
} as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function MarketplacePage() {
  const [sortBy, setSortBy] = useState<SortValue>("trending");
  const [hoveredId, setHoveredId] = useState(DEMO_MARKETPLACE_LISTINGS[0]?.id ?? "");

  const sortedListings = [...DEMO_MARKETPLACE_LISTINGS].sort((a, b) => {
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "recent") return Number(b.id) - Number(a.id);
    if (sortBy === "most_traded") return b.tradesToday - a.tradesToday;
    return b.priceChangePct * 10 + b.tradesToday - (a.priceChangePct * 10 + a.tradesToday);
  });

  const trendingCards = [...DEMO_MARKETPLACE_LISTINGS]
    .sort((a, b) => b.priceChangePct * 10 + b.tradesToday - (a.priceChangePct * 10 + a.tradesToday))
    .slice(0, 3);

  const hoveredCard =
    DEMO_MARKETPLACE_LISTINGS.find((item) => item.id === hoveredId) ??
    DEMO_MARKETPLACE_LISTINGS[0];
  const hoveredColor = rarityColor(hoveredCard.rarity);

  return (
    <div className="min-h-screen">
      <div className="bg-[#12121a] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-[#00d4ff] tracking-[0.3em] uppercase mb-3">
                Collector Exchange
              </div>
              <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                二手交易市場
              </h1>
              <p className="text-[#a0a0b8] max-w-2xl">
                市場頁現在加入 trending、heat indicator、成交次數與 animated hover preview，
                更接近 collectible trading floor，而不是一般商品列表。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative min-w-[240px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  placeholder="搜尋球員、卡況、隊伍（示意）"
                  className="w-full h-11 pl-11 pr-4 rounded-xl input-dark text-sm"
                  readOnly
                />
              </div>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortValue)}
                className="h-11 px-4 rounded-xl input-dark text-sm min-w-[140px]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-panel metal-frame rounded-[28px] p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between mb-5 gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#718094]">Trending Cards</div>
              <h2 className="text-2xl text-white font-black mt-1" style={{ fontFamily: "var(--font-barlow)" }}>
                今日熱門卡片
              </h2>
            </div>
            <div className="text-sm text-[#00d4ff] flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              活躍度 +18.4%
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {trendingCards.map((card, index) => {
              const color = rarityColor(card.rarity);
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <TiltCard glowColor={color} className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
                    <Link href={`/marketplace/${card.id}`} className="flex gap-4 p-4">
                      <img
                        src={card.imageUrl}
                        alt={card.playerName}
                        className="w-20 h-24 rounded-xl object-cover border border-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div
                            className="inline-flex text-[9px] font-black tracking-[0.16em] px-2 py-0.5 rounded-full border"
                            style={{ color, borderColor: `${color}55`, backgroundColor: `${color}12` }}
                          >
                            {rarityLabel(card.rarity)}
                          </div>
                          <div className={HEAT_META[card.heat].className}>
                            <span>{HEAT_META[card.heat].icon}</span>
                            <span>{HEAT_META[card.heat].label}</span>
                          </div>
                        </div>
                        <div className="text-lg font-black text-white" style={{ fontFamily: "var(--font-barlow)" }}>
                          {card.playerName}
                        </div>
                        <div className="text-xs text-[#8b95a9] mt-1 line-clamp-1">{card.title}</div>
                        <div className="text-xs text-[#647086] mt-1">
                          {card.team} · {card.year} · 今日成交 {card.tradesToday}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <div className="text-xl font-black" style={{ color, fontFamily: "var(--font-barlow)" }}>
                              {formatPrice(card.price)}
                            </div>
                            <div className={`text-xs font-semibold ${card.priceChangePct >= 0 ? "text-[#22c55e]" : "text-red-400"}`}>
                              {card.priceChangePct >= 0 ? "+" : ""}
                              {card.priceChangePct}%
                            </div>
                          </div>
                          <div className="text-[#c9a84c]">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.68fr_0.32fr] gap-6 items-start">
          <div className="grid md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {sortedListings.map((listing, index) => {
                const color = rarityColor(listing.rarity);
                return (
                  <motion.div
                    key={`${sortBy}-${listing.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.24, delay: index * 0.03 }}
                    onMouseEnter={() => setHoveredId(listing.id)}
                  >
                    <TiltCard
                      glowColor={color}
                      className="group rounded-[26px] glass-panel metal-frame overflow-hidden border border-white/10 hover:border-white/20"
                    >
                      <Link href={`/marketplace/${listing.id}`}>
                        <div className="relative h-60">
                          <img
                            src={listing.imageUrl}
                            alt={`${listing.playerName} 二手卡片`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f]/92 via-[#090a0f]/20 to-transparent" />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            <div
                              className="text-[9px] font-black tracking-wider px-2 py-1 rounded-full border"
                              style={{ color, borderColor: `${color}55`, backgroundColor: `${color}18` }}
                            >
                              {rarityLabel(listing.rarity)}
                            </div>
                            <div className={HEAT_META[listing.heat].className}>
                              <span>{HEAT_META[listing.heat].icon}</span>
                              <span>{HEAT_META[listing.heat].label}</span>
                            </div>
                          </div>
                          <div
                            className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                              listing.priceChangePct >= 0
                                ? "bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/25"
                                : "bg-red-500/15 text-red-400 border border-red-500/25"
                            }`}
                          >
                            {listing.priceChangePct >= 0 ? "+" : ""}
                            {listing.priceChangePct}%
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6d7688]">
                                {listing.title}
                              </p>
                              <h2 className="text-xl font-black text-white mt-1" style={{ fontFamily: "var(--font-barlow)" }}>
                                {listing.playerName}
                              </h2>
                              <p className="text-xs text-[#8d95a9] mt-1">
                                {listing.team} · {listing.year} · 卡況 {conditionLabel[listing.condition]}
                              </p>
                            </div>
                            <div className="text-xs text-[#a0a0b8] whitespace-nowrap">賣家 {listing.seller}</div>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div>
                              <div className="text-2xl font-black" style={{ color, fontFamily: "var(--font-barlow)" }}>
                                {formatPrice(listing.price)}
                              </div>
                              <div className="text-xs text-[#708097] mt-1">今日成交 {listing.tradesToday} 次</div>
                            </div>
                            <div className="text-xs font-semibold text-[#00d4ff] border border-[#00d4ff]/20 bg-[#00d4ff]/10 rounded-full px-3 py-1.5 shadow-[0_0_18px_rgba(0,212,255,0.12)]">
                              Hover Preview
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="hidden lg:block sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredCard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="glass-panel metal-frame rounded-[28px] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(201,168,76,0.08)]"
              >
                <div className="relative h-[360px]">
                  <img src={hoveredCard.imageUrl} alt={hoveredCard.playerName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f]/95 via-[#090a0f]/28 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <div
                      className="text-[10px] font-black tracking-[0.18em] px-2.5 py-1 rounded-full border"
                      style={{ color: hoveredColor, borderColor: `${hoveredColor}55`, backgroundColor: `${hoveredColor}16` }}
                    >
                      {rarityLabel(hoveredCard.rarity)}
                    </div>
                    <div className={HEAT_META[hoveredCard.heat].className}>
                      <span>{HEAT_META[hoveredCard.heat].icon}</span>
                      <span>{HEAT_META[hoveredCard.heat].label}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#6f7789]">Hover Preview</div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#778297] mt-3">
                    {hoveredCard.title}
                  </p>
                  <h3 className="text-3xl font-black text-white mt-2" style={{ fontFamily: "var(--font-barlow)" }}>
                    {hoveredCard.playerName}
                  </h3>
                  <p className="text-sm text-[#a0a9ba] mt-2">
                    {hoveredCard.team} · {hoveredCard.year} · 賣家 {hoveredCard.seller}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">Condition</div>
                      <div className="text-white font-semibold mt-1">{conditionLabel[hoveredCard.condition]}</div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">Trades Today</div>
                      <div className="text-white font-semibold mt-1">{hoveredCard.tradesToday}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">Price Change</div>
                      <div
                        className={`font-semibold mt-1 ${
                          hoveredCard.priceChangePct >= 0 ? "text-[#22c55e]" : "text-red-400"
                        }`}
                      >
                        {hoveredCard.priceChangePct >= 0 ? "+" : ""}
                        {hoveredCard.priceChangePct}%
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">Listing</div>
                      <div className="text-white font-semibold mt-1">Live</div>
                    </div>
                  </div>

                  <div className="mt-5 text-4xl font-black" style={{ color: hoveredColor, fontFamily: "var(--font-barlow)" }}>
                    {formatPrice(hoveredCard.price)}
                  </div>

                  <Link
                    href={`/marketplace/${hoveredCard.id}`}
                    className="mt-5 h-11 rounded-xl btn-primary text-sm font-bold flex items-center justify-center"
                  >
                    查看完整卡片
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
