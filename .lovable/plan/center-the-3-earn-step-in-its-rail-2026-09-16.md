# Center the "3 / EARN" step in its rail

## Goal
On desktop, the third step (3 / EARN) sits near the top of its green rail segment. Make the whole group — big number, heading and paragraph — sit in the vertical middle of that segment, the same way steps 1 and 2 now do, and give the step enough height so the centering is visible.

## What changes
- The EARN step column currently uses a fixed top padding of 70px, which pushes the text up.
- Replace that with the same centering approach used for SWAP: a minimum height for the column plus vertical centering of its content.
- Set the minimum height so it matches the visible height of the green rail segment next to step 3, so the text lands in the rail's middle rather than above it.

## What stays the same
- Wording, artwork, typography, colours.
- Steps 1 and 2 layout, which are already correct.
- Mobile stacked-card layout and the horizontal scroll behaviour.

## Technical notes
- File: `src/pages/how-it-works.css`, rule `.bp-how-it-works ._w-col-four`.
- Swap `padding-top: 70px; padding-bottom: 40px;` for `min-height` + `display: flex; align-items: center;` mirroring `._w-col-third`.
- Measure the rail segment's rendered box at 1280px and 1440px with a browser check, then set `min-height` to that measured value instead of guessing.
- Verify: EARN group's vertical centre matches the rail segment centre at 1280/1440, steps 1–2 unchanged, 360px mobile unchanged, build clean.
