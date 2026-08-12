const items = [
  { label: "Lower Running Costs", icon: "rupee" },
  { label: "Sustainable Transportation", icon: "vehicle" },
  { label: "Eco Friendly", icon: "leaf" },
];

const Icon = ({ kind }: { kind: string }) => {
  if (kind === "rupee")
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M10 8h12M10 13h12M12 8c4 0 6 2 6 5s-2 5-6 5h-2l8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  if (kind === "vehicle")
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="5" y="12" width="22" height="9" rx="3" stroke="currentColor" strokeWidth="2"/>
        <rect x="13" y="9" width="6" height="3" rx="1" fill="currentColor"/>
        <circle cx="11" cy="23" r="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="21" cy="23" r="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    );
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 26c0-7 4-12 11-13-1 7-5 12-11 13ZM16 26c0-7-4-12-11-13 1 7 5 12 11 13ZM16 14v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const Marquee = () => {
  // Repeat enough times to fill any viewport seamlessly
  const loop = [...items, ...items, ...items, ...items];
  return (
    <section className="marquee-strip" aria-label="Key benefits">
      <div className="marquee-track">
        {loop.map((it, i) => (
          <div className="marquee-item" key={i}>
            <Icon kind={it.icon} />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
