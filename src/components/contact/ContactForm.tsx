import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/investment/useReveal";
import { TOPIC_OPTIONS, type TopicOption } from "./ContactTopics";

type ContactFormProps = {
  topic: TopicOption | "";
  onTopicChange: (topic: TopicOption) => void;
};

type Errors = Partial<Record<"name" | "phone" | "email" | "topic" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ topic, onTopicChange }: ContactFormProps) => {
  const ref = useReveal<HTMLElement>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = "Please enter your full name.";
    if (!phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!topic) nextErrors.topic = "Please choose what you're interested in.";
    if (!message.trim()) nextErrors.message = "Please write your message.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`cu-field-${firstKey}`)?.focus();
      return;
    }

    const subject = `Website enquiry — ${topic}`;
    const body = [
      `Full Name: ${name.trim()}`,
      `Phone Number: ${phone.trim()}`,
      `Email Address: ${email.trim()}`,
      `I'm Interested In: ${topic}`,
      company.trim() ? `Company / Organization: ${company.trim()}` : null,
      "",
      "Message:",
      message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:hello@totoogo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="contact-form" className="cu-form sec-pad" aria-label="Contact form">
      <div className="cu-shell">
        <div className="cu-intro reveal">
          <h2 className="cu-h2">Send Us a Message</h2>
        </div>

        <form className="cu-form__card reveal" onSubmit={handleSubmit} noValidate>
          <div className="cu-form__grid">
            <div className="cu-field">
              <label htmlFor="cu-field-name">Full Name</label>
              <input
                id="cu-field-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "cu-error-name" : undefined}
                autoComplete="name"
              />
              {errors.name && <p className="cu-field__error" id="cu-error-name">{errors.name}</p>}
            </div>

            <div className="cu-field">
              <label htmlFor="cu-field-phone">Phone Number</label>
              <input
                id="cu-field-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "cu-error-phone" : undefined}
                autoComplete="tel"
              />
              {errors.phone && <p className="cu-field__error" id="cu-error-phone">{errors.phone}</p>}
            </div>

            <div className="cu-field">
              <label htmlFor="cu-field-email">Email Address</label>
              <input
                id="cu-field-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "cu-error-email" : undefined}
                autoComplete="email"
              />
              {errors.email && <p className="cu-field__error" id="cu-error-email">{errors.email}</p>}
            </div>

            <div className="cu-field">
              <label htmlFor="cu-field-topic">I&rsquo;m Interested In</label>
              <select
                id="cu-field-topic"
                value={topic}
                onChange={(e) => onTopicChange(e.target.value as TopicOption)}
                aria-invalid={Boolean(errors.topic)}
                aria-describedby={errors.topic ? "cu-error-topic" : undefined}
              >
                <option value="">Select a topic</option>
                {TOPIC_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.topic && <p className="cu-field__error" id="cu-error-topic">{errors.topic}</p>}
            </div>

            <div className="cu-field">
              <label htmlFor="cu-field-company">Company / Organization (optional)</label>
              <input
                id="cu-field-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                autoComplete="organization"
              />
            </div>

            <div className="cu-field cu-field--full">
              <label htmlFor="cu-field-message">Message</label>
              <textarea
                id="cu-field-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "cu-error-message" : undefined}
              />
              {errors.message && <p className="cu-field__error" id="cu-error-message">{errors.message}</p>}
            </div>
          </div>

          <div className="cu-form__actions">
            <Button type="submit" className="cu-btn cu-btn--primary">
              Submit Enquiry
              <Send aria-hidden="true" />
            </Button>
          </div>

          {submitted && (
            <p className="cu-form__note" role="status">
              Your email app should open with your enquiry pre-filled. If not,
              write to us at <a href="mailto:hello@totoogo.com">hello@totoogo.com</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
