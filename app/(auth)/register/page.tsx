"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 呼叫 /api/auth/register
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 particle-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 60%)" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#9a7a2e] flex items-center justify-center font-black text-black text-sm">
              CV
            </div>
            <span className="text-2xl font-black tracking-wider text-gradient-gold" style={{ fontFamily: "var(--font-barlow)" }}>
              CARDVAULT
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">建立帳號</h1>
          <p className="text-[#5a5a7a] mt-1 text-sm">加入 CardVault 開始你的收藏之旅</p>
        </div>

        <div className="glass-panel rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#a0a0b8] mb-2">姓名</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="你的名字"
                  className="w-full h-12 pl-11 pr-4 rounded-xl input-dark text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#a0a0b8] mb-2">電子郵件</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="your@email.com"
                  className="w-full h-12 pl-11 pr-4 rounded-xl input-dark text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#a0a0b8] mb-2">手機號碼</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="0912-345-678"
                  className="w-full h-12 pl-11 pr-4 rounded-xl input-dark text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#a0a0b8] mb-2">密碼</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="至少 8 個字元"
                  className="w-full h-12 pl-11 pr-12 rounded-xl input-dark text-sm"
                  minLength={8}
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

            <div>
              <label className="block text-sm font-medium text-[#a0a0b8] mb-2">確認密碼</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a7a]" />
                <input
                  type="password"
                  value={form.confirm}
                  onChange={handleChange("confirm")}
                  placeholder="再輸入一次密碼"
                  className="w-full h-12 pl-11 pr-4 rounded-xl input-dark text-sm"
                  required
                />
              </div>
            </div>

            {/* 同意條款 */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-[#c9a84c]"
              />
              <span className="text-xs text-[#5a5a7a] leading-relaxed">
                我同意 CardVault 的{" "}
                <Link href="/terms" className="text-[#c9a84c] hover:underline">服務條款</Link>
                {" "}與{" "}
                <Link href="/privacy" className="text-[#c9a84c] hover:underline">隱私政策</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={!agree}
              className="w-full h-12 rounded-xl btn-primary text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              建立帳號
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#5a5a7a] mt-6">
          已有帳號？{" "}
          <Link href="/login" className="text-[#c9a84c] hover:underline font-medium">
            立即登入
          </Link>
        </p>
      </div>
    </div>
  );
}
