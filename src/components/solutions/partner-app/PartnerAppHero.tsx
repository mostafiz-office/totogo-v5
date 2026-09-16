import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/solutions-partner-app-hero.jpg";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const PartnerAppHero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="pa-hero sec-pad" aria-label="Partner App">
      <div className="pa-shell pa-hero__grid">
        <div className="pa-hero__copy reveal">
          <span className="pa-eyebrow">
            <span className="pa-eyebrow__dot" aria-hidden="true" />
            Partner App
          </span>

          <h1 className="pa-hero__title text-balance">
            Run Your Swap Station Smarter.
          </h1>

          <p className="pa-hero__lead">
            The totooGO Partner App gives station operators the tools to manage
            battery swaps and daily operations from one platform.
          </p>

          <div className="pa-hero__actions">
            <Button asChild className="pa-btn pa-btn--primary">
              <a href="#" data-cta="become-a-partner">
                Become a Partner
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="pa-hero__visual reveal" style={{ ["--i" as string]: 1 }}>
          <div className="pa-hero__glow" aria-hidden="true" />
          <div className="pa-hero__panel">
            <img
              src={heroImage}
              alt="A totooGO station partner managing battery swaps on a tablet at a swap station."
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

export default PartnerAppHero;
