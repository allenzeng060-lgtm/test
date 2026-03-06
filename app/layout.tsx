import type { Metadata } from "next";
import { Inter, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CardVault | 球員卡極品收藏平台",
  description: "購買、收藏、交易頂級球員卡。扭蛋抽卡、福袋開箱、二手市場，一站搞定。",
  keywords: ["球員卡", "卡牌收藏", "扭蛋", "福袋", "baseball cards", "trading cards"],
  openGraph: {
    title: "CardVault | 球員卡極品收藏平台",
    description: "購買、收藏、交易頂級球員卡",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body
        className={`${inter.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
