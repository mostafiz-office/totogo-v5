# IN-03 — Numbers section with scroll-triggered counters

**Status:** Not started
**Depends on:** IN-01 (build after IN-02 for visual continuity)

## Goal

Four funding figures that count up when the section scrolls into view.

## Files touched

- new `src/pages/investment/InvestmentStats.tsx` (or a section component in the
  same folder)
- edit `src/pages/investment/investment.css`
- edit `src/pages/investment/InvestmentPage.tsx` (render the section)

## Content (exact)

| Value | Label |
|-------|-------|
| US$750K | Target Raise |
| US$5M | Pre-Money Valuation |
| US$50K | Minimum Investment |
| Up to 15 | Minimum-Ticket Allocations* |

Footnote under the grid, exactly: `*Minimum-ticket allocations`
Nothing else is added — no invented terms, conditions or dates.

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
  animation. (Check with `window.matchMedia` in JS; the global CSS reduced-motion
  reset at `src/index.css` only covers the `.reveal` transition.)
- Accessibility: wrap each figure in `<span aria-label="US$750K">` with the
  animating text `aria-hidden="true"`, so screen readers announce the final
  value once.

## Layout

- `<section className="sec-pad" aria-label="Funding round at a glance">`
- Background: a full-width band of `hsl(var(--c-surface-alt))`, so it separates
  from the hero above and the CTA below. No inner card, no gradient.
- Grid: `grid-cols-2` mobile, `md:grid-cols-4`, gap 16px mobile / 24px desktop.
- Each cell: value in navy (`hsl(var(--c-navy))`), weight 700, clamp ~28px →
  ~44px; label below in `hsl(var(--c-muted))`, 13–15px, max 2 lines, no clipping.
- Optional thin vertical hairlines (`--c-border`) between desktop columns only.
- **No icons in this section** — the numbers carry it.
- The eyebrow is not repeated here; it lives in the hero.

## Reveal

Reuse the existing global `.reveal` / `.is-in` classes defined in
`src/index.css` (lines ~597–603, with the reduced-motion reset at ~699). Only
the IntersectionObserver that adds `.is-in` needs to be written.

## Acceptance criteria

- All four values and labels match the table above exactly, plus the footnote
  `*Minimum-ticket allocations`.
- Counters run once on first scroll into view, never restart on re-scroll.
- No layout shift while numbers animate.
- 2×2 on mobile, 1×4 on desktop, no horizontal overflow at 360px.
- With reduced motion enabled, final values show instantly.
- `README.md` status table updated to **Done** for IN-03.
