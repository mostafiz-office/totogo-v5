import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import totoogoLogo from "@/assets/totoogo-logo.png";
import NavItemLink, { isRouteActive } from "./NavItemLink";
import CallBookPill from "./CallBookPill";
import { navLinks as defaultNavLinks, type NavItem } from "./nav-config";
import "./site-header.css";

type CTA = { label: string; href: string; icon?: ReactNode };

type Props = {
  logoSrc?: string;
  transparent?: boolean;
  navLinks?: NavItem[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
};

const DEFAULT_CALL: CTA = {
  label: "Call",
  href: "tel:+8801700000000",
};
const DEFAULT_BOOK: CTA = {
  label: "Contact",
  href: "#contact",
};

const usePathname = () => {
  const [path, setPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
};

const useBodyScrollLock = (locked: boolean) => {
  const savedY = useRef(0);
  useEffect(() => {
    if (!locked) return;
    savedY.current = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${savedY.current}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, savedY.current);
    };
  }, [locked]);
};

const SiteHeader = ({
  logoSrc = totoogoLogo,
  transparent = false,
  navLinks = defaultNavLinks,
  primaryCta = DEFAULT_CALL,
  secondaryCta = DEFAULT_BOOK,
}: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const path = usePathname();
  useBodyScrollLock(drawerOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setDrawerOpen(false);
    setExpandedMobile(null);
  }, [path]);

  return (
    <header
      className="site-header"
      data-transparent={transparent || undefined}
      data-scrolled={scrolled || undefined}
    >
      <div
        className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between"
        style={{ paddingLeft: "var(--pad-x)", paddingRight: "var(--pad-x)" }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center" aria-label="totooGO home">
          <img
            src={logoSrc}
            alt="totooGO"
            className="h-9 w-auto max-w-[140px] object-contain transition-[filter] duration-300 hover:brightness-110 sm:h-10 md:h-14"
            draggable={false}
          />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((item) => (
              <NavItemLink
                key={item.label}
                item={item}
                currentPath={path}
                isOpen={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown((cur) => (cur === item.label ? null : cur))}
                onLinkClick={() => setOpenDropdown(null)}
              />
            ))}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <CallBookPill call={primaryCta} book={secondaryCta} />
          </div>
          {/* Mobile-only quick Call pill */}
          <a
            href={primaryCta.href}
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold text-white shadow-sm lg:hidden"
            style={{ backgroundColor: "#4A2E17" }}
            aria-label={`Call: ${primaryCta.label}`}
          >
            <Phone size={16} strokeWidth={2.5} />
            <span>Call</span>
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg lg:hidden"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((o) => !o)}
            style={{ color: "hsl(var(--c-blue))" }}
          >
            {drawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div
            className="site-mobile-backdrop lg:hidden"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="site-mobile-panel lg:hidden">
            <nav aria-label="Mobile primary" className="flex flex-col gap-1 p-4">
              {navLinks.map((item) => {
                const hasChildren = !!item.children?.length;
                const isExpanded = expandedMobile === item.label;
                const active = isRouteActive(path, item.path);
                if (!hasChildren) {
                  return (
                    <a
                      key={item.label}
                      href={item.path}
                      className="site-mobile-link"
                      data-active={active || undefined}
                      onClick={() => setDrawerOpen(false)}
                    >
                      <span>{item.label}</span>
                    </a>
                  );
                }
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className="site-mobile-link"
                      data-open={isExpanded || undefined}
                      data-active={active || undefined}
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedMobile((cur) => (cur === item.label ? null : item.label))
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={16} className="chev" aria-hidden="true" />
                    </button>
                    {isExpanded && (
                      <div className="site-mobile-children">
                        {item.children!.map((c) => (
                          <a
                            key={c.path}
                            href={c.path}
                            data-active={isRouteActive(path, c.path) || undefined}
                            onClick={() => setDrawerOpen(false)}
                          >
                            {c.icon && <span className="site-mega-card-icon">{c.icon}</span>}
                            <span>
                              <span className="site-mobile-child-title block">{c.label}</span>
                              <span className="site-mobile-child-desc block">{c.description}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-4">
                <CallBookPill call={primaryCta} book={secondaryCta} />
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default SiteHeader;
