# Differentiate "How It Works" section background from card ramp

## Current state

In `src/components/battery-smart/HowSwappingWorks.tsx`:

- Section background: `hsl(var(--c-green-soft) / 0.35)` → mint tint `#CFF1DF` at 35% opacity.
- Card ramp:
  - Card 1 `#F5FBF8` (mint white)
  - Card 2 `#DFF4EA` (light mint)
  - Card 3 `#B8E9D2` (mid mint)
  - Card 4 `#002366` (navy)

The section background is only a few steps lighter than cards 1 and 2, so the cards can blend into the band instead of reading as floating panels.

## Proposed fix

Change the section band to a clean, near-white surface that is clearly separate from the mint card ramp, while staying inside the brand palette.

```text
New section background: #F8FBF9  (matches --c-surface, the page background)
```

This keeps the focus on the four-step card ramp (the actual content) and avoids competing with the adjacent CTA section, which already uses `#CFF1DF`.

## Files to update

- `src/components/battery-smart/HowSwappingWorks.tsx`
  - Replace `.sss-section.totoogo { background: hsl(var(--c-green-soft) / 0.35); }`
  - with `.sss-section.totoogo { background: hsl(var(--c-surface)); }`

## Verification

- Screenshot the "How It Works" section at desktop and mobile widths.
- Confirm the section background is clearly lighter/neutral compared with card 1 (`#F5FBF8`).
- Confirm no brown or leftover warm tints appear.
- Confirm the sticky card stack still renders correctly.
