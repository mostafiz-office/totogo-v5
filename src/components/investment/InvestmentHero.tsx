import { ArrowRight } from "lucide-react";
import investmentHero from "@/assets/investment-hero.jpg";
import { Button } from "@/components/ui/button";
import { useReveal } from "./useReveal";

const InvestmentHero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="inv-hero sec-pad" aria-label="Investment opportunity">
      <div className="inv-shell inv-hero__grid">
        <div className="inv-hero__copy reveal">
          <span className="inv-eyebrow">
            <span className="inv-eyebrow__dot" aria-hidden="true" />
            Join Our Current Pre-Seed Round
          </span>

          <h1 className="inv-hero__title text-balance">
            Invest in a New Era of Mobility
          </h1>

          <p className="inv-hero__lead">
            totooGO is building an end-to-end electric mobility ecosystem designed for
            Bangladesh – combining electric vehicles, Battery-as-a-Service, rapid battery
            swapping, accessible financing, digital technology, and service infrastructure.
          </p>
          <p className="inv-hero__lead">
            We are creating more than an electric vehicle company. We are building the
            infrastructure required to make electric mobility affordable, commercially
            viable, and scalable.
          </p>

          <div className="inv-hero__actions">
            <Button asChild className="inv-btn inv-btn--primary">
              <a href="#" data-cta="investor-deck">
                Request Investor Deck
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="inv-btn inv-btn--secondary">
              <a href="#" data-cta="book-a-call">
                Book a Call
              </a>
            </Button>
          </div>
        </div>

        <div className="inv-hero__visual reveal" style={{ ["--i" as string]: 1 }}>
          <div className="inv-hero__glow" aria-hidden="true" />
          <div className="inv-hero__panel">
            <img
              src={investmentHero}
              alt="Electric three-wheeler at a totooGO battery swapping station"
              width={1200}
              height={912}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentHero;
