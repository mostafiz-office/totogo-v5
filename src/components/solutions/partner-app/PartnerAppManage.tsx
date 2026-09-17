import { BatteryCharging, Gauge, Receipt, Repeat } from "lucide-react";
import SolutionSlider, { type SolutionSlide } from "@/components/solutions/SolutionSlider";
import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

const SLIDES: SolutionSlide[] = [
  {
    title: "Battery Inventory",
    body: "Track available and depleted batteries.",
    icon: <BatteryCharging />,
  },
  {
    title: "Swap Management",
    body: "Process and record battery swaps.",
    icon: <Repeat />,
  },
  {
    title: "Station Activity",
    body: "Monitor daily station operations.",
    icon: <Gauge />,
  },
  {
    title: "Digital Transactions",
    body: "Manage payments and transaction records.",
    icon: <Receipt />,
  },
];

const PartnerAppManage = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="pa-manage sec-pad" aria-label="Manage everything in one place">
      <div className="pa-shell">
        <BrandHeading as="h2" lead="Manage Everything" accent="in One Place" className="pa-h2 reveal" />
        <div className="reveal" style={{ ["--i" as string]: 1 }}>
          <SolutionSlider slides={SLIDES} ariaLabel="Partner App station tools" />
        </div>
      </div>
    </section>
  );
};

export default PartnerAppManage;
