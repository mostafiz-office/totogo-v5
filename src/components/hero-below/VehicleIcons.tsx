/**
 * Line-art vehicle icons, duotone navy + mint, matched to the
 * BatterySmart reference. All paths are smooth beziers, uniform 2px stroke,
 * round caps + joins. Each icon shares the same baseline + bolt motif.
 */
const NAVY = "hsl(var(--ev-navy))";
const GREEN = "hsl(var(--ev-green))";
const SW = 2;

const wrap = {
  width: 140,
  height: 90,
  viewBox: "0 0 140 90",
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Small lightning bolt, reused inside each vehicle body */
const Bolt = ({ x, y }: { x: number; y: number }) => (
  <path
    d={`M${x} ${y} L${x - 4} ${y + 7} L${x - 0.5} ${y + 7} L${x - 3} ${y + 14}`}
    stroke={GREEN}
    strokeWidth={SW}
  />
);

/* Mint motion baseline shared by all icons */
const Baseline = ({ x1, x2, y = 78 }: { x1: number; x2: number; y?: number }) => (
  <line x1={x1} y1={y} x2={x2} y2={y} stroke={GREEN} strokeWidth={SW} />
);

/* ───────── E-Scooter (Vespa-like) ───────── */
export const Icon2Wheeler = () => (
  <svg {...wrap} aria-hidden="true">
    <path d="M21 72 H65" stroke={GREEN} strokeWidth={SW} />
    <path d="M29 61 H42" stroke={GREEN} strokeWidth={SW} />
    <circle cx="38" cy="66" r="8" stroke={GREEN} strokeWidth={SW} />
    <circle cx="94" cy="66" r="8" stroke={GREEN} strokeWidth={SW} />
    <path d="M44 66 C48 55 53 49 65 49 H82 C89 49 94 55 94 66" stroke={NAVY} strokeWidth={SW} />
    <path d="M51 40 H75 C80 40 84 43 84 49" stroke={NAVY} strokeWidth={SW} />
    <path d="M43 51 H66 V61 H35 C36 55 38 52 43 51Z" stroke={GREEN} strokeWidth={SW} />
    <path d="M76 40 C83 29 91 25 100 29" stroke={NAVY} strokeWidth={SW} />
    <path d="M96 29 L106 31" stroke={NAVY} strokeWidth={SW} />
    <circle cx="108" cy="28" r="2.2" stroke={NAVY} strokeWidth={SW} />
    <Bolt x={57} y={52} />
    <Baseline x1={78} x2={116} y={78} />
  </svg>
);

/* ───────── E-Rickshaw / 3-wheeler mini van ───────── */
export const Icon3Wheeler = () => (
  <svg {...wrap} aria-hidden="true">
    <path d="M24 64 H111" stroke={NAVY} strokeWidth={SW} />
    <path d="M25 54 H57" stroke={GREEN} strokeWidth={SW} />
    <path d="M25 45 H57" stroke={GREEN} strokeWidth={SW} />
    <path d="M25 64 V40 C25 34 30 30 38 30 H59 V64" stroke={GREEN} strokeWidth={SW} />
    <path d="M59 64 V34 L73 22 H99 C107 22 112 27 112 35 V64" stroke={NAVY} strokeWidth={SW} />
    <path d="M73 22 V64" stroke={NAVY} strokeWidth={SW} />
    <path d="M75 31 H100" stroke={NAVY} strokeWidth={SW} />
    <circle cx="38" cy="68" r="8" stroke={NAVY} strokeWidth={SW} />
    <circle cx="94" cy="68" r="8" stroke={NAVY} strokeWidth={SW} />
    <Bolt x={86} y={38} />
    <Baseline x1={15} x2={124} y={78} />
  </svg>
);

/* ───────── Electric Loader (cargo pickup) ───────── */
export const IconLoader = () => (
  <svg {...wrap} aria-hidden="true">
    <path d="M15 47 H58" stroke={GREEN} strokeWidth={SW} />
    <path d="M15 55 H58" stroke={GREEN} strokeWidth={SW} />
    <path d="M15 63 H61 V39 H22 C18 39 15 42 15 46V63Z" stroke={GREEN} strokeWidth={SW} />
    <path d="M61 63 V31 H88 L106 45 H123 C127 45 130 48 130 52 V63 H61Z" stroke={NAVY} strokeWidth={SW} />
    <path d="M74 31 V45 H105" stroke={NAVY} strokeWidth={SW} />
    <path d="M88 31 L88 45" stroke={NAVY} strokeWidth={SW} />
    <circle cx="33" cy="68" r="7" stroke={NAVY} strokeWidth={SW} />
    <circle cx="74" cy="68" r="7" stroke={NAVY} strokeWidth={SW} />
    <circle cx="113" cy="68" r="7" stroke={NAVY} strokeWidth={SW} />
    <Bolt x={39} y={43} />
    <Baseline x1={8} x2={132} y={78} />
  </svg>
);

export const ICONS: Record<string, () => JSX.Element> = {
  "2w": Icon2Wheeler,
  "3w": Icon3Wheeler,
  loader: IconLoader,
};
