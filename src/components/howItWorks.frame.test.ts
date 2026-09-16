import { describe, it, expect } from "vitest";
import {
  computeFrame,
  computeStackProgress,
  computePinnedStepFrame,
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

describe("computePinnedStepFrame", () => {
  it("does not offset a step before it reaches its presentation point", () => {
    expect(computePinnedStepFrame(0.2, 1800, 900, 270, 0.85)).toEqual({
      compensateX: 0,
      translateY: 0,
    });
  });

  it("holds horizontal position and rises after reaching the pin", () => {
    const atPin = computePinnedStepFrame(0.35, 1800, 900, 270, 0.85);
    const later = computePinnedStepFrame(0.7, 1800, 900, 270, 0.85);
    expect(atPin.compensateX).toBeCloseTo(0, 5);
    expect(later.compensateX).toBeGreaterThan(0);
    expect(later.translateY).toBeLessThan(0);
  });

  it("finishes at the requested rise and clamps progress", () => {
    const end = computePinnedStepFrame(1, 1800, 1500, 270, 1);
    expect(end.translateY).toBeCloseTo(-270, 5);
    expect(computePinnedStepFrame(2, 1800, 1500, 270, 1)).toEqual(end);
  });
});
