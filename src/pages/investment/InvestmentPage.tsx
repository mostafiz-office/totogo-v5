import { useEffect } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import "./investment.css";

const PAGE_TITLE = "Investment Opportunity | totooGO";
const PAGE_DESCRIPTION =
  "Invest in totooGO's end-to-end electric mobility ecosystem for Bangladesh — EVs, Battery-as-a-Service, swapping and financing.";

const InvestmentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const previousTitle = document.title;
    const metaEl = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
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
    <div className="inv-page min-h-screen bg-background">
      <SiteHeader />
      <main>
        <InvestmentHero />
        {/* sections added by IN-03..IN-04 */}
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentPage;
