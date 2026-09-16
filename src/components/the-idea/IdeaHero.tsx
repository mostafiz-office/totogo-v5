import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/the-idea-hero.jpg";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const CHIPS = ["Electric Vehicles", "Battery Swapping", "Technology", "Financing"];

const IdeaHero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="ti-hero sec-pad" aria-label="The Idea">
      <div className="ti-shell ti-hero__grid">
        <div className="ti-hero__copy reveal">
          <span className="ti-eyebrow">
            <span className="ti-eyebrow__dot" aria-hidden="true" />
            The Idea
          </span>

          <h1 className="ti-hero__title text-balance">
            A Better Way to Move Bangladesh
          </h1>

          <p className="ti-hero__lead">
            totooGO is building a cleaner, safer, and more affordable mobility
            ecosystem designed around the people who keep Bangladesh moving every
            day.
          </p>

          <ul className="ti-chips" aria-label="What the ecosystem includes">
            {CHIPS.map((chip) => (
              <li key={chip} className="ti-chip">
                {chip}
              </li>
            ))}
          </ul>

          <div className="ti-hero__actions">
            <Button asChild className="ti-btn ti-btn--primary">
              <a href="#the-idea-ecosystem">
                Discover the totooGO Ecosystem
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="ti-hero__visual reveal" style={{ ["--i" as string]: 1 }}>
          <div className="ti-hero__glow" aria-hidden="true" />
          <div className="ti-hero__panel">
            <img
              src={heroImage}
              alt="Electric three-wheeler on a Dhaka street, part of the totooGO mobility ecosystem"
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

export default IdeaHero;
