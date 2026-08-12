import { useEffect, useRef } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import grayLine from "@/assets/how-it-works/light.svg";
import greenLine from "@/assets/how-it-works/green.svg";
import "./how-it-works.css";

const TRACK_TRAVEL_PX = 1740; // matches BatteryPool reference

const Bolt = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#00A866" aria-hidden="true">
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

const HowItWorksPage = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const green = greenRef.current;
    if (!wrapper || !track || !green) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const p = scrolled / total; // 0..1
      track.style.transform = `translate3d(${-TRACK_TRAVEL_PX * p}px, 0, 0)`;
      green.style.width = `${p * 100}%`;
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
  }, []);

  const steps = [
    {
      n: 1,
      head: "Access",
      body: "Drivers rent or move towards ownership of a battery with simple daily, weekly, or monthly payments.",
    },
    {
      n: 2,
      head: "Charge",
      body: "Whether it’s home charging, fast chargers, or fleet depots, batteries only charge when payments are up to date. Our proprietary software enforces payment discipline at scale.",
    },
    {
      n: 3,
      head: "Monetize",
      body: "Rental batteries stay in our network; owned batteries are bought back. We then redeploy packs into storage and, eventually, recycling, unlocking multiple revenue streams from a single asset.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Desktop: pinned horizontal scroll. Wrapper height drives scroll duration. */}
        <section
          ref={wrapperRef}
          className="bp-how-it-works"
          style={{ height: "300vh", position: "relative" }}
          aria-labelledby="bp-hiw-title"
        >
          <div className="work-sticky">
            <div className="works-overflow">
              <div className="container">
                <div className="section-heading">
                  <Bolt />
                  <h2 className="h2-heading">How it works?</h2>
                </div>
                <div className="work-block">
                  <div className="works-content" ref={trackRef}>
                    <div className="work-col">
                      <div className="_w-col-first">
                        <h2 id="bp-hiw-title" className="work-heading">
                          Battery Ownership Made Easy
                        </h2>
                      </div>
                    </div>

                    <div className="work-col">
                      <div className="_w-col-second">
                        <div className="work-content">
                          <div className="number">{steps[0].n}</div>
                          <div>
                            <div className="num-head">{steps[0].head}</div>
                            <div className="num-para">{steps[0].body}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="work-col">
                      <div className="pointer-disabled">
                        <div className="_w-col-first">
                          <h2 className="work-heading">Battery Swap Made Easy</h2>
                        </div>
                      </div>
                      <div className="_w-col-third">
                        <div className="work-content">
                          <div className="number">{steps[1].n}</div>
                          <div>
                            <div className="num-head">{steps[1].head}</div>
                            <div className="num-para">{steps[1].body}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="work-col">
                      <div className="pointer-disabled">
                        <div className="_w-col-first">
                          <h2 className="work-heading">Battery Swap Made Easy</h2>
                          <div className="work-content">
                            <div className="number">{steps[1].n}</div>
                            <div>
                              <div className="num-head">{steps[1].head}</div>
                              <div className="num-para">Conveniently charge your battery at home whenever you need to.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="_w-col-four">
                        <div className="work-content">
                          <div className="number">{steps[2].n}</div>
                          <div>
                            <div className="num-head">{steps[2].head}</div>
                            <div className="num-para">{steps[2].body}</div>
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
              <h2 className="h2-heading">How it works?</h2>
            </div>
            <h2 className="work-heading">Battery Ownership Made Easy</h2>
            {steps.map((s) => (
              <div key={s.n} className="work-content">
                <div className="number">{s.n}</div>
                <div>
                  <div className="num-head">{s.head}</div>
                  <div className="num-para">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
