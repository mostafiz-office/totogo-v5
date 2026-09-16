import { useEffect } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import BatterySwapHero from "@/components/solutions/battery-swapping/BatterySwapHero";
import BatterySwapSteps from "@/components/solutions/battery-swapping/BatterySwapSteps";
import BatterySwapWhy from "@/components/solutions/battery-swapping/BatterySwapWhy";
import BatterySwapEveryday from "@/components/solutions/battery-swapping/BatterySwapEveryday";
import BatterySwapCTA from "@/components/solutions/battery-swapping/BatterySwapCTA";
import "./battery-swapping.css";

const PAGE_TITLE = "Battery Swapping | totooGO";
const PAGE_DESCRIPTION =
  "Swap a depleted battery in minutes at a totooGO station and stay on the road with minimal downtime.";

const BatterySwappingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const previousTitle = document.title;
    const metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = metaEl?.getAttribute("content") ?? null;

    document.title = PAGE_TITLE;
    metaEl?.setAttribute("content", PAGE_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (metaEl && previousDescription !== null) {
        metaEl.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <div className="bs-page min-h-screen bg-background">
      <SiteHeader />
      <main>
        <BatterySwapHero />
        <BatterySwapSteps />
        <BatterySwapWhy />
        <BatterySwapEveryday />
        <BatterySwapCTA />
      </main>
      <Footer />
    </div>
  );
};

export default BatterySwappingPage;
