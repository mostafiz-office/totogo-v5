import { Facebook, Linkedin, Youtube, Instagram, Phone, Mail, MapPin } from "lucide-react";
import logoSrc from "@/assets/totoogo-logo.png";
import { XIcon, TikTokIcon } from "./social-icons";
import "./footer.css";

type NavItem = { label: string; href: string; title?: string; external?: boolean };

const year = new Date().getFullYear();

const quickLinks: NavItem[] = [
  { label: "The Idea", href: "/the-idea/", title: "Learn about totooGO's mission and team" },
  { label: "Our Solutions", href: "/solutions/", title: "Battery swapping, apps and fleet solutions" },
  { label: "Safety Center", href: "/safety/", title: "Battery safety standards and certifications" },
  { label: "Newsroom", href: "/media/news/", title: "Latest totooGO press and announcements" },
  { label: "Careers", href: "/careers/", title: "Open roles at totooGO" },
  { label: "Contact", href: "/contact/", title: "Get in touch with the totooGO team" },
];

const specialtyLinks: NavItem[] = [
  { label: "Battery Swapping", href: "/solutions/battery-swapping/", title: "Swap a depleted battery in under 2 minutes" },
  { label: "Driver App", href: "/solutions/driver-app/", title: "Find the nearest swap station in real time" },
  { label: "Partner App", href: "/solutions/partner-app/", title: "Run a swap station with one tap" },
  { label: "Fleet Onboarding", href: "/solutions/fleet/", title: "Electrify your 2 and 3-wheeler fleet" },
  { label: "2-Wheeler Network", href: "/network/two-wheeler/", title: "Two-wheeler swap network coverage" },
  { label: "3-Wheeler Network", href: "/network/three-wheeler/", title: "Three-wheeler swap network coverage" },
  { label: "Station Locator", href: "/stations/", title: "Find totooGO swap stations near you" },
  { label: "Subscription Plans", href: "/plans/", title: "Affordable battery swap subscriptions" },
  { label: "Become a Partner", href: "/partner/", title: "Host a totooGO swap station" },
  { label: "Sustainability", href: "/sustainability/", title: "Our impact on clean urban mobility" },
];

const legalLinks: NavItem[] = [
  { label: "Privacy", href: "/privacy/", title: "totooGO privacy policy" },
  { label: "Cookies", href: "/cookies/", title: "totooGO cookie policy" },
  { label: "Disclaimer", href: "/disclaimer/", title: "totooGO terms and disclaimer" },
];

const SiteFooter = () => {
  return (
    <footer className="site-footer border-t border-border/40">
      {/* Row 1, Main */}
      <div className="site-footer-row-main">
        <div className="mx-auto max-w-[1200px] px-[var(--pad-x)] py-16 md:py-20">
          <div className="site-footer-grid-main">
            {/* Brand */}
            <div>
              <a href="/" aria-label="totooGO home" className="inline-block mb-5">
                <img src={logoSrc} alt="totooGO" className="footer-logo h-14 w-auto" />
              </a>
              <p className="text-sm leading-relaxed text-[hsl(var(--footer-body)/0.7)]">
                totooGO operates Bangladesh's largest{" "}
                <a href="/solutions/battery-swapping/" title="Two-minute battery swap network across Bangladesh" className="site-footer-link font-medium">
                  battery swapping network
                </a>{" "}
                for electric 2 and 3 wheelers, making clean urban mobility affordable through fast{" "}
                <a href="/stations/" title="Find a totooGO swap station near you" className="site-footer-link font-medium">
                  swap stations
                </a>{" "}
                and an easy{" "}
                <a href="/solutions/driver-app/" title="totooGO driver app, find the nearest station" className="site-footer-link font-medium">
                  driver app
                </a>
                .
              </p>
            </div>

            {/* Quick Links */}
            <nav aria-label="Quick links">
              <h4 className="text-base font-semibold mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} title={l.title} className="site-footer-link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h4 className="text-base font-semibold mb-5">Contact</h4>
              <ul className="space-y-2 md:space-y-4 text-sm">
                <li>
                  <a href="tel:+8801700000000" className="site-footer-contact-row"
                     aria-label="Call totooGO support at +880 1700 000000">
                    <Phone size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>+880 1700 000000</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@totoogo.com" className="site-footer-contact-row"
                     aria-label="Email totooGO at hello@totoogo.com">
                    <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>hello@totoogo.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=totooGO+Dhaka+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer-contact-row"
                    aria-label="Open totooGO HQ location in Google Maps (opens in a new tab)"
                  >
                    <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>
                      totooGO HQ<br />
                      Dhaka, Bangladesh
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-base font-semibold mb-5">Follow totooGO</h4>
              <div className="grid grid-cols-4 gap-2 max-w-[15rem] mx-auto md:flex md:flex-wrap md:justify-start md:gap-3 md:mx-0 md:max-w-none">
                {[
                  { label: "Facebook", href: "https://facebook.com/totoogo", Icon: Facebook },
                  { label: "LinkedIn", href: "https://linkedin.com/company/totoogo", Icon: Linkedin },
                  { label: "Instagram", href: "https://instagram.com/totoogo", Icon: Instagram },
                  { label: "YouTube", href: "https://youtube.com/@totoogo", Icon: Youtube },
                  { label: "X", href: "https://x.com/totoogo", Icon: XIcon },
                  { label: "TikTok", href: "https://tiktok.com/@totoogo", Icon: TikTokIcon },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    title={`totooGO on ${label}`}
                    className="site-footer-social-link mx-auto md:mx-0"
                  >
                    <Icon width={20} height={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2, Specialty */}
      <div className="site-footer-row-specialty">
        <div className="mx-auto max-w-[1200px] px-[var(--pad-x)] py-10 md:py-12">
          <nav aria-label="Specialty pages">
            <h4 className="text-xs uppercase tracking-wider mb-4 site-footer-meta">Specialty pages</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-5 text-sm">
              {specialtyLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} title={l.title} className="site-footer-specialty-pill">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Row 3, Copyright */}
      <div className="site-footer-row-copyright">
        <div className="mx-auto max-w-[1200px] px-[var(--pad-x)] py-6 md:py-7 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-6 text-xs site-footer-meta">
          <p>
            © {year}{" "}
            <a href="https://totogo.com" title="totooGO, Bangladesh's largest battery swap network">totooGO</a>
            . All rights reserved
            <span className="mx-2 opacity-50">|</span>
            Powered by{" "}
            <a
              href="https://riseup-asia.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Riseup-Asia LLC (opens in a new tab)"
            >
              Riseup-Asia LLC
            </a>
            {" & "}
            <a
              href="https://riseup-seo.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Riseup-SEO (opens in a new tab)"
            >
              Riseup-SEO
            </a>
          </p>
          <nav aria-label="Legal" className="flex justify-center md:justify-end gap-5">
            {legalLinks.map((l) => (
              <a key={l.href} href={l.href} title={l.title}>{l.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
