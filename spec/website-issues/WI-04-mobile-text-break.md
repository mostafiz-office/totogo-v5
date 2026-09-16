# WI-04 — Text breaks / stays invisible on mobile

- **Source row:** SL 4, tab "Website Issues"
- **Screenshot:** `screenshots/WI-04-mobile-text-break.png`
- **Client remark (verbatim):** "Texts break on mobile devices, has to work on responsive design."
- **Area:** "EV Ownership Made Easy" steps (1 BUY / 2 SWAP / 3 EARN)
- **Viewport in screenshot:** Mobile
- **Status:** Not started

## Observed behaviour

On mobile, steps 1 (BUY) and 2 (SWAP) render as filled cards with readable text, while step 3 (EARN) shows only a ghosted, near-invisible paragraph — the reveal/scroll animation never completes for the last step, so its text sits at near-zero opacity against the background. The client marked the unreadable EARN block with two arrows. The overall block therefore looks broken on small screens.

## Expected behaviour

All three steps render fully, legibly and at full opacity on mobile. Any scroll-driven reveal animation either completes reliably on mobile or is disabled there in favour of static, always-visible content. No text is clipped, overlapped, or left transparent.

## Likely files

- `src/components/HowItWorks.tsx`
- `src/components/how-it-works.css`
- `src/components/howItWorks.frame.ts` — scroll/frame math driving the reveal

## Acceptance criteria

1. At 360px and 414px, all three steps (BUY, SWAP, EARN) are fully readable at full opacity after normal scrolling.
2. No step's text is cut off, overflows its card, or overlaps a neighbouring step.
3. Scrolling the section up and down repeatedly never leaves a step stuck in a faded or partial state.
4. At 768px the same holds.
5. Desktop behaviour is not degraded (see WI-07, which covers the desktop defect for the same component).

## DO NOT

- Do not rewrite the step copy.
- Do not remove a step or change the step order.
- Do not change brand colours of the cards.
- Do not "fix" it by hiding the section on mobile.
