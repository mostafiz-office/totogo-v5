import { useEffect, useState } from "react";
import SwapNetworkHero from "./SwapNetworkHero";

type Headline = { lead: string; accent: string };
const HEADLINES: Headline[] = [
  { lead: "Bangladesh's Largest", accent: "Battery-Swapping Network" },
  { lead: "Built for", accent: "Electric Vehicles" },
];

const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

const HEADLINE_HOLD_MS = 2200;
const HEADLINE_HOLD_MS_MOBILE = 2800;
const HEADLINE_FADE_MS = 700;

interface HeroProps {
  variant?: "v1" | "v2";
}

const Hero = ({ variant = "v1" }: HeroProps = {}) => {
  const [idx, setIdx] = useState(0);

  // Rotate headline from 1 to 2
  useEffect(() => {
    const hold = isMobile() ? HEADLINE_HOLD_MS_MOBILE : HEADLINE_HOLD_MS;
    const t = window.setTimeout(() => setIdx(1), hold + HEADLINE_FADE_MS);
    return () => window.clearTimeout(t);
  }, []);

  const current = HEADLINES[idx];
  const isFinal = idx >= HEADLINES.length - 1;

  return (
    <section className="relative w-full overflow-hidden bg-[#bfe6fb] m-0 p-0" aria-label="TotooGo Hero">
      {/* Title overlay positioned in the sky area */}
      <div className="absolute top-3 sm:top-5 md:top-7 lg:top-8 inset-x-0 z-10 pointer-events-none px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            key={idx}
            className={`bs-rotating-title ${isFinal ? "bs-rt-final" : "bs-rt-uplift"} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_14px_rgba(255,255,255,0.9)]`}
            id="title"
            style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}
          >
            <span className="bs-rt-line text-[#002366]">{current.lead}</span>{" "}
            <span className="bs-rt-line text-[#00a651]">{current.accent}</span>
          </h1>
        </div>
      </div>

      {/* Full width edge-to-edge banner */}
      <div className="w-full m-0 p-0 block">
        <SwapNetworkHero />
      </div>
    </section>
  );
};

export default Hero;
