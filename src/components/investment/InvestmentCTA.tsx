import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <div className="inv-cta__card reveal">
          <div className="inv-cta__glow" aria-hidden="true" />
          <h2 className="inv-cta__title text-balance">
            Explore the Investment Opportunity
          </h2>
          <p className="inv-cta__line">
            We are creating more than an electric vehicle company.
          </p>
          <div className="inv-cta__actions">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCTA;
