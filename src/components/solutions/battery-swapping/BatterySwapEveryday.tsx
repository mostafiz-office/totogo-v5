import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const BatterySwapEveryday = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="bs-everyday sec-pad"
      aria-label="Built for everyday mobility"
    >
      <div className="bs-shell bs-everyday__inner reveal">
        <h2 className="bs-h2">Built for Everyday Mobility</h2>
        <p className="bs-everyday__body">
          Designed for electric three-wheelers, delivery vehicles, commercial fleets,
          and other high-usage EVs.
        </p>
        <Button asChild variant="outline" className="bs-btn bs-btn--secondary">
          <a href="#" data-cta="explore-the-network">
            Explore the Network
          </a>
        </Button>
      </div>
    </section>
  );
};

export default BatterySwapEveryday;
