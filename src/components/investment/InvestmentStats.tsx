import { useEffect, useRef, useState } from "react";

type Stat = {
  prefix: string;
  number: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { prefix: "US$", number: 750, suffix: "K", label: "Target Raise" },
  { prefix: "US$", number: 5, suffix: "M", label: "Pre-Money Valuation" },
  { prefix: "US$", number: 50, suffix: "K", label: "Minimum Investment" },
  { prefix: "Up to ", number: 15, suffix: "", label: "Minimum-Ticket Allocations*" },
];

const DURATION = 1400;

const InvestmentStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      setStarted(true);
      el.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-in"));

      if (reduced) {
        setValues(STATS.map((s) => s.number));
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3);
        setValues(STATS.map((s) => Math.round(s.number * eased)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          run();
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="inv-stats sec-pad"
      aria-label="Funding round at a glance"
    >
      <div className="inv-shell">
        <div className="inv-stats__grid">
          {STATS.map((stat, i) => {
            const full = `${stat.prefix}${stat.number}${stat.suffix}`;
            return (
              <div
                key={stat.label}
                className="inv-stats__cell reveal"
                style={{ ["--i" as string]: i }}
              >
                <span className="inv-stats__value" aria-label={full}>
                  <span aria-hidden="true">
                    {stat.prefix}
                    {started ? values[i] : 0}
                    {stat.suffix}
                  </span>
                </span>
                <span className="inv-stats__label">{stat.label}</span>
              </div>
            );
          })}
        </div>
        <p className="inv-stats__note">*Minimum-ticket allocations</p>
      </div>
    </section>
  );
};

export default InvestmentStats;
