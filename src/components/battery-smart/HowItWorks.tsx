import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Find a Station",
    desc: "Locate the nearest Totoco swapping station using the Driver App. Real-time availability and queue updates at your fingertips.",
  },
  {
    num: "02",
    title: "2-Minute Swap",
    desc: "Drive in, scan the QR code, and exchange your depleted battery for a fully charged one, faster than a coffee refill.",
  },
  {
    num: "03",
    title: "Ride On",
    desc: "Pay per swap with zero upfront battery cost. Track performance, earnings, and battery health in real time.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[hsl(var(--c-blue-deep))]"
      style={{ padding: "120px var(--pad-x)" }}
      id="how-it-works"
    >
      <div className="relative mx-auto max-w-[1200px]">
        <h2
          className="reveal mb-16 text-center font-bold text-white"
          style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            letterSpacing: "-0.01em",
          }}
        >
          How It <span style={{ color: "hsl(var(--c-green))" }}>Works</span>
        </h2>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* connector line on desktop */}
          <div
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[56px] hidden h-[2px] md:block"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--c-green)), transparent)" }}
          />

          {steps.map((s, i) => (
            <div
              key={s.num}
              className="reveal relative flex flex-col items-center text-center"
              style={{ ["--i" as string]: i } as React.CSSProperties}
            >
              <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--c-green))] bg-[hsl(var(--c-blue-deep))] text-sm font-bold text-[hsl(var(--c-green))]">
                {s.num}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{s.title}</h3>
              <p className="max-w-[320px] text-[15px] leading-relaxed text-white/70">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
