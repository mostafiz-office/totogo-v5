import { useEffect, useState } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";
import Footer from "@/components/site-footer/SiteFooter";
import ContactHero from "@/components/contact/ContactHero";
import ContactTopics, { type TopicOption } from "@/components/contact/ContactTopics";
import ContactForm from "@/components/contact/ContactForm";
import ContactDirect from "@/components/contact/ContactDirect";
import ContactCTA from "@/components/contact/ContactCTA";
import "./contact.css";

const PAGE_TITLE = "Contact Us | totooGO";
const PAGE_DESCRIPTION =
  "Whether you're a driver, fleet operator, station partner, investor, or business looking to collaborate, the totooGO team is ready to connect.";

const ContactPage = () => {
  const [topic, setTopic] = useState<TopicOption | "">("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const previousTitle = document.title;
    const metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = metaEl?.getAttribute("content") ?? null;

    document.title = PAGE_TITLE;
    metaEl?.setAttribute("content", PAGE_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (metaEl && previousDescription !== null) {
        metaEl.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <div className="contact-page min-h-screen bg-background">
      <SiteHeader />
      <main>
        <ContactHero />
        <ContactTopics onSelect={setTopic} />
        <ContactForm topic={topic} onTopicChange={setTopic} />
        <ContactDirect />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
