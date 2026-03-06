import { TrendingUp, Shield, Zap, Award } from "lucide-react";

const stats = [
  { icon: Award, value: "10,000+", label: "卡牌種類", color: "#c9a84c" },
  { icon: TrendingUp, value: "5,000+", label: "活躍會員", color: "#00d4ff" },
  { icon: Zap, value: "500+", label: "扭蛋機台", color: "#a855f7" },
  { icon: Shield, value: "100%", label: "正品保障", color: "#22c55e" },
];

export default function StatsSection() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divider-gold mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="glass-panel rounded-2xl p-6 text-center group hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div
                className="text-3xl font-black mb-1"
                style={{ fontFamily: "var(--font-barlow)", color }}
              >
                {value}
              </div>
              <div className="text-sm text-[#5a5a7a]">{label}</div>
            </div>
          ))}
        </div>
        <div className="divider-gold mt-12" />
      </div>
    </section>
  );
}
