import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./solution-slider.css";

export type SolutionSlide = {
  title: string;
  body?: string;
  icon?: ReactNode;
};

type SolutionSliderProps = {
  slides: SolutionSlide[];
  ariaLabel: string;
};

const SolutionSlider = ({ slides, ariaLabel }: SolutionSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".sol-slider__card");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <div className="sol-slider">
      <div
        ref={trackRef}
        className="sol-slider__track"
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onScroll={sync}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCard(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCard(-1);
          }
        }}
      >
        {slides.map((slide) => (
          <article
            key={slide.title}
            className={`sol-slider__card${slide.body ? "" : " sol-slider__card--compact"}`}
          >
            {slide.icon ? (
              <span className="sol-slider__chip" aria-hidden="true">
                {slide.icon}
              </span>
            ) : null}
            <h3 className="sol-slider__title">{slide.title}</h3>
            {slide.body ? <p className="sol-slider__body">{slide.body}</p> : null}
          </article>
        ))}
      </div>

      <div className="sol-slider__nav">
        <button
          type="button"
          className="sol-slider__arrow"
          aria-label="Previous"
          disabled={atStart}
          onClick={() => scrollByCard(-1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className="sol-slider__arrow"
          aria-label="Next"
          disabled={atEnd}
          onClick={() => scrollByCard(1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default SolutionSlider;
