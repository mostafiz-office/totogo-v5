import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandCTA from "@/components/shared/BrandCTA";
import heroImage from "@/assets/solutions-driver-app-hero.jpg";
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
        <BrandCTA
          image={heroImage}
          imageAlt="Driver using the totooGO app for battery swapping"
          lead="One App."
          accent="One Mobility Ecosystem."
          body={<p>
            From locating a station to completing a swap, totooGO keeps the
            entire journey connected.
          </p>}
          actions={
            <Button asChild className="da-btn da-btn--primary">
              <a href="#" data-cta="join-totoogo-network">
                Join the totooGO Network
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          }
        />
      </div>
    </section>
  );
};

export default DriverAppCTA;
