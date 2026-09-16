# The Idea — wireframe

## Desktop (≥1024px)

```text
┌──────────────────────── SiteHeader (shared) ───────────────────────┐

  SECTION 1 — HERO                              bg: --c-surface
  ┌──────────────── 1200px ─────────────────────────────────────┐
  │  [ eyebrow: THE IDEA ]        │                             │
  │  H1 A Better Way to Move      │    hero image (16:11)       │
  │     Bangladesh                │    rounded 24px, soft       │
  │  lead paragraph (muted)       │    shadow, mint glow behind │
  │  chip row: Electric Vehicles  │                             │
  │   + Battery Swapping +        │                             │
  │   Technology + Financing      │                             │
  │  [ Discover the totooGO Ecosystem ] (primary)               │
  └─────────────────────────────────────────────────────────────┘

  SECTION 2 — THE PROBLEM                       bg: --c-surface-alt
      H2 Mobility Should Work Better  (centred, max 720px)
      two intro paragraphs (muted, centred)
  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   4-up card grid
  │ icon   │ │ icon   │ │ icon   │ │ icon   │
  │ title  │ │ title  │ │ title  │ │ title  │
  │ body   │ │ body   │ │ body   │ │ body   │
  └────────┘ └────────┘ └────────┘ └────────┘

  SECTION 3 — THE IDEA  (id="the-idea-ecosystem")  bg: --c-surface
      H2 Build the Entire Ecosystem, Not Just the Vehicle
      intro line
      ◀  [card][card][card]  ▶      SolutionSlider, 3 visible

  SECTION 4 — WHY IT MATTERS                    bg: --c-surface-alt
      H2 More Time on the Road. Lower Barriers to Electric.
      intro line
      ┌──────┐┌──────┐┌──────┐     5 items, 3-up grid
      ┌──────┐┌──────┐             (last row 2, left aligned)

  SECTION 5 — VISION + CTA                      bg: --c-surface
      H2 From Three-Wheelers to a Connected Electric Future
      paragraph (max 760px, centred)
      ┌──── navy rounded card (radius 28px) ────┐
      │  One Network. Multiple Possibilities.   │
      │  [ Explore Our Solutions ] (green)      │
      └─────────────────────────────────────────┘

└──────────────────────── SiteFooter (shared) ────────────────────────┘
```

## Tablet (768–1023px)

- Hero stays two-column but image drops to 45% width; chips wrap to 2 lines.
- Section 2 cards: 2-up grid.
- Slider: 2 slides visible.
- Section 4: 2-up grid.

## Mobile (<768px)

- Hero single column: eyebrow → H1 → lead → chips (wrap) → image → button
  (full-width, 44px min height).
- Section 2 and 4: single column stacked cards, 16px gap.
- Slider: 1.1 slides with peek, arrows below the track, centred.
- CTA card: full-width inside 16px page padding, text centred, button full-width.
