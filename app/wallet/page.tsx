"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  History,
  Plus,
  Minus,
  ShoppingCart,
  AreaChart,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import LineChart from "@/components/charts/LineChart";
import ParticlesBackdrop from "@/components/ui/ParticlesBackdrop";

const DEMO_TRANSACTIONS = [
  { id: "1", type: "DEPOSIT", amount: 5000, status: "COMPLETED", note: "信用卡儲值", createdAt: "2024-01-15 14:30" },
  { id: "2", type: "PURCHASE", amount: -500, status: "COMPLETED", note: "黃金傳奇箱 × 1", createdAt: "2024-01-15 15:00" },
  { id: "3", type: "PURCHASE", amount: -200, status: "COMPLETED", note: "紫晶神秘箱 × 1", createdAt: "2024-01-15 15:05" },
  { id: "4", type: "SALE", amount: 3200, status: "COMPLETED", note: "出售：林子偉 前景卡", createdAt: "2024-01-14 10:20" },
  { id: "5", type: "WITHDRAWAL", amount: -2000, status: "PENDING", note: "提領至玉山銀行", createdAt: "2024-01-13 09:00" },
  { id: "6", type: "DEPOSIT", amount: 10000, status: "COMPLETED", note: "ATM 轉帳儲值", createdAt: "2024-01-12 16:45" },
];

const BALANCE_HISTORY = [
  { label: "01", value: 8800 },
  { label: "05", value: 11200 },
  { label: "10", value: 10400 },
  { label: "15", value: 15500 },
  { label: "20", value: 14800 },
  { label: "Now", value: 15500 },
];

const txIcon: Record<string, React.ReactNode> = {
  DEPOSIT: <ArrowDownLeft className="w-4 h-4 text-[#22c55e]" />,
  WITHDRAWAL: <ArrowUpRight className="w-4 h-4 text-red-400" />,
  PURCHASE: <ShoppingCart className="w-4 h-4 text-[#a0a0b8]" />,
  SALE: <ArrowUpRight className="w-4 h-4 text-[#22c55e]" />,
  REFUND: <ArrowDownLeft className="w-4 h-4 text-[#3b82f6]" />,
};

const txLabel: Record<string, string> = {
  DEPOSIT: "儲值",
  WITHDRAWAL: "提領",
  PURCHASE: "消費",
  SALE: "銷售收入",
  REFUND: "退款",
};

export default function WalletPage() {
  const balance = 15500;
  const frozen = 2000;

  return (
    <div className="min-h-screen cinematic-stage">
      <ParticlesBackdrop count={46} className="opacity-40" />
      <Navbar />

      <div className="pt-16 relative">
        <div className="bg-[#12121a] border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-xs uppercase tracking-[0.26em] text-[#c9a84c] mb-3">
              Asset Vault
            </div>
            <h1 className="text-4xl font-black text-white mb-1" style={{ fontFamily: "var(--font-barlow)" }}>
              我的錢包
            </h1>
            <p className="text-[#a0a0b8]">管理餘額、追蹤收藏資產與金流動態</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-5 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="glass-panel metal-frame rounded-[28px] p-6 sm:p-7 overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-35 pointer-events-none bg-[radial-gradient(circle_at_80%_40%,rgba(201,168,76,0.18),transparent_48%)]" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-5 h-5 text-[#c9a84c]" />
                  <span className="text-sm text-[#a0a0b8]">可用餘額</span>
                </div>
                <div className="text-5xl font-black text-gradient-gold mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                  NT$ {balance.toLocaleString()}
                </div>
                <div className="text-sm text-[#6f7789]">
                  凍結中：NT$ {frozen.toLocaleString()}（交易保護）
                </div>

                <div className="flex gap-3 mt-6">
                  <Link href="/wallet/deposit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-sm">
                    <Plus className="w-4 h-4" />
                    儲值
                  </Link>
                  <Link href="/wallet/withdraw" className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-secondary text-sm">
                    <Minus className="w-4 h-4" />
                    提領
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="glass-panel metal-frame rounded-[28px] p-6"
            >
              <div className="text-xs uppercase tracking-[0.24em] text-[#6d7385] mb-4">本月統計</div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-[#a0a0b8] mb-1">儲值</div>
                  <div className="text-xl font-black text-[#22c55e]" style={{ fontFamily: "var(--font-barlow)" }}>
                    + NT$ 15,000
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#a0a0b8] mb-1">消費</div>
                  <div className="text-xl font-black text-red-400" style={{ fontFamily: "var(--font-barlow)" }}>
                    - NT$ 3,200
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#a0a0b8] mb-1">銷售收入</div>
                  <div className="text-xl font-black text-[#3b82f6]" style={{ fontFamily: "var(--font-barlow)" }}>
                    + NT$ 3,200
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="glass-panel metal-frame rounded-[28px] p-6 sm:p-7 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <AreaChart className="w-4 h-4 text-[#00d4ff]" />
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-barlow)" }}>
                Balance Chart
              </h2>
            </div>
            <LineChart data={BALANCE_HISTORY} accentColor="#00d4ff" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <History className="w-4 h-4 text-[#c9a84c]" />
              <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-barlow)" }}>
                交易記錄
              </h2>
            </div>

            <div className="glass-panel metal-frame rounded-[28px] overflow-hidden">
              {DEMO_TRANSACTIONS.map((tx, idx) => {
                const isPositive = tx.amount > 0;
                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.03 }}
                    className={`flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors ${
                      idx < DEMO_TRANSACTIONS.length - 1 ? "border-b border-white/[0.05]" : ""
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center flex-shrink-0">
                      {txIcon[tx.type]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{txLabel[tx.type]}</div>
                      <div className="text-xs text-[#5a5a7a]">{tx.note}</div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-base font-black ${isPositive ? "text-[#22c55e]" : "text-[#a0a0b8]"}`}
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        {isPositive ? "+" : ""}NT$ {Math.abs(tx.amount).toLocaleString()}
                      </div>
                      <div className="flex items-center justify-end gap-1.5 mt-0.5">
                        {tx.status === "PENDING" && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-500 border border-yellow-500/20">
                            處理中
                          </span>
                        )}
                        <div className="text-[10px] text-[#5a5a7a]">{tx.createdAt}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
