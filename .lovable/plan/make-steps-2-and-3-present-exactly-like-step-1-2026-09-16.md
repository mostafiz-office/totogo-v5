# Make steps 2 and 3 present exactly like step 1

## What is happening now

Measured on the live page (1519px wide):

- Each numbered step sits at the same distance from its bend in the line (55px / 48px / 43px horizontally, ~134px vertically). So the cards already travel with the line correctly, side to side.
- The problem is vertical: the line steps downward, so step 1 is presented near the top of the screen, step 2 is 264px lower, and step 3 is 528px lower — near the bottom edge. Nothing lifts them back up.
- The green fill tip stays locked at one screen position (x = 823). It stops right at the elbow of the step being shown, so the corner under step 1 reads as half green, half grey.

## What will change

1. As the strip slides left, it also slides up, by exactly the amount the line drops between bends. Step 2 and step 3 then arrive at the same screen height where step 1 was presented, rising as they move left — the motion in the annotated screenshot.
2. The green fill leads slightly, so the elbow and the horizontal run belonging to the step currently on screen are fully green, instead of turning grey at the corner.
3. Mobile and reduced-motion behaviour stay as they are.

## Technical detail

- `src/components/HowItWorks.tsx`
  - Measure the on-screen y of each rail bend from the rail image rect and the SVG path constants (bend y ≈ 276.573 / 547.072 / 813 in a 2870x940 viewBox), giving the drop per bend.
  - Extend the track transform to `translate3d(-travelX * t, -riseY(t), 0)`, where `riseY` is a piecewise-linear function of horizontal travel: 0 until the strip reaches bend 1's presentation point, then one bend drop by bend 2, two by bend 3. Interpolate between bends so the lift is continuous, not stepped.
  - Increase the sticky viewport height budget if the upward shift exposes empty space at the bottom of the frame; verify rather than assume.
- `src/components/howItWorks.frame.ts`
  - Add a pure `computeRailRisePx(trackShiftPx, bendXs, bendDrops)` helper with unit tests (start, between bends, past last bend, clamping).
  - Extend `computeRailFillPx` with a small lead term so the fill covers the current step's elbow plus its horizontal segment.
- `src/pages/how-it-works.css` — only adjust the sticky container height / overflow if the measurement shows clipping.

## Verification

- `bunx vitest run src/components/howItWorks.frame.test.ts`
- Playwright at 1280 / 1440 / 1519: confirm each step's number lands at the same screen y (±10px) at its presentation point, that the green fill reaches past each elbow, and no clipping at the top or bottom.
- Mobile 393: stacked layout and no horizontal overflow.
- Build log clean.
