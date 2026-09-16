import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const PartnerAppGrow = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="pa-grow sec-pad" aria-label="Grow with the network">
      <div className="pa-shell pa-grow__inner">
        <h2 className="pa-h2 reveal">Grow With the Network</h2>
        <p className="pa-grow__body reveal" style={{ ["--i" as string]: 1 }}>
          Become part of totooGO&rsquo;s expanding battery-swapping ecosystem and
          support the transition to electric mobility.
        </p>
        <div className="pa-grow__actions reveal" style={{ ["--i" as string]: 2 }}>
          <Button asChild variant="outline" className="pa-btn pa-btn--secondary">
            <a href="#" data-cta="join-as-station-partner">
              Join as a Station Partner
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerAppGrow;
