import { Header } from "@/components/root/common/header"
import { HeroSection } from "@/components/root/hero-section"
import { CarouselSection } from "@/components/root/carousel-section"
import { AdvantagesSection } from "@/components/root/advantages-section"
import { TestimonialSection } from "@/components/root/testimonial-section"
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
        <TestimonialSection />
        <CardsSection />
        <DownloadSection />
        <Footer />
      </main>
    </div>
  )
}

export default HomePage
