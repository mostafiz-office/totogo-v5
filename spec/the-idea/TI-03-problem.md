# TI-03 — Section 2: The Problem

**Status:** Not started
**Component:** `src/components/the-idea/IdeaProblem.tsx`
**Background:** `--c-surface-alt`

## Content (exact)

- H2: `Mobility Should Work Better`
- Paragraph 1: `Millions of drivers and passengers still depend on vehicles that are inefficient, unsafe, expensive to operate, and difficult to finance.`
- Paragraph 2: `Transport operators also face limited access to vehicle ownership, while conventional and retrofitted vehicles contribute to rising operating costs and emissions.`
- Cards (title — body):
  1. `Low Driver Income` — `High operating costs reduce earning potential.`
  2. `Limited Financing` — `Vehicle ownership remains out of reach for many drivers.`
  3. `Unsafe Vehicles` — `Poorly designed and retrofitted vehicles create safety risks.`
  4. `Long Charging Downtime` — `Traditional EV charging does not suit high-usage commercial mobility.`

## Layout

- Heading + both paragraphs centred, `max-width: 760px`.
- Card grid: 1 column <768px, 2 columns 768–1023px, 4 columns ≥1024px, 20px gap.
- Card: white background, `--c-border` hairline, radius 16px, padding 24px,
  equal height across a row (grid rows stretch).
- Each card has a 40×40 mint chip with a lucide icon (TI-07): wallet, hand-coins,
  shield-alert, timer — in card order.
- Title navy, 18px/600; body `--c-muted`, 15px/1.6.

## Motion

Cards reveal as one group, 60ms stagger, single run. The global `.reveal` rule has
no stagger of its own (`.pcard.reveal` is homepage-only), so set `style={{ "--i": i }}`
on each card and add
`.the-idea-page .idea-card.reveal { transition-delay: calc(var(--i, 0) * 60ms); }`
to `the-idea.css`.

## Acceptance

- Titles and body copy match the document character for character.
- No card text clipping at 360px; equal card heights per row at ≥768px.
