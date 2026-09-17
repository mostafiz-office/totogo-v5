import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandCTA from "@/components/shared/BrandCTA";
import heroImage from "@/assets/solutions-battery-swapping-hero.jpg";
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
        <BrandCTA
          image={heroImage}
          imageAlt="Driver using a totooGO battery swapping station"
          lead="Find Your"
          accent="Nearest Swap Station"
          body={<p>
            Join the totooGO battery swapping network and keep your vehicle on the road.
          </p>}
          actions={<>
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
          </>}
        />
      </div>
    </section>
  );
};

export default BatterySwapCTA;
