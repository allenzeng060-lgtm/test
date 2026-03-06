"use client";

import { useState } from "react";
import { Search, Filter, ShoppingCart, X } from "lucide-react";
import { cn, rarityColor, rarityLabel, formatPrice } from "@/lib/utils";
import Link from "next/link";

const TEAMS = ["全部", "洋基", "道奇", "紅襪", "巨人", "勇士", "太空人"];
const RARITIES = [
  { value: "ALL", label: "全部稀有度" },
  { value: "ULTRA_RARE", label: "極稀有" },
  { value: "SUPER_RARE", label: "超稀有" },
  { value: "RARE", label: "稀有" },
  { value: "UNCOMMON", label: "非普通" },
  { value: "COMMON", label: "普卡" },
];
const SORTS = [
  { value: "newest", label: "最新上架" },
  { value: "price_asc", label: "價格低到高" },
  { value: "price_desc", label: "價格高到低" },
  { value: "popular", label: "最多人購買" },
];

const DEMO_PRODUCTS = [
  { id: "1", playerName: "陳偉殷", team: "洋基", year: 2023, name: "2023 Topps 金色簽名卡", rarity: "ULTRA_RARE", price: 28000, stock: 1 },
  { id: "2", playerName: "王建民", team: "洋基", year: 2006, name: "2006 Topps Chrome 新秀卡", rarity: "SUPER_RARE", price: 15800, stock: 2 },
  { id: "3", playerName: "林子偉", team: "紅襪", year: 2022, name: "2022 Bowman 前景卡", rarity: "RARE", price: 3200, stock: 5 },
  { id: "4", playerName: "郭泓志", team: "道奇", year: 2010, name: "2010 Upper Deck 特別版", rarity: "RARE", price: 4500, stock: 3 },
  { id: "5", playerName: "胡金龍", team: "道奇", year: 2009, name: "2009 Bowman 胡金龍 新秀卡", rarity: "UNCOMMON", price: 1200, stock: 8 },
  { id: "6", playerName: "陳冠宇", team: "洋基", year: 2020, name: "2020 Topps 陳冠宇 基礎卡", rarity: "COMMON", price: 350, stock: 20 },
  { id: "7", playerName: "宋文華", team: "紅人", year: 2018, name: "2018 Topps Heritage", rarity: "UNCOMMON", price: 980, stock: 6 },
  { id: "8", playerName: "陳偉殷", team: "馬林魚", year: 2015, name: "2015 Stadium Club 珍藏版", rarity: "SUPER_RARE", price: 8800, stock: 1 },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("全部");
  const [selectedRarity, setSelectedRarity] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = DEMO_PRODUCTS.filter((p) => {
    if (search && !p.playerName.includes(search) && !p.name.includes(search)) return false;
    if (selectedTeam !== "全部" && p.team !== selectedTeam) return false;
    if (selectedRarity !== "ALL" && p.rarity !== selectedRarity) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* 頁首 */}
      <div className="bg-[#12121a] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1
            className="text-4xl font-black text-white mb-2"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            卡牌市場
          </h1>
          <p className="text-[#a0a0b8]">
            找到 {filtered.length} 張卡牌
          </p>

          {/* 搜尋列 */}
          <div className="flex gap-3 mt-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
              <input
                type="text"
                placeholder="搜尋球員名稱、系列..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl input-dark text-sm"
              />
              {search && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearch("")}>
                  <X className="w-4 h-4 text-[#5a5a7a]" />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 rounded-xl input-dark text-sm cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <button
              className="h-11 px-4 rounded-xl glass-panel border border-white/10 flex items-center gap-2 text-sm text-[#a0a0b8] hover:text-white hover:border-white/20 transition-all"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-4 h-4" />
              篩選
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 側邊篩選（桌面） */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="glass-panel rounded-2xl p-5 sticky top-24">
              <h3 className="text-sm font-semibold text-white mb-4">隊伍</h3>
              <div className="space-y-1 mb-6">
                {TEAMS.map((team) => (
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

          {/* 商品網格 */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-[#5a5a7a] text-lg mb-2">找不到符合條件的卡牌</div>
                <button
                  className="text-[#c9a84c] text-sm hover:underline"
                  onClick={() => { setSearch(""); setSelectedTeam("全部"); setSelectedRarity("ALL"); }}
                >
                  清除所有篩選
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) => {
                  const color = rarityColor(product.rarity);
                  return (
                    <div
                      key={product.id}
                      className="group relative rounded-2xl glass-panel border border-white/[0.06] overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    >
                      {/* 圖片區 */}
                      <div
                        className="relative h-44 overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 60%, #1e1e2e 100%)" }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `linear-gradient(135deg, ${color}10, transparent 40%, ${color}08)` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black"
                            style={{
                              background: `radial-gradient(circle, ${color}20, transparent)`,
                              border: `2px solid ${color}30`,
                              color,
                              fontFamily: "var(--font-barlow)",
                            }}
                          >
                            {product.playerName[0]}
                          </div>
                        </div>
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

                      {/* 資訊區 */}
                      <div className="p-3">
                        <div className="text-[10px] text-[#5a5a7a] mb-1">{product.team} · {product.year}</div>
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
                    </div>
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
