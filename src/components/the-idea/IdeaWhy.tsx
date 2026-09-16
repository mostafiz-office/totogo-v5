import { CheckCircle2 } from "lucide-react";
import { useReveal } from "@/components/investment/useReveal";

const ITEMS = [
  { title: "Fast Swapping", body: "Minimize downtime between journeys." },
  {
    title: "Lower Upfront Cost",
    body: "Separate battery access from vehicle ownership.",
  },
  { title: "Safer Mobility", body: "Introduce purpose-built electric vehicles." },
  {
    title: "Recurring Support",
    body: "Connect vehicles with swapping, service, and technology.",
  },
  {
    title: "Cleaner Transportation",
    body: "Help reduce dependence on carbon-emitting mobility.",
  },
];

const IdeaWhy = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="ti-why sec-pad" aria-label="Why it matters">
      <div className="ti-shell">
        <div className="ti-intro reveal">
          <h2 className="ti-h2">More Time on the Road. Lower Barriers to Electric.</h2>
          <p className="ti-intro__body">
            Our approach is designed around the real needs of drivers and
            commercial operators.
          </p>
        </div>

        <ul className="ti-benefits">
          {ITEMS.map(({ title, body }, i) => (
            <li
              key={title}
              className="ti-benefit reveal"
              style={{ ["--i" as string]: i }}
            >
              <h3 className="ti-benefit__title">
                <CheckCircle2 className="ti-benefit__icon" aria-hidden="true" />
                {title}
              </h3>
              <p className="ti-benefit__body">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IdeaWhy;
