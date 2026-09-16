# WI-05 — Overlapping card hides content on mobile

- **Source row:** SL 5, tab "Website Issues"
- **Screenshot:** `screenshots/WI-05-mobile-card-overlap.png`
- **Client remark (verbatim):** "Red marked area is not accessible/readable on mobile devices"
- **Area:** "How It Works" four-step sticky card stack
- **Viewport in screenshot:** Mobile
- **Status:** Fixed (2026-09-16) — badge moved to card top-right; mobile stack un-stickied

## Observed behaviour

On mobile the SWAP card is readable at the top, but the next card in the stack (navy, badge `03`) slides in over the lower half of the viewport and covers the rest of the current card. The red box marks that overlapping strip: its own content is cut off at the screen edge and the card beneath it can no longer be read or reached. On a small screen the stacked-card interaction makes content inaccessible.

## Expected behaviour

On mobile, each step's full content — eyebrow, heading, body, both stats, and the step badge — can be read without another card covering it. Either the stack offsets are tuned for small screens, or the stack falls back to a simple stacked/scrolling list on mobile.

## Do this together with WI-01

WI-05 and WI-01 are the same sticky stack and tune the same variables. Fix them in one pass and verify both at once, otherwise the second fix re-tunes the first.

## Likely files

- `src/components/battery-smart/HowSwappingWorks.tsx` — `FIRST_STICKY_TOP`, `CARD_OFFSET`, `--sss-top`, per-step `z-index`, and the scoped mobile media queries

## Acceptance criteria

1. At 360px and 414px, scrolling through the section shows each of the four steps in full, with no card covering another card's text.
2. The step badge for the visible card is legible (ties in with WI-01).
3. No horizontal scrolling and no content clipped by the viewport edge.
4. Desktop behaviour (1280px) remains the sticky stack as designed.

## DO NOT

- Do not change the four steps' copy or stats.
- Do not change card colours or the mint-to-navy ramp.
- Do not remove the section on mobile.
