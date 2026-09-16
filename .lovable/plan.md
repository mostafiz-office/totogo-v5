# Desktop How It Works motion correction

## Goal
Make steps 2 (SWAP) and 3 (EARN) follow the green stepped rail correctly on desktop. Each step should arrive at the horizontal center, align vertically with its rail segment, then travel upward at the bend instead of continuing left across the page.

## Changes
- Keep step 1 (BUY) as the visual and motion reference.
- Separate the step-card motion from the single horizontal track movement so each card can follow its own rail phase.
- For steps 2 and 3, use a two-part movement:
  1. move horizontally toward the center while staying aligned to the correct horizontal rail segment;
  2. once centered at the rail bend, hold the horizontal position and move upward with the vertical segment.
- Correct the starting vertical offsets so the number and content blocks sit centrally against their respective horizontal rail segments before the upward transition.
- Keep the gray/green rail drawing synchronized with the step movement and preserve the existing section text, colors, sizing, and mobile stacked layout.
- Respect reduced-motion preferences with a stable, fully readable desktop state.

## Technical details
- Extend the existing scroll-frame calculation to return per-step horizontal and vertical transforms using the measured rail bend coordinates from the SVG.
- Apply those transforms to dedicated wrappers for BUY, SWAP, and EARN instead of relying only on the parent track translation.
- Add focused frame tests for each step’s arrival, center hold, upward phase, final visibility, and clamped scroll progress.

## Validation
- Check the animation at 1280px, 1440px, and the current wide desktop viewport.
- Capture checkpoints before, at, and after the center bend for steps 2 and 3.
- Confirm each number/content block is vertically centered on its horizontal rail, then rises without drifting left.
- Confirm step 3 remains readable before the section releases and step 1 still behaves as before.
- Confirm the mobile layout is unchanged and no horizontal overflow or runtime errors are introduced.
