import SiteHeader from "@/components/site-header/SiteHeader";
import Hero from "@/components/battery-smart/Hero";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/battery-smart/CTASection";
import Footer from "@/components/site-footer/SiteFooter";

const IndexV2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero variant="v2" />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default IndexV2;
