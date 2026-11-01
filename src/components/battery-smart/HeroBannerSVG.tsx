import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import hqBuildingImg from "@/assets/hq-building-isometric-warm.png";
import riderVehicleSvgMarkup from "@/assets/battery-smart-hero-v2.svg?raw";

// ─── Vehicle paths ──────────────────────────────────────────────────────────
// origin = where the vehicle is drawn, end = translate at end of trip.
// Loop: drive → fade out → reset → hold → fade back in → repeat.

interface VehicleTiming {
  delay: number;
  duration: number;
  hold: number;
}

interface VehicleSpec extends VehicleTiming {
  id: string;
  origin: { x: number; y: number };
  end: { dx: number; dy: number };
}

// ─── Tunable defaults ──────────────────────────────────────────────────────
const FADE_OUT = 0.4;
const FADE_IN = 0.4;
const DEFAULT_SPEED = 1.0;

type VehicleId = "loader" | "twoWheeler1" | "threeWheelerHero" | "twoWheeler2" | "threeWheeler2";

// Shared 25s cycle (duration 4.5 + FADE 0.8 + hold 19.7) so all five vehicles
// loop in lockstep. Delays are spaced 5s apart, so drive phases run
// sequentially (0.8-5.3, 5.8-10.3, 10.8-15.3, 15.8-20.3, 20.8-25.3) with a
// 0.5s gap and never overlap.
const DEFAULT_TIMING: Record<VehicleId, VehicleTiming> = {
  loader:           { delay: 0.8,  duration: 4.5, hold: 19.7 },
  twoWheeler1:      { delay: 5.8,  duration: 4.5, hold: 19.7 },
  twoWheeler2:      { delay: 10.8, duration: 4.5, hold: 19.7 },
  threeWheelerHero: { delay: 15.8, duration: 4.5, hold: 19.7 },
  threeWheeler2:    { delay: 20.8, duration: 4.5, hold: 19.7 },
};

// Geometry only, never edited by the control panel.
const ROUTES: Record<VehicleId, Omit<VehicleSpec, keyof VehicleTiming | "id">> = {
  loader:           { origin: { x: 56.75,   y: 916.76 },  end: { dx: 1138.11,  dy: 720.451 } },
  twoWheeler1:      { origin: { x: 1691.71, y: 933.75 },  end: { dx: -897.643, dy: 553.958 } },
  // Shortened drive distance so the auto fades out BEFORE reaching the road
  // terminus at the plaza edge (was dx 609 dy 382, which overshot onto grass).
  threeWheelerHero: { origin: { x: 774.38,  y: 1364.36 }, end: { dx: 475,      dy: 298 } },
  twoWheeler2:      { origin: { x: 1671.71, y: 973.75 },  end: { dx: -897.643, dy: 553.958 } },
  // Cloned from #threeWheelerHero at mount, offset into an adjacent lane so
  // the two autos read as separate vehicles instead of a duplicate.
  threeWheeler2:    { origin: { x: 754.38,  y: 1404.36 }, end: { dx: 475,      dy: 298 } },
};

const VEHICLE_IDS: VehicleId[] = ["loader", "twoWheeler1", "threeWheelerHero", "twoWheeler2", "threeWheeler2"];

// HQ placement must stay locked to the original SVG grid. The raw SVG already
// contains a correctly aligned #totogoHqBuildingOverlay at this footprint. The
// runtime code below normalizes that element instead of replacing it with a
// stretched/sheared image, because x/y nudges broke the road perspective.
const HQ_BUILDING_SVG_RECT = {
  x: 639.715,
  y: 894.741,
  width: 536,
  height: 504,
};
const HQ_BUILDING_TRANSFORM = "rotate(-1.21553 639.715 894.741)";

// Legacy SVG people/markers that were originally drawn around the old HQ.
// With the redesigned HQ PNG these sit on top of walls/doors and look like
// characters are cut into the building, so they must be removed from the live
// scene instead of relying on z-index tricks.
// Intentionally empty, do NOT hide people/markers near the HQ.
const HQ_COLLISION_ELEMENT_IDS: string[] = [];

const TREE_IDS = [
  "firstTreeIn2WheelerWay",
  "extraTree1",
  "extraTree2",
  "extraTree3",
  "extraTree4",
  "extraTree5",
  "extraTree6",
  "treeBesideRoad",
  "treeNearStation",
  "tgSolarParkTree",
];

function buildVehicles(timing: Record<VehicleId, VehicleTiming>): VehicleSpec[] {
  return VEHICLE_IDS.map((id) => ({ id, ...ROUTES[id], ...timing[id] }));
}

// ─── Callout containers ────────────────────────────────────────────────────
// Entry style per callout (scale-pop vs fade-in).
const CALLOUT_STYLE: Record<string, { kind: "scale" | "fade"; origin?: string }> = {
  quickBatterySwapping:  { kind: "scale", origin: "963px 910.25px" },
  driverApp:             { kind: "scale", origin: "1271px 1481.75px" },
  Both:                  { kind: "scale", origin: "470px 1288.75px" },
  // PartnerApp is the phone-with-two-men app graphic. It must not have a
  // human-like scale-pop entry (back.out easing looked like the two figures
  // were bouncing). Use a calm fade so the illustration stays static.
  PartnerApp:            { kind: "fade" },
  network:               { kind: "scale", origin: "1492.5px 1147.75px" },
  denseBatteryStation:   { kind: "fade" },
  support247:            { kind: "fade" },
  batteryPerformance:    { kind: "fade" },
};

// Sequential reveal, pairs of callouts pop together, with a clear beat
// between pairs so the scene reads like a guided tour, not a popcorn burst.
const CALLOUT_SEQUENCE: Array<[string, string]> = [
  ["quickBatterySwapping", "denseBatteryStation"],
  ["PartnerApp",           "driverApp"],
  ["Both",                 "network"],
  ["batteryPerformance",   "support247"],
];
const BEAT_GAP = 1.15;      // seconds between pairs
const PAIR_STAGGER = 0.30;  // seconds between the two items in a pair
const FIRST_BEAT = 0.6;     // delay before the first pair appears

// Backwards-compat for any existing references.
const SCALE_CALLOUTS = Object.entries(CALLOUT_STYLE)
  .filter(([, v]) => v.kind === "scale")
  .map(([id, v]) => ({ id, origin: v.origin!, delay: 0 }));
const FADE_CALLOUTS = Object.entries(CALLOUT_STYLE)
  .filter(([, v]) => v.kind === "fade")
  .map(([id]) => id);

// ─── Highlight pulses derived from vehicle timing ──────────────────────────
interface HighlightBinding {
  id: string;
  vehicle: VehicleId;
  extraLag?: number;
}
const HIGHLIGHT_BINDINGS: HighlightBinding[] = [
  { id: "twoWheelerHighlight",   vehicle: "twoWheeler1" },
  { id: "threeWheelerHighlight", vehicle: "threeWheelerHero" },
  // `denseHighlight` and `partnerAppHighlight` were keyed to the removed
  // `loader` vehicle. Re-key them to `twoWheeler2` so the callout highlights
  // still pulse on a real cycle.
  { id: "denseHighlight",        vehicle: "twoWheeler2" },
  { id: "driverAppHighlight",    vehicle: "twoWheeler1", extraLag: 1.5 },
  { id: "partnerAppHighlight",   vehicle: "twoWheeler2", extraLag: 1.5 },
];

function resolveHighlights(timing: Record<VehicleId, VehicleTiming>) {
  return HIGHLIGHT_BINDINGS.map((b) => {
    const t = timing[b.vehicle];
    const period = t.duration + FADE_OUT + t.hold + FADE_IN;
    const offset = t.delay + t.duration + (b.extraLag ?? 0);
    return { id: b.id, period, offset };
  });
}

