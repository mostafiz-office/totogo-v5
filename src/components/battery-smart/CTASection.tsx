import { useEffect, useRef } from "react";
import { ArrowRight, Zap, RefreshCw, ShieldCheck } from "lucide-react";
import ctaDesktopImage from "@/assets/ev-ownership-cta-v8.jpg";
import ctaMobileImage from "@/assets/ev-ownership-cta-mobile.jpg";
import { Button } from "@/components/ui/button";
import BrandHeading from "@/components/shared/BrandHeading";

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
      className="relative overflow-hidden bg-[hsl(var(--c-green-soft))]/40 px-4 sm:px-6 md:px-[var(--pad-x)] py-8 md:py-14 lg:py-16"
      id="contact"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="home-brand-cta relative overflow-hidden rounded-[2rem]">
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30 blur-[120px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full opacity-25 blur-[120px]"
            aria-hidden="true"
          />

          <div className="relative grid items-stretch gap-0 md:grid-cols-2">
            {/* Left: text */}
            <div className="reveal p-5 sm:p-12 md:p-16">
              <BrandHeading lead="Ready to" accent="earn more?" className="home-brand-cta__title mb-6 sm:mb-10" />

              <ul
                className="mb-12 space-y-6"
                style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
              >
                {bullets.map(({ title, desc, Icon }) => (
                  <li key={title} className="group flex items-start gap-4">
                    <span className="home-brand-cta__icon mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border transition-colors duration-300 group-hover:border-transparent">
                      <Icon
                        size={18}
                        strokeWidth={2.5}
                        className="home-brand-cta__icon-svg"
                      />
                    </span>
                    <div>
                      <p className="home-brand-cta__bullet-title text-base font-semibold leading-snug md:text-lg">
                        {title}
                      </p>
                      <p className="home-brand-cta__bullet-body mt-1 text-sm leading-relaxed md:text-[15px]">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Button asChild className="home-brand-cta__button group h-auto w-full rounded-full px-6 py-4 text-base font-semibold sm:w-auto sm:px-8">
                <a href="#">
                  Join our waitlist
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Right: image */}
            <div className="reveal relative min-h-[320px] sm:min-h-[380px] md:min-h-full overflow-hidden">
              <picture className="block absolute inset-0 h-full w-full">
                <source media="(min-width: 768px)" srcSet={ctaDesktopImage} />
                <img
                  src={ctaMobileImage}
                  alt="Green Bangladeshi CNG auto-rickshaw next to a totooGO battery swapping cabinet"
                  width={1024}
                  height={686}
                  className="h-full w-full object-cover object-[70%_center] md:object-[right_center]"
                />
              </picture>
              {/* Fade only on desktop side-by-side layout; on mobile the image
                  stacks below the text and must render clean edge to edge (WI-03) */}
              <div className="home-brand-cta__image-fade absolute inset-0 hidden md:block" aria-hidden="true" />
            </div>
          </div>

          {/* Brand bottom line */}
          <div className="home-brand-cta__line absolute bottom-0 left-0 h-1 w-full" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
