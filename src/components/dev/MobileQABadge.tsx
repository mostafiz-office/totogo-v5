import { useEffect, useState } from "react";

type Check = { name: string; pass: boolean; detail?: string };

/**
 * Dev-only mobile QA badge. Runs three assertions on mount + on resize:
 *  1. No element wider than 100vw (horizontal scroll guard)
 *  2. No vertical gap > 40vh between consecutive top-level sections
 *  3. Hero illustration (.Home_bannerDesktop__IJBqP) ≥ 35% of viewport height
 *
 * Renders only when import.meta.env.DEV is true and viewport ≤ 768px.
 */
const MobileQABadge = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const run = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw > 768) {
        setVisible(false);
        return;
      }
      setVisible(true);

      // 1. Overflow check
      const overflowing: string[] = [];
      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        if (el.offsetWidth > vw + 1) {
          overflowing.push(`${el.tagName.toLowerCase()}.${el.className?.toString().slice(0, 30)}`);
        }
      });

      // 2. Empty band check (between <main> direct children)
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > *"),
      );
      let biggestGap = 0;
      for (let i = 0; i < sections.length - 1; i++) {
        const a = sections[i].getBoundingClientRect();
        const b = sections[i + 1].getBoundingClientRect();
        const gap = b.top - a.bottom;
        if (gap > biggestGap) biggestGap = gap;
      }

      // 3. Hero illustration size
      const banner = document.querySelector<HTMLElement>(
        ".Home_bannerDesktop__IJBqP",
      );
      const bannerH = banner?.getBoundingClientRect().height ?? 0;
      const bannerRatio = bannerH / vh;

      setChecks([
        {
          name: "no overflow >100vw",
          pass: overflowing.length === 0,
          detail: overflowing.slice(0, 2).join(", "),
        },
        {
          name: "no gap >40vh",
          pass: biggestGap <= vh * 0.4,
          detail: `${Math.round(biggestGap)}px`,
        },
        {
          name: "hero ≥35vh",
          pass: bannerRatio >= 0.35,
          detail: `${Math.round(bannerRatio * 100)}%`,
        },
      ]);
    };

    run();
    // Re-check at several intervals so we catch the banner after its delayed
    // mount (mobile reveal is ~2.6s) and after layout settles.
    const timers = [500, 1500, 3000, 5000].map((ms) =>
      window.setTimeout(run, ms),
    );
    window.addEventListener("resize", run);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("resize", run);
    };
  }, []);

  if (!import.meta.env.DEV || !visible) return null;

  const allPass = checks.every((c) => c.pass);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        right: 8,
        zIndex: 9999,
        background: allPass ? "rgba(16,122,86,0.92)" : "rgba(180,40,40,0.92)",
        color: "white",
        font: "11px/1.3 ui-monospace,monospace",
        padding: "6px 8px",
        borderRadius: 6,
        maxWidth: 220,
        pointerEvents: "none",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 2 }}>
        mobile QA: {allPass ? "✓ pass" : "✗ fail"}
      </div>
      {checks.map((c) => (
        <div key={c.name}>
          {c.pass ? "✓" : "✗"} {c.name}
          {c.detail ? ` (${c.detail})` : ""}
        </div>
      ))}
    </div>
  );
};

export default MobileQABadge;
