import { useEffect, useRef } from "react";
import greenBg from "@/assets/battery-smart/greenBackground.svg";
import "./unleash-ev-potential.css";

// Raw SVG markup lifted from the BatteryPool reference (top portion only).
// Using dangerouslySetInnerHTML keeps the exact attributes (stroke-width,
// gradient stops, masks) without needing to JSX-convert hundreds of attrs.
const FLOW_LINE_SVG = `
<svg class="uev-flow-line" viewBox="0 0 1109 1700" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <linearGradient id="uev-grad-main" x1="554" y1="1" x2="554" y2="1700" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.18" stop-color="#6EE3B6"/>
      <stop offset="0.45" stop-color="#3BDA9C"/>
      <stop offset="0.75" stop-color="#00CE7E"/>
      <stop offset="1" stop-color="#00FF9D"/>
    </linearGradient>
    <linearGradient id="uev-grad-left-top" x1="15" y1="2" x2="15" y2="620" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff"/>
      <stop offset="1" stop-color="#B0F1D8"/>
    </linearGradient>
    <linearGradient id="uev-grad-right-top" x1="1093" y1="0" x2="1088" y2="620" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff"/>
      <stop offset="1" stop-color="#A5F0D3"/>
    </linearGradient>
  </defs>
  <g>
    <path d="M17 1V603.5L553.5 925.5M553.5 925.5L1086 603.5L1093 1M553.5 925.5V1407M553.5 1407L16 1653V1700M553.5 1407L1086 1653V1700"
      stroke="url(#uev-grad-main)" stroke-opacity="0.55" stroke-width="28" fill="none"/>
    <path d="M15 2V622" stroke="url(#uev-grad-left-top)" stroke-width="14" stroke-linecap="round"/>
    <path d="M1093 1L1088 620" stroke="url(#uev-grad-right-top)" stroke-width="14" stroke-linecap="round"/>
  </g>
</svg>
`;

const TWO_WHEELER_SVG = `<svg viewBox="0 0 166 121" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="134.9" cy="87.9" r="13.9" fill="#EBDDCB"/><circle cx="50.4" cy="87.9" r="13.9" fill="#EBDDCB"/><path d="M56.9 86.3C56.9 94 50.7 100.2 43 100.2C35.3 100.2 29.1 94 29.1 86.3" stroke="#6B4423" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="124.7" cy="86.3" r="13.9" stroke="#6B4423" stroke-width="3" fill="none"/><path d="M138.6 63c-5.6-5.6-14.9-5.6-14.9-5.6L107 18.5h-3.7c-7.7 3.9-3.7 16.7-3.7 16.7s6.2 17.4 7.4 22.3c3.7 14.8-11.1 14.8-11.1 14.8h-9.3c-9.3 0-9.3-7.4-9.3-7.4c0-9.3 11.1-20.4 11.1-20.4" stroke="#6B4423" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M42 44.5L36.5 55.6h-5.1c-1.4 0-2.7 0.8-3.3 2L23.5 66.8h9.8" stroke="#6B4423" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="92.2" cy="11.1" r="1.9" stroke="#6B4423" stroke-width="3" fill="none"/><path d="M93.7 10L103.3 3.2c1.2-0.9 2.7-1.4 4.3-1.4h7.8c4.6 0 8.4 3.7 8.4 8.4c0 4.6-3.7 8.4-8.4 8.4H107" stroke="#6B4423" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M112.6 12.9V18.5" stroke="#6B4423" stroke-width="3" stroke-linecap="round"/><path d="M88.2 35.9H56.5C51.9 35.9 48.2 39.6 48.2 44.2H88.2V35.9Z" fill="#EBDDCB"/><path d="M25.4 44.5H88.5V38.9c0-1.4-0.5-2.8-1.5-3.8C84.1 32.2 75.7 31.5 64.4 31.5V35.2" stroke="#00CE7E" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M42 44.5V37.1c0-3.1 2.5-5.6 5.6-5.6h16.7" stroke="#00CE7E" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M56.9 85.3H23.5c0 0 5.6-22 22.4-26.8c5.4-1.5 11.3-0.9 16 2.2c4.8 3.3 9.2 8 6.2 24.6h31.5" stroke="#6B4423" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M47 81L49.8 71.4L44 71.6L52.5 61L51.1 68.6L56.9 68.6L47 81Z" stroke="#00CE7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>`;

