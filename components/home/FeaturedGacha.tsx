"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import TiltCard from "@/components/ui/TiltCard";

const GACHA_BOXES = [
  {
    id: 1,
    name: "黃金傳奇箱",
    description: "含 ULTRA RARE 保底，極品卡牌只在此",
    price: 500,
    color: "#c9a84c",
    glowClass: "box-glow-gold",
    rarity: "ULTRA RARE",
    guarantee: "每 10 抽保底",
    emoji: "✦",
    imageUrl: DEMO_PRODUCTS[0].imageUrl,
  },
  {
    id: 2,
    name: "紫晶神秘箱",
    description: "SUPER RARE 稀有卡牌，超高爆率",
    price: 200,
    color: "#a855f7",
    glowClass: "box-glow-purple",
    rarity: "SUPER RARE",
    guarantee: "每 20 抽保底",
    emoji: "◈",
    imageUrl: DEMO_PRODUCTS[1].imageUrl,
  },
  {
    id: 3,
    name: "藍色精英箱",
    description: "RARE 等級以上，性價比首選",
    price: 80,
    color: "#3b82f6",
    glowClass: "box-glow-blue",
    rarity: "RARE",
    guarantee: "每 30 抽保底",
    emoji: "◆",
    imageUrl: DEMO_PRODUCTS[2].imageUrl,
  },
  {
    id: 4,
    name: "入門探索箱",
    description: "適合新手，普通到稀有隨機",
    price: 30,
    color: "#6b7280",
    glowClass: "box-glow-gray",
    rarity: "COMMON+",
    guarantee: "無保底",
    emoji: "◇",
    imageUrl: DEMO_PRODUCTS[5].imageUrl,
  },
] as const;

export default function FeaturedGacha() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold text-[#c9a84c] tracking-[0.3em] uppercase mb-2">Mystery Box</div>
            <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-barlow)" }}>
              神秘盲盒
            </h2>
            <p className="text-[#a0a0b8] mt-2">每次開箱都是驚喜，稀有卡牌等你發現</p>
          </div>
          <Link href="/gacha" className="hidden sm:flex items-center gap-2 text-[#c9a84c] hover:text-[#e8c96b] transition-colors text-sm font-medium">
            查看全部 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GACHA_BOXES.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <Link href={`/gacha/${box.id}`}>
                <TiltCard
                  glowColor={box.color}
                  className={`relative rounded-2xl overflow-hidden glass-panel cursor-pointer group transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${box.glowClass} hover:border-white/20`}
                  style={{ borderColor: `${box.color}20` }}
                >
                  <img src={box.imageUrl} alt={box.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/45 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${box.color}15 0%, transparent 70%)` }}
                  />

                  <div className="relative p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${box.color}25, ${box.color}08)`,
                          border: `2px solid ${box.color}55`,
                          color: box.color,
                          boxShadow: `0 0 20px ${box.color}20`,
                          fontFamily: "var(--font-barlow)",
                        }}
                      >
                        {box.emoji}
                      </div>
                      <div
                        className="text-[9px] font-black tracking-[0.2em] px-2 py-0.5 rounded-full border"
                        style={{ color: box.color, borderColor: `${box.color}40`, backgroundColor: `${box.color}15` }}
                      >
                        {box.rarity}
                      </div>
                    </div>

                    <h3 className="text-base font-black text-white mb-1" style={{ fontFamily: "var(--font-barlow)" }}>
                      {box.name}
                    </h3>
                    <p className="text-[11px] text-[#c6cfde] mb-4 leading-relaxed">{box.description}</p>

                    <div className="text-[10px] text-[#a0a0b8] mb-4">{box.guarantee}</div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-xl font-black" style={{ fontFamily: "var(--font-barlow)", color: box.color }}>
                          NT$ {box.price}
                        </span>
                        <span className="text-xs text-[#8d95a9]"> / 抽</span>
                      </div>

                      <div
                        className="px-3 py-2 rounded-xl text-xs font-bold text-center transition-all duration-200 group-hover:shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${box.color}, ${box.color}cc)`, color: "#0a0a0f" }}
                      >
                        <Package className="w-3.5 h-3.5 inline mr-1.5" />
                        立即開盒
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
