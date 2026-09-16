import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  href: "/contact/",
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
    const root = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const previousRootOverflow = root.style.overflow;
    const previousScrollBehavior = root.style.scrollBehavior;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyPaddingRight = body.style.paddingRight;
    root.style.overflow = "hidden";
    root.style.scrollBehavior = "auto";
    body.style.position = "fixed";
    body.style.top = `-${savedY.current}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.style.paddingRight = previousBodyPaddingRight;
      window.scrollTo(0, savedY.current);
      root.style.scrollBehavior = previousScrollBehavior;
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

  useEffect(() => {
    if (!drawerOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [drawerOpen]);

  return (
    <header
      className="site-header"
      data-transparent={transparent || undefined}
      data-scrolled={scrolled || undefined}
    >
      <div
        className="site-header-inner mx-auto flex h-[70px] max-w-[1440px] items-center justify-between"
        style={{ paddingLeft: "var(--pad-x)", paddingRight: "var(--pad-x)" }}
      >
        {/* Logo */}
        <a href="/" className="site-header-logo flex items-center" aria-label="totooGO home">
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
            className="site-mobile-call lg:hidden"
            aria-label={`Call: ${primaryCta.label}`}
          >
            <Phone size={16} strokeWidth={2.5} />
            <span>Call</span>
          </a>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="site-mobile-menu-toggle lg:hidden"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="mobile-primary-menu"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            {drawerOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
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
           <div className="site-mobile-panel lg:hidden" id="mobile-primary-menu">
             <nav aria-label="Mobile primary" className="site-mobile-nav">
               <div className="site-mobile-menu-label">Menu</div>
              {navLinks.map((item) => {
                 const children = item.children ?? [];
                 const hasChildren = children.length > 0;
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
                    <Button
                      type="button"
                      variant="ghost"
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
                    </Button>
                    {isExpanded && (
                      <div className="site-mobile-children">
                         {children.map((c) => (
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

               <div className="site-mobile-actions">
                 <a className="site-mobile-action-call" href={primaryCta.href}>
                   <Phone size={18} aria-hidden="true" />
                   <span>{primaryCta.label}</span>
                 </a>
                 <a className="site-mobile-action-contact" href={secondaryCta.href}>
                   <span>{secondaryCta.label}</span>
                 </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default SiteHeader;
