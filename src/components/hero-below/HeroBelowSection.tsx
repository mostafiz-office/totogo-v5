import greenBg from "@/assets/greenBackground.webp";
import PipePath from "./PipePath";
import VehicleCard from "./VehicleCard";
import { VEHICLES } from "./vehicles";

const HeroBelowSection = () => {
  return (
    <section
      aria-labelledby="ev-potential-title"
      className="relative -mt-[2px] overflow-hidden bg-background"
    >
      <div className="relative mx-auto min-h-0 w-full max-w-[1536px] md:min-h-[900px] lg:min-h-[1060px]">
        <img
          src={greenBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-36cqw] z-0 w-[128cqw] max-w-none -translate-x-1/2 select-none md:top-[-40cqw] lg:top-[-42cqw]"
          draggable={false}
          style={{ filter: "hue-rotate(4deg) saturate(0.55) brightness(1.08)" }}
        />
        <div className="absolute inset-x-0 top-[9%] z-0 hidden h-[91%] md:block md:top-[8%] md:h-[92%] lg:top-[7%] lg:h-[93%]">
          <PipePath />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 md:pt-[250px] lg:pt-[355px]">
          <h2
            id="ev-potential-title"
            className="text-center text-[1.5rem] font-extrabold leading-[1.1] sm:text-[2.05rem] sm:leading-[1.08] md:text-[2.9rem] lg:text-[3.25rem]"
            style={{ fontFamily: "'Rubik', 'Manrope', system-ui, sans-serif" }}
          >
            <span style={{ color: "hsl(var(--ev-navy))" }}>Unleashing </span>
            <span style={{ color: "hsl(var(--ev-green))" }}>EV</span>
            <br />
            <span style={{ color: "hsl(var(--ev-green))" }}>Potential </span>
            <span style={{ color: "hsl(var(--ev-navy))" }}>For</span>
          </h2>
        </div>

        <div
          className="relative z-10 mx-auto mt-10 grid max-w-[1080px] grid-cols-3 gap-2 px-3 sm:gap-4 sm:px-5 md:mt-[150px] md:gap-7 lg:mt-[176px] lg:gap-10"
        >
          {VEHICLES.map((v) => (
            <VehicleCard key={v.id} id={v.id} label={v.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBelowSection;
