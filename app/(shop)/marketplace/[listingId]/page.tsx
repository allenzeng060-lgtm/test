import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DEMO_MARKETPLACE_LISTINGS } from "@/lib/mock-data";
import { formatPrice, rarityColor, rarityLabel } from "@/lib/utils";

const conditionLabel: Record<string, string> = {
  MINT: "全新",
  NEAR_MINT: "近全新",
  EXCELLENT: "極佳",
  GOOD: "良好",
  FAIR: "普通",
};

export default async function MarketplaceListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;
  const listing = DEMO_MARKETPLACE_LISTINGS.find((item) => item.id === listingId) ?? DEMO_MARKETPLACE_LISTINGS[0];
  const color = rarityColor(listing.rarity);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm text-[#a0a0b8] hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        返回二手市場
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl overflow-hidden">
          <img src={listing.imageUrl} alt={`${listing.playerName} 卡片`} className="w-full h-full object-cover min-h-[420px]" />
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <div
            className="inline-flex text-[10px] font-black tracking-[0.15em] px-2 py-1 rounded-full border mb-3"
            style={{ color, borderColor: `${color}50`, backgroundColor: `${color}15` }}
          >
            {rarityLabel(listing.rarity)}
          </div>

          <h1 className="text-3xl text-white font-black" style={{ fontFamily: "var(--font-barlow)" }}>
            {listing.playerName}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#6f7789] mt-3">
            {listing.title}
          </p>
          <p className="text-sm text-[#8d95a9] mt-2">
            {listing.team} · {listing.year} · 卡況 {conditionLabel[listing.condition]}
          </p>

          <p className="mt-6 text-4xl font-black" style={{ color, fontFamily: "var(--font-barlow)" }}>
            {formatPrice(listing.price)}
          </p>

          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">賣家</div>
              <div className="text-sm text-white mt-1">{listing.seller}</div>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">Price Change</div>
              <div className={`text-sm mt-1 ${listing.priceChangePct >= 0 ? "text-[#22c55e]" : "text-red-400"}`}>
                {listing.priceChangePct >= 0 ? "+" : ""}
                {listing.priceChangePct}%
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#6f7789]">Trades Today</div>
              <div className="text-sm text-white mt-1">{listing.tradesToday}</div>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <button className="py-3 rounded-xl btn-primary text-sm font-bold">立即購買</button>
            <button className="py-3 rounded-xl btn-secondary text-sm font-bold">加入追蹤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
