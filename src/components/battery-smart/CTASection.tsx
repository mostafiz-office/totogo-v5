import { useEffect, useRef } from "react";
import { ArrowRight, Zap, RefreshCw, ShieldCheck } from "lucide-react";
import ctaImage from "@/assets/ev-ownership-cta-v8.jpg";

const bullets = [
  {
    title: "Own your EV with ease",
    desc: "Simple, flexible plans designed for you",
    Icon: Zap,
  },
  {
    title: "Affordable battery swapping subscription",
    desc: "No charging hassle, no downtime",
    Icon: RefreshCw,
  },
  {
    title: "No battery worries",
    desc: "We take care of the most expensive part, so you don't have to",
    Icon: ShieldCheck,
  },
];

const CTASection = () => {
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
      { threshold: 0.15 },
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[hsl(var(--c-green-soft))]/40 px-4 py-12 sm:px-6 md:py-20 md:px-[var(--pad-x)]"
      id="contact"
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          className="relative overflow-hidden rounded-[2rem]"
          style={{ backgroundColor: "#E8D4A8" }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30 blur-[120px]"
            style={{ background: "hsl(var(--c-green))" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full opacity-25 blur-[120px]"
            style={{ background: "#C9A876" }}
            aria-hidden="true"
          />

          <div className="relative grid items-stretch gap-0 md:grid-cols-2">
            {/* Left: text */}
            <div className="reveal p-5 sm:p-12 md:p-16">
              <h2
                className="cta-heading mb-6 font-bold sm:mb-10"
                style={{
                  fontFamily: "'Rubik', system-ui, sans-serif",
                  fontSize: "clamp(1.6rem, 6vw, 52px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "#4A2E17",
                }}
              >
                <span style={{ color: "#4A2E17" }}>Ready to</span>{" "}
                <span style={{ color: "hsl(var(--c-green-tree))", textShadow: "1px 0.7px 0 hsl(150 30% 8% / 0.25)" }}>
                  earn more?
                </span>
              </h2>

              <ul
                className="mb-12 space-y-6"
                style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
              >
                {bullets.map(({ title, desc, Icon }) => (
                  <li key={title} className="group flex items-start gap-4">
                    <span
                      className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border transition-colors duration-300 group-hover:border-transparent"
                      style={{
                        backgroundColor: "hsl(var(--c-green) / 0.18)",
                        borderColor: "hsl(var(--c-green) / 0.45)",
                      }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2.5}
                        style={{ color: "hsl(var(--c-green))" }}
                      />
                    </span>
                    <div>
                      <p
                        className="text-base font-semibold leading-snug md:text-lg"
                        style={{ color: "#4A2E17" }}
                      >
                        {title}
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed md:text-[15px]"
                        style={{ color: "#4A2E17", opacity: 0.72 }}
                      >
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--c-green)/0.5)] sm:w-auto sm:px-8"
                style={{
                  fontFamily: "'Poppins', system-ui, sans-serif",
                  backgroundColor: "hsl(var(--c-green))",
                  color: "#0f2417",
                }}
              >
                Join our waitlist
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Right: image */}
            <div className="reveal relative min-h-[340px] overflow-hidden md:min-h-full">
              <img
                src={ctaImage}
                alt="Green Bangladeshi CNG auto-rickshaw next to a battery swapping cabinet with taka coins"
                loading="lazy"
                width={1280}
                height={896}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "right center" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, #E8D4A8 0%, rgba(232,212,168,0.4) 25%, transparent 60%)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Brand bottom line */}
          <div
            className="absolute bottom-0 left-0 h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--c-green)), #6B4423, hsl(var(--c-green)))",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
