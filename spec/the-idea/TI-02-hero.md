# TI-02 — Section 1: Hero

**Status:** Done
**Component:** `src/components/the-idea/IdeaHero.tsx`
**Background:** `--c-surface`

## Content (exact)

- Eyebrow: `THE IDEA` (uppercase via CSS, letter-spacing 0.08em, green)
- H1: `A Better Way to Move Bangladesh`
- Lead: `totooGO is building a cleaner, safer, and more affordable mobility ecosystem designed around the people who keep Bangladesh moving every day.`
- Chip row, four chips split from `Electric Vehicles + Battery Swapping + Technology + Financing`:
  `Electric Vehicles`, `Battery Swapping`, `Technology`, `Financing`
- Primary button: `Discover the totooGO Ecosystem` → `href="#the-idea-ecosystem"`

## Layout

- Two columns at ≥1024px (copy 52% / image 48%, 48px gap), single column below.
- Section padding `.sec-pad`, horizontal `px-4 sm:px-6 md:px-[var(--pad-x)]`,
  inner `max-width: 1200px`.
- Chips: mint `--c-green-soft` background, navy label, pill radius, 8px gap,
  wrap freely; they are decorative text, not links.
- Image: `src/assets/the-idea-hero.jpg` (TI-07), aspect ratio 16:11,
  `border-radius: 24px`, soft shadow, mint radial glow behind at ≥1024px.
  `loading="eager"`, `fetchPriority="high"`, descriptive alt text.
- Anchor scrolling uses CSS `scroll-margin-top: 96px` on `#the-idea-ecosystem`
  so the sticky header does not cover the heading.

## Motion

Copy block and image each get `.reveal` via `useReveal`, image delayed ~120ms.

## Acceptance

- Exactly one `<h1>` on the page and it is this heading.
- At 360px: no horizontal overflow, button full-width, min height 44px.
- Clicking the button scrolls to Section 3 with the heading visible below the header.
