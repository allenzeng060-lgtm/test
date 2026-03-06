import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* 品牌 */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#9a7a2e] flex items-center justify-center font-black text-black text-sm">
                CV
              </div>
              <span
                className="text-xl font-black tracking-wider text-gradient-gold"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                CARDVAULT
              </span>
            </div>
            <p className="text-sm text-[#5a5a7a] leading-relaxed">
              台灣最專業的球員卡收藏平台。購買、抽卡、交易，盡在 CardVault。
            </p>
          </div>

          {/* 購物 */}
          <div>
            <h4 className="text-sm font-semibold text-[#a0a0b8] uppercase tracking-wider mb-3">購物</h4>
            <ul className="space-y-2">
              {[
                { href: "/products", label: "卡牌市場" },
                { href: "/gacha", label: "扭蛋盲盒" },
                { href: "/marketplace", label: "二手交易" },
                { href: "/subscription", label: "訂閱方案" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#5a5a7a] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 帳戶 */}
          <div>
            <h4 className="text-sm font-semibold text-[#a0a0b8] uppercase tracking-wider mb-3">帳戶</h4>
            <ul className="space-y-2">
              {[
                { href: "/profile", label: "個人資料" },
                { href: "/profile/orders", label: "訂單記錄" },
                { href: "/profile/collection", label: "我的收藏" },
                { href: "/wallet", label: "我的錢包" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#5a5a7a] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 支援 */}
          <div>
            <h4 className="text-sm font-semibold text-[#a0a0b8] uppercase tracking-wider mb-3">支援</h4>
            <ul className="space-y-2">
              {[
                { href: "/help", label: "常見問題" },
                { href: "/shipping", label: "運送說明" },
                { href: "/refund", label: "退換貨政策" },
                { href: "/contact", label: "聯絡我們" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#5a5a7a] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5a5a7a]">
            © 2024 CardVault. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[#5a5a7a] hover:text-white transition-colors">隱私政策</Link>
            <Link href="/terms" className="text-xs text-[#5a5a7a] hover:text-white transition-colors">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
