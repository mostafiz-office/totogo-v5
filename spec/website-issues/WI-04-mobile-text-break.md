# WI-04 — Text breaks / stays invisible on mobile

- **Source row:** SL 4, tab "Website Issues"
- **Screenshot:** `screenshots/WI-04-mobile-text-break.png`
- **Client remark (verbatim):** "Texts break on mobile devices, has to work on responsive design."
- **Area:** "EV Ownership Made Easy" steps (1 BUY / 2 SWAP / 3 EARN)
- **Viewport in screenshot:** Mobile
- **Status:** Fixed (2026-09-16) — cards now keyed on `data-step`, verified at 360px

## Observed behaviour

On mobile, steps 1 (BUY) and 2 (SWAP) render as filled cards with readable text, while step 3 (EARN) shows only a ghosted, near-invisible paragraph. The client marked the unreadable EARN block with two arrows.

## Confirmed cause

Below 991px the desktop scrolling track is hidden (`.work-sticky { display: none }`) and a static list `.bp-mobile` renders instead. There is **no reveal animation on mobile** — the earlier assumption that an animation fails to complete is wrong.

The real defect is in `src/pages/how-it-works.css`, lines 171-174. Card colours are assigned with `nth-of-type`, but the first `div` inside `.bp-mobile` is the bolt-icon `.section-heading`, so the counting is off by one:

- `nth-of-type(1)` (mint `#CFF1DF`) matches the icon wrapper, not step 1
- step 1 gets `nth-of-type(2)` → green `#00CE7E` (intended for step 2)
- step 2 gets `nth-of-type(3)` → navy `#002366` (intended for step 3)
- step 3 matches no colour rule → **no background**, while `nth-of-type(n+2) .num-para` still paints its paragraph white

White text on a white background is exactly the ghosted EARN block in the screenshot. The same bug also shifts the whole mint / green / navy card ramp by one step.

## Expected behaviour

All three steps render fully and legibly on mobile, and the card colours follow the intended order: step 1 mint `#CFF1DF` with dark text, step 2 green `#00CE7E` with white text, step 3 navy `#002366` with white text.

## Likely files

- `src/pages/how-it-works.css` — the live stylesheet for this section (lines 155-174, `.bp-mobile` block)
- `src/components/HowItWorks.tsx` — mobile markup (`.bp-mobile`)

Note: `src/components/how-it-works.css` and `src/components/howItWorks.frame.ts` are **not** used by this component. Do not edit them for this task.

## Suggested fix direction

Target the cards by a stable selector instead of `nth-of-type` — for example give each mobile card a `data-step` attribute (or a class per step) in `HowItWorks.tsx` and colour on that. Avoid positional selectors that break when a sibling is added.

## Acceptance criteria

1. At 360px, 414px and 768px all three steps (BUY, SWAP, EARN) are fully readable at full opacity.
2. Mobile card backgrounds read in order: step 1 mint `#CFF1DF`, step 2 green `#00CE7E`, step 3 navy `#002366`.
3. Every heading and paragraph has sufficient contrast against its own card background — no white text on a light or absent background.
4. No step's text is cut off, overflows its card, or overlaps a neighbouring step. No horizontal scrolling.
5. Desktop behaviour is not degraded (see WI-07, which covers the desktop defect for the same component).

## DO NOT

- Do not rewrite the step copy.
- Do not remove a step or change the step order.
- Do not change the brand colours themselves (mint / green `#00CE7E` / navy `#002366`).
- Do not "fix" it by hiding the section on mobile.
- Do not edit the unused files named above.
