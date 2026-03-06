import HeroSection from "@/components/home/HeroSection";
import FeaturedGacha from "@/components/home/FeaturedGacha";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StatsSection from "@/components/home/StatsSection";
import MarketplacePreview from "@/components/home/MarketplacePreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedGacha />
      <FeaturedProducts />
      <MarketplacePreview />
    </>
  );
}
