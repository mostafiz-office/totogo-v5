import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const BatterySwapCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="bs-cta sec-pad-b"
      aria-label="Find your nearest swap station"
    >
      <div className="bs-shell">
        <div className="bs-cta__card reveal">
          <div className="bs-cta__glow" aria-hidden="true" />
          <h2 className="bs-cta__title text-balance">
            Find Your Nearest Swap Station
          </h2>
          <p className="bs-cta__line">
            Join the totooGO battery swapping network and keep your vehicle on the road.
          </p>
          <div className="bs-cta__actions">
            <Button asChild className="bs-btn bs-btn--primary">
              <a href="#" data-cta="find-swap-station">
                Find a Swap Station
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="bs-btn bs-btn--onnavy">
              <a href="#" data-cta="explore-the-network">
                Explore the Network
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatterySwapCTA;
