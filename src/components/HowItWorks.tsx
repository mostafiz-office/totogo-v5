import { useEffect, useRef } from "react";
import grayLine from "@/assets/how-it-works/light.svg";
import greenLine from "@/assets/how-it-works/green.svg";
import "@/pages/how-it-works.css";

const TRACK_TRAVEL_PX = 1740;

const STEPS = [
  {
    n: 1,
    title: "BUY",
    body: "Get on the road with ease. Drivers can own a vehicle through our flexible weekly or monthly payment plans, designed to be simple, affordable, and accessible.",
  },
  {
    n: 2,
    title: "SWAP",
    body: "Stay powered without the hassle. With our battery swapping subscription, drivers can exchange depleted batteries in minutes, no waiting, no downtime.",
  },
  {
    n: 3,
    title: "EARN",
    body: "Drive more, earn more. With a safe, fully licensed electric vehicle, drivers can increase their income by up to 70% while operating with confidence and stability.",
  },
] as const;

const HEADLINE = "EV Ownership Made Easy";
const SECONDARY_HEADLINE = "Battery Swap Made Easy";

const Bolt = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#00CE7E" aria-hidden="true">
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

interface Props {
  forcedProgress?: number;
}

const HowItWorks = ({ forcedProgress }: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const green = greenRef.current;
    if (!wrapper || !track || !green) return;

    const apply = (p: number) => {
      track.style.transform = `translate3d(${-TRACK_TRAVEL_PX * p}px, 0, 0)`;
      green.style.width = `${p * 100}%`;
    };

    if (typeof forcedProgress === "number") {
      apply(Math.max(0, Math.min(1, forcedProgress)));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      apply(scrolled / total);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [forcedProgress]);

  return (
    <section
      ref={wrapperRef}
      className="bp-how-it-works"
      aria-labelledby="how-it-works-title"
    >
      <div className="work-sticky">
        <div className="works-overflow">
          <div className="container">
            <div className="section-heading">
              <Bolt />
            </div>
            <div className="work-block">
              <div className="works-content" ref={trackRef}>
                <div className="work-col">
                  <div className="_w-col-first">
                    <h2 id="how-it-works-title" className="work-heading">
                      {HEADLINE}
                    </h2>
                  </div>
                </div>

                <div className="work-col">
                  <div className="_w-col-second">
                    <div className="work-content">
                      <div className="number">{STEPS[0].n}</div>
                      <div>
                        <div className="num-head">{STEPS[0].title}</div>
                        <div className="num-para">{STEPS[0].body}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="work-col">
                  <div className="pointer-disabled">
                    <div className="_w-col-first">
                      <h2 className="work-heading">{SECONDARY_HEADLINE}</h2>
                    </div>
                  </div>
                  <div className="_w-col-third">
                    <div className="work-content">
                      <div className="number">{STEPS[1].n}</div>
                      <div>
                        <div className="num-head">{STEPS[1].title}</div>
                        <div className="num-para">{STEPS[1].body}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="work-col">
                  <div className="pointer-disabled">
                    <div className="_w-col-first">
                      <h2 className="work-heading">{SECONDARY_HEADLINE}</h2>
                      <div className="work-content">
                        <div className="number">{STEPS[1].n}</div>
                        <div>
                          <div className="num-head">{STEPS[1].title}</div>
                          <div className="num-para">
                            Conveniently charge your battery at home whenever you need to.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="_w-col-four">
                    <div className="work-content">
                      <div className="number">{STEPS[2].n}</div>
                      <div>
                        <div className="num-head">{STEPS[2].title}</div>
                        <div className="num-para">{STEPS[2].body}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="work-lines">
                  <div className="line-gray">
                    <img src={grayLine} alt="" className="gray-line-image" loading="lazy" />
                    <div className="green-lines" ref={greenRef}>
                      <img src={greenLine} alt="" className="green-line-image" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked fallback */}
      <div className="bp-mobile container">
        <div className="section-heading" style={{ marginLeft: 0 }}>
          <Bolt />
        </div>
        <h2 className="work-heading">{HEADLINE}</h2>
        {STEPS.map((s) => (
          <div key={s.n} className="work-content" data-step={s.n}>
            <div className="number">{s.n}</div>
            <div>
              <div className="num-head">{s.title}</div>
              <div className="num-para">{s.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
