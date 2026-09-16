import SiteHeader from "@/components/site-header/SiteHeader";
import Hero from "@/components/battery-smart/Hero";
import HowItWorks from "@/components/HowItWorks";
import EVPotentialSection from "@/components/battery-smart/unleash-ev/EVPotentialSection";
import CTASection from "@/components/battery-smart/CTASection";
import HowSwappingWorks from "@/components/battery-smart/HowSwappingWorks";
import Footer from "@/components/site-footer/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <EVPotentialSection />
        <HowItWorks />
        <CTASection />
        <HowSwappingWorks />
      </main>
      <Footer />
      <MobileQABadge />
    </div>
  );
};

export default Index;
