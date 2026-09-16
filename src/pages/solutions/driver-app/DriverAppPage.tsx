import { useEffect } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import DriverAppHero from "@/components/solutions/driver-app/DriverAppHero";
import DriverAppFeatures from "@/components/solutions/driver-app/DriverAppFeatures";
import DriverAppDesigned from "@/components/solutions/driver-app/DriverAppDesigned";
import DriverAppCTA from "@/components/solutions/driver-app/DriverAppCTA";
import "./driver-app.css";

const PAGE_TITLE = "Driver App | totooGO";
const PAGE_DESCRIPTION =
  "Find nearby swap stations, track your swaps and manage payments with the totooGO Driver App.";

const DriverAppPage = () => {
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
    <div className="da-page min-h-screen bg-background">
      <SiteHeader />
      <main>
        <DriverAppHero />
        <DriverAppFeatures />
        <DriverAppDesigned />
        <DriverAppCTA />
      </main>
      <Footer />
    </div>
  );
};

export default DriverAppPage;
