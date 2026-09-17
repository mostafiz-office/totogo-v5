import { Headset, Truck, Handshake, TrendingUp, ArrowDown } from "lucide-react";
import { useReveal } from "@/components/investment/useReveal";
import BrandHeading from "@/components/shared/BrandHeading";

export const TOPIC_OPTIONS = [
  "Driver Support",
  "Fleet Onboarding",
  "Station Partnership",
  "Business Partnership",
  "Investment",
  "General Enquiry",
] as const;

export type TopicOption = (typeof TOPIC_OPTIONS)[number];

const TOPICS: {
  title: string;
  body: string;
  icon: typeof Headset;
  selectValue: TopicOption;
}[] = [
  {
    title: "Driver Support",
    body: "Questions about battery swapping, the Driver App, or using the totooGO network.",
    icon: Headset,
    selectValue: "Driver Support",
  },
  {
    title: "Fleet Solutions",
    body: "Interested in moving your 2- or 3-wheeler fleet to electric.",
    icon: Truck,
    selectValue: "Fleet Onboarding",
  },
  {
    title: "Partnerships",
    body: "Explore opportunities to become a swapping station or ecosystem partner.",
    icon: Handshake,
    selectValue: "Station Partnership",
  },
  {
    title: "Investment",
    body: "Connect with our team regarding the current investment opportunity.",
    icon: TrendingUp,
    selectValue: "Investment",
  },
];

type ContactTopicsProps = {
  onSelect: (topic: TopicOption) => void;
};

const ContactTopics = ({ onSelect }: ContactTopicsProps) => {
  const ref = useReveal<HTMLElement>();

  const handleSelect = (topic: TopicOption) => {
    onSelect(topic);
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="cu-topics sec-pad" aria-label="How can we help">
      <div className="cu-shell">
        <div className="cu-intro reveal">
          <BrandHeading as="h2" lead="Choose What You’d Like" accent="to Talk About" className="cu-h2" />
        </div>

        <ul className="cu-topic-cards">
          {TOPICS.map((topic, index) => (
            <li key={topic.title} className="reveal" style={{ ["--i" as string]: index }}>
              <button
                type="button"
                className="cu-topic-card"
                onClick={() => handleSelect(topic.selectValue)}
              >
                <span className="cu-topic-card__chip" aria-hidden="true">
                  <topic.icon />
                </span>
                <span className="cu-topic-card__title">{topic.title}</span>
                <span className="cu-topic-card__body">{topic.body}</span>
                <span className="cu-topic-card__cta">
                  Start the conversation
                  <ArrowDown aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ContactTopics;
