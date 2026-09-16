import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const PartnerAppCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="pa-cta sec-pad-b" aria-label="Open a totooGO swap station">
      <div className="pa-shell">
        <div className="pa-cta__card reveal">
          <div className="pa-cta__glow" aria-hidden="true" />
          <h2 className="pa-cta__title text-balance">Open a totooGO Swap Station</h2>
          <p className="pa-cta__line">
            Run a swap point in your area with the tools and support of the
            totooGO network.
          </p>
          <div className="pa-cta__actions">
            <Button asChild className="pa-btn pa-btn--primary">
              <a href="#" data-cta="become-a-partner">
                Become a Partner
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild className="pa-btn pa-btn--ghost">
              <a href="#" data-cta="join-as-station-partner">
                Join as a Station Partner
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerAppCTA;
