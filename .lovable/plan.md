# Fix the "EV Ownership Made Easy" line so cards ride the rail

## The problem

The green line and the numbered cards are out of sync on desktop:

1. Cards 2 and 3 are lifted upward by an extra animation that was added earlier. That
   pulls them off the line, so SWAP floats high above the rail while the rail is far
   below it (visible in the shared screenshot).
2. Even with that lift removed, cards 2 and 3 do not sit at the same distance from the
   line as card 1, which is the one that looks right.
3. The green fill grows at a different rate than the strip moves, so the green tip is
   never at the card currently on screen.

## What will change

- Remove the extra upward movement from cards 2 and 3 so all three cards travel with
  the line exactly like card 1 does.
- Re-seat cards 2 and 3 vertically so each one sits the same distance below its own
  line segment as card 1 does today.
- Tie the green fill to the strip's movement so the green tip always reaches the card
  that is currently on screen, and completes as the section ends.
- Mobile stacked layout and reduced-motion behaviour stay exactly as they are.

## Technical detail

Measured at 1280 (rail image drawn at x 14.76, y 202, 2800x917; SVG 2870x940 scaled
0.9756):

| Segment | Rail y (page) | Card number centre | Offset |
|---|---|---|---|
| 1 | 207.9 | 328.0 | +120 (reference) |
| 2 | 471.8 | 496.0 | +24 |
| 3 | 735.7 | 692.0 | -44 |

Changes:

- `src/components/HowItWorks.tsx`: drop the per-step `computeRailStepFrame` transform,
  the `[data-desktop-step]` motion measurement, and the `riseStartShiftPx`/`risePx`
  bookkeeping. Steps keep only the shared track translation.
- `src/pages/how-it-works.css`: set `._w-col-third` padding-top from 70px to ~166px and
  `._w-col-four` from 70px to ~234px so each card centre lands +120px below its
  segment; drop the now-unused `.desktop-step-motion` rules.
- Green fill: replace `green.style.width = p * 100%` with a pixel width derived from the
  current track shift plus the on-screen focus offset, i.e.
  `fillPx = trackShift + presentationOffset`, clamped to the strip width, so the tip
  tracks the active card at every width.
- `src/components/howItWorks.frame.ts` / `howItWorks.frame.test.ts`: remove
  `computeRailStepFrame` and its tests; add a small pure helper for the fill width with
  tests (start, mid, end, clamping).

## Verification

- Playwright at 1280, 1440 and 1519: sample each card's number centre against its rail
  segment at progress 0/0.25/0.5/0.75/1 and confirm a consistent offset, plus the green
  tip position at each checkpoint.
- Screenshot checkpoints for visual confirmation; confirm mobile at 393 is unchanged and
  the build log is clean.
