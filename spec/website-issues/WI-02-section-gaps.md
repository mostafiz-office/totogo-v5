# WI-02 — Inconsistent vertical gaps between sections

- **Source row:** SL 2, tab "Website Issues"
- **Screenshot:** `screenshots/WI-02-section-gaps.png`
- **Client remark (verbatim):** "Proper gaps must be maintained"
- **Area:** Vertical rhythm between landing page sections, highlighted between the section above and the "How It Works" section
- **Viewport in screenshot:** Desktop (browser devtools open, element `section#how-swapping-works` inspected, padding shown as `112px 24px`)
- **Status:** Not started

## Observed behaviour

The client marked the empty band between the preceding section and the "HOW IT WORKS" heading with up/down arrows. The whitespace there reads as arbitrary compared with the spacing used between other sections on the same page — some sections sit tight, this one has a large gap, so the page has no consistent vertical rhythm.

## Expected behaviour

All top-level sections on the landing page use one shared vertical spacing scale, so the gap between any two consecutive sections looks deliberate and equal in weight. The gap above "How It Works" matches that scale.

## Likely files

- `src/pages/Index.tsx` — section order on the landing page
- `src/components/battery-smart/HowSwappingWorks.tsx` — section padding (`py-14 md:py-20 lg:py-28`) and scoped styles
- `src/components/battery-smart/CTASection.tsx`, `src/components/HowItWorks.tsx`, `src/components/battery-smart/unleash-ev/EVPotentialSection.tsx` — neighbouring sections' padding
- `src/index.css` — if a spacing token is introduced

## The spacing scale to apply

One scale, applied as top and bottom padding on every top-level section of the landing page:

| Viewport | Section padding (top and bottom) |
|----------|----------------------------------|
| < 768px  | 56px |
| 768-1023px | 80px |
| >= 1024px | 112px |

Sections in scope (order as rendered in `src/pages/Index.tsx`): Hero, EVPotentialSection, HowItWorks, CTASection, HowSwappingWorks.

Exception: the Hero may keep its own top padding since it sits under the fixed header — its bottom padding still follows the scale.

`HowSwappingWorks` already uses `py-14 md:py-20 lg:py-28`, which equals 56 / 80 / 112px — that is the scale. The task is to bring the other sections onto it, not to invent new numbers.

`HowItWorks` is a fixed-height scroll section (`height: 800px` in `src/pages/how-it-works.css`); apply the scale to its mobile branch (`.bp-mobile`) and to the gap above and below the section, without changing the desktop scroll height (that height is load-bearing for WI-07).

## Acceptance criteria

1. Every section listed above uses the scale's padding values, with no ad-hoc margins adding extra space between sections.
2. Verification: read each section's computed `padding-top` / `padding-bottom` at 360px, 768px and 1280px and record them in a table; every value matches the scale (allowing the Hero top exception).
3. At 1280px no section shows an empty band larger than 112px above its first content.
4. No section collides or loses its own internal padding.

## DO NOT

- Do not reorder, remove, or add sections.
- Do not change section content, copy, colours, or imagery.
- Do not change internal layout within a section beyond its outer vertical padding.
