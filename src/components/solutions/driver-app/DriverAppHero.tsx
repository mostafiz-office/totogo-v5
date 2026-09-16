import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/solutions-driver-app-hero.jpg";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const DriverAppHero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="da-hero sec-pad" aria-label="Driver App">
      <div className="da-shell da-hero__grid">
        <div className="da-hero__copy reveal">
          <span className="da-eyebrow">
            <span className="da-eyebrow__dot" aria-hidden="true" />
            Driver App
          </span>

          <h1 className="da-hero__title text-balance">
            Everything a Driver Needs, in One App.
          </h1>

          <p className="da-hero__lead">
            Find nearby swap stations, manage your battery usage, and stay
            connected to the totooGO network.
          </p>

          <div className="da-hero__actions">
            <Button asChild className="da-btn da-btn--primary">
              <a href="#" data-cta="explore-driver-app">
                Explore the Driver App
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="da-hero__visual reveal" style={{ ["--i" as string]: 1 }}>
          <div className="da-hero__glow" aria-hidden="true" />
          <div className="da-hero__panel">
            <img
              src={heroImage}
              alt="A driver holding a phone showing the totooGO Driver App with nearby swap stations on a map."
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

export default DriverAppHero;
