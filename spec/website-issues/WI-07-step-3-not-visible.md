# WI-07 — Step 3 never becomes visible while scrolling

- **Source row:** SL 7, tab "Website Issues"
- **Screenshot:** `screenshots/WI-07-step-3-not-visible.png`
- **Client remark (verbatim):** "No. 3 is not visible while scrolling"
- **Area:** "EV Ownership Made Easy" steps (1 BUY / 2 SWAP / 3 EARN)
- **Viewport in screenshot:** Desktop
- **Status:** Fixed (2026-09-16) — travel measured from the track, completes at 85% scroll; step 3 fully visible at 1280px and 1440px

## Observed behaviour

On desktop the section reveals step 1 and then step 2 as the user scrolls, but step 3 (EARN) never appears — the scroll sequence ends on step 2 and the section moves on, leaving a large empty area to the right.

## Cause — unconfirmed, diagnose first

How the section works today (`src/components/HowItWorks.tsx`): the section is 800px tall with a sticky inner wrapper; scroll progress is mapped to a single horizontal translate of the track, `translate3d(-1740px * p, 0, 0)`, plus the green rail width. There are no per-step opacity animations.

The track has four `.work-col` columns at `min-width: 700px` each (≥2800px of content), while the maximum travel is a hard-coded `TRACK_TRAVEL_PX = 1740`. Step 3 lives in the fourth column, so it plausibly never scrolls into view — **but this has not been measured.**

**Step one of this task is to measure, not to change numbers:** at 1280px and 1440px, log the track's `scrollWidth`, the viewport width, and the translate needed to bring the `._w-col-four` step-3 block fully into view. Only then pick the fix (derive travel from measured width rather than a constant, adjust section height so the scroll distance matches, or both).

## Likely files

- `src/components/HowItWorks.tsx` — `TRACK_TRAVEL_PX`, the scroll `update()` handler, markup
- `src/pages/how-it-works.css` — section height (`.bp-how-it-works { height: 800px }`), `.work-col` widths, `._w-col-four` offsets

Note: `src/components/how-it-works.css`, `src/components/howItWorks.frame.ts` and `src/components/howItWorks.frame.test.ts` are **not** used by this component — `frame.ts` is imported only by its own test. Do not edit them for this task.

## Acceptance criteria

1. At 1280px and 1440px, scrolling the section top to bottom brings steps 1, 2 and 3 fully into view, in order.
2. Step 3 is fully visible (not clipped at the right edge) and stays readable for a comparable scroll distance to steps 1 and 2.
3. Scrolling back up reverses cleanly; no step gets stuck off-screen or half-revealed.
4. The green rail still finishes filling by the end of the section.
5. Mobile behaviour is handled in WI-04 and must not regress (the track is hidden below 991px).

## DO NOT

- Do not remove the scroll interaction and dump all steps statically on desktop unless the owner approves that as the fix.
- Do not change the step copy, numbering, or colours.
- Do not add a fourth step (the four-step CHOOSE/BUY/SWAP/EARN story lives in the separate "How It Works" section).