// ─── Timeline visualizer (debug overlay) ─────────────────────────────────
function TimelineVisualizer({
  timing,
  debug,
}: {
  timing: Record<VehicleId, VehicleTiming>;
  debug: Record<string, VehicleDebug>;
}) {
  const maxCycle = Math.max(...VEHICLE_IDS.map((id) => cycleLength(timing[id])));
  const maxDelay = Math.max(...VEHICLE_IDS.map((id) => timing[id].delay));
  const totalWindow = maxDelay + maxCycle;

  return (
    <div className="mt-2 pt-2 border-t border-white/10">
      <div className="font-bold mb-2 text-cyan-400">Timeline (one cycle)</div>
      <div className="space-y-1.5">
        {VEHICLE_IDS.map((id) => {
          const t = timing[id];
          const d = debug[id];
          const cycle = cycleLength(t);
          const fadeInEnd = FADE_IN;
          const driveEnd = t.duration;
          const fadeOutEnd = t.duration + FADE_OUT;
          const holdEnd = cycle;

          // Percentages within the cycle bar
          const pFadeIn = (Math.min(fadeInEnd, driveEnd) / cycle) * 100;
          const pDrive = ((driveEnd - fadeInEnd) / cycle) * 100;
          const pFadeOut = ((fadeOutEnd - driveEnd) / cycle) * 100;
          const pHold = ((holdEnd - fadeOutEnd) / cycle) * 100;

          // Pre-bar delay width (relative to cycle width for scale consistency)
          const delayRatio = totalWindow > 0 ? (t.delay / totalWindow) * 100 : 0;
          const cycleRatio = totalWindow > 0 ? (cycle / totalWindow) * 100 : 0;

          return (
            <div key={id}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-20 truncate text-[10px] text-white/80">{id}</span>
                <span className="text-[9px] text-white/40 tabular-nums">
                  d{t.delay.toFixed(1)}s · c{cycle.toFixed(1)}s
                </span>
              </div>
              <div className="flex h-3 rounded-sm overflow-hidden relative">
                {/* Delay (dark, before the cycle starts) */}
                {t.delay > 0 && (
                  <div
                    className="bg-white/10"
                    style={{ width: `${delayRatio}%` }}
                    title={`delay 0s → ${t.delay.toFixed(2)}s (global window)`}
                  />
                )}
                {/* Cycle bar */}
                <div className="flex flex-1 min-w-0 relative">
                  {/* Fade-in + drive overlap (teal) */}
                  {pFadeIn > 0 && (
                    <div
                      className="bg-teal-500/70"
                      style={{ width: `${pFadeIn}%` }}
                      title={`fade-in+drive  cycle: 0s → ${fadeInEnd.toFixed(2)}s | window: ${t.delay.toFixed(2)}s → ${(t.delay + fadeInEnd).toFixed(2)}s`}
                    />
                  )}
                  {/* Drive (blue) */}
                  {pDrive > 0 && (
                    <div
                      className="bg-blue-500/70"
                      style={{ width: `${pDrive}%` }}
                      title={`drive  cycle: ${fadeInEnd.toFixed(2)}s → ${driveEnd.toFixed(2)}s | window: ${(t.delay + fadeInEnd).toFixed(2)}s → ${(t.delay + driveEnd).toFixed(2)}s`}
                    />
                  )}
                  {/* Fade-out (yellow) */}
                  {pFadeOut > 0 && (
                    <div
                      className="bg-yellow-500/70"
                      style={{ width: `${pFadeOut}%` }}
                      title={`fade-out  cycle: ${driveEnd.toFixed(2)}s → ${fadeOutEnd.toFixed(2)}s | window: ${(t.delay + driveEnd).toFixed(2)}s → ${(t.delay + fadeOutEnd).toFixed(2)}s`}
                    />
                  )}
                  {/* Hold (gray) */}
                  {pHold > 0 && (
                    <div
                      className="bg-white/20"
                      style={{ width: `${pHold}%` }}
                      title={`hold  cycle: ${fadeOutEnd.toFixed(2)}s → ${holdEnd.toFixed(2)}s | window: ${(t.delay + fadeOutEnd).toFixed(2)}s → ${(t.delay + holdEnd).toFixed(2)}s`}
                    />
                  )}
                  {/* Playhead, current position within the cycle */}
                  {d && cycle > 0 && (
                    <div
                      className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)] pointer-events-none"
                      style={{ left: `${Math.min(100, Math.max(0, (d.cycleTime / cycle) * 100))}%` }}
                      title={`${d.cycleTime.toFixed(2)}s / ${cycle.toFixed(2)}s, ${d.phase}\ncycle: ${d.cycleTime.toFixed(2)}s | window: ${(t.delay + d.cycleTime).toFixed(2)}s`}
                    >
                      <div className="absolute -top-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-[9px] text-white/50">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-1.5 bg-teal-500/70 rounded-sm" />
          fade-in+drive
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-1.5 bg-blue-500/70 rounded-sm" />
          drive
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-1.5 bg-yellow-500/70 rounded-sm" />
          fade-out
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-1.5 bg-white/20 rounded-sm" />
          hold
        </span>
      </div>
    </div>
  );
}

// ─── Debug helpers ─────────────────────────────────────────────────────────
interface VehicleDebug {
  phase: string;
  cycleTime: number;
  loopCount: number;
  totalTime: number;
  progress: number;
}
function getPhase(spec: VehicleSpec, t: number): string {
  if (t < spec.duration) return "drive";
  if (t < spec.duration + FADE_OUT) return "fade-out";
  if (t < spec.duration + FADE_OUT + spec.hold) return "hold/reset";
  return "fade-in";
}
function cycleLength(spec: VehicleTiming): number {
  return spec.duration + FADE_OUT + spec.hold + FADE_IN;
}

interface Props {
  svgMarkup: string;
  showDebug?: boolean;
  showControls?: boolean;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getGradientFallback(doc: Document, gradientId: string) {
  const gradient = doc.querySelector<SVGGradientElement>(`[id="${CSS.escape(gradientId)}"]`);
  const firstStop = gradient?.querySelector<SVGStopElement>("stop");
  return firstStop?.getAttribute("stop-color") || firstStop?.style.stopColor || "#1A1A1A";
}

function makeImportedIdsUnique(root: SVGGElement, prefix: string) {
  const idMap = new Map<string, string>();
  root.querySelectorAll<SVGElement>("[id]").forEach((el) => {
    const id = el.getAttribute("id");
    if (!id) return;
    const next = `${prefix}_${id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    idMap.set(id, next);
    el.setAttribute("id", next);
  });

  const nodes: SVGElement[] = [root, ...Array.from(root.querySelectorAll<SVGElement>("*"))];
  nodes.forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name === "id") return;
      let value = attr.value;
      idMap.forEach((next, id) => {
        value = value.replace(new RegExp(`url\\(#${escapeRegExp(id)}\\)`, "g"), `url(#${next})`);
        if (value === `#${id}`) value = `#${next}`;
      });
      if (value !== attr.value) el.setAttribute(attr.name, value);
    });
  });
}

function createNativeRiderVehicle(vehicleId: "twoWheeler1" | "twoWheeler2") {
  const doc = new DOMParser().parseFromString(riderVehicleSvgMarkup, "image/svg+xml");
  const source = doc.querySelector<SVGGElement>(`[id="${vehicleId}"]`);
  if (!source) return null;

  const imported = document.importNode(source, true) as SVGGElement;
  imported.setAttribute("id", vehicleId);
  imported.setAttribute("data-preserve-svg-colors", "true");
  imported.removeAttribute("opacity");
  imported.removeAttribute("style");
  imported.removeAttribute("transform");
  imported.removeAttribute("transform-origin");
  imported.style.transform = "";
  imported.style.transformOrigin = "";

  imported.querySelectorAll<SVGElement>("[style]").forEach((el) => {
    const style = el.getAttribute("style") || "";
    if (!/transform/i.test(style)) return;
    el.removeAttribute("style");
  });

  imported.querySelectorAll<SVGElement>("[fill], [stroke]").forEach((el) => {
    (["fill", "stroke"] as const).forEach((attr) => {
      const value = el.getAttribute(attr);
      const match = value?.match(/^url\(#([^)]*)\)$/);
      if (!match || !match[1].startsWith("paint")) return;
      el.setAttribute(attr, getGradientFallback(doc, match[1]));
    });
  });

  makeImportedIdsUnique(imported, `native_${vehicleId}`);
  return imported;
}

// ─── Timing validator ──────────────────────────────────────────────────────
// Simulates each vehicle's drive intervals across a long window and reports
// overlapping drive phases (true motion conflicts), not just arrival spacing.
interface DriveOverlap {
  a: VehicleId;
  b: VehicleId;
  start: number;
  end: number;
  cycleA: number;
  cycleB: number;
}
function validateSchedule(
  timing: Record<VehicleId, VehicleTiming>,
  windowSec = 120,
): DriveOverlap[] {
  // Collect every drive interval [start, end] for each vehicle within window.
  const intervals: Array<{ id: VehicleId; start: number; end: number; cycle: number }> = [];
  for (const id of VEHICLE_IDS) {
    const t = timing[id];
    const period = cycleLength(t);
    if (period <= 0) continue;
    let cycle = 0;
    let start = t.delay;
    while (start < windowSec) {
      intervals.push({ id, start, end: start + t.duration, cycle });
      cycle += 1;
      start += period;
    }
  }
  intervals.sort((a, b) => a.start - b.start);
  const overlaps: DriveOverlap[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      const A = intervals[i];
      const B = intervals[j];
      if (B.start >= A.end) break;
      if (A.id === B.id) continue;
      const key = [A.id, B.id].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      overlaps.push({
        a: A.id,
        b: B.id,
        start: Math.max(A.start, B.start),
        end: Math.min(A.end, B.end),
        cycleA: A.cycle,
        cycleB: B.cycle,
      });
    }
  }
  return overlaps;
}

function ScheduleAnalysis({ timing }: { timing: Record<VehicleId, VehicleTiming> }) {
  const rows = VEHICLE_IDS.map((id) => {
    const t = timing[id];
    const arrival = t.delay + t.duration;
    const cycle = cycleLength(t);
    return { id, arrival, cycle };
  }).sort((a, b) => a.arrival - b.arrival);

  const MIN_GAP = 2.5;
  const collisions: { a: string; b: string; gap: number }[] = [];
  for (let i = 0; i < rows.length - 1; i++) {
    const gap = rows[i + 1].arrival - rows[i].arrival;
    if (gap < MIN_GAP) {
      collisions.push({ a: rows[i].id, b: rows[i + 1].id, gap });
    }
  }

  const driveOverlaps = validateSchedule(timing);

  return (
    <div className="mt-2 pt-2 border-t border-white/10">
      <div className="font-bold mb-1 text-orange-400">Schedule Analysis</div>
      <div className="grid gap-0.5">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-16 truncate">{r.id}</span>
            <span className="w-20 text-right tabular-nums text-blue-300">
              arr {r.arrival.toFixed(1)}s
            </span>
            <span className="w-20 text-right tabular-nums text-white/50">
              cyc {r.cycle.toFixed(1)}s
            </span>
          </div>
        ))}
      </div>
      {collisions.length > 0 ? (
        <div className="mt-1.5 space-y-0.5">
          {collisions.map((c, i) => (
            <div key={i} className="text-red-400 text-[10px] flex items-center gap-1">
              <span>⚠</span>
              <span>
                {c.a} ↔ {c.b} only {c.gap.toFixed(2)}s apart
                <span className="text-white/40"> (need ≥{MIN_GAP}s)</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-1.5 text-green-400 text-[10px]">
          ✓ All arrivals spaced ≥{MIN_GAP}s apart
        </div>
      )}
      <div className="mt-2 pt-1.5 border-t border-white/5">
        <div className="text-[10px] text-white/60 mb-1">
          Drive-phase validator <span className="text-white/30">(120s window)</span>
        </div>
        {driveOverlaps.length > 0 ? (
          <div className="space-y-0.5">
            {driveOverlaps.slice(0, 6).map((o, i) => (
              <div key={i} className="text-red-400 text-[10px] flex items-center gap-1">
                <span>⚠</span>
                <span>
                  {o.a} ↔ {o.b} drive overlap {o.start.toFixed(1)}–{o.end.toFixed(1)}s
                  <span className="text-white/40"> (Δ{(o.end - o.start).toFixed(2)}s)</span>
                </span>
              </div>
            ))}
            {driveOverlaps.length > 6 && (
              <div className="text-white/40 text-[10px]">
                +{driveOverlaps.length - 6} more overlap(s)
              </div>
            )}
          </div>
        ) : (
          <div className="text-green-400 text-[10px]">
            ✓ No drive-phase overlaps detected
          </div>
        )}
      </div>
    </div>
  );
}

const STORAGE_KEY = "totogo-vehicle-timing-v2";

const VEHICLE_FILL_OVERRIDES: Record<VehicleId, Record<string, string>> = {
  loader: {
    "#0637a7": "#6B180F",
    "#3d479f": "#D9412E",
    "#4f6faf": "#8F2418",
    "#606eee": "#EA5B47",
    "#6c8fcf": "#F47A66",
    "#3fbf95": "#F2E6C9",
    "#5fdfb5": "#FFF4D8",
    "#3f8b6e": "#B68A2C",
  },
  twoWheeler1: {
    "#01456e": "#006A61",
    "#035b92": "#0B8C7D",
    "#3887bc": "#0FAF96",
    "#3e96d1": "#43C6A8",
    "#f17b74": "#EA5B47",
    "#ee5a51": "#D9412E",
    "#d65149": "#D9412E",
    "#b3443d": "#8F2418",
  },
  twoWheeler2: {
    "#6c8fcf": "#8E2A3A",
    "#4f6faf": "#5A1520",
    "#d65149": "#B34455",
    "#ee5a51": "#C86273",
    "#eaeaea": "#F8F1E1",
  },
  threeWheelerHero: {
    "#16d188": "#006A44",
    "#55d69c": "#128A5A",
    "#15ab71": "#004D31",
    "#2eb37a": "#006A44",
    "#3ec98c": "#128A5A",
    "#1a9a66": "#004D31",
    "#2e63b8": "#D9412E",
    "#6c8fcf": "#F2E6C9",
    "#4f6faf": "#B68A2C",
  },
  threeWheeler2: {
    "#16d188": "#006A44",
    "#55d69c": "#128A5A",
    "#15ab71": "#004D31",
    "#2eb37a": "#006A44",
    "#3ec98c": "#128A5A",
    "#1a9a66": "#004D31",
    "#2e63b8": "#D9412E",
    "#6c8fcf": "#F2E6C9",
    "#4f6faf": "#B68A2C",
  },
};

const VEHICLE_ID_FILL_OVERRIDES: Record<VehicleId, Record<string, string>> = {
  loader: {
    "Vector 150": "#EA5B47",
    "Vector 151": "#D9412E",
    "Vector 153": "#FFF4D8",
    "Vector 153_2": "#F47A66",
    "Vector 154": "#8F2418",
  },
  twoWheeler1: {
    Vector_3206: "#006A61",
    Vector_3208: "#0B8C7D",
    Vector_3214: "#0FAF96",
    Vector_3215: "#43C6A8",
    Vector_3217: "#006A61",
    Vector_3252: "#D9412E",
  },
  twoWheeler2: {
    Vector_2674: "#8E2A3A",
    Vector_2675: "#8E2A3A",
    Vector_2676: "#C86273",
    Vector_2679: "#8E2A3A",
    Vector_2681: "#B34455",
    Vector_2706: "#5A1520",
    Vector_2716: "#8E2A3A",
    Vector_2718: "#5A1520",
  },
  threeWheelerHero: {
    "Vector 167_2": "#006A44",
    "Vector 173_6": "#128A5A",
    "Vector 174_2": "#004D31",
    "Vector 175_2": "#006A44",
    "Vector 168_2": "#D9412E",
    Vector_864: "#F2E6C9",
  },
  threeWheeler2: {
    "Vector 167_2": "#006A44",
    "Vector 173_6": "#128A5A",
    "Vector 174_2": "#004D31",
    "Vector 175_2": "#006A44",
    "Vector 168_2": "#D9412E",
    Vector_864: "#F2E6C9",
  },
};


function applyVehiclePalette(svg: SVGSVGElement) {
  VEHICLE_IDS.forEach((vehicleId) => {
    const vehicle = svg.querySelector<SVGGElement>(`#${vehicleId}`);
    if (!vehicle) return;
    if (vehicle.getAttribute("data-preserve-svg-colors") === "true") return;

    const fillOverrides = VEHICLE_FILL_OVERRIDES[vehicleId];
    const idOverrides = VEHICLE_ID_FILL_OVERRIDES[vehicleId];
    vehicle.querySelectorAll<SVGElement>("path, rect, ellipse, circle, polygon").forEach((shape) => {
      const idFill = shape.id ? idOverrides[shape.id] : undefined;
      const currentFill = (shape.getAttribute("fill") || "").trim().toLowerCase();
      const mappedFill = currentFill ? fillOverrides[currentFill] : undefined;
      const nextFill = idFill ?? mappedFill;
      if (!nextFill) return;

      shape.setAttribute("fill", nextFill);
      shape.style.fill = nextFill;
    });
  });
}

// ─── Scene palette: Bangladeshi ground / roads / sky ────────────────────────
// The first scene pass used global color replacement. That was wrong because
// the same blues are also used by buildings. This pass targets only the real
// floor and road gradient IDs from the SVG.
interface SceneStopOverride {
  color: string;
  opacity?: string;
}

const SCENE_GRADIENT_OVERRIDES: Record<string, SceneStopOverride[]> = {
  // Main isometric ground plane: warm river-silt / dusty Dhaka earth.
  paint0_linear_1_7: [
    { color: "#D8C49A", opacity: "1" },
    { color: "#F4E8CF", opacity: "0.42" },
  ],
  // Small road branches.
  paint1_linear_1_7: [
    { color: "#776E62", opacity: "0.92" },
    { color: "#B8AA91", opacity: "0.18" },
  ],
  paint6_linear_1_7: [
    { color: "#776E62", opacity: "0.9" },
    { color: "#B8AA91", opacity: "0.18" },
  ],
  paint7_linear_1_7: [
    { color: "#776E62", opacity: "0.9" },
    { color: "#B8AA91", opacity: "0.18" },
  ],
  paint8_linear_1_7: [
    { color: "#776E62", opacity: "0.9" },
    { color: "#B8AA91", opacity: "0.18" },
  ],
  // Main diagonal roads across the floor.
  paint2_linear_1_7: [
    { color: "#8A8071", opacity: "0.2" },
    { color: "#7A7063", opacity: "0.88" },
    { color: "#BBAE96", opacity: "0.2" },
  ],
  paint4_linear_1_7: [
    { color: "#7A7063", opacity: "0.88" },
    { color: "#BBAE96", opacity: "0.2" },
  ],
  paint5_linear_1_7: [
    { color: "#7A7063", opacity: "0.88" },
    { color: "#BBAE96", opacity: "0.2" },
  ],
  // Thin lane marking / road texture gradient.
  paint3_linear_1_7: [
    { color: "#F4E8CF", opacity: "0" },
    { color: "#D1BF96", opacity: "0.52" },
    { color: "#8F846F", opacity: "0" },
  ],
};

function applyScenePalette(svg: SVGSVGElement) {
  // NOTE: Do NOT reassign fills by generic ids like "Vector"/"Union", those
  // ids repeat across vehicles/buildings and cause overlapping tinted shapes
  // (and can throw, which kills the animation effect). The floor/road paths
  // already reference paint*_linear_1_7 gradients, so recoloring the gradient
  // stops below is enough to retint the whole scene safely.



  Object.entries(SCENE_GRADIENT_OVERRIDES).forEach(([gradientId, stops]) => {
    const gradient = svg.querySelector<SVGGradientElement>(`#${CSS.escape(gradientId)}`);
    if (!gradient) return;
    gradient.querySelectorAll<SVGStopElement>("stop").forEach((stop, index) => {
      const override = stops[index];
      if (!override) return;
      stop.setAttribute("stop-color", override.color);
      stop.style.stopColor = override.color;
      if (override.opacity !== undefined) {
        stop.setAttribute("stop-opacity", override.opacity);
        stop.style.setProperty("stop-opacity", override.opacity);
      } else {
        stop.removeAttribute("stop-opacity");
        stop.style.removeProperty("stop-opacity");
      }
    });
  });
}

// ─── Building palette: replace the cool blue shadow/mid tones that dominate
// the city with warmer Bangladeshi-flavoured hues (river silt, terracotta,
// muted teal, burnt sienna). Keys are the exact hexes surveyed from the SVG
// building groups (HQ, residential, back-row towers, cylindrical tower,
// modern mid-rise, small houses). Vehicles already get their own palette
// pass before this runs, so we only affect building shapes.
const BUILDING_FILL_OVERRIDES: Record<string, string> = {
  // HQ tower shadow blue-grey
  "#d1d7f3": "#E8D9B5",
  "#dfe4f4": "#F3E7CB",
  // Residential block
  "#eaf0ff": "#F5EBD4",
  "#e2e9fb": "#E8D5AE",
  // Back-row towers
  "#d4dfef": "#EADFC4",
  "#91b6f7": "#E0A377",
  "#6e83db": "#3F6E76",
  // Cylindrical tower
  "#82a2e8": "#C88A5E",
  "#d2dffe": "#EFE1BC",
  "#b9d2fd": "#E8C79A",
  // Modern mid-rise (deep blues → warm rust / plum)
  "#4376ec": "#C55A3B",
  "#1f3598": "#4A2E52",
  "#3772ce": "#A24E33",
  // Small houses blues → deep teal
  "#4432db": "#2E5A66",
  "#0637a7": "#1F3E48",
  // Residential dark roof navy → warm charcoal brown
  "#373459": "#3B2A22",
  // Orange low-rise A & B (peach/red/brown → terracotta / mustard / deep brown)
  "#ff8066": "#D9704A",
  "#ff5430": "#B84224",
  "#4a2418": "#3A1E14",
  "#fcba06": "#E5A82C",
  // Green swap kiosks → richer Bangladeshi green
  "#45b97c": "#2F8F5C",
  "#42b879": "#2B8557",
  // Navy service tower → deep indigo-brown + warm accent
  "#0f2f5f": "#2A2036",
  "#2c427a": "#453758",
  "#3fbf95": "#3AA37E",
  "#2faf85": "#2E8E6E",
  // Broad cool blue → warm terracotta / sand sweep (covers most remaining buildings)
  "#6c8fcf": "#B87355",
  "#4f6faf": "#7A4A38",
  "#89a6e8": "#D9A47C",
  "#c5d3fb": "#EED9B5",
  "#ced3f8": "#EFD9B0",
  "#000a60": "#2A1E2E",
  "#f6f6fb": "#FBF5E8",
  "#f1f1f6": "#F5F1E6",
  // Final visible holdouts found in the live SVG: two dark-blue service blocks
  // plus two light-blue residential/utility buildings and their window tones.
  "#4556ea": "#A64F35",
  "#000f99": "#3A1E2E",
  "#2133d1": "#8A3D2C",
  "#1449c2": "#7A3427",
  "#0d389b": "#5A2E2A",
  "#002e95": "#3A1E2E",
  "#002270": "#3A1E2E",
  "#052367": "#3A1E2E",
  "#7692e1": "#C8875C",
  "#6a8ae0": "#B76E4C",
  "#81a3e3": "#D9B276",
  "#9fb0dd": "#E6C791",
  "#afc4f9": "#EFD9B0",
  "#afc6ff": "#EFD9B0",
  "#baccf5": "#E8D1A4",
  "#c4d8fb": "#F0DEBC",
  "#c5d3fc": "#EED9B5",
  "#d4defb": "#F1E3C8",
  "#dde4f8": "#F6E9D1",
  "#dee5ff": "#F8EBD2",
  "#e0e6ff": "#F8EBD2",
  "#8faae5": "#D5A36D",
  "#93b0f5": "#D8A978",
  "#acaff2": "#D8B882",
  "#babbeb": "#DCC59B",
  "#c6d2f2": "#E9D8B7",
  "#ced6e9": "#E5D3AF",
  "#dcdbff": "#EFE0C5",
};


function applyBuildingPalette(svg: SVGSVGElement) {
  const map = Object.fromEntries(
    Object.entries(BUILDING_FILL_OVERRIDES).map(([k, v]) => [k.toLowerCase(), v]),
  );
  svg.querySelectorAll<SVGElement>("path, rect, polygon, circle, ellipse").forEach((shape) => {
    const cur = (shape.getAttribute("fill") || "").trim().toLowerCase();
    if (!cur) return;
    const next = map[cur];
    if (!next) return;
    shape.setAttribute("fill", next);
    shape.style.fill = next;
  });
  // Also retint any gradient stops that use these blues (window strips etc.)
  svg.querySelectorAll<SVGStopElement>("stop").forEach((stop) => {
    const cur = (stop.getAttribute("stop-color") || "").trim().toLowerCase();
    const next = cur ? map[cur] : undefined;
    if (!next) return;
    stop.setAttribute("stop-color", next);
    stop.style.stopColor = next;
  });
}

function isVehicleTiming(v: unknown): v is VehicleTiming {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.delay === "number" &&
    typeof o.duration === "number" &&
    typeof o.hold === "number"
  );
}

function loadTiming(): Record<VehicleId, VehicleTiming> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TIMING;
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_TIMING;
    const result: Record<VehicleId, VehicleTiming> = { ...DEFAULT_TIMING };
    for (const id of VEHICLE_IDS) {
      const entry = (parsed as Record<string, unknown>)[id];
      if (isVehicleTiming(entry)) result[id] = entry;
    }
    return result;
  } catch {
    // ignore corrupted storage
  }
  return DEFAULT_TIMING;
}

