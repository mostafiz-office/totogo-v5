import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const DriverAppDesigned = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="da-designed sec-pad" aria-label="Designed around drivers">
      <div className="da-shell da-designed__inner">
        <BrandHeading as="h2" lead="Designed" accent="Around Drivers" className="da-h2 reveal" />
        <p className="da-designed__lead reveal" style={{ ["--i" as string]: 1 }}>
          Less searching. Less waiting. More time on the road.
        </p>
        <p className="da-designed__body reveal" style={{ ["--i" as string]: 2 }}>
          The Driver App helps drivers manage everyday EV operations simply and
          efficiently.
        </p>
      </div>
    </section>
  );
};

export default DriverAppDesigned;
