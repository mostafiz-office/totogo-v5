import { useEffect } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import IdeaHero from "@/components/the-idea/IdeaHero";
import IdeaProblem from "@/components/the-idea/IdeaProblem";
import IdeaEcosystem from "@/components/the-idea/IdeaEcosystem";
import IdeaWhy from "@/components/the-idea/IdeaWhy";
import IdeaVisionCTA from "@/components/the-idea/IdeaVisionCTA";
import "./the-idea.css";

const PAGE_TITLE = "The Idea | totooGO";
const PAGE_DESCRIPTION =
  "totooGO is building a cleaner, safer and more affordable electric mobility ecosystem for Bangladesh — vehicles, battery swapping, technology and financing.";

const TheIdeaPage = () => {
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
    <div className="the-idea-page min-h-screen bg-background">
      <SiteHeader />
      <main>
        <IdeaHero />
        <IdeaProblem />
        <IdeaEcosystem />
        <IdeaWhy />
        <IdeaVisionCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TheIdeaPage;
