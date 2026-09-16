# WI-07 — Step 3 never becomes visible while scrolling

- **Source row:** SL 7, tab "Website Issues"
- **Screenshot:** `screenshots/WI-07-step-3-not-visible.png`
- **Client remark (verbatim):** "No. 3 is not visible while scrolling"
- **Area:** "EV Ownership Made Easy" steps (1 BUY / 2 SWAP / 3 EARN)
- **Viewport in screenshot:** Desktop
- **Status:** Not started

## Observed behaviour

On desktop the section reveals step 1 and then step 2 as the user scrolls, but step 3 (EARN) never appears — the scroll sequence ends on step 2 and the section moves on, leaving a large empty area to the right. The client scrolled the full section and step 3 was never shown.

## Expected behaviour

Scrolling through the section reveals all three steps in order — 1 BUY, 2 SWAP, 3 EARN — and step 3 stays fully visible and readable before the section is scrolled past.

## Likely files

- `src/components/HowItWorks.tsx`
- `src/components/how-it-works.css`
- `src/components/howItWorks.frame.ts` and `src/components/howItWorks.frame.test.ts` — the scroll-progress / frame mapping that decides which step is active; likely the section's scroll length or the per-step progress ranges stop short of the third step

## Acceptance criteria

1. At 1280px and 1440px, scrolling the section top to bottom reveals steps 1, 2 and 3 in order.
2. Step 3 reaches full opacity and stays readable for a comparable scroll distance to steps 1 and 2.
3. Scrolling back up reverses cleanly; no step gets stuck hidden or half-revealed.
4. Any existing unit tests over the frame math are updated and passing.
5. Mobile behaviour is handled in WI-04 and must not regress.

## DO NOT

- Do not remove the scroll reveal and dump all steps statically on desktop unless the owner approves that as the fix.
- Do not change the step copy, numbering, or colours.
- Do not add a fourth step (the four-step CHOOSE/BUY/SWAP/EARN story lives in the separate "How It Works" section).
