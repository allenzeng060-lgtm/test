import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
