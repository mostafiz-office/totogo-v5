import { useEffect } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import PartnerAppHero from "@/components/solutions/partner-app/PartnerAppHero";
import PartnerAppManage from "@/components/solutions/partner-app/PartnerAppManage";
import PartnerAppOperations from "@/components/solutions/partner-app/PartnerAppOperations";
import PartnerAppGrow from "@/components/solutions/partner-app/PartnerAppGrow";
import PartnerAppCTA from "@/components/solutions/partner-app/PartnerAppCTA";
import "./partner-app.css";

const PAGE_TITLE = "Partner App | totooGO";
const PAGE_DESCRIPTION =
  "Run a totooGO swap station with battery inventory, swap management and digital transactions in one app.";

const PartnerAppPage = () => {
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
    <div className="pa-page min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PartnerAppHero />
        <PartnerAppManage />
        <PartnerAppOperations />
        <PartnerAppGrow />
        <PartnerAppCTA />
      </main>
      <Footer />
    </div>
  );
};

export default PartnerAppPage;
