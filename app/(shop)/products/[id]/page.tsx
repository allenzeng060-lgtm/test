import Link from "next/link";
import { ArrowLeft, Flame, ShieldCheck, TrendingUp } from "lucide-react";
import CardViewer3D from "@/components/three/CardViewer3D";
import LineChart from "@/components/charts/LineChart";
import TiltCard from "@/components/ui/TiltCard";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import { formatPrice, rarityColor, rarityLabel } from "@/lib/utils";

const PRICE_HISTORY = [
  { label: "1W", value: 18200 },
  { label: "2W", value: 19600 },
  { label: "3W", value: 18800 },
  { label: "1M", value: 21400 },
  { label: "2M", value: 23800 },
  { label: "Now", value: 28000 },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = DEMO_PRODUCTS.find((item) => item.id === id) ?? DEMO_PRODUCTS[0];
  const color = rarityColor(product.rarity);
  const related = DEMO_PRODUCTS.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-[#9aa3b5] hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回卡牌市場
      </Link>

      <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-8 items-start">
        <div className="glass-panel metal-frame rounded-[28px] p-4 sm:p-5">
          <CardViewer3D imageUrl={product.imageUrl} accentColor={color} />
        </div>

        <div className="glass-panel metal-frame rounded-[28px] p-6 sm:p-7">
          <div
            className="inline-flex items-center text-[10px] font-black tracking-[0.2em] px-2.5 py-1 rounded-full border"
            style={{ color, borderColor: `${color}55`, backgroundColor: `${color}14` }}
          >
            {rarityLabel(product.rarity)}
          </div>

          <h1
            className="mt-4 text-4xl sm:text-5xl font-black text-white leading-none"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            {product.playerName}
          </h1>
          <p className="mt-3 text-sm text-[#aab3c5] leading-relaxed">
            {product.name} · {product.team} · {product.year}
          </p>

          <div className="mt-8 flex flex-wrap items-end gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-[#6d7385] mb-1">
                Listing Price
              </div>
              <div
                className="text-5xl font-black"
                style={{ color, fontFamily: "var(--font-barlow)" }}
              >
                {formatPrice(product.price)}
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/10 text-[#7cf2a0] text-sm font-semibold">
              +14.8% over 60 days
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-8">
            {[
              { icon: Flame, label: "熱度", value: "Top 7%" },
              { icon: TrendingUp, label: "成交", value: "32 sales" },
              { icon: ShieldCheck, label: "驗證", value: "Vault Verified" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-4">
                <item.icon className="w-4 h-4 text-[#c9a84c] mb-2" />
                <div className="text-xs text-[#7a8294] uppercase tracking-[0.18em]">{item.label}</div>
                <div className="text-lg text-white font-semibold mt-1">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 h-12 rounded-xl btn-primary text-sm font-bold">
              立即購買
            </button>
            <button className="flex-1 h-12 rounded-xl btn-secondary text-sm font-bold">
              加入觀察清單
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-8">
        <div className="glass-panel metal-frame rounded-[28px] p-6 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-[#6d7385]">
                Market Trace
              </div>
              <h2
                className="text-2xl font-black text-white mt-1"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Price History
              </h2>
            </div>
            <div className="text-sm text-[#8f98ab]">最近 60 天</div>
          </div>
          <LineChart
            data={PRICE_HISTORY.map((point, index) => ({
              ...point,
              value:
                index === PRICE_HISTORY.length - 1 ? product.price : point.value,
            }))}
            accentColor={color}
            className="mt-6"
          />
        </div>

        <div className="glass-panel metal-frame rounded-[28px] p-6 sm:p-7">
          <div className="text-xs uppercase tracking-[0.24em] text-[#6d7385]">
            Related Cards
          </div>
          <h2
            className="text-2xl font-black text-white mt-1 mb-5"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Similar Drops
          </h2>

          <div className="space-y-4">
            {related.map((item) => {
              const relatedColor = rarityColor(item.rarity);
              return (
                <TiltCard
                  key={item.id}
                  glowColor={relatedColor}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-3"
                >
                  <Link href={`/products/${item.id}`} className="flex gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-20 rounded-xl object-cover border border-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className="inline-flex text-[9px] font-black tracking-[0.16em] px-2 py-0.5 rounded-full border mb-2"
                        style={{
                          color: relatedColor,
                          borderColor: `${relatedColor}55`,
                          backgroundColor: `${relatedColor}12`,
                        }}
                      >
                        {rarityLabel(item.rarity)}
                      </div>
                      <div className="text-sm font-semibold text-white line-clamp-2">
                        {item.name}
                      </div>
                      <div className="text-xs text-[#80899b] mt-1">
                        {item.team} · {item.year}
                      </div>
                      <div
                        className="text-lg font-black mt-2"
                        style={{ color: relatedColor, fontFamily: "var(--font-barlow)" }}
                      >
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
