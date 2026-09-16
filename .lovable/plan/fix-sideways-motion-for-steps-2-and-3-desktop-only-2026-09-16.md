# Fix sideways motion for steps 2 and 3 (desktop only)

## The problem

As you scroll, step 1 (BUY) clearly slides across the screen to the left and away — that part works.
Steps 2 (SWAP) and 3 (EARN) never do that. The sideways slide stops as soon as the last group
reaches the right edge, so SWAP and EARN just appear to drift upward instead of travelling across.
They also sit progressively lower down the green line, so part of their movement happens below the
visible area.

## What will change

- Steps 2 and 3 travel the full width of the screen, just like step 1: each one slides in from the
  right, passes through the middle, and continues left.
- The staircase look stays: steps remain stepped down along the green line, and the artwork,
  wording, number sizes and colours are untouched.
- Step 3 (EARN) comes to rest in the middle of the screen at the end of the section, instead of
  being stuck near the right edge.
- The section keeps its current scroll length (about three and a half screens).
- Mobile stacked cards are not touched.

## Technical notes

File: `src/components/HowItWorks.tsx`, `src/pages/how-it-works.css`

1. Travel measurement (`travel()` in HowItWorks.tsx) currently returns
   `track.right - overflow.right`, which stops the slide when the final column is flush with the
   right edge. Replace it with a measurement based on the final step group's own position: travel
   until `._w-col-four`'s centre lands at the horizontal centre of `.works-overflow`, i.e.
   `colFourCenter - overflowCenter` measured at zero transform. Keep the existing fallback constant
   and the resize recompute path.
2. Because the track is `2800px` over four `700px` columns, the extra travel needed for the final
   column to reach centre may exceed the current width; add right-side slack on
   `.works-content` (widen the track or add trailing padding) so the last column can move left
   without exposing empty space at the right edge.
3. Vertical staircase offsets (`.work-col:nth-child(3) > .pointer-disabled` 276px,
   `nth-child(4) > .pointer-disabled` 547px) push EARN low in the sticky viewport. Verify at 1280
   and 1440 that the full `3 / EARN / description` group stays inside the sticky viewport across the
   whole scroll; if it clips, reduce the step-4 offset only as far as needed while keeping the group
   centred against its rail segment.
4. Keep `TRAVEL_COMPLETE_AT = 0.85` and the `340vh` section height unchanged.

## Verification

Playwright at 1280 and 1440: capture the horizontal position of each step group at several scroll
positions and confirm each of the three groups crosses the screen centre; confirm EARN ends centred;
confirm no horizontal overflow and no empty gap at the right edge; confirm the 360px mobile layout
is unchanged; check the build log is clean.
