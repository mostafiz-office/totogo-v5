import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandCTA from "@/components/shared/BrandCTA";
import heroImage from "@/assets/contact-hero.jpg";
import { useReveal } from "@/components/investment/useReveal";

const ContactCTA = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="cu-cta sec-pad" aria-label="Book a call">
      <div className="cu-shell">
        <BrandCTA
          image={heroImage}
          imageAlt="totooGO team discussing electric mobility partnerships"
          lead="Have an Idea?"
          accent="Let’s Talk."
          body={<p>
            From electric mobility and fleet transformation to battery swapping
            and strategic partnerships, we&rsquo;re open to conversations that
            can move the ecosystem forward.
          </p>}
          actions={
            <Button asChild className="cu-btn cu-btn--primary">
              <a href="#">
                Book a Call
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          }
        />
      </div>
    </section>
  );
};

export default ContactCTA;
