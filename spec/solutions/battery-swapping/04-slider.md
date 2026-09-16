# BS-04 — Shared SolutionSlider + Why Battery Swapping slider

**Status:** Done
**Builds:** `src/components/solutions/SolutionSlider.tsx` + `solution-slider.css`
(shared by all four pages — build it properly here, reuse it later unchanged)

## Component contract

See `../shared-patterns.md` §7 for props, behaviour, keyboard, snap, sizing and
reduced-motion rules. Implement all of it in this task.

## Slides on this page (verbatim, from Section 3)

1. `Fast turnaround`
2. `Less vehicle downtime`
3. `No long charging wait`
4. `Lower battery ownership burden`
5. `Designed for commercial EV users`

The document gives no descriptions for these five items, so each slide shows the
title only — **do not invent body copy**. Card layout for title-only slides:
mint icon chip, then the title in navy, vertically centred, min-height 180px.
Icons come from `lucide-react` (`Timer`, `Activity`, `BatteryCharging`,
`Wallet`, `Truck`) — icons are decorative, `aria-hidden`.

Slider `ariaLabel`: `Why battery swapping`.

## Accept when

- Swipe works on touch, arrows work on desktop, arrow keys scroll the track.
- Arrows disable at the first and last slide.
- 1.1 slides visible at 360px, 2 at 768px, 3 at 1024px+.
- No page-level horizontal overflow (only the track scrolls).
- Smooth scrolling disabled under reduced motion.
