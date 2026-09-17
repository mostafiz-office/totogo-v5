import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/solutions-battery-swapping-hero.jpg";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const BatterySwapHero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="bs-hero sec-pad" aria-label="Battery swapping">
      <div className="bs-shell bs-hero__grid">
        <div className="bs-hero__copy reveal">
          <span className="bs-eyebrow">
            <span className="bs-eyebrow__dot" aria-hidden="true" />
            Battery Swapping
          </span>

          <BrandHeading as="h1" lead="Swap in Minutes." accent="Stay on the Road." className="bs-hero__title" />

          <p className="bs-hero__lead">
            Replace a depleted battery quickly and get back to work without long
            charging delays.
          </p>

          <div className="bs-hero__actions">
            <Button asChild className="bs-btn bs-btn--primary">
              <a href="#" data-cta="find-swap-station">
                Find a Swap Station
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="bs-hero__visual reveal" style={{ ["--i" as string]: 1 }}>
          <div className="bs-hero__glow" aria-hidden="true" />
          <div className="bs-hero__panel">
            <img
              src={heroImage}
              alt="A totooGO battery swap station with a charged battery being handed to a rider."
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

export default BatterySwapHero;
