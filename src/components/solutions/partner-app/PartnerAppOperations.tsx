import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const PartnerAppOperations = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="pa-ops sec-pad" aria-label="Built for simple operations">
      <div className="pa-shell pa-ops__inner">
        <BrandHeading as="h2" lead="Built for" accent="Simple Operations" className="pa-h2 reveal" />
        <p className="pa-ops__body reveal" style={{ ["--i" as string]: 1 }}>
          Operate a battery swapping station with fewer manual processes and
          better visibility.
        </p>
      </div>
    </section>
  );
};

export default PartnerAppOperations;
