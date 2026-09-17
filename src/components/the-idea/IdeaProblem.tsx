import { HandCoins, ShieldAlert, Timer, Wallet } from "lucide-react";
import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const CARDS = [
  {
    title: "Low Driver Income",
    body: "High operating costs reduce earning potential.",
    Icon: Wallet,
  },
  {
    title: "Limited Financing",
    body: "Vehicle ownership remains out of reach for many drivers.",
    Icon: HandCoins,
  },
  {
    title: "Unsafe Vehicles",
    body: "Poorly designed and retrofitted vehicles create safety risks.",
    Icon: ShieldAlert,
  },
  {
    title: "Long Charging Downtime",
    body: "Traditional EV charging does not suit high-usage commercial mobility.",
    Icon: Timer,
  },
];

const IdeaProblem = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="ti-problem sec-pad" aria-label="The problem">
      <div className="ti-shell">
        <div className="ti-intro ti-intro--center reveal">
          <BrandHeading as="h2" lead="Mobility Should" accent="Work Better" className="ti-h2" />
          <p className="ti-intro__body">
            Millions of drivers and passengers still depend on vehicles that are
            inefficient, unsafe, expensive to operate, and difficult to finance.
          </p>
          <p className="ti-intro__body">
            Transport operators also face limited access to vehicle ownership,
            while conventional and retrofitted vehicles contribute to rising
            operating costs and emissions.
          </p>
        </div>

        <ul className="ti-cards">
          {CARDS.map(({ title, body, Icon }, i) => (
            <li
              key={title}
              className="ti-card reveal"
              style={{ ["--i" as string]: i }}
            >
              <span className="ti-card__chip" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="ti-card__title">{title}</h3>
              <p className="ti-card__body">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IdeaProblem;
