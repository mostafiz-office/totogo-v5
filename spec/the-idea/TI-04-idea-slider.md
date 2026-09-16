# TI-04 — Section 3: The Idea (slider)

**Status:** Done
**Component:** `src/components/the-idea/IdeaEcosystem.tsx`
**Background:** `--c-surface`
**Section id:** `the-idea-ecosystem` (hero CTA target, `scroll-margin-top: 96px`)

## Content (exact)

- H2: `Build the Entire Ecosystem, Not Just the Vehicle`
- Intro: `totooGO connects the essential parts of electric mobility into one platform.`
- Slides (title / body), in this order:
  1. `Affordable Electric Vehicles` — `Purpose-built for everyday passenger and commercial use.`
  2. `Battery-as-a-Service` — `Reduce the burden of owning an expensive EV battery.`
  3. `Rapid Battery Swapping` — `Replace depleted batteries quickly and stay on the road.`
  4. `Accessible Financing` — `Create an easier path toward vehicle ownership.`
  5. `Digital Technology` — `Connect drivers, stations, fleets, and partners through one ecosystem.`

## Implementation

- Reuse the existing shared `SolutionSlider`
  (`src/components/solutions/SolutionSlider.tsx`) with
  `ariaLabel="The totooGO ecosystem"`. Do not fork or restyle it; if a
  page-specific tweak is needed, add a new class under `.the-idea-page`.
- Slides use both `title` and `body`, each with a mint icon chip (TI-07):
  car-front, battery-charging, repeat, badge-percent, cpu.
- Visible slides: 1.1 mobile / 2 at ≥768px / 3 at ≥1024px — these are the built-in
  `solution-slider.css` breakpoints; do not restate or override them.
- Arrow placement is fixed by the shared component: the `sol-slider__nav` row sits
  **below** the track, centred on mobile and right-aligned from 768px up. The
  heading block sits above the track. Do not move the arrows next to the heading.

## Acceptance

- Five slides, correct order and copy.
- Touch swipe, arrow buttons, and Left/Right keys all move the track by one slide.
- Arrows disabled at each end; both have `aria-label`.
- No horizontal page overflow at 360px (only the track scrolls).
