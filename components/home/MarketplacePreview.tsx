"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Store, TrendingUp } from "lucide-react";
import { rarityColor, rarityLabel, formatPrice } from "@/lib/utils";
import {
  DEMO_MARKETPLACE_LISTINGS,
  type DemoMarketplaceListing,
} from "@/lib/mock-data";
import TiltCard from "@/components/ui/TiltCard";

const conditionLabel: Record<DemoMarketplaceListing["condition"], string> = {
  MINT: "全新",
  NEAR_MINT: "近全新",
  EXCELLENT: "極佳",
  GOOD: "良好",
  FAIR: "普通",
};

export default function MarketplacePreview() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold text-[#00d4ff] tracking-[0.3em] uppercase mb-2">
              P2P Trading
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              二手交易市場
            </h2>
            <p className="text-[#a0a0b8] mt-2">直接向其他收藏家購買、出售你的卡牌</p>
          </div>
          <Link
            href="/marketplace"
            className="hidden sm:flex items-center gap-2 text-[#00d4ff] hover:text-white transition-colors text-sm font-medium"
          >
            進入市場 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {DEMO_MARKETPLACE_LISTINGS.map((item, index) => {
            const color = rarityColor(item.rarity);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Link href={`/marketplace/${item.id}`}>
                  <TiltCard
                    glowColor={color}
                    className="glass-panel metal-frame rounded-2xl p-5 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                        <img
                          src={item.imageUrl}
                          alt={`${item.playerName} 卡片`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full border mb-1 w-fit"
                          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
                        >
                          {rarityLabel(item.rarity)}
                        </div>
                        <div className="font-semibold text-white text-sm truncate">{item.playerName}</div>
                        <div className="text-xs text-[#5a5a7a]">
                          {item.team} · {item.year}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className="text-xl font-black"
                          style={{ fontFamily: "var(--font-barlow)", color }}
                        >
                          {formatPrice(item.price)}
                        </div>
                        <div className="text-xs text-[#5a5a7a]">
                          卡況：{conditionLabel[item.condition]} · 賣家：{item.seller}
                        </div>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 group-hover:bg-[#00d4ff]/20 transition-colors">
                        購買
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
              <Store className="w-6 h-6 text-[#00d4ff]" />
            </div>
            <div>
              <h3 className="font-bold text-white">想出售你的卡牌？</h3>
              <p className="text-sm text-[#5a5a7a]">免費上架，成交後只收 5% 手續費</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/profile/listings" className="px-5 py-2.5 rounded-xl btn-secondary text-sm">
              立即上架
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 hover:bg-[#00d4ff]/20 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              查看行情
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
