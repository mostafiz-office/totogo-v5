import { BatteryCharging, Bike, Cpu, Wrench } from "lucide-react";
import SolutionSlider, { type SolutionSlide } from "@/components/solutions/SolutionSlider";
import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const SLIDES: SolutionSlide[] = [
  {
    title: "Electric Vehicles",
    body: "Access suitable EV options for commercial operations.",
    icon: <Bike />,
  },
  {
    title: "Battery Swapping",
    body: "Keep vehicles operating with fast battery replacement.",
    icon: <BatteryCharging />,
  },
  {
    title: "Fleet Technology",
    body: "Monitor and manage connected fleet operations.",
    icon: <Cpu />,
  },
  {
    title: "Service Support",
    body: "Access maintenance and operational support.",
    icon: <Wrench />,
  },
];

const FleetProvide = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="fl-provide sec-pad" aria-label="What We Provide">
      <div className="fl-shell">
        <BrandHeading as="h2" lead="What" accent="We Provide" className="fl-h2 reveal" />
        <div className="reveal" style={{ ["--i" as string]: 1 }}>
          <SolutionSlider slides={SLIDES} ariaLabel="What totooGO provides for fleets" />
        </div>
      </div>
    </section>
  );
};

export default FleetProvide;
