import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const USE_CASES = [
  "Passenger transport",
  "Delivery fleets",
  "FMCG distribution",
  "Small cargo transport",
  "Utility vehicles",
];

const FleetCommercial = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="fl-commercial sec-pad" aria-label="Built for Commercial Use">
      <div className="fl-shell fl-commercial__inner">
        <BrandHeading as="h2" lead="Built for" accent="Commercial Use" className="fl-h2 reveal" />
        <p className="fl-commercial__intro reveal" style={{ ["--i" as string]: 1 }}>
          Ideal for:
        </p>
        <ul className="fl-commercial__chips reveal" style={{ ["--i" as string]: 2 }}>
          {USE_CASES.map((label) => (
            <li key={label} className="fl-commercial__chip">
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FleetCommercial;
