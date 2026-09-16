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
