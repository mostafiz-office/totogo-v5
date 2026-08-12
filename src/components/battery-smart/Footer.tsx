const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative border-t border-white/10 bg-[hsl(var(--c-blue-deep))]"
      style={{ padding: "60px var(--pad-x) 40px" }}
    >
      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo / brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--c-green))]">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-lg font-semibold text-white">Totoco</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[15px] text-white/60">
            <a href="#" className="transition-colors hover:text-white">About</a>
            <a href="#" className="transition-colors hover:text-white">Partners</a>
            <a href="#" className="transition-colors hover:text-white">Drivers</a>
            <a href="#" className="transition-colors hover:text-white">Careers</a>
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
          </nav>

          {/* Social placeholders */}
          <div className="flex items-center gap-4">
            {["X", "in", "YT"].map((label) => (
              <a
                key={label}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-white/60 transition-colors hover:border-[hsl(var(--c-green))] hover:text-[hsl(var(--c-green))]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-[13px] text-white/40">
          &copy; {year} Totoco. All rights reserved. Bangladesh&apos;s largest battery-swapping network.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
