import { useEffect } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import FleetHero from "@/components/solutions/fleet/FleetHero";
import FleetProvide from "@/components/solutions/fleet/FleetProvide";
import FleetCommercial from "@/components/solutions/fleet/FleetCommercial";
import FleetTransition from "@/components/solutions/fleet/FleetTransition";
import FleetCTA from "@/components/solutions/fleet/FleetCTA";
import "./fleet.css";

const PAGE_TITLE = "Fleet Onboarding | totooGO";
const PAGE_DESCRIPTION =
  "Move your 2- and 3-wheeler fleet to electric with totooGO vehicles, battery swapping, technology and support.";

const FleetPage = () => {
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
    <div className="fl-page min-h-screen bg-background">
      <SiteHeader />
      <main>
        <FleetHero />
        <FleetProvide />
        <FleetCommercial />
        <FleetTransition />
        <FleetCTA />
      </main>
      <Footer />
    </div>
  );
};

export default FleetPage;
