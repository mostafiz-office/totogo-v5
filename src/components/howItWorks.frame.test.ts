import { describe, it, expect } from "vitest";
import {
  computeFrame,
  computeStackProgress,
  computeRailFillPx,
  computeRailRisePx,
  TRACK_TRAVEL_PX,
  TRACK_TRAVEL_COMPLETE_AT,
} from "./howItWorks.frame";

describe("computeFrame invariants", () => {
  it("p=0 → no translate, no fill, step opacities zero", () => {
    const f = computeFrame(0);
    expect(f.translateX).toBeCloseTo(0, 5);
    expect(f.revealRatio).toBe(0);
    expect(f.steps[1].opacity).toBe(0);
    expect(f.steps[2].opacity).toBe(0);
    expect(f.steps[3].opacity).toBe(0);
  });

  it("p=1 → fully translated, rail fully drawn, all steps visible", () => {
    const f = computeFrame(1);
    expect(f.translateX).toBeCloseTo(-TRACK_TRAVEL_PX, 5);
    expect(f.revealRatio).toBeCloseTo(1, 5);
    expect(f.steps[1].opacity).toBeCloseTo(1, 5);
    expect(f.steps[2].opacity).toBeCloseTo(1, 5);
    expect(f.steps[3].opacity).toBeCloseTo(1, 5);
  });

  it("matches the reference timing: horizontal travel completes at 70% scroll", () => {
    const f = computeFrame(TRACK_TRAVEL_COMPLETE_AT);
    expect(f.translateX).toBeCloseTo(-TRACK_TRAVEL_PX, 5);
    expect(f.revealRatio).toBeCloseTo(TRACK_TRAVEL_COMPLETE_AT, 5);
  });

  it("step reveals are sequential", () => {
    const f1 = computeFrame(0.14);
    const f2 = computeFrame(0.42);
    const f3 = computeFrame(0.68);
    expect(f1.steps[1].opacity).toBeGreaterThan(0.9);
    expect(f2.steps[2].opacity).toBeGreaterThan(0.9);
    expect(f3.steps[3].opacity).toBeGreaterThan(0.9);
  });

  it("is pure, same input yields identical output", () => {
    expect(computeFrame(0.5)).toEqual(computeFrame(0.5));
  });

  it("clamps progress outside [0,1]", () => {
    expect(computeFrame(-1)).toEqual(computeFrame(0));
    expect(computeFrame(2)).toEqual(computeFrame(1));
  });
});

describe("computeStackProgress", () => {
  it("returns 0 when stack is fully below viewport", () => {
    expect(computeStackProgress(1000, 500, 800)).toBe(0);
  });
  it("returns 1 when stack has fully passed", () => {
    expect(computeStackProgress(-2000, 500, 800)).toBe(1);
  });
  it("is monotonic", () => {
    const a = computeStackProgress(400, 500, 800);
    const b = computeStackProgress(200, 500, 800);
    expect(b).toBeGreaterThan(a);
  });
});

describe("computeRailFillPx", () => {
  it("starts at the first bend", () => {
    expect(computeRailFillPx(0, 1800, 700, 2800, 0.85)).toBeCloseTo(700, 5);
  });

  it("advances at the same rate as the strip travels", () => {
    const at = (p: number) => computeRailFillPx(p, 1800, 700, 2800, 0.85);
    expect(at(0.425) - at(0)).toBeCloseTo(900, 5);
    expect(at(0.85) - at(0)).toBeCloseTo(1800, 5);
  });

  it("clamps to the strip width and to valid progress", () => {
    expect(computeRailFillPx(1, 1800, 1500, 2800, 0.85)).toBe(2800);
    expect(computeRailFillPx(2, 1800, 700, 2800, 0.85)).toBe(
      computeRailFillPx(1, 1800, 700, 2800, 0.85),
    );
    expect(computeRailFillPx(-1, 1800, 700, 2800, 0.85)).toBeCloseTo(700, 5);
  });

  it("leads past the elbow when a lead is given", () => {
    expect(computeRailFillPx(0, 1800, 700, 2800, 0.85, 120)).toBeCloseTo(820, 5);
  });
});

describe("computeRailRisePx", () => {
  const shifts = [0, 700, 1400];
  const rises = [0, 264, 528];

  it("starts with no lift", () => {
    expect(computeRailRisePx(0, shifts, rises)).toBe(0);
  });

  it("interpolates between bends", () => {
    expect(computeRailRisePx(350, shifts, rises)).toBeCloseTo(132, 5);
    expect(computeRailRisePx(700, shifts, rises)).toBeCloseTo(264, 5);
    expect(computeRailRisePx(1050, shifts, rises)).toBeCloseTo(396, 5);
  });

  it("clamps past the last bend and below zero", () => {
    expect(computeRailRisePx(5000, shifts, rises)).toBe(528);
    expect(computeRailRisePx(-100, shifts, rises)).toBe(0);
    expect(computeRailRisePx(100, [], [])).toBe(0);
  });
});

