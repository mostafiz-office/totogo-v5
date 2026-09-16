import { BadgePercent, BatteryCharging, CarFront, Cpu, Repeat } from "lucide-react";
import SolutionSlider, { type SolutionSlide } from "@/components/solutions/SolutionSlider";
import { useReveal } from "@/components/investment/useReveal";

const SLIDES: SolutionSlide[] = [
  {
    title: "Affordable Electric Vehicles",
    body: "Purpose-built for everyday passenger and commercial use.",
    icon: <CarFront />,
  },
  {
    title: "Battery-as-a-Service",
    body: "Reduce the burden of owning an expensive EV battery.",
    icon: <BatteryCharging />,
  },
  {
    title: "Rapid Battery Swapping",
    body: "Replace depleted batteries quickly and stay on the road.",
    icon: <Repeat />,
  },
  {
    title: "Accessible Financing",
    body: "Create an easier path toward vehicle ownership.",
    icon: <BadgePercent />,
  },
  {
    title: "Digital Technology",
    body: "Connect drivers, stations, fleets, and partners through one ecosystem.",
    icon: <Cpu />,
  },
];

const IdeaEcosystem = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="the-idea-ecosystem"
      className="ti-ecosystem sec-pad"
      aria-label="The idea"
    >
      <div className="ti-shell">
        <div className="ti-intro reveal">
          <h2 className="ti-h2">Build the Entire Ecosystem, Not Just the Vehicle</h2>
          <p className="ti-intro__body">
            totooGO connects the essential parts of electric mobility into one
            platform.
          </p>
        </div>

        <div className="reveal" style={{ ["--i" as string]: 1 }}>
          <SolutionSlider slides={SLIDES} ariaLabel="The totooGO ecosystem" />
        </div>
      </div>
    </section>
  );
};

export default IdeaEcosystem;
