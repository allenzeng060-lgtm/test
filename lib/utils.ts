import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(num);
}

export function rarityLabel(rarity: string): string {
  const map: Record<string, string> = {
    COMMON: "普卡",
    UNCOMMON: "非普通",
    RARE: "稀有",
    SUPER_RARE: "超稀有",
    ULTRA_RARE: "極稀有",
  };
  return map[rarity] ?? rarity;
}

export function rarityClass(rarity: string): string {
  const map: Record<string, string> = {
    COMMON: "badge-common",
    UNCOMMON: "badge-uncommon",
    RARE: "badge-rare",
    SUPER_RARE: "badge-super-rare",
    ULTRA_RARE: "badge-ultra-rare",
  };
  return map[rarity] ?? "badge-common";
}

export function rarityColor(rarity: string): string {
  const map: Record<string, string> = {
    COMMON: "#6b7280",
    UNCOMMON: "#22c55e",
    RARE: "#3b82f6",
    SUPER_RARE: "#a855f7",
    ULTRA_RARE: "#f59e0b",
  };
  return map[rarity] ?? "#6b7280";
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}
