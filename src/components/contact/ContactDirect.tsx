import { Mail, Phone } from "lucide-react";
import { useReveal } from "@/components/investment/useReveal";

const ContactDirect = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="cu-direct sec-pad" aria-label="Direct contact">
      <div className="cu-shell">
        <div className="cu-intro reveal">
          <h2 className="cu-h2">Prefer to Reach Us Directly?</h2>
        </div>

        <ul className="cu-direct__cards">
          <li className="cu-direct__card reveal">
            <h3 className="cu-direct__title">Investment Enquiries</h3>
            <a href="mailto:hyder@totoogo.com" className="cu-direct__row">
              <Mail aria-hidden="true" />
              hyder@totoogo.com
            </a>
            <a href="tel:+8801711083456" className="cu-direct__row">
              <Phone aria-hidden="true" />
              +880 17 1108 3456
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactDirect;