function saveTiming(timing: Record<VehicleId, VehicleTiming>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timing));
  } catch {
    // storage quota exceeded or private mode
  }
}

function scaleTiming(
  timing: Record<VehicleId, VehicleTiming>,
  factor: number
): Record<VehicleId, VehicleTiming> {
  const result: Partial<Record<VehicleId, VehicleTiming>> = {};
  for (const id of VEHICLE_IDS) {
    const t = timing[id] ?? DEFAULT_TIMING[id];
    result[id] = {
      delay: t.delay * factor,
      duration: t.duration * factor,
      hold: t.hold * factor,
    };
  }
  return result as Record<VehicleId, VehicleTiming>;
}

// Debug overlays are hidden for viewers by default. Enable at runtime by adding
// `?debug=1` to the URL (persists in localStorage), or `?debug=0` to disable.
const isDebugEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "1") {
      localStorage.setItem("totogo-debug", "1");
      return true;
    }
    if (params.get("debug") === "0") {
      localStorage.removeItem("totogo-debug");
      return false;
    }
    return localStorage.getItem("totogo-debug") === "1";
  } catch {
    return false;
  }
};

const HeroBannerSVG = ({ svgMarkup, showDebug, showControls }: Props) => {
  const debugOn = isDebugEnabled();
  const debugVisible = showDebug ?? debugOn;
  const controlsVisible = showControls ?? debugOn;
  const wrapRef = useRef<HTMLDivElement>(null);
  // Shared visibility gate, RAF loops skip work when hero is off-screen.
  const heroVisibleRef = useRef<boolean>(true);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);

  // Keep the HQ locked to the source SVG's road-aligned placement. Earlier
  // runtime replacement stretched the PNG and applied shear, which made the
  // building drift off the road grid. Prefer the existing overlay from the SVG,
  // and create an image fallback only if that overlay is missing.
  // Keep the HQ locked to the source SVG's road-aligned placement.
  useLayoutEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;
    const oldBuilding = svg.querySelector<SVGGElement>('[id="Group 238736"], [id="Group_238736"]');
    const parent = oldBuilding?.parentNode ?? svg.querySelector<SVGGElement>('[id="Group 238759"]') ?? svg;

    let hqOverlay = svg.querySelector<SVGElement>("#totogoHqBuildingOverlay");
    if (oldBuilding) {
      oldBuilding.setAttribute("display", "none");
      oldBuilding.style.display = "none";
    }

    HQ_COLLISION_ELEMENT_IDS.forEach((id) => {
      const el = svg.querySelector<SVGElement>(`#${CSS.escape(id)}`);
      if (!el) return;
      el.setAttribute("display", "none");
      el.style.display = "none";
    });

    if (!hqOverlay) {
      const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
      image.setAttribute("id", "totogoHqBuildingOverlay");
      image.setAttribute("href", hqBuildingImg);
      image.setAttributeNS("http://www.w3.org/1999/xlink", "href", hqBuildingImg);
      image.setAttribute("preserveAspectRatio", "none");
      hqOverlay = image;
      parent.insertBefore(hqOverlay, oldBuilding?.nextSibling ?? null);
    }

    hqOverlay.setAttribute("x", String(HQ_BUILDING_SVG_RECT.x));
    hqOverlay.setAttribute("y", String(HQ_BUILDING_SVG_RECT.y));
    hqOverlay.setAttribute("width", String(HQ_BUILDING_SVG_RECT.width));
    hqOverlay.setAttribute("height", String(HQ_BUILDING_SVG_RECT.height));
    hqOverlay.setAttribute("transform", HQ_BUILDING_TRANSFORM);
    hqOverlay.setAttribute("opacity", "1");
    hqOverlay.removeAttribute("display");
    hqOverlay.style.pointerEvents = "none";
    hqOverlay.style.display = "block";
    hqOverlay.style.visibility = "visible";
    hqOverlay.style.opacity = "1";

    // Keep the walking woman above the HQ overlay so she is never clipped.
    const girlAbove = svg.querySelector<SVGGElement>('[id="yellowGirl"]');
    if (girlAbove) svg.appendChild(girlAbove);

    return () => {
      if (hqOverlay?.tagName.toLowerCase() === "image") hqOverlay.remove();
    };
  }, [svgMarkup]);

  // ─── Semantic ID aliasing ─────────────────────────────────────────────
  // Placeholder alias table. Populate ONLY with confirmed vehicle groups
  // (verified visually, not guessed by bbox). Previous attempts aliased
  // generic Figma group ids that turned out to be small buildings, which
  // violated the hero-animation-fix-spec rule against guessing.
  // The remaining vehicle IDs (`threeWheelerHero`, `twoWheeler1`,
  // `twoWheeler2`) must be assigned in Figma and re-exported before they
  // can animate.
  useLayoutEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    // The current Figma export does NOT ship semantic vehicle ids
    // (`threeWheelerHero`, `twoWheeler1/2`). To enable driving animations
    // without disturbing parked assets, we DEEP-CLONE the parked auto
    // rickshaw group (verified fingerprint: Group 238935 at bbox
    // ~(397,1265,90,95), fills #2eb37a/#f2b735/#15ab71) and give the clone
    // id `threeWheelerHero`. The parked original stays put; the clone gets
    // teleported to `ROUTES.threeWheelerHero.origin` by the existing GSAP
    // tween and loops along the road. A second clone (`threeWheeler2`) is
    // then made from this one by the effect below.
    const created: Element[] = [];
    if (!svg.querySelector('[id="threeWheelerHero"]')) {
      const source = svg.querySelector<SVGGElement>('[id="Group 238935"]');
      if (source && source.parentNode) {
        // The vehicle loop calls removeAttribute("transform") on the
        // aliased #threeWheelerHero before every rebuild. If we put the
        // position offset on that element, it gets wiped and the clone
        // snaps back onto the parked original.
        // Solution: nest the translated clone INSIDE the aliased group so
        // the outer id stays transform-free (GSAP owns its x/y) while the
        // inner <g> preserves the paint-time offset from source position
        // to the route origin.
        const sourceBB = source.getBBox();
        const originX = 774.38;
        const originY = 1364.36;
        const cx = sourceBB.x + sourceBB.width / 2;
        const cy = sourceBB.y + sourceBB.height / 2;
        const outer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        outer.setAttribute("id", "threeWheelerHero");
        const inner = document.createElementNS("http://www.w3.org/2000/svg", "g");
        // Move source center to route origin, then mirror horizontally around
        // that origin so the auto faces the drive direction (down-right along
        // the road) instead of the parked orientation (down-left).
        inner.setAttribute(
          "transform",
          `translate(${originX} ${originY}) scale(-1 1) translate(${-cx} ${-cy})`,
        );
        const clone = source.cloneNode(true) as SVGGElement;
        clone.removeAttribute("id");
        clone.querySelectorAll<SVGElement>("[id]").forEach((el) => el.removeAttribute("id"));
        inner.appendChild(clone);
        outer.appendChild(inner);
        source.parentNode.insertBefore(outer, source.nextSibling);
        created.push(outer);
      }
    }

    // Use the real v2 bike artwork for the moving two-wheelers. That export
    // contains complete seated rider plus bike groups, so we do not fake a
    // rider by stretching the standing pedestrian.
    if (!svg.querySelector('[id="twoWheeler1"]')) {
      const nativeRider = createNativeRiderVehicle("twoWheeler1");
      const anchor = svg.querySelector<SVGGElement>('[id="Group_153"]');
      if (nativeRider) {
        (anchor?.parentNode || svg).insertBefore(nativeRider, anchor?.nextSibling ?? null);
        created.push(nativeRider);
      }
    }

    // twoWheeler2 intentionally disabled per user request: only one moving rider+bike.


    return () => {
      created.forEach((el) => el.remove());
    };
  }, [svgMarkup]);

  // ─── Nudge the parked scooter (and its walkway) backward ──────────────
  // The tower entrance area has a lone parked scooter (`Group_153`, wrapped
  // in `<Layer>_5`) sitting on a small white walkway stub in front of the
  // tower. The user wants this pair pushed "backward" in the isometric
  // scene (up-left on screen) so it sits deeper toward the tower entrance
  // instead of jutting into the road diamond.
  //
  // We apply a translate to `<Layer>_5` (scooter) plus any small walkway
  // patch that visually reads as part of the same asset. Iso-backward here
  // means shifting along (-dx, -dy) with dy about half of dx to follow the
  // 30-degree isometric axis.
  useLayoutEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;
    const NUDGE_X = -60;
    const NUDGE_Y = -34;
    const targets = [
      svg.querySelector<SVGGElement>('[id="<Layer>_5"]'),
      svg.querySelector<SVGGElement>('[id="Group_153"]'),
    ].filter((el): el is SVGGElement => !!el);
    // De-dup: if Layer_5 wraps Group_153, only move the wrapper.
    const moved: Array<{ el: SVGGElement; prev: string | null }> = [];
    const wrapper = targets[0];
    if (wrapper) {
      const prev = wrapper.getAttribute("transform");
      const t = `translate(${NUDGE_X} ${NUDGE_Y})`;
      wrapper.setAttribute("transform", prev ? `${prev} ${t}` : t);
      moved.push({ el: wrapper, prev });
    }
    return () => {
      for (const { el, prev } of moved) {
        if (prev === null) el.removeAttribute("transform");
        else el.setAttribute("transform", prev);
      }
    };
  }, [svgMarkup]);

  // ─── Clone the second three-wheeler ───────────────────────────────────
  // The current Figma export ships only one auto-rickshaw asset
  // (#threeWheelerHero). To animate two distinct autos per loop we deep-clone
  // that node at mount, give the copy id `threeWheeler2`, and insert it as a
  // sibling. Downstream palette, animation, and paint-order effects then pick
  // it up like any other vehicle.
  useLayoutEffect(() => {
    // Only animate the single passenger 3-wheeler on the road as in the reference sequence
    return () => {};
  }, [svgMarkup]);



  // ─── ID-based building swap ────────────────────────────────────────────
  // Swap the on-screen positions of two building groups by explicit SVG id.
  // Only these exact groups are touched (no bbox heuristics, no vehicles).
  // To swap another pair, add ["idA", "idB"] to BUILDING_SWAP_PAIRS below.
  useLayoutEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    // Swap disabled: Group_32 bundles a person figure with the cylindrical
    // tower, so translating the group leaves the person visually perched on
    // top of the tower after the swap. Re-enable only with group ids that
    // isolate just the building geometry.
    const BUILDING_SWAP_PAIRS: Array<[string, string]> = [];

    const applied: Array<{ el: SVGGElement; prev: string | null }> = [];

    for (const [idA, idB] of BUILDING_SWAP_PAIRS) {
      const a = svg.querySelector<SVGGElement>(`[id="${idA}"]`);
      const b = svg.querySelector<SVGGElement>(`[id="${idB}"]`);
      if (!a || !b) continue;
      let bbA: DOMRect, bbB: DOMRect;
      try {
        bbA = a.getBBox();
        bbB = b.getBBox();
      } catch {
        continue;
      }
      const dx = bbB.x + bbB.width / 2 - (bbA.x + bbA.width / 2);
      const dy = bbB.y + bbB.height / 2 - (bbA.y + bbA.height / 2);
      const shift = (el: SVGGElement, tx: number, ty: number) => {
        const prev = el.getAttribute("transform");
        applied.push({ el, prev });
        el.setAttribute("transform", `translate(${tx} ${ty}) ${prev ?? ""}`.trim());
      };
      shift(a, dx, dy);
      shift(b, -dx, -dy);
    }

    return () => {
      for (const { el, prev } of applied) {
        if (prev === null) el.removeAttribute("transform");
        else el.setAttribute("transform", prev);
      }
    };
  }, [svgMarkup]);


  const [debug, setDebug] = useState<Record<string, VehicleDebug>>({});
  // Per-vehicle GSAP label times, the visualizer reads these so it always
  // matches the real animation's segment boundaries.
  const [tlLabels, setTlLabels] = useState<Record<string, Record<string, number>>>({});
  const [timing, setTiming] = useState<Record<VehicleId, VehicleTiming>>(() => loadTiming());
  const [panelOpen, setPanelOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);
  // When highlightsLocked is true, callout pulses use lockedHighlights and
  // ignore further timing changes until unlocked or re-locked.
  const [highlightsLocked, setHighlightsLocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem("totogo-highlights-locked") === "1";
    } catch {
      return false;
    }
  });
  const [lockedHighlights, setLockedHighlights] = useState<
    ReturnType<typeof resolveHighlights> | null
  >(() => {
    try {
      const raw = localStorage.getItem("totogo-highlights-snapshot");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [speedScale, setSpeedScale] = useState<number>(() => {
    try {
      const raw = localStorage.getItem("totogo-speed-scale");
      if (raw) {
        const n = Number(raw);
        if (!isNaN(n) && n > 0) return Number(n.toFixed(2));
      }
    } catch {
      // ignore
    }
    return DEFAULT_SPEED;
  });

  // Persist tuned values across reloads
  useEffect(() => {
    saveTiming(timing);
  }, [timing]);

  useEffect(() => {
    try {
      localStorage.setItem("totogo-highlights-locked", highlightsLocked ? "1" : "0");
    } catch {
      // ignore
    }
  }, [highlightsLocked]);

  useEffect(() => {
    try {
      localStorage.setItem("totogo-speed-scale", String(speedScale));
    } catch {
      // ignore
    }
  }, [speedScale]);

  // ─── Scroll perf: pause hero animation work when hero is off-screen or tab hidden.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    let visible = true;
    let tabVisible = !document.hidden;
    const apply = () => {
      const shouldRun = visible && tabVisible;
      heroVisibleRef.current = shouldRun;
      if (masterTlRef.current) {
        masterTlRef.current.paused(!shouldRun);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        apply();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(root);
    const onVis = () => {
      tabVisible = !document.hidden;
      apply();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (masterTlRef.current) {
        masterTlRef.current.paused(false);
      }
    };
  }, []);

  const scaledTiming = useMemo(() => scaleTiming(timing, speedScale), [timing, speedScale]);

  const effectiveHighlights = useMemo(() => {
    if (highlightsLocked && lockedHighlights) return lockedHighlights;
    return resolveHighlights(scaledTiming);
  }, [highlightsLocked, lockedHighlights, scaledTiming]);

  const toggleHighlightsLock = () => {
    setHighlightsLocked((prev) => {
      const next = !prev;
      if (next) {
        // Snapshot current derived offsets so they stay put
        const snap = resolveHighlights(scaledTiming);
        setLockedHighlights(snap);
        try {
          localStorage.setItem("totogo-highlights-snapshot", JSON.stringify(snap));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const vehicles = useMemo(() => buildVehicles(scaledTiming), [scaledTiming]);
  const specById = useMemo(() => new Map(vehicles.map((v) => [v.id, v])), [vehicles]);

  // ── A11y & Palettes setup
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    // a11y
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("role", "presentation");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("tabindex", "-1");
    applyVehiclePalette(svg);
    applyScenePalette(svg);
    applyBuildingPalette(svg);
    svg.querySelectorAll<SVGElement>("a, [tabindex], [focusable]").forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.setAttribute("focusable", "false");
      el.setAttribute("aria-hidden", "true");
    });
  }, [svgMarkup]);

  // Battery Smart cube-top emblems: hide small white wave/dot paths that sit
  // on the top faces of the PartnerApp cube, DriverApp cube, and the two
  // mini charging point pedestals. These are unnamed paths in the imported
  // SVG, so we locate them at runtime by scanning each container for tiny
  // white-filled shapes in the upper portion of its bounding box.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;
    const containers = [
      "driverApp",
      "PartnerApp",
      "Mini Charging Point",
      "Mini Charging Point_2",
    ];
    containers.forEach((id) => {
      const cont = svg.querySelector<SVGGraphicsElement>(`[id="${CSS.escape(id)}"]`);
      if (!cont) return;
      let cb: DOMRect | { x: number; y: number; width: number; height: number };
      try {
        cb = cont.getBBox();
      } catch {
        return;
      }
      const topLimit = cb.y + cb.height * 0.5;
      const brandGreens = new Set([
        "#3fbf95", "#15ab71", "#2ebb85", "#1aa97a",
        "#22c39a", "#3dbe94", "#08b170", "#0aa86b", "#0fb478",
      ]);
      cont.querySelectorAll<SVGPathElement>("path").forEach((p) => {
        const fill = (p.getAttribute("fill") || "").trim().toLowerCase();
        const isWhite =
          fill === "white" || fill === "#fff" || fill === "#ffffff";
        const isBrandGreen = brandGreens.has(fill);
        if (!isWhite && !isBrandGreen) return;
        try {
          const b = p.getBBox();
          const cy = b.y + b.height / 2;
          if (
            isWhite &&
            cy < topLimit &&
            b.width < cb.width * 0.6 &&
            b.height < cb.height * 0.4
          ) {
            (p as unknown as HTMLElement).style.display = "none";
            return;
          }
          if (
            isBrandGreen &&
            b.width < cb.width * 0.22 &&
            b.height < cb.height * 0.14
          ) {
            (p as unknown as HTMLElement).style.display = "none";
          }
        } catch {
          /* ignore */
        }
      });
    });

    // ── Second pass: hide the two "Battery Smart" side badge cards that hang
    //    off the Partner App and Driver App center-server cubes. Identified
    //    by ID via diagnostic logging, see chat history.
    ["Group 238954", "Group 238954_2"].forEach((id) => {
      const el = svg.querySelector<SVGGElement>(`[id="${CSS.escape(id)}"]`);
      if (el) (el as unknown as HTMLElement).style.display = "none";
    });

    // ── Hide orphan "Layer_1_5", a leftover single blue-cap path that
    //    renders as a stray dot floating on the road beside the handshake
    //    pair. It has no body group and is not part of any character.
    ["Layer_1_5", "Layer_1_4", "Layer_1_3"].forEach((id) => {
      const el = svg.querySelector<SVGElement>(`[id="${CSS.escape(id)}"]`);
      if (el) {
        (el as unknown as HTMLElement).style.display = "none";
        el.setAttribute("display", "none");
      }
    });

    // ── Hide stray white pill under the small tree (bottom-left).
    //    It is the `PartnerApp` tooltip container (id verified via DOM probe:
    //    `partnerAppContainer` inside `PartnerApp`, ~x319 y1528 w75 h19).
    //    The tooltip never animates in because its anchor vehicle
    //    (`twoWheeler1`) is missing from the current SVG export, so the
    //    default position leaks a white rectangle under the tree.
    ["Vector_1333"].forEach((id) => {
      const el = svg.querySelector<SVGElement>(`[id="${CSS.escape(id)}"]`);
      if (el) {
        (el as unknown as HTMLElement).style.display = "none";
        el.setAttribute("display", "none");
      }
    });

    // ── Re-anchor chips into the sky gutters so they never cover roads,
    //    vehicles, or the walking woman's path. Each chip stays visually
    //    linked to its subject via its existing leader/pointer; we only
    //    shift the chip body into a safe zone. Wrapper <g translate> avoids
    //    fighting GSAP opacity/scale tweens on the chip itself.
    const CHIP_OFFSETS: Record<string, [number, number]> = {};
    Object.entries(CHIP_OFFSETS).forEach(([id, [dx, dy]]) => {
      const chip = svg.querySelector<SVGGElement>(`#${CSS.escape(id)}`);
      if (!chip) return;
      if (chip.parentElement?.getAttribute("data-chip-wrap") === id) return;
      const wrap = document.createElementNS("http://www.w3.org/2000/svg", "g");
      wrap.setAttribute("data-chip-wrap", id);
      wrap.setAttribute("transform", `translate(${dx}, ${dy})`);
      chip.parentNode?.insertBefore(wrap, chip);
      wrap.appendChild(chip);
    });

    // ── Third pass: nuke every Battery Smart "BS / lightning" monogram that
    //    still appears on vehicle canopies and small swap-cabinet shelters
    //    (the dark Z/BS glyph painted on top of green roofs). They are
    //    unnamed dark-fill paths sitting on the upper half of a green-roof
    //    container. We scan known vehicle/structure containers and any path
    //    whose id starts with "Union" anywhere in the SVG.
    svg.querySelectorAll<SVGElement>('[id^="Union"]').forEach((el) => {
      (el as unknown as HTMLElement).style.display = "none";
    });
    // BS-branded "X / hourglass" decals on vehicles + scooter bodies.
    // The CSS rule should already cover these, but the attribute selector
    // with a space in the value occasionally misses inside dangerouslySetInnerHTML
    // SVGs, force-hide via JS for guaranteed removal.
    svg.querySelectorAll<SVGElement>('[id^="Group 238804"]').forEach((el) => {
      (el as unknown as HTMLElement).style.display = "none";
      el.setAttribute("display", "none");
    });

    const darkFills = new Set([
      "#0c100f", "#000", "#000000", "black",
      "#0f2f5f", "#122947", "#1e4f7e", "#313942",
      "#101d30", "#0b1340", "#00109e", "#1f2c5c",
    ]);
    // Scan every group: if a small dark-filled path sits inside an element
    // that also has a brand-green sibling/child path, treat it as a BS
    // monogram and hide it. No bbox size gate on the container, only on
    // the suspect glyph itself (must be tiny, < 30 SVG units).
    const vehicleAndShelterRoots = svg.querySelectorAll<SVGGraphicsElement>("g");
    vehicleAndShelterRoots.forEach((cont) => {
      // Must contain a green roof to be a candidate.
      let hasGreen = false;
      const paths = cont.querySelectorAll<SVGPathElement>(":scope > path");
      paths.forEach((p) => {
        const f = (p.getAttribute("fill") || "").trim().toLowerCase();
        if (
          f === "#3fbf95" || f === "#08b170" || f === "#3f8b6e" ||
          f === "#2faf85" || f === "#5fdfb5" || f === "#066d45" ||
          f === "#15ab71" || f === "#0aa86b"
        ) hasGreen = true;
      });
      if (!hasGreen) return;
      paths.forEach((p) => {
        const f = (p.getAttribute("fill") || "").trim().toLowerCase();
        if (!darkFills.has(f)) return;
        try {
          const b = p.getBBox();
          if (b.width > 0 && b.width < 30 && b.height > 0 && b.height < 30) {
            (p as unknown as HTMLElement).style.display = "none";
          }
        } catch { /* ignore */ }
      });
    });

  }, [svgMarkup]);


  // ── Windmill rotor spin: each rotor rotates around its own hub.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    const reduce = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const rotorIds = ["turbineRotor1", "turbineRotor2", "turbineRotor3", "turbineRotor4"];
    // Per-turbine wind responsiveness (some turbines catch more wind than others).
    const responsiveness = [1.0, 0.85, 1.15, 0.95];
    // Small phase offsets so no two turbines lock in sync.
    const phaseOffsets = [0, 1.7, 3.1, 4.4];
    const rotors: Array<{
      el: SVGGElement;
      cx: number;
      cy: number;
      angle: number;
      vel: number;
      responsiveness: number;
      phase: number;
      blur?: SVGFEGaussianBlurElement;
    }> = [];

    // Ensure a single shared motion-blur filter exists in the SVG defs.
    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }

    // True hub centers (in SVG user coords), taken from the nacelle cap path
    // that sits directly under each rotor in battery-smart-hero.svg. The
    // previous "sample and average" trick only recovers whichever pivot we
    // rotated around, so it never actually located the hub. Hardcoding the
    // hub coordinates guarantees the blades spin exactly on the motor.
    const hubCenters: Array<{ x: number; y: number }> = [
      { x: 833, y: 1694 }, // turbineRotor1 (nacelle cap Vector_2208)
      { x: 793, y: 1666 }, // turbineRotor2 (Vector_2229)
      { x: 758, y: 1636 }, // turbineRotor3 (Vector_2250)
      { x: 723, y: 1608 }, // turbineRotor4 (Vector_2271)
    ];

    rotorIds.forEach((id, i) => {
      const el = svg.querySelector<SVGGElement>(`#${id}`);
      if (!el) return;
      const cx = hubCenters[i].x;
      const cy = hubCenters[i].y;

      if (reduce) {
        gsap.set(el, { rotation: 15, svgOrigin: `${cx} ${cy}` });
        return;
      }

      // Motion-blur filter, one per rotor (stdDeviation modulated per tick).
      const filterId = `bsBladeBlur_${i}`;
      const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
      filter.setAttribute("id", filterId);
      filter.setAttribute("x", "-20%");
      filter.setAttribute("y", "-20%");
      filter.setAttribute("width", "140%");
      filter.setAttribute("height", "140%");
      const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
      blur.setAttribute("in", "SourceGraphic");
      blur.setAttribute("stdDeviation", "0");
      filter.appendChild(blur);
      defs!.appendChild(filter);
      el.setAttribute("filter", `url(#${filterId})`);

      gsap.set(el, {
        svgOrigin: `${cx} ${cy}`,
        rotation: Math.random() * 360,
      });

      rotors.push({
        el,
        cx,
        cy,
        angle: gsap.getProperty(el, "rotation") as number,
        vel: 0,
        responsiveness: responsiveness[i] ?? 1,
        phase: phaseOffsets[i] ?? 0,
        blur,
      });
    });

    if (rotors.length === 0 || reduce) {
      return;
    }

    // RAF loop: wind = base + slow sine + noise; each rotor eases its angular
    // velocity toward wind * responsiveness (critically damped feel).
    let rafId = 0;
    let lastT = performance.now();
    const start = lastT;
    const BASE_WIND = 32;   // deg/sec baseline
    const WIND_AMP = 14;    // slow sine amplitude
    const NOISE_AMP = 6;    // small gust noise
    const SMOOTHING = 1.6;  // sec to reach target velocity (spring-ish)

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      const t = (now - start) / 1000;

      rotors.forEach((r) => {
        const gust =
          BASE_WIND +
          WIND_AMP * Math.sin((t + r.phase) / 4.2) +
          NOISE_AMP * Math.sin((t + r.phase) * 1.7) * Math.cos((t + r.phase) * 0.6);
        const target = gust * r.responsiveness;
        // Exponential smoothing toward target velocity.
        const k = 1 - Math.exp(-dt / SMOOTHING);
        r.vel += (target - r.vel) * k;
        r.angle = (r.angle + r.vel * dt) % 360;
        (r.el as any)._gsap; // touch
        gsap.set(r.el, { rotation: r.angle, svgOrigin: `${r.cx} ${r.cy}` });
        if (r.blur) {
          const sd = Math.min(1.4, Math.max(0, (Math.abs(r.vel) - 20) * 0.03));
          r.blur.setAttribute("stdDeviation", `${sd.toFixed(2)} 0`);
        }
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      rotors.forEach((r) => {
        r.el.removeAttribute("filter");
      });
      svg.querySelectorAll('filter[id^="bsBladeBlur_"]').forEach((f) => f.remove());
    };
  }, [svgMarkup]);


  // ── Fix tree-shadow blending.
  //    Tree shadows are set to `mix-blend-mode: multiply` so they darken the road naturally.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    // Shadows: ellipse that sits directly inside a .bs-tree group.
    svg.querySelectorAll<SVGEllipseElement>(".bs-tree > ellipse").forEach((sh) => {
      sh.style.mixBlendMode = "multiply";
      sh.style.pointerEvents = "none";
    });
  }, [svgMarkup]);



  // ── Yellow girl walking animation.
  //    She walks along the isometric road vector with a natural two-step gait:
  //    legs/arms swing in opposition, body bobs twice per cycle, head/torso
  //    stay upright (no rotation of the whole figure, only translate + bob).
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    const reduce = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const girl = svg.querySelector<SVGGElement>("#yellowGirl");
    if (!girl) return;

    // Limb sub-parts (pivot from the top, hip / shoulder).
    const limbConfigs: Array<{ id: string; phase: number; amp: number }> = [
      { id: "leftLeg",  phase: 0,        amp: 22 },
      { id: "rightLeg", phase: Math.PI,  amp: 22 },
      { id: "leftHand", phase: Math.PI,  amp: 18 }, // opposite to left leg
      { id: "rightHand", phase: 0,       amp: 18 }, // opposite to right leg
    ];

    const limbs: Array<{ el: SVGGElement; phase: number; amp: number }> = [];
    limbConfigs.forEach((cfg) => {
      const el = girl.querySelector<SVGGElement>(`#${cfg.id}`);
      if (!el) return;
      // Pivot from the top of each limb's bbox (hip / shoulder) using SVG
      // user-space coordinates, more reliable than CSS transform-box across
      // nested SVG groups.
      const bb = el.getBBox();
      const pivotX = bb.x + bb.width / 2;
      const pivotY = bb.y + bb.height * 0.05; // near the top of the limb
      gsap.set(el, { svgOrigin: `${pivotX} ${pivotY}`, willChange: "transform" });
      limbs.push({ el, phase: cfg.phase, amp: cfg.amp });
    });

    // Shadow: keep it on the ground, fade slightly as the foot lifts.
    const shadow = girl.querySelector<SVGGElement>("#shadow");

    // Whole-figure transform anchor.
    gsap.set(girl, { willChange: "transform" });

    if (reduce) return;

    // Raise the woman to the top of the SVG so she paints above HQ and other
    // late-appended nodes, guaranteeing she is visible at every point of the
    // walk. Never touch her opacity in the visibility guard.
    svg.appendChild(girl);


    // Keep the woman visible at all times. Previous code faded her out at the
    // reset point, which looked like she disappeared while walking.
    const WALK_DX = 84;
    const WALK_DY = 56;
    const walkX = { current: 0 };
    const walkY = { current: 0 };

    // ─── Walk-cycle ticker (limbs + body bob) ──────────────────────────────
    const STEP_PERIOD = 0.95;
    const cycleStart = performance.now();

    const tick = () => {
      if (!heroVisibleRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const now = performance.now();
      const p = (((now - cycleStart) / 1000) % STEP_PERIOD) / STEP_PERIOD;
      const twoPi = Math.PI * 2;

      limbs.forEach(({ el, phase, amp }) => {
        const rot = Math.sin(twoPi * p + phase) * amp;
        gsap.set(el, { rotation: rot });
      });

      const bob = -Math.abs(Math.sin(twoPi * p)) * 1.6;
      gsap.set(girl, { x: walkX.current, y: bob + walkY.current });

      if (shadow) {
        gsap.set(shadow, { opacity: 1 - Math.abs(bob) / 5 });
      }

      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);



    // Forward-only loop: walk start → end, fade out at end, reset invisibly
    // to start, fade back in, repeat. No yoyo/reverse, she never walks
    // backwards. Fades only occur at the endpoints, never mid-road.
    const WALK_DUR = 8.5;
    const FADE = 0.45;
    const tl = gsap.timeline({ repeat: -1 });
    // Start of each cycle: ensure visible at start position.
    tl.set(girl, { opacity: 1 })
      .set(walkX, { current: 0 })
      .set(walkY, { current: 0 })
      // Walk forward along the road.
      .to(walkX, { current: WALK_DX, duration: WALK_DUR, ease: "none" }, 0)
      .to(walkY, { current: WALK_DY, duration: WALK_DUR, ease: "none" }, 0)
      // Fade out at the far end (she has arrived / walks off).
      .to(girl, { opacity: 0, duration: FADE, ease: "power1.in" }, WALK_DUR)
      // Invisible reset back to the start position.
      .set(walkX, { current: 0 })
      .set(walkY, { current: 0 })
      // Small invisible pause before re-appearing so the reset is not visible.
      .to({}, { duration: 0.4 })
      // Fade back in at the start and continue.
      .to(girl, { opacity: 1, duration: FADE, ease: "power1.out" });

    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
      gsap.set(girl, { clearProps: "transform,opacity,willChange" });
      limbs.forEach(({ el }) =>
        gsap.set(el, { clearProps: "transform,transformOrigin,transformBox,willChange" }),
      );
      if (shadow) {
        gsap.set(shadow, { clearProps: "transform,transformOrigin,transformBox,opacity" });
      }
    };
  }, [svgMarkup]);

  // Keep secondary character relocation disabled until a small person-only
  // group id is available. Moving Group 238982 shifts building artwork too.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector<SVGSVGElement>("svg");
    if (!svg) return;

    const TARGETS: Record<string, { x: number; y: number }> = {};
    const NS = "http://www.w3.org/2000/svg";
    Object.entries(TARGETS).forEach(([id, target]) => {
      const el = svg.querySelector<SVGGElement>(`[id="${id}"]`);
      if (!el || el.parentElement?.getAttribute("data-plaza-wrap") === id) return;
      const bb = el.getBBox();
      if (bb.width > 180 || bb.height > 180) return;
      const footX = bb.x + bb.width / 2;
      const footY = bb.y + bb.height * 0.95;
      const dx = target.x - footX;
      const dy = target.y - footY;
      const wrap = document.createElementNS(NS, "g");
      wrap.setAttribute("data-plaza-wrap", id);
      wrap.setAttribute("transform", `translate(${dx} ${dy})`);
      el.parentNode?.insertBefore(wrap, el);
      wrap.appendChild(el);
      // Paint above building so characters are never clipped by HQ artwork.
      svg.appendChild(wrap);
    });
  }, [svgMarkup]);

  // Animates #Man and #Man_2 (treated as a handshake pair when adjacent).
  // `Woman F` is intentionally excluded because it belongs to the dedicated
  // walking-woman animation above.
  // Pure transform-based, never edits the SVG file.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    const reduce = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const man1 = svg.querySelector<SVGGElement>("#roadMan1");
    const man2 = svg.querySelector<SVGGElement>("#roadMan2");

    type Char = {
      el: SVGGElement;
      pivotX: number;
      pivotY: number;
      role: "handshakeL" | "handshakeR" | "idle";
    };
    const chars: Char[] = [];

    const register = (el: SVGGElement | null, role: Char["role"]) => {
      if (!el) return;
      const bb = el.getBBox();
      const pivotX = bb.x + bb.width / 2;
      const pivotY = bb.y + bb.height * 0.95; // feet
      gsap.set(el, { svgOrigin: `${pivotX} ${pivotY}`, willChange: "transform" });
      chars.push({ el, pivotX, pivotY, role });
    };

    // Only treat Man + Man_2 as a handshake pair if they actually stand
    // next to each other. Otherwise (e.g. the phone-holding man standing
    // alone elsewhere on the canvas) animate each as a calm idle character
    // so we never force a fake handshake on an unrelated person.
    let leftMan: SVGGElement | null = null;
    let rightMan: SVGGElement | null = null;
    let pairLoners: SVGGElement[] = [];
    if (man1 && man2) {
      const a = man1.getBBox();
      const b = man2.getBBox();
      const aCx = a.x + a.width / 2;
      const bCx = b.x + b.width / 2;
      const aCy = a.y + b.height / 2;
      const bCy = b.y + b.height / 2;
      const avgW = (a.width + b.width) / 2;
      const dx = Math.abs(aCx - bCx);
      const dy = Math.abs(aCy - bCy);
      const isNeighbors = dx < avgW * 1.2 && dy < avgW * 0.9;
      if (isNeighbors) {
        if (aCx <= bCx) { leftMan = man1; rightMan = man2; }
        else { leftMan = man2; rightMan = man1; }
      } else {
        pairLoners = [man1, man2];
      }
    } else {
      if (man1) pairLoners.push(man1);
      if (man2) pairLoners.push(man2);
    }

    register(leftMan, "handshakeL");
    register(rightMan, "handshakeR");
    pairLoners.forEach((m) => register(m, "idle"));

    if (!chars.length) return;

    const start = performance.now();
    let raf = 0;
    const tick = () => {
      if (!heroVisibleRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = (performance.now() - start) / 1000;

      chars.forEach((c) => {
        // Universal breathing: subtle vertical scale ±1.2% at ~3.2s period.
        const breathe = 1 + Math.sin((t / 3.2) * Math.PI * 2) * 0.012;

        if (c.role === "idle") {
          const step = Math.sin((t / 1.35) * Math.PI * 2 + c.pivotX * 0.01);
          const sway = Math.sin((t / 4.2) * Math.PI * 2 + c.pivotX * 0.01) * 1.1;
          gsap.set(c.el, {
            rotation: sway,
            scaleY: breathe,
            scaleX: 1,
            x: step * 1.2,
            y: -Math.abs(step) * 1.6,
          });
        } else {
          // Handshake cycle 5s: 0–1.0 approach, 1.0–3.5 pump, 3.5–5 settle.
          const cyc = t % 5;
          const dir = c.role === "handshakeL" ? 1 : -1; // +1 leans right, -1 leans left
          let leanAmt = 0;       // degrees toward partner
          let approachX = 0;     // px translate toward partner
          let pumpY = 0;         // px up/down arm-pump
          let pumpRot = 0;       // degrees extra rocking during shake

          if (cyc < 1.0) {
            const k = cyc / 1.0;
            leanAmt = k * 5;
            approachX = k * 6;
          } else if (cyc < 3.5) {
            const k = cyc - 1.0;
            leanAmt = 5;
            approachX = 6;
            // pronounced arm-pump: ±3px vertical at ~2.5Hz
            pumpY = Math.sin(k * Math.PI * 2 * 2.5) * 3;
            pumpRot = Math.sin(k * Math.PI * 2 * 2.5) * 1.2;
          } else {
            const k = 1 - (cyc - 3.5) / 1.5;
            leanAmt = 5 * k;
            approachX = 6 * k;
          }

          gsap.set(c.el, {
            rotation: (leanAmt + pumpRot) * dir,
            scaleY: breathe,
            scaleX: 1,
            x: approachX * dir,
            y: pumpY,
          });
        }
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      chars.forEach((c) =>
        gsap.set(c.el, { clearProps: "transform,willChange,x,y" }),
      );
    };
  }, [svgMarkup]);


  // ── Master 3-Stage Hero Narrative Loop
  // Stage 1: Approach & Initial Callouts ("Compatible With Both" & "Dense Network")
  // Stage 2: Vehicles stop at substations; Charging halos pulse; Green connection lines connect all substations & central antenna; Antenna waves pulse; Stage 2 Callouts ("2-Minute Quick Swapping", "Partner App", "Driver App")
  // Stage 3: Vehicles resume motion; previous items exit with motion effect; Stage 3 Callouts ("24/7 Support" & "Battery Performance") appear; vehicles drive to destination and fade out.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector<SVGSVGElement>("svg");
    if (!svg) return;

    // Clean up any extraneous inter-station lines (ensure strictly 3 connection lines)
    svg.querySelector("#tgInterStationLines")?.remove();

    // Enhance connection lines from main antenna: strictly 3 solid straight lines in single #9CE9D0 color
    const mainLineIds = ["loaderLine", "threeWheelerLine", "twoWheelerLine"];
    const mainLines = mainLineIds.map(id => svg.querySelector<SVGGraphicsElement>(`#${id}`)).filter(Boolean);
    mainLines.forEach(line => {
      if (!line) return;
      line.style.opacity = "0";
      line.style.display = "none";
      const path = line.querySelector<SVGLineElement | SVGPathElement>("line, path") || line;
      path.setAttribute("stroke", "#9CE9D0");
      path.setAttribute("stroke-width", "2.5");
      path.setAttribute("stroke-linecap", "round");
      path.removeAttribute("stroke-dasharray");
      path.removeAttribute("filter");
    });

    // Enhance charging highlights
    const hlIds = [
      "loaderHighlight", "partnerAppHighlight",
      "threeWheelerHighlight", "driverAppHighlight",
      "twoWheelerHighlight", "denseHighlight"
    ];
    const highlights = hlIds.map(id => svg.querySelector<SVGGraphicsElement>(`#${id}`)).filter(Boolean);

    highlights.forEach(hl => {
      if (!hl) return;
      hl.style.opacity = "0";
      hl.style.display = "none";
      const path = hl.querySelector<SVGPathElement>("path") || hl;
      if (hl.id === "denseHighlight") {
        path.setAttribute("fill", "#00E58A");
      }
      path.setAttribute("filter", "drop-shadow(0 0 10px rgba(0, 229, 138, 0.95))");
    });

    // Antenna elements
    const innerCircle = svg.querySelector<SVGGraphicsElement>("#innerCircle");
    if (innerCircle) {
      innerCircle.style.display = "none";
      innerCircle.style.opacity = "0";
    }

    const antennaCircles = ["middleCircle", "outerCircle"]
      .map(id => svg.querySelector<SVGGraphicsElement>(`#${id}`))
      .filter((el): el is SVGGraphicsElement => !!el);
    antennaCircles.forEach(c => {
      c.style.opacity = "0";
      c.style.display = "none";
      c.setAttribute("stroke", "#00E58A");
      c.setAttribute("stroke-width", "2");
      c.setAttribute("filter", "drop-shadow(0 0 6px rgba(0, 229, 138, 0.8))");
    });
    const batteryIcon = svg.querySelector<SVGGraphicsElement>("#batteryIcon");
    if (batteryIcon) {
      batteryIcon.style.opacity = "0";
      batteryIcon.style.display = "none";
      batteryIcon.setAttribute("fill", "#00E58A");
      batteryIcon.setAttribute("filter", "drop-shadow(0 0 8px rgba(0, 229, 138, 0.9))");
    }

    // Battery swap station slot indicators
    const swapLeds = Array.from(
      svg.querySelectorAll<SVGElement>('[id^="Mini Charging Point"] [fill="#CD3026"], [id^="Mini Charging Point_2"] [fill="#CD3026"]')
    );

    // Trees remain completely static and rooted in place as before (no movement)
    svg.querySelectorAll<SVGGraphicsElement>(".bs-tree, .bs-tree-canopy").forEach((el) => {
      gsap.killTweensOf(el);
      el.removeAttribute("transform");
      el.style.transform = "";
      el.style.transformOrigin = "";
      el.style.transformBox = "";
    });

    // Vehicle elements
    const loader = svg.querySelector<SVGGElement>("#loader");
    const threeWheeler = svg.querySelector<SVGGElement>("#threeWheelerHero");
    const twoWheeler = svg.querySelector<SVGGElement>("#twoWheeler1");
    const activeVehicles = [loader, threeWheeler, twoWheeler].filter((v): v is SVGGElement => !!v);

    // Callout elements
    const cardBoth = svg.querySelector<SVGGElement>("#Both");
    const cardNetwork = svg.querySelector<SVGGElement>("#network");
    const cardQuick = svg.querySelector<SVGGElement>("#quickBatterySwapping");
    const cardPartner = svg.querySelector<SVGGElement>("#PartnerApp");
    const cardDriver = svg.querySelector<SVGGElement>("#driverApp");
    const cardSupport = svg.querySelector<SVGGElement>("#support247");
    const cardBatteryPerf = svg.querySelector<SVGGElement>("#batteryPerformance");

    const allCards = [
      cardBoth, cardNetwork, cardQuick, cardPartner, cardDriver, cardSupport, cardBatteryPerf
    ].filter((c): c is SVGGElement => !!c);

    // Initial setups for cards
    const CARD_ORIGINS: Record<string, string> = {
      Both: "470px 1288.75px",
      network: "1492.5px 1147.75px",
      quickBatterySwapping: "963px 910.25px",
      PartnerApp: "270px 1104.75px",
      driverApp: "1271px 1481.75px",
      support247: "701px 1054.25px",
      batteryPerformance: "1092px 1120.75px",
    };

    // Query docking glows
    const vehicleGlows = [
      svg.querySelector<SVGElement>("#state2_glow_upperLeftVehicle"),
      svg.querySelector<SVGElement>("#state2_glow_lowerMiddleVehicle"),
      svg.querySelector<SVGElement>("#state2_glow_upperRightVehicle"),
    ].filter((el): el is SVGElement => !!el);

    const baseGlows = [
      svg.querySelector<SVGElement>("#state2_glow_upperLeftBase"),
      svg.querySelector<SVGElement>("#state2_glow_lowerMiddleBase"),
      svg.querySelector<SVGElement>("#state2_glow_upperRightBase"),
      ...highlights
    ].filter((el): el is SVGElement => !!el);

    const allLines = mainLines.filter((l): l is SVGGraphicsElement => !!l);
    const radarEls = [batteryIcon, ...antennaCircles].filter((el): el is SVGGraphicsElement => !!el);

    // Clean reset all elements prior to timeline construction
    activeVehicles.forEach((v) => {
      gsap.killTweensOf(v);
      v.style.transform = "";
      v.removeAttribute("transform");
      gsap.set(v, { x: 0, y: 0, opacity: 0 });
    });
    if (loader) gsap.set(loader, { transformOrigin: "56.75px 916.76px" });
    if (threeWheeler) gsap.set(threeWheeler, { transformOrigin: "774.38px 1364.36px" });
    if (twoWheeler) gsap.set(twoWheeler, { transformOrigin: "1691.71px 933.75px" });

    allCards.forEach((c) => {
      gsap.killTweensOf(c);
      const origin = CARD_ORIGINS[c.id] || "center";
      gsap.set(c, { transformOrigin: origin, scale: 0, opacity: 0, display: "none" });
    });

    [...vehicleGlows, ...baseGlows, ...allLines, ...radarEls].forEach((el) => {
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 0, display: "none" });
    });

    // Master Timeline with seamless 3-Phase Infinite Loop
    const masterTl = gsap.timeline({ repeat: -1 });
    masterTlRef.current = masterTl;

    // =========================================================================
    // PHASE 1: Inbound Driving & Intro Cards [t = 0.0s -> 4.2s] (Duration: ~4.2s)
    // =========================================================================
    // Vehicles smoothly enter and cruise along lanes at a moderate, organic pace.
    // Smooth deceleration (power2.out) into docking positions gives realistic gentle braking.
    if (loader) {
      masterTl.fromTo(loader,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        0.0
      );
      masterTl.fromTo(loader,
        { x: 0, y: 0 },
        { x: 368.7, y: 244.5, duration: 4.2, ease: "power2.out" },
        0.0
      );
    }
    if (threeWheeler) {
      masterTl.fromTo(threeWheeler,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        0.0
      );
      masterTl.fromTo(threeWheeler,
        { x: 0, y: 0 },
        { x: 323.5, y: 209.5, duration: 4.2, ease: "power2.out" },
        0.0
      );
    }
    if (twoWheeler) {
      masterTl.fromTo(twoWheeler,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        0.0
      );
      masterTl.fromTo(twoWheeler,
        { x: 0, y: 0 },
        { x: -354.0, y: 230.8, duration: 4.2, ease: "power2.out" },
        0.0
      );
    }

    // UI Cards (Active): Intro feature cards remain comfortably visible for viewers to read (~2.8s)
    if (cardBoth) {
      masterTl.set(cardBoth, { display: "block" }, 0.2);
      masterTl.fromTo(cardBoth,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.2)" },
        0.25
      );
      masterTl.to(cardBoth,
        { scale: 0.85, opacity: 0, duration: 0.45, ease: "power2.in" },
        3.65
      );
      masterTl.set(cardBoth, { display: "none" }, 4.15);
    }
    if (cardNetwork) {
      masterTl.set(cardNetwork, { display: "block" }, 0.45);
      masterTl.fromTo(cardNetwork,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.2)" },
        0.5
      );
      masterTl.to(cardNetwork,
        { scale: 0.85, opacity: 0, duration: 0.45, ease: "power2.in" },
        3.65
      );
      masterTl.set(cardNetwork, { display: "none" }, 4.15);
    }

    // =========================================================================
    // PHASE 2: Complete Docking Pause & App Triggers [t = 4.2s -> 6.5s] (Hold: 2.3s)
    // =========================================================================
    // 1. Vehicles come to a complete, stable stop right beside battery swapping lockers.
    // 2. Steady pause: Hold active connected state steadily for a full 2.3 seconds.
    // 3. Ground circular neon glow activates cleanly under wheels.
    if (vehicleGlows.length) {
      masterTl.set(vehicleGlows, { display: "block", scale: 0.6 }, 4.2);
      masterTl.fromTo(vehicleGlows,
        { opacity: 0, scale: 0.6 },
        { opacity: 0.95, scale: 1, duration: 0.4, ease: "power2.out" },
        4.2
      );
      masterTl.to(vehicleGlows,
        { opacity: 0.75, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" },
        4.6
      );
    }

    // 4. Substation Base Glow: illuminated ground footprint beneath lockers
    if (baseGlows.length) {
      masterTl.set(baseGlows, { display: "block" }, 4.2);
      masterTl.fromTo(baseGlows,
        { opacity: 0 },
        { opacity: 0.9, duration: 0.4, ease: "power2.out" },
        4.2
      );
      masterTl.to(baseGlows,
        { opacity: 0.75, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" },
        4.6
      );
    }

    // 5. Central radar icon + strictly 3 solid light-green beams
    if (radarEls.length) {
      masterTl.set(radarEls, { display: "block" }, 4.2);
      masterTl.fromTo(radarEls,
        { opacity: 0 },
        { opacity: 0.95, duration: 0.4, ease: "power2.out" },
        4.2
      );
    }
    if (allLines.length) {
      masterTl.set(allLines, { display: "block" }, 4.2);
      masterTl.fromTo(allLines,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        4.2
      );
    }

    // 6. Active tooltip bubbles: "Partner App" and "Driver App"
    if (cardPartner) {
      masterTl.set(cardPartner, { display: "block" }, 4.25);
      masterTl.fromTo(cardPartner,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" },
        4.25
      );
    }
    if (cardDriver) {
      masterTl.set(cardDriver, { display: "block" }, 4.25);
      masterTl.fromTo(cardDriver,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" },
        4.25
      );
    }

    // =========================================================================
    // PHASE 3: Outbound Departure & Follow-up Cards [t = 6.5s -> 11.8s] (Duration: ~5.0s)
    // =========================================================================
    // Vehicles gently accelerate away from lockers and drive smoothly down the remaining street path.
    if (loader) {
      masterTl.to(loader,
        { x: 1050, y: 660, duration: 4.8, ease: "power2.inOut" },
        6.5
      );
      masterTl.to(loader,
        { opacity: 0, duration: 0.6, ease: "power1.in" },
        10.7
      );
    }
    if (threeWheeler) {
      masterTl.to(threeWheeler,
        { x: 620, y: 390, duration: 4.5, ease: "power2.inOut" },
        6.5
      );
      masterTl.to(threeWheeler,
        { opacity: 0, duration: 0.6, ease: "power1.in" },
        10.4
      );
    }
    if (twoWheeler) {
      masterTl.to(twoWheeler,
        { x: -850, y: 520, duration: 4.8, ease: "power2.inOut" },
        6.5
      );
      masterTl.to(twoWheeler,
        { opacity: 0, duration: 0.6, ease: "power1.in" },
        10.7
      );
    }

    // Glow & Lines Dissolve: connection lines, radar, and base glows smoothly fade out
    if (allLines.length) {
      masterTl.to(allLines, { opacity: 0, duration: 0.4, ease: "power2.out" }, 6.5);
      masterTl.set(allLines, { display: "none" }, 6.95);
    }
    if (radarEls.length) {
      masterTl.to(radarEls, { opacity: 0, duration: 0.4, ease: "power2.out" }, 6.5);
      masterTl.set(radarEls, { display: "none" }, 6.95);
    }
    if (vehicleGlows.length) {
      masterTl.to(vehicleGlows, { opacity: 0, scale: 0.6, duration: 0.45, ease: "power2.in" }, 6.5);
      masterTl.set(vehicleGlows, { display: "none" }, 7.0);
    }
    if (baseGlows.length) {
      masterTl.to(baseGlows, { opacity: 0, duration: 0.45, ease: "power2.in" }, 6.5);
      masterTl.set(baseGlows, { display: "none" }, 7.0);
    }

    // UI Text Transition: "Partner App" and "Driver App" bubbles smoothly fade out
    if (cardPartner) {
      masterTl.to(cardPartner, { scale: 0.85, opacity: 0, duration: 0.4, ease: "power2.in" }, 6.5);
      masterTl.set(cardPartner, { display: "none" }, 6.95);
    }
    if (cardDriver) {
      masterTl.to(cardDriver, { scale: 0.85, opacity: 0, duration: 0.4, ease: "power2.in" }, 6.5);
      masterTl.set(cardDriver, { display: "none" }, 6.95);
    }

    // Subsequent feature cards fade in at a comfortable reading pace (~3s read time)
    if (cardSupport) {
      masterTl.set(cardSupport, { display: "block" }, 6.9);
      masterTl.fromTo(cardSupport,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
        6.95
      );
      masterTl.to(cardSupport,
        { scale: 0.85, opacity: 0, duration: 0.45, ease: "power2.in" },
        10.5
      );
      masterTl.set(cardSupport, { display: "none" }, 11.0);
    }
    if (cardBatteryPerf) {
      masterTl.set(cardBatteryPerf, { display: "block" }, 7.2);
      masterTl.fromTo(cardBatteryPerf,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
        7.25
      );
      masterTl.to(cardBatteryPerf,
        { scale: 0.85, opacity: 0, duration: 0.45, ease: "power2.in" },
        10.5
      );
      masterTl.set(cardBatteryPerf, { display: "none" }, 11.0);
    }

    // Loop Reset: Clean reset at 12.6s, total comfortable loop length = 13.0 seconds
    masterTl.set(activeVehicles, { x: 0, y: 0, opacity: 0 }, 12.6);
    masterTl.to({}, { duration: 0.4 }, 12.6);

    return () => {
      masterTl.kill();
      masterTlRef.current = null;
    };
  }, [svgMarkup]);

  // ── Finalize paint order (authoritative).
  //    Runs after every other effect. Rebuilds z-order deterministically so
  //    later edits to individual effects cannot silently regress stacking.
  //    Ids that don't exist in the current SVG are skipped safely.
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector<SVGSVGElement>("svg");
    if (!svg) return;

    const PAINT_ORDER: string[] = [
      // Background roadside shops (North side of roads, behind traffic)
      "shopPharmacy",
      "shopCafeMart",
      "shopGroceryStore",
      // 1. All vehicles: rendered lowest among foreground elements
      "loader",
      "twoWheeler1",
      "twoWheeler2",
      "threeWheelerHero",
      "threeWheeler2",
      // 2. Trees: sit above vehicles so cars and bikes never run over trees
      "firstTreeIn2WheelerWay",
      "bs-extra-trees",
      "treeBesideRoad",
      "treeNearStation",
      "tgSolarParkTree",
      // Foreground roadside shops (South side of roads & plazas, in front of traffic)
      "shopTeaStall",
      "shopTraditionalTeaStall",
      "shopTelecomKiosk",
      "shopFruitStall",
      "shopEvMartCafe",
      "shopSupermarket",
      // 3. Foreground street furniture & station on left road: sits above loader so vehicle passes behind
      "Mini Charging Point_2",
      "Group 238954_2",
      "Group 238987",
      // 4. Pedestrians & street characters: sit above vehicles so cars never draw over people
      "Man",
      "Man_2",
      "Woman F",
      // HQ overlay: single flat PNG; sits above vehicles that pass behind it.
      "totogoHqBuildingOverlay",
      // Rooftop antenna & network lines
      "middleCircle",
      "outerCircle",
      "batteryIcon",
      "loaderLine",
      "threeWheelerLine",
      "twoWheelerLine",
      "tgInterStationLines",
      // Walking woman: must sit above HQ overlay so she never disappears.
      "yellowGirl",
      // Callouts / chip wraps last so labels never hide behind buildings.
      "quickBatterySwapping",
      "denseBatteryStation",
      "PartnerApp",
      "driverApp",
      "Both",
      "network",
      "batteryPerformance",
      "support247",
    ];

    const promote = (id: string) => {
      const el = svg.querySelector<SVGElement>(`[id="${id}"]`);
      if (el) svg.appendChild(el);
    };

    PAINT_ORDER.forEach(promote);
    const raf = requestAnimationFrame(() => PAINT_ORDER.forEach(promote));
    return () => cancelAnimationFrame(raf);
  }, [svgMarkup]);



  const updateTiming = (id: VehicleId, key: keyof VehicleTiming, value: number) => {
    setTiming((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  };

  const copyTiming = async () => {
    const json = JSON.stringify(timing, null, 2);
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = json;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buildSegmentReport = () => {
    const segments: Array<{
      vehicle: VehicleId;
      phase: string;
      cycleStart: number;
      cycleEnd: number;
      windowStart: number;
      windowEnd: number;
      duration: number;
    }> = [];
    for (const id of VEHICLE_IDS) {
      const t = scaledTiming[id];
      const cycle = cycleLength(t);
      const s = [
        { phase: "fade-in+drive", cycleStart: 0, cycleEnd: FADE_IN, windowStart: t.delay, windowEnd: t.delay + FADE_IN },
        { phase: "drive", cycleStart: FADE_IN, cycleEnd: t.duration, windowStart: t.delay + FADE_IN, windowEnd: t.delay + t.duration },
        { phase: "fade-out", cycleStart: t.duration, cycleEnd: t.duration + FADE_OUT, windowStart: t.delay + t.duration, windowEnd: t.delay + t.duration + FADE_OUT },
        { phase: "hold", cycleStart: t.duration + FADE_OUT, cycleEnd: cycle, windowStart: t.delay + t.duration + FADE_OUT, windowEnd: t.delay + cycle },
      ];
      for (const seg of s) {
        if (seg.cycleStart < seg.cycleEnd) {
          segments.push({
            vehicle: id,
            phase: seg.phase,
            cycleStart: seg.cycleStart,
            cycleEnd: seg.cycleEnd,
            windowStart: seg.windowStart,
            windowEnd: seg.windowEnd,
            duration: seg.cycleEnd - seg.cycleStart,
          });
        }
      }
    }
    return segments;
  };

  const exportTimingJSON = () => {
    const overlaps = validateSchedule(scaledTiming);
    const segments = buildSegmentReport();
    const rows = VEHICLE_IDS.map((id) => {
      const t = scaledTiming[id];
      return {
        id,
        delay: t.delay,
        duration: t.duration,
        hold: t.hold,
        cycleLength: cycleLength(t),
        arrival: t.delay + t.duration,
      };
    }).sort((a, b) => a.arrival - b.arrival);
    const payload = {
      exportedAt: new Date().toISOString(),
      speedScale,
      baseTiming: timing,
      scaledTiming,
      highlightsLocked,
      ...(highlightsLocked && lockedHighlights ? { lockedHighlights } : {}),
      segments,
      overlaps,
      arrivalOrder: rows,
    };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `totogo-timing-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportTimingCSV = () => {
    const overlaps = validateSchedule(scaledTiming);
    const segments = buildSegmentReport();
    const rows = VEHICLE_IDS.map((id) => {
      const t = scaledTiming[id];
      return {
        id,
        delay: t.delay,
        duration: t.duration,
        hold: t.hold,
        cycleLength: cycleLength(t),
        arrival: t.delay + t.duration,
      };
    }).sort((a, b) => a.arrival - b.arrival);

    const lines: string[] = [];
    lines.push("TOTogo Vehicle Animation Debug Report");
    lines.push(`Exported,${new Date().toISOString()}`);
    lines.push(`Speed Scale,${speedScale}`);
    lines.push(`Highlights Locked,${highlightsLocked}`);
    lines.push("");

    lines.push("Vehicle Summary");
    lines.push("Vehicle,Delay (s),Duration (s),Hold (s),Cycle Length (s),Arrival (s)");
    for (const r of rows) {
      lines.push(`${r.id},${r.delay.toFixed(3)},${r.duration.toFixed(3)},${scaledTiming[r.id].hold.toFixed(3)},${r.cycleLength.toFixed(3)},${r.arrival.toFixed(3)}`);
    }

    lines.push("");
    lines.push("Segment Breakdown (Cycle-relative + Global Window)");
    lines.push("Vehicle,Phase,Cycle Start (s),Cycle End (s),Window Start (s),Window End (s),Duration (s)");
    for (const s of segments) {
      lines.push(`${s.vehicle},${s.phase},${s.cycleStart.toFixed(3)},${s.cycleEnd.toFixed(3)},${s.windowStart.toFixed(3)},${s.windowEnd.toFixed(3)},${s.duration.toFixed(3)}`);
    }

    lines.push("");
    lines.push("Drive-Phase Overlaps (120s window)");
    if (overlaps.length > 0) {
      lines.push("Vehicle A,Vehicle B,Overlap Start (s),Overlap End (s),Duration (s),Cycle A,Cycle B");
      for (const o of overlaps) {
        lines.push(`${o.a},${o.b},${o.start.toFixed(3)},${o.end.toFixed(3)},${(o.end - o.start).toFixed(3)},${o.cycleA},${o.cycleB}`);
      }
    } else {
      lines.push("No drive-phase overlaps detected");
    }

    lines.push("");
    lines.push("Arrival Spacing Analysis");
    const MIN_GAP = 2.5;
    lines.push("Vehicle A,Vehicle B,Gap (s),Status");
    for (let i = 0; i < rows.length - 1; i++) {
      const gap = rows[i + 1].arrival - rows[i].arrival;
      lines.push(`${rows[i].id},${rows[i + 1].id},${gap.toFixed(3)},${gap < MIN_GAP ? "COLLISION" : "OK"}`);
    }

    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `totogo-timing-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={wrapRef} style={{ contain: "layout paint style" }} className='Hero_bannerDesktop__vIq5r relative [&_#innerCircle]:hidden [&_#batteryIcon]:hidden [&_#battery]:hidden [&_[id="Union_6"]]:hidden [&_[id="Union_8"]]:hidden [&_[id="Union_9"]]:hidden [&_[id="Union_10"]]:hidden [&_[id="Group_193"]]:hidden [&_[id="Group_339"]]:hidden [&_[id="Group_379"]]:hidden [&_[id="Group_238774"]]:hidden [&_[id="Group_238773"]]:hidden'>
      <div className="relative" dangerouslySetInnerHTML={{ __html: svgMarkup }} />




      {/* Eagerly preload the HQ building PNG so it's ready before the
          useLayoutEffect injects the <image> into the SVG. */}
      <img
        src={hqBuildingImg}
        alt=""
        aria-hidden="true"
        decoding="async"
        {...({ fetchpriority: "high" } as Record<string, string>)}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />



      {debugVisible && (
        <div className="fixed top-20 left-2 z-[9999] bg-black/80 text-white text-[11px] font-mono rounded-lg p-3 backdrop-blur-sm pointer-events-none select-none">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-green-400">Vehicle Debug</span>
            <div className="flex items-center gap-2 pointer-events-auto">
              <label className="flex items-center gap-1 cursor-pointer text-[9px] text-white/70 hover:text-white">
                <input
                  type="checkbox"
                  checked={showTimeline}
                  onChange={() => setShowTimeline((s) => !s)}
                  className="accent-cyan-400 cursor-pointer"
                />
                <span>timeline</span>
              </label>
              {paused && (
                <span className="text-[9px] bg-red-500/30 text-red-300 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Paused
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-1">
            {vehicles.map((spec) => {
              const d = debug[spec.id];
              if (!d) return null;
              const cycle = cycleLength(spec);
              const phaseColor =
                d.phase === "drive"
                  ? "text-blue-300"
                  : d.phase === "fade-out"
                  ? "text-yellow-300"
                  : d.phase === "hold/reset"
                  ? "text-gray-400"
                  : "text-green-300";
              return (
                <div key={spec.id} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold bg-white/10">
                    {d.loopCount}
                  </span>
                  <span className="w-16 truncate">{spec.id}</span>
                  <span className={`w-20 ${phaseColor}`}>{d.phase}</span>
                  <span className="w-24 text-right tabular-nums">
                    {d.cycleTime}s / {cycle.toFixed(1)}s
                  </span>
                  <span className="w-10 text-right tabular-nums text-white/60">
                    {(d.progress * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-1.5 text-[9px] text-white/40 border-t border-white/10 pt-1">
            Loop = drive → fade-out → hold/reset → fade-in
          </div>

          {showTimeline && <TimelineVisualizer timing={scaledTiming} debug={debug} />}

          <ScheduleAnalysis timing={scaledTiming} />
        </div>
      )}

      {controlsVisible && (
        <div className="fixed top-20 right-2 z-[9999] bg-black/85 text-white text-[11px] font-mono rounded-lg backdrop-blur-sm w-[320px] shadow-xl pointer-events-auto">
          <button
            type="button"
            onClick={() => setPanelOpen((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-2 border-b border-white/10 hover:bg-white/5"
          >
            <span className="font-bold text-green-400">Animation Controls</span>
            <span className="text-white/60">{panelOpen ? "▾" : "▸"}</span>
          </button>
          {panelOpen && (
            <div className="p-3 space-y-3 max-h-[420px] overflow-y-auto">
              <div className="border border-white/10 rounded-md p-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-orange-300">Global Speed</span>
                  <span className="text-[9px] text-white/50">
                    {speedScale.toFixed(2)}×
                  </span>
                </div>
                <div className="flex items-center gap-2 py-0.5">
                  <span className="w-14 text-white/70">scale</span>
                  <input
                    type="range"
                    min={0.25}
                    max={2.0}
                    step={0.05}
                    value={speedScale}
                    onChange={(e) => setSpeedScale(Number(e.target.value))}
                    className="flex-1 accent-orange-400"
                  />
                  <span className="w-10 text-right tabular-nums">
                    {speedScale.toFixed(2)}×
                  </span>
                </div>
                <div className="text-[9px] text-white/40 mt-0.5">
                  {speedScale < 1
                    ? "Faster preview (shorter delays/durations)"
                    : speedScale > 1
                    ? "Slower preview (longer delays/durations)"
                    : "Normal speed"}
                </div>
              </div>
              {VEHICLE_IDS.map((id) => {
                const t = timing[id];
                const st = scaledTiming[id];
                const cycle = cycleLength(st).toFixed(1);
                const arrival = (st.delay + st.duration).toFixed(1);
                return (
                  <div key={id} className="border border-white/10 rounded-md p-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-blue-300">{id}</span>
                      <span className="text-[9px] text-white/50">
                        arr {arrival}s · cyc {cycle}s
                      </span>
                    </div>
                    {(["delay", "duration", "hold"] as const).map((key) => {
                      const cfg = {
                        delay:    { min: 0,   max: 25, step: 0.1 },
                        duration: { min: 1,   max: 20, step: 0.1 },
                        hold:     { min: 0,   max: 6,  step: 0.1 },
                      }[key];
                      return (
                        <div key={key} className="flex items-center gap-2 py-0.5">
                          <span className="w-14 text-white/70">{key}</span>
                          <input
                            type="range"
                            min={cfg.min}
                            max={cfg.max}
                            step={cfg.step}
                            value={t[key]}
                            onChange={(e) => updateTiming(id, key, Number(e.target.value))}
                            className="flex-1 accent-green-400"
                          />
                          <span className="w-10 text-right tabular-nums">
                            {(t[key] * speedScale).toFixed(1)}s
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <label
                className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded cursor-pointer text-[10px] uppercase tracking-wider transition-colors ${
                  highlightsLocked
                    ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{highlightsLocked ? "🔒" : "🔓"}</span>
                  <span>Lock highlight pulses</span>
                </span>
                <input
                  type="checkbox"
                  checked={highlightsLocked}
                  onChange={toggleHighlightsLock}
                  className="accent-yellow-400 cursor-pointer"
                />
              </label>
              <div className="text-[9px] text-white/40 -mt-1.5 px-1">
                {highlightsLocked
                  ? "Pulses frozen, won't shift when delays change"
                  : "Pulses follow vehicle arrival (default)"}
              </div>
               <label
                className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded cursor-pointer text-[10px] uppercase tracking-wider transition-colors ${
                  paused
                    ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{paused ? "⏸" : "▶"}</span>
                  <span>Pause at cycle start</span>
                </span>
                <input
                  type="checkbox"
                  checked={paused}
                  onChange={() => setPaused((p) => !p)}
                  className="accent-red-400 cursor-pointer"
                />
              </label>
              <div className="text-[9px] text-white/40 -mt-1.5 px-1">
                {paused
                  ? "All vehicles hidden at origin, verify delays are empty"
                  : "Vehicles animate normally"}
              </div>
              <button
                type="button"
                onClick={() => setTiming(DEFAULT_TIMING)}
                className="w-full py-1.5 rounded bg-white/10 hover:bg-white/20 text-white/80 text-[10px] uppercase tracking-wider"
              >
                Reset to defaults
              </button>
              <button
                type="button"
                onClick={copyTiming}
                className={`w-full py-1.5 rounded text-[10px] uppercase tracking-wider transition-colors ${
                  copied
                    ? "bg-green-500/30 text-green-300"
                    : "bg-white/10 hover:bg-white/20 text-white/80"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy current TIMING"}
              </button>
              <button
                type="button"
                onClick={exportTimingJSON}
                className="w-full py-1.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] uppercase tracking-wider transition-colors"
              >
                Export timing as JSON
              </button>
              <button
                type="button"
                onClick={exportTimingCSV}
                className="w-full py-1.5 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-[10px] uppercase tracking-wider transition-colors"
              >
                Export timing as CSV
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroBannerSVG;
