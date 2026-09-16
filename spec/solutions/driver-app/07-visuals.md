# DA-07 — Visual assets

**Status:** Not started

## Generate

`src/assets/solutions-driver-app-hero.jpg` — 1280×960 (4:3)

Prompt direction: a driver holding a smartphone showing a clean map interface
with nearby battery swap station pins, an electric three-wheeler softly blurred
behind. Brand palette only — green `#00CE7E`, navy `#002366`, mint and white.
Daylight, realistic, no readable text or logos in the image.

## Wire up

- ES6 import in `DriverAppHero.tsx`, `loading="eager"`, `fetchPriority="high"`,
  explicit width/height.
- Alt: `The totooGO Driver App showing nearby battery swap stations on a phone screen.`

## Icons

`lucide-react` only — `MapPin`, `Radio`, `History`, `CreditCard`.

## Accept when

- Renders crisply at all breakpoints, no layout shift, no off-brand colours.
