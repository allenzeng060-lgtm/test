import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { rarityLabel, rarityColor, formatPrice } from "@/lib/utils";

const DEMO_PRODUCTS = [
  {
    id: "1",
    playerName: "陳偉殷",
    team: "洋基隊",
    year: 2023,
    name: "2023 Topps 陳偉殷 金色簽名卡",
    rarity: "ULTRA_RARE",
    price: 28000,
  },
  {
    id: "2",
    playerName: "王建民",
    team: "洋基隊",
    year: 2006,
    name: "2006 Topps Chrome 王建民 新秀卡",
    rarity: "SUPER_RARE",
    price: 15800,
  },
  {
    id: "3",
    playerName: "林子偉",
    team: "紅襪隊",
    year: 2022,
    name: "2022 Bowman 林子偉 前景卡",
    rarity: "RARE",
    price: 3200,
  },
  {
    id: "4",
    playerName: "郭泓志",
    team: "道奇隊",
    year: 2010,
    name: "2010 Upper Deck 郭泓志 特別版",
    rarity: "RARE",
    price: 4500,
  },
];

function ProductCard({ product }: { product: (typeof DEMO_PRODUCTS)[0] }) {
  const color = rarityColor(product.rarity);

  return (
    <div className="group relative rounded-2xl glass-panel border border-white/[0.06] overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      style={{ boxShadow: `0 0 0 rgba(0,0,0,0)`, transition: "all 0.3s ease" }}
    >
      {/* 卡片圖片區（佔位符） */}
      <div
        className="relative h-48 overflow-hidden"
        style={{ background: `linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 60%, #1e1e2e 100%)` }}
      >
        {/* 全息效果 */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${color}10, transparent 40%, ${color}08, transparent 70%)`,
          }}
        />

        {/* 球員首字 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-black"
            style={{
              background: `radial-gradient(circle, ${color}20, transparent)`,
              border: `2px solid ${color}30`,
              color: color,
              fontFamily: "var(--font-barlow)",
            }}
          >
            {product.playerName[0]}
          </div>
        </div>

        {/* 稀有度徽章 */}
        <div
          className="absolute top-3 left-3 text-[9px] font-black tracking-[0.15em] px-2 py-1 rounded-full border"
          style={{
            color,
            borderColor: `${color}50`,
            backgroundColor: `${color}15`,
          }}
        >
          {rarityLabel(product.rarity)}
        </div>

        {/* 快速加入購物車 */}
        <button
          className="absolute bottom-3 right-3 p-2 rounded-xl glass-panel border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/10"
        >
          <ShoppingCart className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* 卡片資訊 */}
      <div className="p-4">
        <div className="text-xs text-[#5a5a7a] mb-1">
          {product.team} · {product.year}
        </div>
        <h3 className="text-sm font-semibold text-white mb-3 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span
            className="text-lg font-black"
            style={{ fontFamily: "var(--font-barlow)", color }}
          >
            {formatPrice(product.price)}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="text-xs px-3 py-1.5 rounded-lg btn-primary font-bold"
          >
            購買
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-[#12121a]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold text-[#c9a84c] tracking-[0.3em] uppercase mb-2">
              Featured Cards
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              精選卡牌
            </h2>
            <p className="text-[#a0a0b8] mt-2">頂級球員卡，品質保證</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-[#c9a84c] hover:text-[#e8c96b] transition-colors text-sm font-medium"
          >
            查看全部 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
