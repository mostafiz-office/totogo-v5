import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const FleetCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="fl-cta sec-pad-b" aria-label="Electrify Your Fleet With totooGO">
      <div className="fl-shell">
        <div className="fl-cta__card reveal">
          <div className="fl-cta__glow" aria-hidden="true" />
          <h2 className="fl-cta__title text-balance">Electrify Your Fleet With totooGO</h2>
          <p className="fl-cta__line">
            Talk to our fleet team about moving your 2- and 3-wheeler fleet to
            electric.
          </p>
          <div className="fl-cta__actions">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetCTA;
