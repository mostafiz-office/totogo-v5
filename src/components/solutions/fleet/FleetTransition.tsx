import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const CHAIN = ["Vehicles", "Batteries", "Swapping", "Technology", "Support"];

const FleetTransition = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="fl-transition sec-pad" aria-label="A Complete Transition">
      <div className="fl-shell fl-transition__inner">
        <BrandHeading as="h2" lead="A" accent="Complete Transition" className="fl-h2 reveal" />
        <p className="fl-transition__body reveal" style={{ ["--i" as string]: 1 }}>
          totooGO supports the shift from conventional vehicles to electric
          through one connected ecosystem.
        </p>

        <p className="fl-transition__chain reveal" style={{ ["--i" as string]: 2 }}>
          <span className="sr-only">
            Vehicles + Batteries + Swapping + Technology + Support
          </span>
          <span aria-hidden="true" className="fl-transition__chain-visual">
            {CHAIN.map((token, index) => (
              <span key={token} className="fl-transition__chain-item">
                {index > 0 && <span className="fl-transition__plus">+</span>}
                <span className="fl-transition__token">{token}</span>
              </span>
            ))}
          </span>
        </p>

        <div className="fl-transition__actions reveal" style={{ ["--i" as string]: 3 }}>
          <Button asChild className="fl-btn fl-btn--secondary">
            <a href="#" data-cta="talk-to-fleet-team">
              Talk to Our Fleet Team
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FleetTransition;
