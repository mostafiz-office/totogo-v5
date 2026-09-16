import { useReveal } from "@/components/investment/useReveal";

const PartnerAppOperations = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="pa-ops sec-pad" aria-label="Built for simple operations">
      <div className="pa-shell pa-ops__inner">
        <h2 className="pa-h2 reveal">Built for Simple Operations</h2>
        <p className="pa-ops__body reveal" style={{ ["--i" as string]: 1 }}>
          Operate a battery swapping station with fewer manual processes and
          better visibility.
        </p>
      </div>
    </section>
  );
};

export default PartnerAppOperations;
