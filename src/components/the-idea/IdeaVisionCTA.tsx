import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const IdeaVisionCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="ti-vision sec-pad" aria-label="The bigger vision">
      <div className="ti-shell">
        <div className="ti-intro ti-intro--center reveal">
          <h2 className="ti-h2">From Three-Wheelers to a Connected Electric Future</h2>
          <p className="ti-intro__body">
            totooGO starts with high-usage 2- and 3-wheel mobility, but the
            ecosystem is designed to grow into delivery fleets, cargo transport,
            utility vehicles, battery recycling, energy storage, and future
            electric mobility solutions.
          </p>
        </div>

        <div className="ti-cta__card reveal" style={{ ["--i" as string]: 1 }}>
          <div className="ti-cta__glow" aria-hidden="true" />
          <h3 className="ti-cta__title text-balance">
            One Network. Multiple Possibilities.
          </h3>
          <div className="ti-cta__actions">
            <Button asChild className="ti-btn ti-btn--primary">
              <Link to="/solutions/battery-swapping/">
                Explore Our Solutions
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaVisionCTA;
