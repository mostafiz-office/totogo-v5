import { useEffect, useRef } from "react";
import { ListChecks, Wallet, BatteryCharging, TrendingUp } from "lucide-react";

type Card = {
  step: number;
  category: string;
  title: string;
  body: React.ReactNode;
  stats: [{ value: string; label: string }, { value: string; label: string }];
  Icon: React.ComponentType<{ className?: string }>;
};

const CARDS: Card[] = [
  {
    step: 1,
    category: "CHOOSE",
    Icon: ListChecks,
    title: "Choose your E3W, Start your ELECTRIC journey!",
    body: "Select a totooGO electric three-wheeler built for affordable, efficient everyday driving.",
    stats: [
      { value: "3-5 kW Motor", label: "Built for low-cost, efficient mobility." },
      { value: "Comfortable Ride", label: "Designed for the real needs of CNG & EV drivers." },
    ],
  },
  {
    step: 2,
    category: "BUY",
    Icon: Wallet,
    title: "Own your vehicle! Own Your Future!",
    body: "Get your TOTOOGO E3W with easy, pocket-friendly financing and start building your own asset!",
    stats: [
      { value: "Tk. 20,000", label: "Downpayment starts from" },
      { value: "Tk 600-900", label: "Daily installment, less than CNG rent." },
    ],
  },
  {
    step: 3,
    category: "SWAP",
    Icon: BatteryCharging,
    title: "Swap & Drive, No Expensive Battery Replacement!",
    body: "With totooGO, you don't pay for costly battery replacement—only a simple subscription that keeps you on the road.",
    stats: [
      { value: "24/7 On Road", label: "Keep driving anytime with uninterrupted battery access." },
      {
        value: "30-Second Quick Swap",
        label: "Swap your battery in seconds and get back to earning. Stay moving and pay only for what you use.",
      },
    ],
  },
  {
    step: 4,
    category: "Earn",
    Icon: TrendingUp,
    title: "Drive More. Earn More. Build Your Freedom!",
    body: "With lower running costs and more time on the road, totooGO helps you keep more of what you earn and build towards financial freedom.",
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
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        <div className="sss-head-wrap text-center mb-14 md:mb-20 max-w-3xl mx-auto">
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
                <span className="sss-step-badge">0{c.step}</span>
                <div className="sss-card-content">
                  <span className="sss-category">{c.category}</span>
                  <h3 className="sss-card-title">{c.title}</h3>
                  <p className="sss-card-desc">{c.body}</p>
                  <div className="sss-stats">
                    {c.stats.map((s, idx) => (
                      <div className="sss-stat" key={idx}>
                        <span className="sss-stat-value">{s.value}</span>
                        <span className="sss-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sss-card-media" aria-hidden>
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
        }
        .sss-card {
          --c-bg: #F5FBF8;
          --c-text: #002366;
          --c-mute: hsl(220 100% 20% / 0.8);
          --c-faint: hsl(220 100% 20% / 0.6);
          --c-border: hsl(220 100% 20% / 0.18);
          --c-hover: #00CE7E;
          --c-tile-bg: #002366;
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
          position: relative;
        }
        @media (max-width: 768px) {
          .sss-card { grid-template-columns: 1fr; min-height: 0; }
          .sss-sticky-wrapper { position: relative; top: auto; padding-bottom: 1rem; }
        }

        .sss-card[data-step="2"] {
          --c-bg: #DFF4EA;
          --c-tile-bg: #00CE7E;
          --c-tile-icon: #ffffff;
        }
        .sss-card[data-step="3"] {
          --c-bg: #B8E9D2;
          --c-tile-bg: #002366;
          --c-tile-icon: #ffffff;
        }

        .sss-card[data-step="4"] {
          --c-bg: #002366;
          --c-text: #ffffff;
          --c-mute: hsl(0 0% 100% / 0.82);
          --c-faint: hsl(0 0% 100% / 0.6);
          --c-border: hsl(0 0% 100% / 0.25);
          --c-hover: #00CE7E;
          --c-tile-bg: #F8FBF9;
          --c-tile-icon: #002366;
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
        .sss-card-title { color: var(--c-text); }

        .sss-card-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--c-mute);
          margin: 0;
        }

        .sss-stats {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem; margin-top: 0.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--c-border);
        }
        @media (max-width: 520px) { .sss-stats { grid-template-columns: 1fr; } }
        .sss-stat { display: flex; flex-direction: column; gap: 0.35rem; min-width: 0; }
        .sss-stat-value {
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: clamp(1.05rem, 1.5vw, 1.35rem); font-weight: 700; color: var(--c-text);
          line-height: 1.2; overflow-wrap: anywhere;
        }
        .sss-stat-label {
          font-size: 0.75rem; line-height: 1.5; color: var(--c-faint);
        }
        .sss-closing {
          margin-top: 2.5rem;
          text-align: center;
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 700;
          color: hsl(150 25% 12%);
        }


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
          .sss-card-title { transition: none; }
        }
      `}</style>
    </section>
  );
}
