import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import totoogoLogo from "@/assets/totoogo-logo.png";

const menuItems = [
  { label: "About Us" },
  { label: "Our Solutions", caret: true },
  { label: "Safety Center" },
  { label: "Media", caret: true },
  { label: "Tech" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-200 ${
        scrolled ? "shadow-[var(--shadow-nav)]" : ""
      }`}
    >
      <div
        className="mx-auto flex h-20 max-w-[1440px] items-center justify-between"
        style={{ paddingLeft: "var(--pad-x)", paddingRight: "var(--pad-x)" }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center" aria-label="totooGO home">
          <img
            src={totoogoLogo}
            alt="totooGO"
            className="h-10 w-auto sm:h-12"
            draggable={false}
          />
        </a>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {menuItems.map((it) => (
            <a key={it.label} href="#" className="nav-link">
              {it.label}
              {it.caret && <ChevronDown size={12} strokeWidth={2.5} />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#" className="btn-contact hidden sm:inline-block">Contact Us</a>
          <button
            className="lg:hidden p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            style={{ color: "hsl(var(--c-blue))" }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed right-0 top-20 z-40 h-[calc(100vh-5rem)] w-72 bg-background shadow-[var(--shadow-nav)] transition-transform duration-300 lg:hidden`}
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      >
        <nav className="flex flex-col gap-4 p-6">
          {menuItems.map((it) => (
            <a key={it.label} href="#" className="nav-link" onClick={() => setOpen(false)}>
              {it.label}
              {it.caret && <ChevronDown size={12} strokeWidth={2.5} />}
            </a>
          ))}
          <a href="#" className="btn-contact mt-4 text-center sm:hidden">Contact Us</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
