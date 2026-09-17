import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandCTA from "@/components/shared/BrandCTA";
import heroImage from "@/assets/investment-hero.jpg";
import { useReveal } from "./useReveal";

const InvestmentCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="inv-cta sec-pad"
      aria-label="Explore the investment opportunity"
    >
      <div className="inv-shell">
        <BrandCTA
          image={heroImage}
          imageAlt="totooGO electric mobility and battery-swapping investment opportunity"
          lead="Explore the"
          accent="Investment Opportunity"
          body={<p>We are creating more than an electric vehicle company.</p>}
          actions={
            <>
            <Button asChild className="inv-btn inv-btn--primary">
              <a href="#" data-cta="investor-deck">
                Request Investor Deck
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="inv-btn inv-btn--onnavy">
              <a href="#" data-cta="book-a-call">
                Book a Call
              </a>
            </Button>
            </>
          }
        />
      </div>
    </section>
  );
};

export default InvestmentCTA;
