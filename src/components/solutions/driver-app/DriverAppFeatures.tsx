import { History, MapPin, Radio, Wallet } from "lucide-react";
import SolutionSlider, { type SolutionSlide } from "@/components/solutions/SolutionSlider";
import { useReveal } from "@/components/investment/useReveal";

const SLIDES: SolutionSlide[] = [
  {
    title: "Find Stations",
    body: "Locate the nearest available swapping station.",
    icon: <MapPin />,
  },
  {
    title: "Live Availability",
    body: "Check station and battery availability in real time.",
    icon: <Radio />,
  },
  {
    title: "Swap History",
    body: "Track previous battery swaps and usage.",
    icon: <History />,
  },
  {
    title: "Payments",
    body: "Manage digital payments from one place.",
    icon: <Wallet />,
  },
];

const DriverAppFeatures = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="da-features sec-pad" aria-label="Key features">
      <div className="da-shell">
        <h2 className="da-h2 reveal">Key Features</h2>
        <div className="reveal" style={{ ["--i" as string]: 1 }}>
          <SolutionSlider slides={SLIDES} ariaLabel="Driver App key features" />
        </div>
      </div>
    </section>
  );
};

export default DriverAppFeatures;
