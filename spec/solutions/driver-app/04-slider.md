# DA-04 — Key Features slider

**Status:** Not started
**Uses:** the shared `SolutionSlider` built in `spec/solutions/battery-swapping/04-slider.md`.
Do not fork or re-implement it. If a genuine gap appears, extend the shared
component with an optional prop and keep the Battery Swapping page working.

## Slides (verbatim, title + body)

1. `Find Stations` — `Locate the nearest available swapping station.`
2. `Live Availability` — `Check station and battery availability in real time.`
3. `Swap History` — `Track previous battery swaps and usage.`
4. `Payments` — `Manage digital payments from one place.`

Icons (`lucide-react`, decorative, `aria-hidden`): `MapPin`, `Radio`, `History`, `CreditCard`.

Slider `ariaLabel`: `Driver App key features`.

## Accept when

- Four slides, swipe + arrows + arrow keys all work, ends disable the arrows.
- 1.1 / 2 / 3 slides visible at 360 / 768 / 1024 px.
- No page-level horizontal overflow.
