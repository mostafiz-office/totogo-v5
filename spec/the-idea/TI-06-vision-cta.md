# TI-06 — Section 5: The Bigger Vision + closing CTA

**Status:** Done
**Component:** `src/components/the-idea/IdeaVisionCTA.tsx`
**Background:** `--c-surface`, with a navy rounded CTA card inside

## Content (exact)

- H2: `From Three-Wheelers to a Connected Electric Future`
- Paragraph: `totooGO starts with high-usage 2- and 3-wheel mobility, but the ecosystem is designed to grow into delivery fleets, cargo transport, utility vehicles, battery recycling, energy storage, and future electric mobility solutions.`
- CTA card heading (`<h3>`): `One Network. Multiple Possibilities.`
- Button: `Explore Our Solutions` → `/solutions/battery-swapping/` (React Router `Link`)

## Layout

- Vision heading + paragraph centred, `max-width: 760px`, `.sec-pad`.
- CTA card: navy `--c-navy` background, radius 28px, padding 40px (24px mobile),
  centred content, subtle green radial accent in one corner, same pattern as the
  Investment and Solutions closing CTAs.
- Card heading white, button green fill with navy label, pill radius,
  min height 48px, full-width on mobile.

## Motion

Vision block and CTA card each reveal once.

## Acceptance

- Copy matches the document exactly.
- Button navigates to the Battery Swapping page (client-side, no reload).
- Contrast: white on navy and navy on green both ≥ 4.5:1.
- Card never touches the viewport edge — 16px page padding preserved on mobile.
