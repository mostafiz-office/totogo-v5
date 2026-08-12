import { useEffect, useRef } from "react";
import { MapPin, QrCode, BatteryCharging, Truck, TrendingUp, ArrowRight } from "lucide-react";

type Card = {
  step: number;
  category: string;
  title: string;
  body: React.ReactNode;
  stats: [{ value: string; label: string }, { value: string; label: string }];
  cta: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const CARDS: Card[] = [
  {
    step: 1,
    category: "Locate",
    Icon: MapPin,
    title: "Pull into a totooGO swap point",
    body: (
      <>
        Find the nearest swap station from the totooGO app, already live across{" "}
        <a className="sss-desc-link" href="#"><strong>Dhaka, Chattogram &amp; Sylhet</strong></a>{" "}
        with new points opening every week along the busiest{" "}
        <a className="sss-desc-link" href="#"><strong>EV corridors</strong></a>.
      </>
    ),
    stats: [
      { value: "120+", label: "SWAP POINTS" },
      { value: "<2 km", label: "AVG DISTANCE" },
    ],
    cta: "See station map",
  },
  {
    step: 2,
    category: "Identify",
    Icon: QrCode,
    title: "Scan, unlock, and queue your slot",
    body: (
      <>
        Tap your driver QR, the cabinet recognises your{" "}
        <a className="sss-desc-link" href="#"><strong>totooGO ID</strong></a>, releases a charged battery, and reserves your slot. No paperwork, no waiting in line, no{" "}
        <a className="sss-desc-link" href="#"><strong>cash hassle</strong></a>.
      </>
    ),
    stats: [
      { value: "1 tap", label: "TO UNLOCK" },
      { value: "100%", label: "CASHLESS" },
    ],
    cta: "How the app works",
  },
  {
    step: 3,
    category: "Swap",
    Icon: BatteryCharging,
    title: "Swap empty for full in 90 seconds",
    body: (
      <>
        Slide the depleted pack in, lift a freshly charged one out, lock, done.{" "}
        <a className="sss-desc-link" href="#"><strong>90-second swap</strong></a>{" "}
        beats every fast charger on the road, and you never gamble on a{" "}
        <a className="sss-desc-link" href="#"><strong>weak battery</strong></a>.
      </>
    ),
    stats: [
      { value: "90 sec", label: "PER SWAP" },
      { value: "100%", label: "CHARGED" },
    ],
    cta: "Inside the swap",
  },
  {
    step: 4,
    category: "Drive",
    Icon: Truck,
    title: "Drive out and keep earning all day",
    body: (
      <>
        A full pack means more trips, more fares, more deliveries, without the{" "}
        <a className="sss-desc-link" href="#"><strong>downtime</strong></a> of plug-in charging. Drivers report up to{" "}
        <a className="sss-desc-link" href="#"><strong>৳600 extra per day</strong></a>{" "}
        after switching.
      </>
    ),
    stats: [
      { value: "৳600+", label: "EXTRA / DAY" },
      { value: "3×", label: "MORE TRIPS" },
    ],
    cta: "Driver stories",
  },
  {
    step: 5,
    category: "Track",
    Icon: TrendingUp,
    title: "Track your savings in the app",
    body: (
      <>
        Every swap is logged. See your fuel savings, kilometres driven, and{" "}
        <a className="sss-desc-link" href="#"><strong>CO₂ avoided</strong></a>{" "}
        in real time, proof that totooGO pays you back while cleaning the{" "}
        <a className="sss-desc-link" href="#"><strong>Bangladesh air</strong></a>.
      </>
    ),
    stats: [
      { value: "৳18k+", label: "AVG SAVED / MO" },
      { value: "1.2 t", label: "CO₂ AVOIDED / YR" },
    ],
    cta: "Open the dashboard",
  },
];

const FIRST_STICKY_TOP = 90;
const CARD_OFFSET = 20;

export default function HowSwappingWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  // Ancestor overflow neutralization for position:sticky
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const touched: Array<{ node: HTMLElement; prev: string }> = [];
    let node: HTMLElement | null = el.parentElement;
    while (node && node !== document.body) {
      const cs = getComputedStyle(node);
      if (["hidden", "auto", "clip", "scroll"].some((v) => cs.overflow.includes(v) || cs.overflowX.includes(v) || cs.overflowY.includes(v))) {
        touched.push({ node, prev: node.style.overflow });
        node.style.overflow = "visible";
      }
      node = node.parentElement;
    }
    const prevHtmlX = document.documentElement.style.overflowX;
    const prevBodyX = document.body.style.overflowX;
    document.documentElement.style.overflowX = "clip";
    document.body.style.overflowX = "clip";
    return () => {
      touched.forEach(({ node, prev }) => (node.style.overflow = prev));
      document.documentElement.style.overflowX = prevHtmlX;
      document.body.style.overflowX = prevBodyX;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sss-section totoogo"
      id="how-swapping-works"
      aria-label="How totooGO battery swapping works in five steps"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        <div className="sss-head-wrap text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <p className="sss-eyebrow">How It Works</p>
          <h2 className="sss-heading">
            Swap, drive, earn, in <em>five simple steps</em>
          </h2>
          <p className="sss-intro mt-5">
            totooGO replaces slow charging with a <strong>90-second battery swap</strong>{" "}
            built for Bangladesh's <strong>CNG &amp; EV drivers</strong>. Here's the full ride, from pulling in to{" "}
            <strong>tracking your savings</strong>.
          </p>
        </div>

        <div className="sss-stack">
          {CARDS.map((c, i) => (
            <div
              key={c.step}
              className="sss-sticky-wrapper"
              style={{ ["--sss-top" as any]: `${FIRST_STICKY_TOP + i * CARD_OFFSET}px`, zIndex: c.step }}
            >
              <article className="sss-card" data-step={c.step}>
                <div className="sss-card-content">
                  <span className="sss-category">{c.category}</span>
                  <h3 className="sss-card-title">
                    <a className="sss-card-title-link" href="#">{c.title}</a>
                  </h3>
                  <p className="sss-card-desc">{c.body}</p>
                  <div className="sss-stats">
                    {c.stats.map((s, idx) => (
                      <div className="sss-stat" key={idx}>
                        <span className="sss-stat-value">{s.value}</span>
                        <span className="sss-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <a className="sss-cta" href="#">
                    {c.cta} <ArrowRight className="sss-cta-icon" aria-hidden />
                  </a>
                </div>
                <div className="sss-card-media" aria-hidden>
                  <div className="sss-icon-tile">
                    <c.Icon className="sss-icon" />
                    <span className="sss-step-badge">0{c.step}</span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sss-section.totoogo {
          background: hsl(var(--c-green-soft) / 0.35);
          font-family: 'Poppins', system-ui, sans-serif;
        }
        .sss-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 600;
          color: hsl(var(--c-green-tree));
          margin-bottom: 0.75rem;
        }
        .sss-heading {
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 4vw, 2.75rem);
          line-height: 1.15;
          color: hsl(150 25% 12%);
        }
        .sss-heading em {
          font-style: italic;
          color: hsl(var(--c-green-tree));
          font-weight: 700;
        }
        .sss-intro {
          font-size: 1rem;
          line-height: 1.7;
          color: hsl(150 12% 28%);
        }
        .sss-intro strong {
          color: inherit;
          font-weight: 600;
          transition: color 0.25s ease;
        }
        .sss-intro strong:hover {
          color: hsl(var(--c-green-tree));
        }

        .sss-stack { position: relative; }
        .sss-sticky-wrapper {
          position: sticky;
          top: var(--sss-top, 90px);
          padding-bottom: 1.25rem;
        }
        .sss-card {
          --c-bg: #FAF6EE;
          --c-text: #4A2E17;
          --c-mute: #4A2E17cc;
          --c-faint: #4A2E1799;
          --c-border: hsl(0 0% 0% / 0.18);
          --c-hover: #00CE7E;
          --c-tile-bg: #6B4423;
          --c-tile-icon: #ffffff;

          background: var(--c-bg);
          color: var(--c-text);
          border-radius: 24px;
          border: 1px solid var(--c-border);
          box-shadow: 0 18px 40px -24px hsl(150 30% 12% / 0.35);
          min-height: clamp(420px, 58vh, 540px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          padding: clamp(1.75rem, 3vw, 2.75rem);
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .sss-card { grid-template-columns: 1fr; min-height: 0; }
        }

        .sss-card[data-step="2"] {
          --c-bg: #F0E8DC;
          --c-tile-bg: #00CE7E;
          --c-tile-icon: #ffffff;
        }
        .sss-card[data-step="3"] {
          --c-bg: #E8DCC8;
          --c-tile-bg: #4A2E17;
          --c-tile-icon: #ffffff;
        }
        .sss-card[data-step="4"] {
          --c-bg: #6B4423;
          --c-text: #ffffff;
          --c-mute: hsl(0 0% 100% / 0.82);
          --c-faint: hsl(0 0% 100% / 0.6);
          --c-border: hsl(0 0% 100% / 0.25);
          --c-hover: #00CE7E;
          --c-tile-bg: #FAF6EE;
          --c-tile-icon: #6B4423;
        }
        .sss-card[data-step="5"] {
          --c-bg: #4A2E17;
          --c-text: #ffffff;
          --c-mute: hsl(0 0% 100% / 0.82);
          --c-faint: hsl(0 0% 100% / 0.6);
          --c-border: hsl(0 0% 100% / 0.25);
          --c-hover: #00CE7E;
          --c-tile-bg: #00CE7E;
          --c-tile-icon: #ffffff;
        }

        .sss-card-content { display: flex; flex-direction: column; gap: 1rem; align-self: center; }
        .sss-category {
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-style: italic;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--c-faint);
        }
        .sss-card-title {
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: clamp(1.4rem, 2.4vw, 1.85rem);
          line-height: 1.2;
          font-weight: 700;
          margin: 0;
        }
        .sss-card-title-link {
          color: var(--c-text);
          text-decoration: none;
          transition: color 0.25s ease, text-shadow 0.25s ease;
        }
        .sss-card-title-link:hover {
          color: var(--c-hover);
          text-shadow: 1px 0.7px 0 hsl(150 30% 8% / 0.25);
        }
        .sss-card-title-link:focus-visible {
          outline: 2px solid var(--c-hover);
          outline-offset: 2px;
          border-radius: 4px;
        }

        .sss-card-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--c-mute);
          margin: 0;
        }
        .sss-desc-link { color: inherit; text-decoration: none; }
        .sss-desc-link strong {
          color: inherit;
          font-weight: 600;
          transition: color 0.25s ease, text-shadow 0.25s ease;
        }
        .sss-desc-link:hover strong {
          color: var(--c-hover);
          text-shadow: 1px 0.7px 0 hsl(150 30% 8% / 0.25);
        }

        .sss-stats {
          display: flex; gap: 2.5rem; margin-top: 0.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--c-border);
        }
        .sss-stat { display: flex; flex-direction: column; gap: 0.25rem; }
        .sss-stat-value {
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: 1.75rem; font-weight: 700; color: var(--c-text); line-height: 1;
        }
        .sss-stat-label {
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-faint);
        }

        .sss-cta {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.875rem; font-weight: 600;
          color: var(--c-text); text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--c-border);
          align-self: flex-start;
          transition: color 0.25s ease, border-color 0.25s ease, gap 0.25s ease;
        }
        .sss-cta:hover { color: var(--c-hover); border-color: var(--c-hover); gap: 0.65rem; }
        .sss-cta-icon { width: 16px; height: 16px; }

        .sss-card-media {
          display: flex; align-items: center; justify-content: center;
          min-height: 260px;
        }
        .sss-icon-tile {
          position: relative;
          width: 100%;
          aspect-ratio: 1.35 / 1;
          border-radius: 20px;
          background:
            radial-gradient(120% 80% at 0% 0%, hsl(0 0% 100% / 0.18) 0%, transparent 55%),
            var(--c-tile-bg);
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 0 0 1px hsl(0 0% 100% / 0.08), 0 24px 50px -28px hsl(20 60% 15% / 0.45);
          overflow: hidden;
        }
        .sss-icon { width: 38%; height: 38%; color: var(--c-tile-icon); stroke-width: 1.4; opacity: 0.98; }
        .sss-step-badge {
          position: absolute; top: 1rem; right: 1.25rem;
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em;
          color: hsl(0 0% 100% / 0.85);
        }

        @media (prefers-reduced-motion: reduce) {
          .sss-card-title-link,
          .sss-desc-link strong { transition: none; }
          .sss-card-title-link:hover { text-shadow: none; }
        }
      `}</style>
    </section>
  );
}
