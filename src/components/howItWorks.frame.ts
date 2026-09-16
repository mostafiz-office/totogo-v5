export const TRACK_TRAVEL_PX = 1740;
// BatteryPool reference behavior: horizontal travel completes at 70% scroll,
// while the green rail continues filling until 100% scroll.
export const TRACK_TRAVEL_COMPLETE_AT = 0.7;
export const RAIL_VERTICAL_TAIL = 0;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const smoothstep = (t: number) => t * t * (3 - 2 * t);

export type RevealDomain = "move" | "tail";
export interface RevealWindow {
  domain: RevealDomain;
  start: number;
  end: number;
}

export const STEP_REVEAL_WINDOWS: Record<1 | 2 | 3, RevealWindow> = {
  1: { domain: "move", start: 0.02, end: 0.14 },
  2: { domain: "move", start: 0.24, end: 0.42 },
  3: { domain: "move", start: 0.48, end: 0.68 },
};

export interface StepFrame {
  opacity: number;
  translateY: number;
}

export interface Frame {
  translateX: number;
  revealRatio: number;
  steps: Record<1 | 2 | 3, StepFrame>;
}

/**
 * Width of the green rail overlay in pixels. The tip stays on the card that is
 * currently presented: it starts at the first bend and advances exactly as fast
 * as the strip travels left. `leadPx` pushes the tip slightly past the elbow so
 * the corner under the active card reads as fully green.
 */
export function computeRailFillPx(
  progress: number,
  travelPx: number,
  focusPx: number,
  stripWidthPx: number,
  travelCompleteAt = TRACK_TRAVEL_COMPLETE_AT,
  leadPx = 0,
): number {
  const p = clamp01(progress);
  const safeTravel = Math.max(0, travelPx);
  const safeStrip = Math.max(0, stripWidthPx);
  const safeFocus = Math.max(0, Math.min(safeStrip, focusPx + Math.max(0, leadPx)));
  const trackProgress = clamp01(p / Math.max(0.01, travelCompleteAt));
  return Math.min(safeStrip, safeFocus + safeTravel * trackProgress);
}

/**
 * Upward shift of the strip, in pixels, for a given horizontal shift.
 * Piecewise-linear through the rail bends so each step is presented at the same
 * screen height as the first one.
 */
export function computeRailRisePx(
  shiftPx: number,
  knotShiftPx: readonly number[],
  knotRisePx: readonly number[],
): number {
  const n = Math.min(knotShiftPx.length, knotRisePx.length);
  if (n === 0) return 0;
  const x = Math.max(0, shiftPx);
  if (x <= knotShiftPx[0]) {
    const span = Math.max(1, knotShiftPx[0]);
    return (knotRisePx[0] * x) / span;
  }
  for (let i = 1; i < n; i += 1) {
    if (x <= knotShiftPx[i]) {
      const span = Math.max(1, knotShiftPx[i] - knotShiftPx[i - 1]);
      const t = (x - knotShiftPx[i - 1]) / span;
      return knotRisePx[i - 1] + (knotRisePx[i] - knotRisePx[i - 1]) * t;
    }
  }
  return knotRisePx[n - 1];
}


export function computeFrame(progress: number): Frame {
  const p = clamp01(progress);
  const moveProgress = clamp01(p / TRACK_TRAVEL_COMPLETE_AT);
  const translateX = -TRACK_TRAVEL_PX * moveProgress;
  const revealRatio = p;

  const steps = {} as Record<1 | 2 | 3, StepFrame>;
  ([1, 2, 3] as const).forEach((n) => {
    const w = STEP_REVEAL_WINDOWS[n];
    const t = clamp01((moveProgress - w.start) / (w.end - w.start));
    const eased = smoothstep(t);
    steps[n] = { opacity: eased, translateY: (1 - eased) * 24 };
  });

  return { translateX, revealRatio, steps };
}

/**
 * Pure mobile stack progress.
 */
export function computeStackProgress(
  rectTop: number,
  rectHeight: number,
  viewportH: number,
): number {
  const total = rectHeight + viewportH;
  if (total <= 0) return 0;
  return clamp01((viewportH - rectTop) / total);
}