const THREE_WHEELER_SVG = `<svg viewBox="0 0 172 135" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="148.9" cy="86.7" r="13.9" fill="#EBDDCB"/><circle cx="35.9" cy="83.7" r="13.9" fill="#EBDDCB"/><circle cx="138.8" cy="84" r="15.1" stroke="#6B4423" stroke-width="3" fill="none"/><circle cx="25.6" cy="84" r="15.1" stroke="#6B4423" stroke-width="3" fill="none"/><path d="M98.9 3.8H54.7C43.3 3.8 34 13.1 34 24.5V58H98.9V3.8Z" fill="#EBDDCB"/><path d="M15.8 18.2L17.6 14.5c3-6.4 9.4-10.5 16.5-10.5" stroke="#00CE7E" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M18.7 45.9H73.1" stroke="#00CE7E" stroke-width="3" stroke-linecap="round"/><path d="M17.7 30.9H72.1" stroke="#00CE7E" stroke-width="3" stroke-linecap="round"/><path d="M15.8 61.4V18.2" stroke="#6B4423" stroke-width="3" stroke-linecap="round"/><path d="M98.9 82.5V2.5" stroke="#6B4423" stroke-width="3" stroke-linecap="round"/><path d="M99.7 2C115.2 5.5 146.1 26.9 144.6 68.1" stroke="#6B4423" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M38.4 82.5H92.8" stroke="#6B4423" stroke-width="3" stroke-linecap="round"/><path d="M98.9 82.5H122.2" stroke="#6B4423" stroke-width="3" stroke-linecap="round"/><path d="M46 2.5H98.9" stroke="#6B4423" stroke-width="3" stroke-linecap="round"/><path d="M113 54.8L115.8 45.2L110 45.4L118.5 34.8L117.1 42.4L123 42.4L113 54.8Z" stroke="#00CE7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>`;

const LOADER_SVG = `<svg viewBox="0 0 243 149" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="93.1" cy="86.6" r="13.9" fill="#EBDDCB"/><circle cx="53.6" cy="86.6" r="13.9" fill="#EBDDCB"/><rect x="24.3" y="38" width="81.1" height="34.7" rx="10" fill="#EBDDCB"/><circle cx="168.1" cy="87.9" r="13.9" fill="#EBDDCB"/><path d="M129 46L131.8 36.4L126 36.6L134.5 26L133.1 33.6L139 33.6L129 46Z" stroke="#00CE7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M150.2 37.1H199.9c1.8 0 3.6 0.5 4.9 1.7c1.9 1.9 4.1 4.9 4.3 8.8c0.2 4 0.2 16.3 0.1 26.4c0 5.5-4.5 9.9-10 9.9h-8c-5.5 0-9.9-4.4-9.9-9.9c0-5.5 4.4-9.9 9.9-9.9h11.5" stroke="#6B4423" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M151.2 52.2V26.2c0-5.5 4.5-10 10-10h22" stroke="#6B4423" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M175.2 19.8V33.1" stroke="#6B4423" stroke-width="3.5" stroke-linecap="round"/><path d="M112.1 79.4V12.1c0-5.5 4.5-10 10-10h43.6c8.2-0.7 24.5 3.3 24.5 24.6" stroke="#6B4423" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M100.2 86.4c0 7.6-6.3 13.8-14.1 13.8c-7.8 0-14.1-6.2-14.1-13.8" stroke="#6B4423" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M60.8 86.4c0 7.6-6.3 13.8-14.1 13.8c-7.8 0-14.1-6.2-14.1-13.8" stroke="#6B4423" stroke-width="3.5" stroke-linecap="round" fill="none"/><circle cx="160.5" cy="86.4" r="15" stroke="#6B4423" stroke-width="3.5" fill="none"/><path d="M2 83.2H146" stroke="#6B4423" stroke-width="3.5" stroke-linecap="round"/><path d="M104 61.3H35c-5.5 0-10 4.5-10 10v3.7" stroke="#8B5A2B" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M104 45H35c-5.5 0-10 4.5-10 13.7" stroke="#8B5A2B" stroke-width="3.5" stroke-linecap="round" fill="none"/></g></svg>`;

const VEHICLES = [
  { svg: TWO_WHEELER_SVG, label: "Electric 2-wheeler" },
  { svg: THREE_WHEELER_SVG, label: "Electric 3-wheelers" },
  { svg: LOADER_SVG, label: "Electric Loaders" },
];

const UnleashEVPotential = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    ref.current?.querySelectorAll(".uev-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="uev-section" id="unleash-ev-potential" aria-label="Unleashing EV Potential">
      <div className="uev-line-container">
        <img
          src={greenBg}
          alt=""
          aria-hidden="true"
          className="uev-green-background"
          width={1920}
          height={1402}
          loading="lazy"
          draggable={false}
        />
        <div
          className="uev-flow-line-container uev-reveal"
          dangerouslySetInnerHTML={{ __html: FLOW_LINE_SVG }}
        />
      </div>

      <div className="uev-heading uev-reveal">
        <div className="uev-title">
          <span style={{ color: "#4A2E17" }}>Unleashing </span>
          <span style={{ color: "#00CE7E" }}>EV</span>
        </div>
        <div className="uev-title">
          <span style={{ color: "#00CE7E" }}>Potential </span>
          <span style={{ color: "#4A2E17" }}>For</span>
        </div>
      </div>

      <div className="uev-vehicles">
        {VEHICLES.map((v, i) => (
          <div
            key={v.label}
            className="uev-vehicle uev-reveal"
            style={{ ["--i" as string]: i } as React.CSSProperties}
          >
            <div
              className="uev-vehicle-icon"
              dangerouslySetInnerHTML={{ __html: v.svg }}
            />
            <span className="uev-vehicle-label">{v.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UnleashEVPotential;
