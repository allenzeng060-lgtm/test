"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: NextAuth signIn
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 particle-bg">
      {/* 背景光暈 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 60%)" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#9a7a2e] flex items-center justify-center font-black text-black text-sm shadow-lg shadow-[#c9a84c]/20">
              CV
            </div>
            <span
              className="text-2xl font-black tracking-wider text-gradient-gold"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              CARDVAULT
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">歡迎回來</h1>
          <p className="text-[#5a5a7a] mt-1 text-sm">登入你的收藏帳戶</p>
        </div>

        {/* 登入表單 */}
        <div className="glass-panel rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#a0a0b8] mb-2">
                電子郵件
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-12 pl-11 pr-4 rounded-xl input-dark text-sm"
                  required
                />
              </div>
            </div>

            {/* 密碼 */}
            <div>
              <label className="block text-sm font-medium text-[#a0a0b8] mb-2">
                密碼
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-12 rounded-xl input-dark text-sm"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a5a7a] hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 忘記密碼 */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-xs text-[#c9a84c] hover:underline">
                忘記密碼？
              </Link>
            </div>

            {/* 登入按鈕 */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl btn-primary text-sm font-bold flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              登入
            </button>
          </form>

          {/* 分隔線 */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#5a5a7a]">或</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google 登入 */}
          <button className="w-full h-12 rounded-xl glass-panel border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 text-sm font-medium text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            以 Google 帳號繼續
          </button>
        </div>

        {/* 註冊連結 */}
        <p className="text-center text-sm text-[#5a5a7a] mt-6">
          還沒有帳號？{" "}
          <Link href="/register" className="text-[#c9a84c] hover:underline font-medium">
            立即免費註冊
          </Link>
        </p>
      </div>
    </div>
  );
}
