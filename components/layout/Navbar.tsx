"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Wallet, User, Menu, X, Package, Store, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "卡牌市場", icon: Store },
  { href: "/gacha", label: "扭蛋盲盒", icon: Package },
  { href: "/marketplace", label: "二手交易", icon: Layers },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 頂部光條 */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      <nav className="glass-panel border-t-0 border-x-0 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#9a7a2e] flex items-center justify-center font-black text-black text-sm shadow-lg shadow-[#c9a84c]/20">
                CV
              </div>
              <span
                className="text-xl font-black tracking-wider text-gradient-gold"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                CARDVAULT
              </span>
            </Link>

            {/* 桌面導航 */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-2 text-sm font-medium text-[#a0a0b8] hover:text-white transition-colors duration-200 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* 右側操作 */}
            <div className="flex items-center gap-2">
              {/* 錢包 */}
              <Link
                href="/wallet"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel-bright hover:border-[#c9a84c]/30 transition-all duration-200 group"
              >
                <Wallet className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-sm font-mono font-medium text-white">NT$ 0</span>
              </Link>

              {/* 購物車 */}
              <Link
                href="/cart"
                className="relative p-2 rounded-lg text-[#a0a0b8] hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c9a84c] text-black text-[10px] font-bold flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* 用戶 */}
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg btn-primary text-sm"
              >
                <User className="w-4 h-4" />
                登入
              </Link>

              {/* 手機選單 */}
              <button
                className="md:hidden p-2 text-[#a0a0b8] hover:text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 手機選單 */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-64" : "max-h-0"
          )}
        >
          <div className="px-4 py-3 space-y-1 border-t border-white/5">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#a0a0b8] hover:text-white hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="w-4 h-4 text-[#c9a84c]" />
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/5 flex gap-2">
              <Link href="/wallet" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg glass-panel-bright text-sm">
                <Wallet className="w-4 h-4 text-[#c9a84c]" />
                錢包
              </Link>
              <Link href="/login" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg btn-primary text-sm">
                <User className="w-4 h-4" />
                登入
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
