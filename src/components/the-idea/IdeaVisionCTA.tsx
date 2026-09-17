import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrandHeading from "@/components/shared/BrandHeading";
import BrandCTA from "@/components/shared/BrandCTA";
import heroImage from "@/assets/the-idea-hero.jpg";
import { useReveal } from "@/components/investment/useReveal";

const IdeaVisionCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="ti-vision sec-pad" aria-label="The bigger vision">
      <div className="ti-shell">
        <div className="ti-intro ti-intro--center reveal">
          <BrandHeading lead="From Three-Wheelers to a" accent="Connected Electric Future" className="ti-h2" />
          <p className="ti-intro__body">
            totooGO starts with high-usage 2- and 3-wheel mobility, but the
            ecosystem is designed to grow into delivery fleets, cargo transport,
            utility vehicles, battery recycling, energy storage, and future
            electric mobility solutions.
          </p>
        </div>

        <BrandCTA
          className="ti-cta__brand"
          image={heroImage}
          imageAlt="Connected electric mobility ecosystem in Bangladesh"
          lead="One Network."
          accent="Multiple Possibilities."
          actions={
            <Button asChild className="ti-btn ti-btn--primary">
              <Link to="/solutions/battery-swapping/">
                Explore Our Solutions
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          }
        />
      </div>
    </section>
  );
};

export default IdeaVisionCTA;
