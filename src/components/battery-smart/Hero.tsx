import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroBannerSVG from "./HeroBannerSVG";
import heroSvgMarkupV1 from "@/assets/battery-smart-hero.svg?raw";
import heroSvgMarkupV2 from "@/assets/battery-smart-hero-v2.svg?raw";
import greenBg from "@/assets/greenBackground.webp";

type Headline = { lead: string; accent: string };
const HEADLINES: Headline[] = [
  { lead: "Bangladesh's Largest", accent: "Battery-Swapping Network" },
  { lead: "Built for", accent: "Electric Vehicles" },
];

const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

// Text-first sequence, like batterysmart.in:
// 0.0s  headline 1 fades in
// ~1.6s headline 1 fades out, headline 2 fades in
// ~2.5s banner SVG mounts and fades in beneath the final headline
const HEADLINE_HOLD_MS = 1600;
const HEADLINE_HOLD_MS_MOBILE = 2400;
const HEADLINE_FADE_MS = 700;
const BANNER_DELAY_AFTER_TITLE_MS = 200;
const BANNER_IN_MS = 900;

const Hero = ({ variant = "v1" }: { variant?: "v1" | "v2" } = {}) => {
  const heroSvgMarkup = variant === "v2" ? heroSvgMarkupV2 : heroSvgMarkupV1;
  const sectionRef = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [mountBanner, setMountBanner] = useState(false);

  // Rotate from headline 1 to headline 2 before the banner appears.
  useEffect(() => {
    const hold = isMobile() ? HEADLINE_HOLD_MS_MOBILE : HEADLINE_HOLD_MS;
    const t = window.setTimeout(() => setIdx(1), hold + HEADLINE_FADE_MS);
    return () => window.clearTimeout(t);
  }, []);

  // After the final headline lands, mount the banner. Deferring the mount
  // keeps GSAP/RAF work off the main thread while the text is animating.
  useEffect(() => {
    if (idx < HEADLINES.length - 1) return;
    const t = window.setTimeout(() => setMountBanner(true), BANNER_DELAY_AFTER_TITLE_MS);
    return () => window.clearTimeout(t);
  }, [idx]);

  // Fade the banner in once it's mounted.
  useEffect(() => {
    if (!mountBanner) return;
    const banner = sectionRef.current?.querySelector<HTMLDivElement>(
      ".Home_bannerDesktop__IJBqP",
    );
    if (!banner) return;
    gsap.fromTo(
      banner,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: BANNER_IN_MS / 1000, ease: "power3.out" },
    );
  }, [mountBanner]);

  const current = HEADLINES[idx];
  const isFinal = idx >= HEADLINES.length - 1;

  return (
    <section
      ref={sectionRef}
      className="Home_Home__r7pEu"
      aria-label="Battery Smart hero"
    >
      <div className="Home_hero__B0w79">
        <h1
          key={idx}
          className={`bs-rotating-title ${isFinal ? "bs-rt-final" : "bs-rt-uplift"} Home_HomeTitle__hXEBP Title_Title__h9OBl Title_l1__MDOub`}
          id="title"
          style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}
        >
          <span className="bs-rt-line bs-rt-lead">{current.lead}</span>{" "}
          <span className="bs-rt-line bs-rt-accent">{current.accent}</span>
        </h1>

        <div className="bs-greenbg" aria-hidden="true" role="presentation">
          <img
            src={greenBg}
            alt=""
            role="presentation"
            aria-hidden="true"
            draggable={false}
            tabIndex={-1}
          />
        </div>

        {mountBanner && (
          <div
            id="bannerContainer"
            className="Home_bannerDesktop__IJBqP"
            aria-hidden="true"
            role="presentation"
            tabIndex={-1}
            style={{ opacity: 0 }}
          >
            <HeroBannerSVG svgMarkup={heroSvgMarkup} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
