# WI-01 — Step number on stacked card is hidden

- **Source row:** SL 1, tab "Website Issues"
- **Screenshot:** `screenshots/WI-01-missing-card-number.png`
- **Client remark (verbatim):** "Missing card number"
- **Area:** "How It Works" four-step sticky card stack on the landing page
- **Viewport in screenshot:** Desktop
- **Status:** Not started

## Observed behaviour

In the sticky stack, each card carries a step badge (`01`, `02`, `03`, `04`) in its top-right corner. When the next card slides up over the current one, the badge of the card underneath is cut off by the overlapping card's top edge. In the screenshot, `03` is visible on the card behind, while the navy card in front covers the badge area so only a sliver of the circle remains — the number reads as missing.

## Expected behaviour

Every step badge stays fully legible at all scroll positions of the stack. The number is never clipped, half-covered, or reduced to a partial circle by the card stacked on top of it.

## Likely files

- `src/components/battery-smart/HowSwappingWorks.tsx` — card markup and the scoped `<style>` block: `.sss-card`, `.sss-step-badge`, `--sss-top`, `CARD_OFFSET`, `FIRST_STICKY_TOP`, `z-index` per step

## Acceptance criteria

1. Scrolling the whole section at 1280px: badges `01`–`04` are each fully visible whenever their card is the topmost visible card.
2. No badge is clipped by the card above it at any scroll offset.
3. The badge keeps its current style (size, weight, colour) unless a change is required to prevent clipping.
4. The sticky-stack scroll interaction still behaves as it does today.

## DO NOT

- Do not remove the step numbers or replace them with a different indicator.
- Do not convert the sticky stack into a different layout (grid, carousel, accordion).
- Do not change card copy, colours, or the mint-to-navy ramp.
- Do not alter the number of steps.
