import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandCTA from "@/components/shared/BrandCTA";
import heroImage from "@/assets/solutions-partner-app-hero.jpg";
import { useReveal } from "@/components/investment/useReveal";

const PartnerAppCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="pa-cta sec-pad-b" aria-label="Open a totooGO swap station">
      <div className="pa-shell">
        <BrandCTA
          image={heroImage}
          imageAlt="Station partner managing a totooGO battery swap point"
          lead="Open a"
          accent="totooGO Swap Station"
          body={<p>
            Run a swap point in your area with the tools and support of the
            totooGO network.
          </p>}
          actions={<>
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
          </>}
        />
      </div>
    </section>
  );
};

export default PartnerAppCTA;
