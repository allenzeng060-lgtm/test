"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Archive, Filter, ShieldCheck, Sparkles } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import { formatPrice, rarityColor, rarityLabel } from "@/lib/utils";

const rarityOptions = ["ALL", ...new Set(DEMO_PRODUCTS.map((item) => item.rarity))];
const teamOptions = ["全部", ...new Set(DEMO_PRODUCTS.map((item) => item.team))];
const yearOptions = ["全部", ...new Set(DEMO_PRODUCTS.map((item) => String(item.year)))];

export default function CollectionPage() {
  const [selectedRarity, setSelectedRarity] = useState("ALL");
  const [selectedTeam, setSelectedTeam] = useState("全部");
  const [selectedYear, setSelectedYear] = useState("全部");

  const filteredCards = useMemo(() => {
    return DEMO_PRODUCTS.filter((item) => {
      if (selectedRarity !== "ALL" && item.rarity !== selectedRarity) return false;
      if (selectedTeam !== "全部" && item.team !== selectedTeam) return false;
      if (selectedYear !== "全部" && String(item.year) !== selectedYear) return false;
      return true;
    });
  }, [selectedRarity, selectedTeam, selectedYear]);

  const collectionValue = filteredCards.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen">
      <div className="bg-[#12121a] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-[#c9a84c] tracking-[0.3em] uppercase mb-3">
                My Collection
              </div>
              <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                收藏櫃
              </h1>
              <p className="text-[#a0a0b8] max-w-2xl">
                這一頁改成 display shelf 的呈現方式，讓卡片更像藏品而不是普通商品卡片。
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Archive, label: "持有卡片", value: `${filteredCards.length}` },
                { icon: Sparkles, label: "稀有收藏", value: `${filteredCards.filter((item) => item.rarity !== "COMMON").length}` },
                { icon: ShieldCheck, label: "認證卡片", value: "12" },
                { icon: Filter, label: "總估值", value: formatPrice(collectionValue) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-panel metal-frame rounded-2xl px-4 py-4 min-w-[120px]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10 mb-3">
                    <Icon className="w-4 h-4 text-[#c9a84c]" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">{label}</div>
                  <div className="text-lg font-black text-white mt-1" style={{ fontFamily: "var(--font-barlow)" }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-panel metal-frame rounded-[28px] p-5 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#6f7789]">Vault Filters</div>
              <h2 className="text-2xl font-black text-white mt-1" style={{ fontFamily: "var(--font-barlow)" }}>
                依稀有度、隊伍、年份整理收藏
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedRarity}
                onChange={(event) => setSelectedRarity(event.target.value)}
                className="h-11 px-4 rounded-xl input-dark text-sm min-w-[150px]"
              >
                {rarityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "ALL" ? "全部稀有度" : rarityLabel(option)}
                  </option>
                ))}
              </select>
              <select
                value={selectedTeam}
                onChange={(event) => setSelectedTeam(event.target.value)}
                className="h-11 px-4 rounded-xl input-dark text-sm min-w-[140px]"
              >
                {teamOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
                className="h-11 px-4 rounded-xl input-dark text-sm min-w-[140px]"
              >
                {yearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "全部" ? "全部年份" : option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="relative rounded-[32px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-5 py-8 sm:px-8">
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-28 bg-[radial-gradient(circle_at_50%_100%,rgba(201,168,76,0.14),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-x-8 bottom-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredCards.map((card, index) => {
              const color = rarityColor(card.rarity);

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="relative"
                >
                  <div className="absolute inset-x-6 -bottom-4 h-8 rounded-full bg-black/50 blur-xl" />
                  <TiltCard
                    glowColor={color}
                    className="group relative overflow-hidden rounded-[26px] glass-panel metal-frame border border-white/10 hover:border-white/20"
                  >
                    <div className="relative aspect-[0.74] overflow-hidden">
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f]/95 via-transparent to-transparent" />
                      <div
                        className="absolute top-4 left-4 text-[10px] font-black tracking-[0.18em] px-2.5 py-1 rounded-full border"
                        style={{ color, borderColor: `${color}55`, backgroundColor: `${color}16` }}
                      >
                        {rarityLabel(card.rarity)}
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#6d7688]">
                        {card.year} · {card.team}
                      </p>
                      <h3 className="text-xl font-black text-white mt-2 line-clamp-2" style={{ fontFamily: "var(--font-barlow)" }}>
                        {card.playerName}
                      </h3>
                      <p className="text-sm text-[#a0a9ba] mt-2 line-clamp-2">{card.name}</p>

                      <div className="mt-5 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">Estimated Value</div>
                          <div className="text-2xl font-black mt-1" style={{ color, fontFamily: "var(--font-barlow)" }}>
                            {formatPrice(card.price)}
                          </div>
                        </div>
                        <div className="collector-badge collector-badge-rising">
                          <span>Vaulted</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
