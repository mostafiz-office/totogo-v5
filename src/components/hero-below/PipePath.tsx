import { forwardRef } from "react";

/** Reference-style mint rail: a full-width V from the hero, a centered trunk,
 * then a shallow split that runs behind the three vehicle cards.
 */
const TOP_RAIL_DESKTOP = "M72,0 L72,270 L640,505 L1208,270 L1208,0";
const TRUNK_DESKTOP = "M640,505 L640,700";
const CARD_SPLIT_DESKTOP = "M72,1060 L72,940 L640,760 L1208,940 L1208,1060";

const TOP_RAIL_MOBILE = "M36,0 L36,260 L320,485 L604,260 L604,0";
const TRUNK_MOBILE = "M320,485 L320,740";
const CARD_SPLIT_MOBILE = "M36,1120 L36,970 L320,800 L604,970 L604,1120";

interface Props {
  mobile?: boolean;
}

const PipePath = forwardRef<SVGPathElement, Props>(({ mobile }, ref) => {
  const topRail = mobile ? TOP_RAIL_MOBILE : TOP_RAIL_DESKTOP;
  const cardSplit = mobile ? CARD_SPLIT_MOBILE : CARD_SPLIT_DESKTOP;
  const trunk = mobile ? TRUNK_MOBILE : TRUNK_DESKTOP;
  const viewBox = mobile ? "0 0 640 1800" : "0 0 1280 1800";
  const sw = mobile ? 18 : 28;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {/* Side rails + upper/lower folds */}
      <path
        d={`${topRail} ${cardSplit}`}
        stroke="hsl(var(--ev-green-soft))"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.64}
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
      {/* Trunk, base track */}
      <path
        d={trunk}
        stroke="hsl(var(--ev-green-soft))"
        strokeWidth={sw}
        strokeLinecap="round"
        opacity={0.64}
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
      {/* Scroll-bound flow highlight on the trunk (long visible run) */}
      <path
        ref={ref}
        d={trunk}
        stroke="hsl(var(--ev-green))"
        strokeWidth={sw}
        strokeLinecap="round"
        pathLength={1}
        opacity={0.9}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          vectorEffect: "non-scaling-stroke",
        }}
      />
    </svg>
  );
});
PipePath.displayName = "PipePath";

export default PipePath;
