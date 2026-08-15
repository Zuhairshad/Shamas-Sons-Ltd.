import AnnouncementBar    from "@/components/AnnouncementBar";
import Navbar             from "@/components/Navbar";
import HeroSection        from "@/components/HeroSection";
import BenefitsBar        from "@/components/BenefitsBar";
import FavoritesSection   from "@/components/FavoritesSection";
import CollectionsSection from "@/components/CollectionsSection";
import AboutSection       from "@/components/AboutSection";
import SocialBar          from "@/components/SocialBar";
import Footer             from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <BenefitsBar />
      <FavoritesSection />
      <CollectionsSection />
      <AboutSection />
      <SocialBar />
      <Footer />
    </>
  );
}
