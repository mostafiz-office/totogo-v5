import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/solutions-fleet-hero.jpg";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const FleetHero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="fl-hero sec-pad" aria-label="Fleet Onboarding">
      <div className="fl-shell fl-hero__grid">
        <div className="fl-hero__copy reveal">
          <span className="fl-eyebrow">
            <span className="fl-eyebrow__dot" aria-hidden="true" />
            Fleet Onboarding
          </span>

          <h1 className="fl-hero__title text-balance">
            Move Your Fleet to Electric.
          </h1>

          <p className="fl-hero__lead">
            Transition your 2- and 3-wheeler fleet to electric mobility with
            vehicles, battery swapping, technology, and operational support in
            one ecosystem.
          </p>

          <div className="fl-hero__actions">
            <Button asChild className="fl-btn fl-btn--primary">
              <a href="#" data-cta="electrify-your-fleet">
                Electrify Your Fleet
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="fl-hero__visual reveal" style={{ ["--i" as string]: 1 }}>
          <div className="fl-hero__glow" aria-hidden="true" />
          <div className="fl-hero__panel">
            <img
              src={heroImage}
              alt="A fleet of totooGO electric three-wheelers lined up ready for commercial use."
              width={1280}
              height={960}
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

export default FleetHero;
