import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandCTA from "@/components/shared/BrandCTA";
import heroImage from "@/assets/solutions-fleet-hero.jpg";
import { useReveal } from "@/components/investment/useReveal";

const FleetCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="fl-cta sec-pad-b" aria-label="Electrify Your Fleet With totooGO">
      <div className="fl-shell">
        <BrandCTA
          image={heroImage}
          imageAlt="Electric commercial fleet supported by totooGO"
          lead="Electrify Your Fleet"
          accent="With totooGO"
          body={<p>
            Talk to our fleet team about moving your 2- and 3-wheeler fleet to
            electric.
          </p>}
          actions={<>
            <Button asChild className="fl-btn fl-btn--primary">
              <a href="#" data-cta="electrify-your-fleet">
                Electrify Your Fleet
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild className="fl-btn fl-btn--ghost">
              <a href="#" data-cta="talk-to-fleet-team">
                Talk to Our Fleet Team
              </a>
            </Button>
          </>}
        />
      </div>
    </section>
  );
};

export default FleetCTA;
