import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/contact-hero.jpg";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const ContactHero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="cu-hero sec-pad" aria-label="Contact totooGO">
      <div className="cu-shell cu-hero__grid">
        <div className="cu-hero__copy reveal">
          <span className="cu-eyebrow">
            <span className="cu-eyebrow__dot" aria-hidden="true" />
            Contact Us
          </span>

          <BrandHeading as="h1" lead="Let’s Build the" accent="Future of Mobility Together" className="cu-hero__title" />

          <p className="cu-hero__lead">
            Whether you&rsquo;re a driver, fleet operator, station partner,
            investor, or business looking to collaborate, the totooGO team is
            ready to connect.
          </p>

          <div className="cu-hero__actions">
            <Button asChild className="cu-btn cu-btn--primary">
              <a href="#contact-form">
                Get in Touch
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="cu-hero__visual reveal" style={{ ["--i" as string]: 1 }}>
          <div className="cu-hero__glow" aria-hidden="true" />
          <div className="cu-hero__panel">
            <img
              src={heroImage}
              alt="A totooGO team member assisting a driver at a battery swapping station"
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

export default ContactHero;
