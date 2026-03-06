"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { rarityLabel, rarityColor, formatPrice } from "@/lib/utils";
import { DEMO_PRODUCTS, type DemoProduct } from "@/lib/mock-data";
import TiltCard from "@/components/ui/TiltCard";

const FEATURED_PRODUCTS = DEMO_PRODUCTS.slice(0, 4);

function ProductCard({ product }: { product: DemoProduct }) {
  const color = rarityColor(product.rarity);

  return (
    <TiltCard
      glowColor={color}
      className="group relative rounded-2xl glass-panel metal-frame border border-white/[0.06] overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden">
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
            background: `linear-gradient(135deg, ${color}22, transparent 40%, ${color}14, transparent 75%)`,
          }}
        />

        <div
          className="absolute top-3 left-3 text-[9px] font-black tracking-[0.15em] px-2 py-1 rounded-full border"
          style={{
            color,
            borderColor: `${color}50`,
            backgroundColor: `${color}18`,
          }}
        >
          {rarityLabel(product.rarity)}
        </div>

        <button className="absolute bottom-3 right-3 p-2 rounded-xl glass-panel border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/10">
          <ShoppingCart className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="p-4">
        <div className="text-xs text-[#8d95a9] mb-1">
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
    </TiltCard>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-20 relative">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent" />
      </div>
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
          {FEATURED_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
