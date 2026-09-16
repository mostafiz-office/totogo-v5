import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const DriverAppCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="da-cta sec-pad-b"
      aria-label="One app, one mobility ecosystem"
    >
      <div className="da-shell">
        <div className="da-cta__card reveal">
          <div className="da-cta__glow" aria-hidden="true" />
          <h2 className="da-cta__title text-balance">
            One App. One Mobility Ecosystem.
          </h2>
          <p className="da-cta__line">
            From locating a station to completing a swap, totooGO keeps the
            entire journey connected.
          </p>
          <div className="da-cta__actions">
            <Button asChild className="da-btn da-btn--primary">
              <a href="#" data-cta="join-totoogo-network">
                Join the totooGO Network
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverAppCTA;
