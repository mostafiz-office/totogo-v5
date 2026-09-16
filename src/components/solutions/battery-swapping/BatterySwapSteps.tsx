import { useReveal } from "@/components/investment/useReveal";

const STEPS = [
  { title: "Arrive", body: "Visit the nearest totooGO swapping station." },
  { title: "Swap", body: "Exchange the depleted battery for a charged one." },
  { title: "Go", body: "Continue your journey with minimal downtime." },
];

const BatterySwapSteps = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="bs-steps sec-pad" aria-label="How it works">
      <div className="bs-shell">
        <h2 className="bs-h2 reveal">How It Works</h2>

        <div className="bs-steps__grid">
          {STEPS.map((step, i) => (
            <article
              key={step.title}
              className="bs-step reveal"
              style={{ ["--i" as string]: i }}
            >
              <span className="bs-step__badge" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="bs-step__title">{step.title}</h3>
              <p className="bs-step__body">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BatterySwapSteps;
