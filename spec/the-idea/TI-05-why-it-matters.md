# TI-05 — Section 4: Why It Matters

**Status:** Not started
**Component:** `src/components/the-idea/IdeaWhy.tsx`
**Background:** `--c-surface-alt`

## Content (exact)

- H2: `More Time on the Road. Lower Barriers to Electric.`
- Intro: `Our approach is designed around the real needs of drivers and commercial operators.`
- Items (title — body):
  1. `Fast Swapping` — `Minimize downtime between journeys.`
  2. `Lower Upfront Cost` — `Separate battery access from vehicle ownership.`
  3. `Safer Mobility` — `Introduce purpose-built electric vehicles.`
  4. `Recurring Support` — `Connect vehicles with swapping, service, and technology.`
  5. `Cleaner Transportation` — `Help reduce dependence on carbon-emitting mobility.`

## Layout

- Heading + intro left-aligned on desktop (max 760px), centred on mobile.
- Grid: 1 column <768px, 2 columns 768–1023px, 3 columns ≥1024px, 20px gap.
  Five items means the last desktop row holds two cards — they keep normal card
  width (no stretching, no centring hacks).
- Card style differs from Section 2 to avoid repetition: transparent background,
  left mint 3px rule, no border, padding-left 20px; title navy 18px/600, body
  `--c-muted` 15px/1.6. Small green check-circle icon before each title.

## Motion

Items reveal as one group with a 60ms stagger.

## Acceptance

- Five items with exact copy, visually distinct from the Section 2 cards.
- No overflow or text clipping at 360px, 768px, 1280px.
