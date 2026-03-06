"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, Sparkles } from "lucide-react";
import { HERO_FLOATING_CARDS } from "@/lib/mock-data";
import ParticlesBackdrop from "@/components/ui/ParticlesBackdrop";

const HeroCardScene = dynamic(
  () => import("@/components/three/HeroCardScene"),
  { ssr: false }
);

const enterUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[94vh] overflow-hidden">
      <ParticlesBackdrop className="opacity-70" count={72} />
      <HeroCardScene />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[10%] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,233,183,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute left-[10%] top-[22%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute right-[8%] bottom-[12%] h-[260px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.12),transparent_64%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[94vh] flex items-center">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#c9a84c]/20 mb-8"
            >
              <Sparkles className="w-3 h-3 text-[#c9a84c]" />
              <span className="text-xs font-medium text-[#c9a84c] tracking-[0.25em] uppercase">
                Premium Collectible Marketplace
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.06 }}
              className="text-6xl sm:text-7xl md:text-[7.3rem] font-black leading-[0.92] tracking-[-0.04em] mb-6"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              <span className="block text-white">COLLECT</span>
              <span className="block text-gradient-gold">LIKE A VAULT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.14 }}
              className="text-lg text-[#b7bfd0] max-w-xl leading-relaxed mb-10"
            >
              ArenaClub 風格的暗黑收藏品市場。把頂級球員卡、神秘盲盒與二手交易，
              包裝成更接近精品展示櫃的收藏體驗。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/gacha"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl btn-primary text-base font-bold tracking-wide"
                >
                  <Package className="w-5 h-5" />
                  開啟神秘盲盒
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl btn-secondary text-base"
                >
                  瀏覽卡牌市場
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
              className="grid grid-cols-3 gap-4 mt-14 max-w-xl"
            >
              {[
                { value: "10,000+", label: "Curated Cards" },
                { value: "5,000+", label: "Active Collectors" },
                { value: "NT$ 1M+", label: "Trading Volume" },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel metal-frame rounded-2xl px-4 py-5">
                  <div
                    className="text-2xl font-black text-gradient-gold"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#7f8797] uppercase tracking-[0.18em] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative lg:hidden min-h-[320px]">
            {HERO_FLOATING_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                {...enterUp}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="absolute"
                style={{
                  left: index === 0 ? "4%" : index === 1 ? "36%" : "62%",
                  top: index === 0 ? "18%" : index === 1 ? "2%" : "26%",
                  transform: `rotate(${card.rotate}) scale(${card.scale})`,
                }}
              >
                <div className="w-28 h-40 rounded-2xl overflow-hidden border border-white/10 shadow-[0_28px_60px_rgba(0,0,0,0.48)]">
                  <img src={card.imageUrl} alt={card.playerName} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
