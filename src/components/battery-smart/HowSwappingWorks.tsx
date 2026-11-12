import { useEffect, useRef } from "react";
import { ListChecks, Wallet, BatteryCharging, TrendingUp, Check, ArrowUpRight } from "lucide-react";

type Card = {
  step: number;
  category: string;
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  checkpoints: string[];
  metaTags: string;
  actionText: string;
  actionHref: string;
  stats: [{ value: string; label: string }, { value: string; label: string }];
  Icon: React.ComponentType<{ className?: string }>;
};

const CARDS: Card[] = [
  {
    step: 1,
    category: "CHOOSE",
    eyebrow: "01 —— CHOOSE",
    Icon: ListChecks,
    title: "Choose your E3W, Start your ELECTRIC journey!",
    body: "Select a totooGO electric three-wheeler built for affordable, efficient everyday driving.",
    checkpoints: [
      "Purpose-built 3–5 kW high-torque electric powertrain",
      "Ergonomic passenger cabin tailored for Bangladeshi roads",
      "Zero tailpipe emissions with instant daily fuel savings",
    ],
    metaTags: "E3W MOBILITY · DHAKA METRO READY",
    actionText: "Explore electric rickshaws",
    actionHref: "#contact",
    stats: [
      { value: "3-5 kW Motor", label: "Built for low-cost, efficient mobility." },
      { value: "Comfortable Ride", label: "Designed for the real needs of CNG & EV drivers." },
    ],
  },
  {
    step: 2,
    category: "BUY",
    eyebrow: "02 —— OWNERSHIP",
    Icon: Wallet,
    title: "Own your vehicle! Own Your Future!",
    body: "Get your TOTOOGO E3W with easy, pocket-friendly financing and start building your own asset!",
    checkpoints: [
      "Low down payment starting from just Tk. 20,000",
      "Daily installment of Tk 600–900 (less than CNG daily rent)",
      "100% full asset ownership transferred upon tenure completion",
    ],
    metaTags: "FLEXIBLE FINANCING · ASSET OWNERSHIP",
    actionText: "View financing plans",
    actionHref: "#contact",
    stats: [
      { value: "Tk. 20,000", label: "Downpayment starts from" },
      { value: "Tk 600-900", label: "Daily installment, less than CNG rent." },
    ],
  },
  {
    step: 3,
    category: "SWAP",
    eyebrow: "03 —— SWAP NETWORK",
    Icon: BatteryCharging,
    title: "Swap & Drive, No Expensive Battery Replacement!",
    body: "With totooGO, you don't pay for costly battery replacement—only a simple subscription that keeps you on the road.",
    checkpoints: [
      "30-second rapid swap: drive in, swap, drive out",
      "24/7 unlimited access across dense metropolitan network",
      "Zero costly battery maintenance or replacement fees ever",
    ],
    metaTags: "SMART BATTERY TECH · ZERO DOWNTIME",
    actionText: "Locate swap stations",
    actionHref: "#contact",
    stats: [
      { value: "24/7 On Road", label: "Keep driving anytime with uninterrupted battery access." },
      {
        value: "30-Second Quick Swap",
        label: "Swap your battery in seconds. Stay moving and pay only for what you use.",
      },
    ],
  },
  {
    step: 4,
    category: "EARN",
    eyebrow: "04 —— EARNINGS",
    Icon: TrendingUp,
    title: "Drive More. Earn More. Build Your Freedom!",
    body: "With lower running costs and more time on the road, totooGO helps you keep more of what you earn and build towards financial freedom.",
    checkpoints: [
      "70% lower operational expenses vs petrol & CNG rickshaws",
      "Up to 30% increase in net daily driver take-home earnings",
      "Real-time station telemetry and companion mobile driver app",
    ],
    metaTags: "FINANCIAL FREEDOM · DRIVER PROSPERITY",
    actionText: "Calculate your earnings",
    actionHref: "#contact",
    stats: [
      { value: "70% Lower Costs", label: "Save on everyday operating expenses." },
      { value: "30% Higher Earnings", label: "Spend more time earning and keep more of your income." },
    ],
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
      aria-label="How totooGO works in four steps"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-8 md:py-20 lg:py-28">
        <div className="sss-head-wrap text-center mb-8 md:mb-20 max-w-3xl mx-auto">
          <p className="sss-eyebrow">HOW IT WORKS</p>
          <h2 className="sss-heading">
            Own &amp; earn your freedom, buy, swap, earn, in <em>four simple steps</em>
          </h2>
          <p className="sss-intro mt-5">
            totooGO helps CNG three-wheeler drivers own an electric three-wheeler with easy,
            affordable financing. Our battery subscription removes the worry of costly battery
            replacement, while lower operating costs and higher earnings help drivers achieve
            financial freedom.
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
                  <div className="sss-card-header">
                    <span className="sss-card-eyebrow">{c.eyebrow}</span>
                  </div>

                  <h3 className="sss-card-title">{c.title}</h3>
                  <p className="sss-card-desc">{c.body}</p>

                  <ul className="sss-checkpoints" aria-label="Key highlights">
                    {c.checkpoints.map((pt, idx) => (
                      <li key={idx} className="sss-checkpoint-item">
                        <Check className="sss-check-icon" strokeWidth={2.4} aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="sss-stats">
                    {c.stats.map((s, idx) => (
                      <div className="sss-stat" key={idx}>
                        <span className="sss-stat-value">{s.value}</span>
                        <span className="sss-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="sss-card-footer">
                    <span className="sss-meta-tags">{c.metaTags}</span>
                    <a href={c.actionHref} className="sss-action-link">
                      <span>{c.actionText}</span>
                      <ArrowUpRight className="sss-action-arrow" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="sss-card-media" aria-hidden="true">
                  <div className="sss-icon-tile">
                    <c.Icon className="sss-icon" />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <p className="sss-closing">Drive with TOTOOGO and earn your freedom.</p>
      </div>

      <style>{`
        .sss-section.totoogo {
          background: hsl(var(--c-surface));
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
          scroll-margin-top: 90px;
        }

        /* --- CARD PALETTE & ARCHITECTURE (Progressive Green Deck) --- */
        .sss-card {
          /* Default Step 1: Light Crisp Mint Green with Solid Black Text */
          --c-bg: #F0FDF4;
          --c-text: #000000;
          --c-mute: #111827;
          --c-faint: #374151;
          --c-check: #059669;
          --c-border: rgba(5, 150, 105, 0.22);
          --c-tile-bg: #DCFCE7;
          --c-tile-border: rgba(5, 150, 105, 0.18);
          --c-tile-icon: #065F46;
          --c-tile-shadow: rgba(0, 0, 0, 0.10);
          --c-icon-shadow: rgba(0, 0, 0, 0.14);
          --c-link: #000000;

          background: var(--c-bg);
          color: var(--c-text);
          border-radius: 28px;
          border: 1px solid var(--c-border);
          box-shadow: 0 20px 48px -24px rgba(6, 78, 59, 0.18);
          min-height: clamp(480px, 62vh, 600px);
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2.5rem;
          padding: clamp(2rem, 3.2vw, 3rem);
          align-items: center;
          position: relative;
          box-sizing: border-box;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        /* Step 2: Fresh Soft Pastel Leaf Green with Solid Black Text */
        .sss-card[data-step="2"] {
          --c-bg: #DCFCE7;
          --c-text: #000000;
          --c-mute: #111827;
          --c-faint: #374151;
          --c-check: #047857;
          --c-border: rgba(4, 120, 87, 0.25);
          --c-tile-bg: #BBF7D0;
          --c-tile-border: rgba(4, 120, 87, 0.20);
          --c-tile-icon: #064E3B;
          --c-tile-shadow: rgba(0, 0, 0, 0.12);
          --c-icon-shadow: rgba(0, 0, 0, 0.16);
          --c-link: #000000;
          box-shadow: 0 20px 48px -24px rgba(4, 120, 87, 0.22);
        }

        /* Step 3: Vibrant Rich Emerald Green */
        .sss-card[data-step="3"] {
          --c-bg: #059669;
          --c-text: #FFFFFF;
          --c-mute: rgba(255, 255, 255, 0.94);
          --c-faint: rgba(255, 255, 255, 0.82);
          --c-check: #A7F3D0;
          --c-border: rgba(255, 255, 255, 0.25);
          --c-tile-bg: #047857;
          --c-tile-border: rgba(255, 255, 255, 0.22);
          --c-tile-icon: #FFFFFF;
          --c-tile-shadow: rgba(2, 44, 34, 0.28);
          --c-icon-shadow: rgba(2, 44, 34, 0.32);
          --c-link: #FFFFFF;
          box-shadow: 0 20px 48px -24px rgba(5, 150, 105, 0.35);
        }

        /* Step 4: Deep Signature Forest Green */
        .sss-card[data-step="4"] {
          --c-bg: #064E3B;
          --c-text: #FFFFFF;
          --c-mute: rgba(255, 255, 255, 0.94);
          --c-faint: rgba(255, 255, 255, 0.80);
          --c-check: #6EE7B7;
          --c-border: rgba(255, 255, 255, 0.22);
          --c-tile-bg: #022C22;
          --c-tile-border: rgba(255, 255, 255, 0.18);
          --c-tile-icon: #6EE7B7;
          --c-tile-shadow: rgba(0, 20, 15, 0.45);
          --c-icon-shadow: rgba(0, 20, 15, 0.5);
          --c-link: #FFFFFF;
          box-shadow: 0 24px 52px -24px rgba(2, 44, 34, 0.45);
        }

        .sss-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          justify-content: center;
          min-width: 0;
        }

        .sss-card-header {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 0.1rem;
        }
        .sss-card-eyebrow {
          font-family: 'Ubuntu', monospace, sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--c-faint);
        }

        .sss-card-title {
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: clamp(1.4rem, 2.3vw, 1.85rem);
          line-height: 1.22;
          font-weight: 700;
          margin: 0;
          color: var(--c-text);
          letter-spacing: -0.01em;
        }

        .sss-card-desc {
          font-size: 0.94rem;
          line-height: 1.65;
          color: var(--c-mute);
          margin: 0;
        }

        /* --- 3-Point Checklist --- */
        .sss-checkpoints {
          list-style: none;
          padding: 0;
          margin: 0.2rem 0 0.35rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .sss-checkpoint-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.92rem;
          line-height: 1.45;
          color: var(--c-mute);
        }
        .sss-check-icon {
          width: 1.15rem;
          height: 1.15rem;
          flex-shrink: 0;
          margin-top: 0.12rem;
          color: var(--c-check);
        }

        /* --- Stats Row --- */
        .sss-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem 1.75rem;
          margin-top: 0.2rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--c-border);
        }
        @media (max-width: 520px) {
          .sss-stats { grid-template-columns: 1fr; }
        }
        .sss-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 0;
        }
        .sss-stat-value {
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: clamp(1.05rem, 1.4vw, 1.28rem);
          font-weight: 700;
          color: var(--c-text);
          line-height: 1.2;
          overflow-wrap: anywhere;
        }
        .sss-stat-label {
          font-size: 0.76rem;
          line-height: 1.4;
          color: var(--c-faint);
        }

        /* --- Footer Metadata & Action Link (Always Fully Visible) --- */
        .sss-card-footer {
          margin-top: 0.4rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--c-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .sss-meta-tags {
          font-family: 'Ubuntu', monospace, sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--c-faint);
          font-weight: 600;
        }
        .sss-action-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--c-link);
          text-decoration: underline;
          text-underline-offset: 4px;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .sss-action-link:hover {
          opacity: 0.8;
          transform: translateX(3px);
        }
        .sss-action-arrow {
          width: 1rem;
          height: 1rem;
        }

        /* --- Media Tile: Clean Solid / Soft Glow Background, No Stripes --- */
        .sss-card-media {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .sss-icon-tile {
          position: relative;
          width: 100%;
          aspect-ratio: 1.3 / 1;
          max-height: 380px;
          min-height: 260px;
          border-radius: 24px;
          background-color: var(--c-tile-bg);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.35), 0 16px 36px -18px var(--c-tile-shadow);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--c-tile-border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sss-icon-tile::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.28) 0%, transparent 70%);
          pointer-events: none;
        }
        .sss-icon {
          position: relative;
          z-index: 2;
          width: 96px;
          height: 96px;
          color: var(--c-tile-icon);
          stroke-width: 1.6;
          filter: drop-shadow(0 10px 20px var(--c-icon-shadow));
          transition: transform 0.3s ease;
        }
        .sss-card:hover .sss-icon {
          transform: scale(1.06);
        }

        .sss-closing {
          margin-top: 2.5rem;
          text-align: center;
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 700;
          color: hsl(150 25% 12%);
        }

        /* Desktop Breakpoint */
        @media (min-width: 769px) {
          .sss-card-media {
            min-height: 280px;
          }
          .sss-icon-tile {
            aspect-ratio: 1.3 / 1;
          }
        }

        /* Mobile Breakpoint */
        @media (max-width: 768px) {
          .sss-section.totoogo .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .sss-card {
            display: flex;
            flex-direction: column;
            min-height: 0;
            width: 100%;
            max-width: 100%;
            margin-top: 0;
            padding: 1.75rem 1.35rem;
            gap: 1.35rem;
            border-radius: 20px;
            box-sizing: border-box;
            overflow: hidden;
          }
          .sss-sticky-wrapper {
            position: relative;
            top: auto;
            width: 100%;
            margin-top: 0;
            padding-bottom: 0.85rem;
          }
          .sss-card-content {
            gap: 0.75rem;
            align-self: stretch;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }
          .sss-card-title {
            font-size: 1.35rem;
            line-height: 1.25;
            word-break: break-word;
          }
          .sss-card-desc {
            font-size: 0.9rem;
            line-height: 1.6;
          }
          .sss-checkpoints {
            gap: 0.45rem;
            width: 100%;
            box-sizing: border-box;
          }
          .sss-checkpoint-item {
            font-size: 0.88rem;
            line-height: 1.45;
          }
          .sss-stats {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            margin-top: 0.25rem;
            padding-top: 0.85rem;
            width: 100%;
            box-sizing: border-box;
          }
          .sss-stat-value { font-size: 1.15rem; }
          .sss-stat-label { font-size: 0.78rem; line-height: 1.4; }
          .sss-card-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.65rem;
            padding-top: 0.85rem;
            width: 100%;
            box-sizing: border-box;
          }
          .sss-card-media {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            height: auto;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }
          .sss-icon-tile {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            aspect-ratio: auto;
            min-height: 0;
            height: clamp(140px, 38vw, 175px);
            max-height: 180px;
            border-radius: 18px;
            margin: 0;
            box-sizing: border-box;
          }
          .sss-icon {
            width: 52px;
            height: 52px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sss-card-title,
          .sss-icon,
          .sss-action-link { transition: none; }
        }
      `}</style>
    </section>
  );
}
