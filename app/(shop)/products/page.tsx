"use client";

import { useMemo, useState } from "react";
import { Search, Filter, ShoppingCart, X } from "lucide-react";
import { cn, rarityColor, rarityLabel, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import TiltCard from "@/components/ui/TiltCard";

const RARITIES = [
  { value: "ALL", label: "全部稀有度" },
  { value: "ULTRA_RARE", label: "極稀有" },
  { value: "SUPER_RARE", label: "超稀有" },
  { value: "RARE", label: "稀有" },
  { value: "UNCOMMON", label: "非普通" },
  { value: "COMMON", label: "普卡" },
] as const;

const SORTS = [
  { value: "newest", label: "最新上架" },
  { value: "price_asc", label: "價格低到高" },
  { value: "price_desc", label: "價格高到低" },
  { value: "popular", label: "熱門推薦" },
] as const;

const TEAM_OPTIONS = [
  "全部",
  ...Array.from(new Set(DEMO_PRODUCTS.map((product) => product.team))),
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("全部");
  const [selectedRarity, setSelectedRarity] = useState<(typeof RARITIES)[number]["value"]>("ALL");
  const [sortBy, setSortBy] = useState<(typeof SORTS)[number]["value"]>("newest");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    const base = DEMO_PRODUCTS.filter((product) => {
      if (search && !product.playerName.includes(search) && !product.name.includes(search)) {
        return false;
      }
      if (selectedTeam !== "全部" && product.team !== selectedTeam) {
        return false;
      }
      if (selectedRarity !== "ALL" && product.rarity !== selectedRarity) {
        return false;
      }
      return true;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "popular") return a.stock - b.stock;
      return Number(b.id) - Number(a.id);
    });
  }, [search, selectedTeam, selectedRarity, sortBy]);

  return (
    <div className="min-h-screen">
      <div className="bg-[#12121a] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
            卡牌市場
          </h1>
          <p className="text-[#a0a0b8]">找到 {filtered.length} 張卡牌</p>

          <div className="flex flex-wrap gap-3 mt-5">
            <div className="flex-1 min-w-[220px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
              <input
                type="text"
                placeholder="搜尋球員名稱、系列..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full h-11 pl-11 pr-10 rounded-xl input-dark text-sm"
              />
              {search && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setSearch("")}
                  aria-label="清除搜尋"
                >
                  <X className="w-4 h-4 text-[#5a5a7a]" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as (typeof SORTS)[number]["value"])}
              className="h-11 px-4 rounded-xl input-dark text-sm cursor-pointer min-w-[160px]"
            >
              {SORTS.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </select>

            <button
              className="lg:hidden h-11 px-4 rounded-xl glass-panel border border-white/10 flex items-center gap-2 text-sm text-[#a0a0b8] hover:text-white hover:border-white/20 transition-all"
              onClick={() => setFilterOpen((prev) => !prev)}
            >
              <Filter className="w-4 h-4" />
              篩選
            </button>
          </div>

          {filterOpen && (
            <div className="lg:hidden mt-4 glass-panel rounded-2xl p-4 grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">隊伍</h3>
                <div className="flex flex-wrap gap-2">
                  {TEAM_OPTIONS.map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs transition-all",
                        selectedTeam === team
                          ? "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30"
                          : "text-[#a0a0b8] border border-white/10 hover:text-white"
                      )}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">稀有度</h3>
                <div className="flex flex-wrap gap-2">
                  {RARITIES.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setSelectedRarity(value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs transition-all",
                        selectedRarity === value
                          ? "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30"
                          : "text-[#a0a0b8] border border-white/10 hover:text-white"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="glass-panel rounded-2xl p-5 sticky top-24">
              <h3 className="text-sm font-semibold text-white mb-4">隊伍</h3>
              <div className="space-y-1 mb-6">
                {TEAM_OPTIONS.map((team) => (
                  <button
                    key={team}
                    onClick={() => setSelectedTeam(team)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                      selectedTeam === team
                        ? "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30"
                        : "text-[#a0a0b8] hover:text-white hover:bg-white/5"
                    )}
                  >
                    {team}
                  </button>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-white mb-4">稀有度</h3>
              <div className="space-y-1">
                {RARITIES.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedRarity(value)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2",
                      selectedRarity === value
                        ? "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30"
                        : "text-[#a0a0b8] hover:text-white hover:bg-white/5"
                    )}
                  >
                    {value !== "ALL" && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: rarityColor(value) }}
                      />
                    )}
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-[#5a5a7a] text-lg mb-2">找不到符合條件的卡牌</div>
                <button
                  className="text-[#c9a84c] text-sm hover:underline"
                  onClick={() => {
                    setSearch("");
                    setSelectedTeam("全部");
                    setSelectedRarity("ALL");
                  }}
                >
                  清除所有篩選
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) => {
                  const color = rarityColor(product.rarity);
                  return (
                    <TiltCard
                      key={product.id}
                      glowColor={color}
                      className="group relative rounded-2xl glass-panel metal-frame border border-white/[0.06] overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={`${product.playerName} ${product.name}`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/35 to-transparent" />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${color}18, transparent 40%, ${color}10)`,
                          }}
                        />

                        <div
                          className="absolute top-2 left-2 text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full border"
                          style={{ color, borderColor: `${color}50`, backgroundColor: `${color}15` }}
                        >
                          {rarityLabel(product.rarity)}
                        </div>

                        {product.stock <= 2 && (
                          <div className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                            剩 {product.stock} 張
                          </div>
                        )}

                        <button className="absolute bottom-2 right-2 p-1.5 rounded-lg glass-panel border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <ShoppingCart className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>

                      <div className="p-3">
                        <div className="text-[10px] text-[#8d95a9] mb-1">
                          {product.team} · {product.year}
                        </div>
                        <h3 className="text-xs font-semibold text-white mb-2 line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-black" style={{ fontFamily: "var(--font-barlow)", color }}>
                            {formatPrice(product.price)}
                          </span>
                          <Link href={`/products/${product.id}`} className="text-[10px] px-2.5 py-1 rounded-lg btn-primary font-bold">
                            購買
                          </Link>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
