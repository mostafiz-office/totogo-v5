import { useEffect, useRef } from "react";
import grayLine from "@/assets/how-it-works/light.svg";
import greenLine from "@/assets/how-it-works/green.svg";
import { computeRailFillPx, computeRailRisePx } from "./howItWorks.frame";
import "@/pages/how-it-works.css";

/* Fallback only; real travel is measured from the track at runtime. */
const TRACK_TRAVEL_PX = 1740;
/* Reach the last step before the section ends so step 3 stays readable. */
const TRAVEL_COMPLETE_AT = 0.85;
/* Rail artwork geometry (src/assets/how-it-works/*.svg), viewBox units. */
const RAIL_VIEWBOX_W = 2870;
const RAIL_BEND_X = [710.614, 1434.54, 2157.3];
const RAIL_BEND_Y = [276.573, 547.072, 817.571];

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

    /* Distance needed so the last column ends flush with the visible edge,
       accounting for the container's left offset inside the overflow box. */
    let stripWidthPx = track.getBoundingClientRect().width;
    let focusPx = 0;
    let leadPx = 0;
    let knotShift: number[] = [];
    let knotRise: number[] = [];

    const measure = () => {
      const overflow = track.closest(".works-overflow") as HTMLElement | null;
      if (!overflow) return TRACK_TRAVEL_PX;
      const prev = track.style.transform;
      track.style.transform = "translate3d(0,0,0)";
      const trackRect = track.getBoundingClientRect();
      const flushTravel = trackRect.right - overflow.getBoundingClientRect().right;
      stripWidthPx = trackRect.width;
      /* Rail bends in strip coordinates drive both the fill and the lift. */
      const railImg = track.querySelector<HTMLImageElement>(".gray-line-image");
      if (railImg) {
        const r = railImg.getBoundingClientRect();
        const s = r.width / RAIL_VIEWBOX_W;
        const originX = r.left - trackRect.left;
        focusPx = originX + RAIL_BEND_X[0] * s;
        leadPx = (RAIL_BEND_X[1] - RAIL_BEND_X[0]) * s * 0.18;
        knotShift = RAIL_BEND_X.map((x) => (x - RAIL_BEND_X[0]) * s);
        knotRise = RAIL_BEND_Y.map((y) => (y - RAIL_BEND_Y[0]) * s);
      }
      track.style.transform = prev;
      return Math.max(flushTravel, TRACK_TRAVEL_PX);
    };

    let travelPx = measure();

    const apply = (p: number) => {
      const t = Math.min(1, p / TRAVEL_COMPLETE_AT);
      const shift = travelPx * t;
      const rise = computeRailRisePx(shift, knotShift, knotRise);
      track.style.transform = `translate3d(${-shift}px, ${-rise}px, 0)`;
      green.style.width = `${computeRailFillPx(
        p,
        travelPx,
        focusPx,
        stripWidthPx,
        TRAVEL_COMPLETE_AT,
        leadPx,
      )}px`;
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

    const onResize = () => {
      travelPx = measure();
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
