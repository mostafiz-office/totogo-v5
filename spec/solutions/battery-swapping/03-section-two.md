# BS-03 — Section 2, How It Works

**Status:** Not started
**Component:** `src/components/solutions/battery-swapping/BatterySwapSteps.tsx`

## Content (verbatim)

| # | Title | Body |
|---|-------|------|
| 1 | Arrive | Visit the nearest totooGO swapping station. |
| 2 | Swap | Exchange the depleted battery for a charged one. |
| 3 | Go | Continue your journey with minimal downtime. |

Section heading `<h2>`: `How It Works`.

## Layout

- Band background `--c-surface-alt`, `.sec-pad`.
- Three equal cards in a row at ≥768px; stacked below.
- Each card: white surface, hairline border, radius 16px, padding 24–32px,
  circular navy number badge (green text) at the top-left, navy title, muted body.
- Cards reveal with a 80ms stagger.

## Do not

- Do not reuse the homepage sticky/scroll How-It-Works animation. This is a
  simple static three-card row — no scroll pinning, no horizontal travel.

## Accept when

- Three cards, equal height, numbers 1–3 visible and not clipped at any width.
- Stacks cleanly at 360px with no overflow.
