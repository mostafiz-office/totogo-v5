# Solutions specs — gap analysis audit and fixes

Audit of `spec/solutions/` against the real codebase. Verdict: the specs are build-ready except for three small gaps. This plan fixes the specs only — no website code changes.

## What the audit confirmed (no action needed)

- All four menu paths in `nav-config.ts` match the spec routes exactly, including Fleet at `/solutions/fleet/`.
- The header's `isRouteActive` uses prefix matching, so "Our Solutions" will show its active state on all four sub-routes automatically.
- `src/App.tsx` has no Solutions routes yet — the `01-route-and-nav.md` tasks are correct and needed.
- `useReveal` exists at `src/components/investment/useReveal.ts` and is reusable as specified.
- All four `06-cta.md` files define exact CTA headings and supporting lines — no invented copy risk.
- Fleet Section 3 chips and Section 4 chain strip are fully specified (FL-05).
- Battery Swapping title-only slider cards are specified with fixed icons and layout (BS-04).

## Gaps found — fixes to apply

### Gap 1: `SolutionSlide.body` is required but Battery Swapping slides have no body
`shared-patterns.md` §7 types `body: string` as required, but BS-04 forbids body copy.
**Fix:** change the type to `body?: string` in `shared-patterns.md` and note that title-only slides use the centred layout from BS-04.

### Gap 2: BS-05 task title overlaps BS-04
Battery Swapping's task table lists BS-05 as "Section 3 & 4 content", but Section 3 is the slider already built in BS-04. An AI could build Section 3 twice.
**Fix:** rename BS-05 to "Section 4 — Built for Everyday Mobility" in `battery-swapping/README.md` and verify `05-section-three-four.md` covers Section 4 only.

### Gap 3: Driver App and Partner App section 2/04 split not verified
CHECKLIST gap 6 says features render inside the slider with no duplicated grid, but only the Battery Swapping and Fleet specs were individually verified.
**Fix:** read `driver-app/03-section-two.md`, `driver-app/04-slider.md`, `partner-app/03-section-two.md`, `partner-app/04-slider.md` and align them so each feature appears exactly once (inside the slider), matching the verified pattern.

## Also update

- Append gaps 13–15 to `spec/solutions/CHECKLIST.md` section A with their resolutions.

## Out of scope

- No website code changes.
- CTA button destinations stay `href="#"`.
- Build order unchanged: Battery Swapping → Driver App → Partner App → Fleet Onboarding.
