import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";

const ContactCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="cu-cta sec-pad" aria-label="Book a call">
      <div className="cu-shell">
        <div className="cu-cta__card reveal">
          <div className="cu-cta__glow" aria-hidden="true" />
          <h2 className="cu-cta__title text-balance">Have an Idea? Let&rsquo;s Talk.</h2>
          <p className="cu-cta__body">
            From electric mobility and fleet transformation to battery swapping
            and strategic partnerships, we&rsquo;re open to conversations that
            can move the ecosystem forward.
          </p>
          <div className="cu-cta__actions">
            <Button asChild className="cu-btn cu-btn--primary">
              <a href="#">
                Book a Call
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
