# IN-03 — Numbers section with scroll-triggered counters

**Status:** Not started
**Depends on:** IN-01 (IN-02 recommended first for visual continuity)

## Goal

Four funding figures that count up when the section scrolls into view.

## Content (exact)

| Value | Label |
|-------|-------|
| US$750K | Target Raise |
| US$5M | Pre-Money Valuation |
| US$50K | Minimum Investment |
| Up to 15 | Minimum-Ticket Allocations* |

Footnote under the grid: `*Minimum-ticket allocations available in the current round.`
If the client has not approved that wording, render just `*` alongside the
fourth label and omit the footnote — do not invent extra terms. Default:
render the footnote as `*Minimum-ticket allocations` only.

## Counter behaviour

Each value is split into `prefix` + `number` + `suffix` so only the numeral
animates:

| prefix | number | suffix |
|--------|--------|--------|
| `US$` | 750 | `K` |
| `US$` | 5 | `M` |
| `US$` | 50 | `K` |
| `Up to ` | 15 | `` |

- Animation starts once, when the section is ≥ 30% visible
  (IntersectionObserver, `unobserve` after firing).
- Duration 1400ms, `requestAnimationFrame`, ease-out cubic
  (`1 - Math.pow(1 - t, 3)`), values rounded to integers.
- Reserve the final width so the layout does not jump while counting
  (`font-variant-numeric: tabular-nums`, `min-width` on the number span).
- `prefers-reduced-motion: reduce` → render the final value immediately, no
  animation.
- Accessibility: wrap each figure in
  `<span aria-label="US$750K">` with the animating text `aria-hidden="true"`,
  so screen readers announce the final value once.

## Layout

- `<section className="sec-pad" aria-label="Funding round at a glance">`
- Background: the `--c-surface-alt` band, so it separates from the hero above
  and the CTA below. Alternatively a full-width band with rounded 2rem inner
  card on `--c-surface` — pick one and keep it consistent.
- Grid: `grid-cols-2` mobile, `md:grid-cols-4`, gap 16px mobile / 24px desktop.
- Each cell: value in navy, weight 700, clamp ~28px → ~44px; label below in
  `--c-muted`, 13–15px, max 2 lines, no clipping.
- Optional thin vertical hairlines (`--c-border`) between desktop columns only.
- Eyebrow above the grid is **not** repeated here — it lives in the hero.

## Acceptance criteria

- All four values and labels match the table above exactly.
- Counters run once on first scroll into view, never restart on re-scroll.
- No layout shift while numbers animate.
- 2×2 on mobile, 1×4 on desktop, no horizontal overflow at 360px.
- With reduced motion enabled, final values show instantly.
