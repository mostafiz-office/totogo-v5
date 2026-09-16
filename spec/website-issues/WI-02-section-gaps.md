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

## Acceptance criteria

1. Define one vertical section spacing scale (for example a small set of section padding values for mobile / tablet / desktop) and apply it to every top-level landing page section.
2. At 1280px, the gap between consecutive sections is visually equal across the page; no section has an outsized empty band.
3. Same check passes at 768px and 360px with the scale's responsive values.
4. No section collides or loses its own internal padding.

## DO NOT

- Do not reorder, remove, or add sections.
- Do not change section content, copy, colours, or imagery.
- Do not change internal layout within a section beyond its outer vertical padding.
