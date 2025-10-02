import { Header } from "@/components/root/common/header"
import { HeroSection } from "@/components/root/hero-section"
import { CarouselSection } from "@/components/root/carousel-section"
import { AdvantagesSection } from "@/components/root/advantages-section"
import { DownloadSection } from "@/components/root/download-section"
import { CardsSection } from "@/components/root/cards-section"
import { Footer } from "@/components/root/common/footer"
import { ThemeSwitch } from "@/components/root/theme-switch"

const HomePage = () => {
  return (
    <div className="font-sans">
      <main>
        <Header className="sticky" />
        <HeroSection />
        <CarouselSection />
        <AdvantagesSection />
        <CardsSection />
        <DownloadSection />
        <Footer />
        <ThemeSwitch context="root" />
      </main>
    </div>
  )
}

export default HomePage
