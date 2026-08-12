import { useEffect, useRef } from "react";

const TwoWheeler = () => (
  <svg viewBox="0 0 96 72" fill="none" aria-hidden="true">
    <circle cx="20" cy="54" r="12" stroke="hsl(var(--c-blue))" strokeWidth="3" />
    <circle cx="76" cy="54" r="12" stroke="hsl(var(--c-blue))" strokeWidth="3" />
    <path d="M20 54 L40 28 L62 28 L76 54" stroke="hsl(var(--c-blue))" strokeWidth="3" strokeLinejoin="round" />
    <path d="M40 28 L52 28" stroke="hsl(var(--c-green))" strokeWidth="4" strokeLinecap="round" />
    <path d="M62 28 L70 18" stroke="hsl(var(--c-blue))" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const ThreeWheeler = () => (
  <svg viewBox="0 0 96 72" fill="none" aria-hidden="true">
    <path d="M16 50 Q16 22 48 22 Q80 22 80 50" stroke="hsl(var(--c-blue))" strokeWidth="3" />
    <path d="M16 50 L80 50" stroke="hsl(var(--c-blue))" strokeWidth="3" />
    <circle cx="26" cy="60" r="8" stroke="hsl(var(--c-blue))" strokeWidth="3" />
    <circle cx="70" cy="60" r="8" stroke="hsl(var(--c-blue))" strokeWidth="3" />
    <rect x="38" y="32" width="20" height="12" fill="hsl(var(--c-green))" rx="2" />
  </svg>
);
const Loader = () => (
  <svg viewBox="0 0 96 72" fill="none" aria-hidden="true">
    <rect x="10" y="32" width="40" height="22" stroke="hsl(var(--c-blue))" strokeWidth="3" rx="2" />
    <path d="M50 38 L72 38 L86 52 L50 52 Z" stroke="hsl(var(--c-blue))" strokeWidth="3" strokeLinejoin="round" />
    <rect x="56" y="42" width="14" height="8" fill="hsl(var(--c-green))" />
    <circle cx="22" cy="58" r="7" stroke="hsl(var(--c-blue))" strokeWidth="3" />
    <circle cx="70" cy="58" r="7" stroke="hsl(var(--c-blue))" strokeWidth="3" />
  </svg>
);

const cards = [
  { Icon: TwoWheeler, title: "Electric 2-wheeler", desc: "Swappable batteries for scooters and bikes, zero downtime, maximum range." },
  { Icon: ThreeWheeler, title: "Electric 3-wheelers", desc: "Power delivery and passenger autos keep earning with 2-minute swaps." },
  { Icon: Loader, title: "Electric Loaders", desc: "Light commercial vehicles run longer with our dense swapping network." },
];

const Potential = () => {
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
      { threshold: 0.2 }
    );
    sectionRef.current?.querySelectorAll(".reveal, .ypath").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="potential relative overflow-hidden"
      style={{ padding: "120px var(--pad-x)" }}
      id="potential"
    >
      {/* Background Y-path */}
      <div
        className="ypath reveal pointer-events-none absolute inset-0 mx-auto flex justify-center"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 900" className="h-full w-full max-w-[1200px]" fill="none">
          {/* outer thicker stroke */}
          <path
            d="M600 60 L600 460 M600 460 L240 760 M600 460 L600 760 M600 460 L960 760"
            stroke="hsl(var(--c-green-soft))"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* inner highlight */}
          <path
            d="M600 60 L600 460 M600 460 L240 760 M600 460 L600 760 M600 460 L960 760"
            stroke="#E6FAF1"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* capsule highlights */}
          <rect x="230" y="700" width="20" height="60" rx="10" fill="hsl(var(--c-green))" opacity="0.55" />
          <rect x="590" y="700" width="20" height="60" rx="10" fill="hsl(var(--c-green))" opacity="0.55" />
          <rect x="950" y="700" width="20" height="60" rx="10" fill="hsl(var(--c-green))" opacity="0.55" />
        </svg>
      </div>

      <h2
        className="potential__title reveal relative text-center font-bold"
        style={{
          fontSize: "clamp(36px, 4.5vw, 64px)",
          marginBottom: "80px",
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ color: "hsl(var(--c-green))" }}>Potential</span>{" "}
        <span style={{ color: "hsl(var(--c-blue))" }}>For…</span>
      </h2>

      <div className="potential__grid relative mx-auto grid max-w-[1200px] gap-8 md:grid-cols-3">
        {cards.map(({ Icon, title, desc }, i) => (
          <article
            key={title}
            className="pcard reveal group relative flex flex-col items-center rounded-3xl border border-[hsl(var(--c-green-soft))] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(15,171,113,0.18)]"
            style={{ ["--i" as string]: i } as React.CSSProperties}
          >
            <div className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-2xl bg-[hsl(var(--c-green-soft))]">
              <Icon />
            </div>
            <h3 className="mb-3 text-center text-xl font-semibold text-[hsl(var(--c-blue))]">
              {title}
            </h3>
            <p className="text-center text-[15px] leading-relaxed text-muted-foreground">
              {desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Potential;
