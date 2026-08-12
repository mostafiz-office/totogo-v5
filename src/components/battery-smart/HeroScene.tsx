/**
 * Inline isometric scene, layered groups per spec §6.
 * Stylized but recognisable: ground, grass wedge, back buildings, two swap stations,
 * BatterySmart HQ, vehicle cluster, people, trees, solar panels, foreground blocks.
 */
const HeroScene = () => (
  <svg
    viewBox="0 0 1920 1080"
    width="100%"
    height="auto"
    role="img"
    aria-label="Isometric illustration of a city with battery swapping stations and electric vehicles"
    style={{ display: "block" }}
  >
    {/* defs */}
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#F4F7FF" />
        <stop offset="100%" stopColor="#E8EEFF" />
      </linearGradient>
    </defs>

    {/* sky */}
    <rect width="1920" height="1080" fill="url(#sky)" />

    {/* g-ground */}
    <g id="g-ground">
      <polygon points="0,820 1920,640 1920,1080 0,1080" fill="#EEF2F9" />
      {/* roads */}
      <polygon points="200,900 1500,720 1700,760 400,940" fill="#E2E8F4" />
      <polygon points="900,1080 1100,740 1200,760 1000,1080" fill="#E2E8F4" />
      {/* dashed road lines */}
      <g stroke="#FFFFFF" strokeWidth="3" strokeDasharray="18 14">
        <line x1="260" y1="918" x2="1560" y2="738" />
        <line x1="1010" y1="1080" x2="1140" y2="760" />
      </g>
    </g>

    {/* g-grass */}
    <g id="g-grass">
      <polygon points="0,900 380,860 0,1080" fill="#C8F0D2" />
    </g>

    {/* g-buildings-back */}
    <g id="g-buildings-back">
      {/* tall block tower center-back */}
      <polygon points="900,300 1040,280 1040,720 900,740" fill="#D9E2F4" />
      <polygon points="1040,280 1180,300 1180,740 1040,720" fill="#B7C4E0" />
      <polygon points="900,300 1040,280 1180,300 1040,320" fill="#FFFFFF" />
      {/* windows */}
      <g fill="#7B8DB8" opacity="0.6">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect key={`w1-${r}-${c}`} x={920 + c * 38} y={350 + r * 45} width="20" height="22" />
          ))
        )}
      </g>
      {/* cylindrical tower right */}
      <ellipse cx="1620" cy="380" rx="80" ry="22" fill="#D9E2F4" />
      <rect x="1540" y="380" width="160" height="320" fill="#D9E2F4" />
      <ellipse cx="1620" cy="700" rx="80" ry="22" fill="#B7C4E0" />
      <g fill="#FFFFFF" opacity="0.7">
        {Array.from({ length: 6 }).map((_, r) => (
          <rect key={`cyl-${r}`} x="1556" y={410 + r * 45} width="128" height="6" />
        ))}
      </g>
      {/* small detached buildings */}
      <polygon points="1740,500 1820,490 1820,640 1740,650" fill="#D9E2F4" />
      <polygon points="1820,490 1880,500 1880,650 1820,640" fill="#B7C4E0" />
    </g>

    {/* g-foreground-buildings (residential bottom-left) */}
    <g id="g-foreground-buildings">
      <polygon points="60,720 220,690 220,940 60,970" fill="#D9E2F4" />
      <polygon points="220,690 340,710 340,940 220,940" fill="#B7C4E0" />
      <polygon points="60,720 220,690 340,710 180,740" fill="#FFFFFF" />
      <g fill="#7B8DB8" opacity="0.5">
        {Array.from({ length: 4 }).map((_, r) => (
          <rect key={`fg-${r}`} x="100" y={760 + r * 40} width="22" height="24" />
        ))}
      </g>
    </g>

    {/* g-hq-building */}
    <g id="g-hq-building">
      {/* base */}
      <polygon points="640,440 920,400 920,720 640,760" fill="#FFFFFF" stroke="hsl(var(--c-blue))" strokeWidth="2" />
      <polygon points="920,400 1080,420 1080,740 920,720" fill="#E8EEFF" stroke="hsl(var(--c-blue))" strokeWidth="2" />
      {/* roof */}
      <polygon points="640,440 920,400 1080,420 800,460" fill="hsl(var(--c-blue))" />
      {/* roof wordmark */}
      <text x="820" y="438" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="22" fill="#FFFFFF" textAnchor="middle">
        BatterySmart
      </text>
      {/* windows */}
      <g stroke="hsl(var(--c-blue))" strokeWidth="1.5" fill="#E8EEFF">
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 4 }).map((_, c) => (
            <rect key={`hq-${r}-${c}`} x={670 + c * 60} y={490 + r * 70} width="40" height="44" />
          ))
        )}
      </g>
      {/* green logo on facade */}
      <rect x="950" y="500" width="40" height="50" fill="hsl(var(--c-green))" />
      <polygon points="950,500 990,500 970,525 990,550 950,550 970,525" fill="#FFFFFF" />
    </g>

    {/* g-station-left */}
    <g id="g-station-left">
      <polygon points="320,640 440,620 440,740 320,760" fill="#FFFFFF" stroke="hsl(var(--c-blue))" strokeWidth="2" />
      <polygon className="top" points="320,640 440,620 460,610 340,630" fill="hsl(var(--c-green))" />
      <rect x="345" y="670" width="70" height="50" fill="#E8EEFF" stroke="hsl(var(--c-blue))" strokeWidth="1.5" />
      {/* bicycles */}
      <g stroke="hsl(var(--c-blue))" strokeWidth="2" fill="none">
        <circle cx="280" cy="780" r="10" />
        <circle cx="310" cy="780" r="10" />
        <line x1="280" y1="780" x2="310" y2="780" />
        <line x1="295" y1="780" x2="295" y2="760" />
      </g>
    </g>

    {/* g-station-right */}
    <g id="g-station-right">
      <polygon points="1280,540 1440,520 1440,660 1280,680" fill="#FFFFFF" stroke="hsl(var(--c-blue))" strokeWidth="2" />
      <polygon className="top" points="1260,530 1460,510 1480,500 1280,520" fill="hsl(var(--c-green))" />
      <text x="1360" y="600" fontFamily="Inter" fontWeight="600" fontSize="14" fill="hsl(var(--c-blue))" textAnchor="middle">
        Battery Swapping
      </text>
      <text x="1360" y="620" fontFamily="Inter" fontWeight="600" fontSize="14" fill="hsl(var(--c-blue))" textAnchor="middle">
        Station
      </text>
      <rect x="1300" y="640" width="50" height="20" fill="hsl(var(--c-green))" opacity="0.3" />
    </g>

    {/* g-vehicles-cluster */}
    <g id="g-vehicles-cluster">
      {/* e-rickshaw 1 */}
      <g transform="translate(700,780)">
        <polygon points="0,0 90,-10 90,30 0,40" fill="hsl(var(--c-green))" stroke="hsl(var(--c-blue))" strokeWidth="1.5" />
        <polygon points="0,0 90,-10 100,-20 10,-10" fill="hsl(var(--c-green))" opacity="0.85" />
        <circle cx="15" cy="42" r="8" fill="#1F2C5C" />
        <circle cx="80" cy="38" r="8" fill="#1F2C5C" />
      </g>
      {/* scooter */}
      <g transform="translate(820,800)">
        <rect x="0" y="0" width="60" height="18" rx="4" fill="hsl(var(--c-green))" stroke="hsl(var(--c-blue))" strokeWidth="1.5" />
        <circle cx="8" cy="22" r="7" fill="#1F2C5C" />
        <circle cx="55" cy="22" r="7" fill="#1F2C5C" />
        <line x1="50" y1="0" x2="60" y2="-15" stroke="hsl(var(--c-blue))" strokeWidth="2" />
      </g>
      {/* e-rickshaw 2 */}
      <g transform="translate(900,790)">
        <polygon points="0,0 90,-10 90,30 0,40" fill="hsl(var(--c-green))" stroke="hsl(var(--c-blue))" strokeWidth="1.5" />
        <polygon points="0,0 90,-10 100,-20 10,-10" fill="hsl(var(--c-green))" opacity="0.85" />
        <circle cx="15" cy="42" r="8" fill="#1F2C5C" />
        <circle cx="80" cy="38" r="8" fill="#1F2C5C" />
      </g>
    </g>

    {/* g-people */}
    <g id="g-people">
      {[
        { x: 680, y: 840, shirt: "#F39200" },
        { x: 870, y: 850, shirt: "#3F6BFF" },
        { x: 1020, y: 845, shirt: "#F5C13A" },
        { x: 380, y: 800, shirt: "#F39200" },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          <circle cx="0" cy="0" r="6" fill="#F2C0A0" />
          <rect x="-6" y="6" width="12" height="16" fill={p.shirt} />
          <rect x="-6" y="22" width="12" height="14" fill="#1F2C5C" />
        </g>
      ))}
    </g>

    {/* g-trees */}
    <g id="g-trees">
      {[{ x: 540, y: 720 }, { x: 1180, y: 700 }].map((t, i) => (
        <g key={i} transform={`translate(${t.x},${t.y})`}>
          <rect x="-3" y="0" width="6" height="20" fill="#7A4A2B" />
          <circle cx="0" cy="-8" r="14" fill="#3FCB78" />
          <circle cx="-10" cy="-2" r="11" fill="#3FCB78" />
          <circle cx="10" cy="-2" r="11" fill="#3FCB78" />
        </g>
      ))}
    </g>

    {/* g-solar */}
    <g id="g-solar" transform="translate(1100,820)">
      {Array.from({ length: 2 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <g key={`s-${r}-${c}`} transform={`translate(${c * 32},${r * 22})`}>
            <polygon points="0,0 28,-4 28,16 0,20" fill="#1A2E72" stroke="#FFFFFF" strokeWidth="1" />
          </g>
        ))
      )}
    </g>
  </svg>
);

export default HeroScene;
