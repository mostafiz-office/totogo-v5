import { Activity, BatteryCharging, Timer, Truck, Wallet } from "lucide-react";
import SolutionSlider, { type SolutionSlide } from "@/components/solutions/SolutionSlider";
import { useReveal } from "@/components/investment/useReveal";

const SLIDES: SolutionSlide[] = [
  { title: "Fast turnaround", icon: <Timer /> },
  { title: "Less vehicle downtime", icon: <Activity /> },
  { title: "No long charging wait", icon: <BatteryCharging /> },
  { title: "Lower battery ownership burden", icon: <Wallet /> },
  { title: "Designed for commercial EV users", icon: <Truck /> },
];

const BatterySwapWhy = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="bs-why sec-pad" aria-label="Why battery swapping">
      <div className="bs-shell">
        <h2 className="bs-h2 reveal">Why Battery Swapping</h2>
        <div className="reveal" style={{ ["--i" as string]: 1 }}>
          <SolutionSlider slides={SLIDES} ariaLabel="Why battery swapping" />
        </div>
      </div>
    </section>
  );
};

export default BatterySwapWhy;
