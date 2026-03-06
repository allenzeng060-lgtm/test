import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticlesBackdrop from "@/components/ui/ParticlesBackdrop";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen cinematic-stage">
      <ParticlesBackdrop count={40} className="opacity-35" />
      <Navbar />
      <main className="pt-16 relative">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_62%)] blur-3xl" />
        </div>
        <div className="relative">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
