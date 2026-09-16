# BS-02 — Section 1, Hero

**Status:** Done
**Component:** `src/components/solutions/battery-swapping/BatterySwapHero.tsx`

## Content (verbatim)

- Eyebrow: `Battery Swapping` (uppercased via CSS)
- `<h1>`: `Swap in Minutes. Stay on the Road.`
- Body: `Replace a depleted battery quickly and get back to work without long charging delays.`
- Primary button: `Find a Swap Station`, `href="#"`

## Layout

- Two columns at ≥1024px (text 55% / image 45%), stacked below.
- Section background `--c-surface`, `.sec-pad`.
- Image: rounded 24px, soft shadow, `loading="eager"`, `fetchPriority="high"`,
  alt `A totooGO battery swap station with a charged battery being handed to a rider.`
  Until BS-07 delivers the file, render a mint `--c-green-soft` placeholder block
  with the same aspect ratio (4:3) — never a broken image.

## Behaviour

- Heading and copy use `.reveal` + `useReveal`.
- Button: primary style from shared §8, 44px min height, visible focus ring.

## Accept when

- Exactly one `<h1>` on the page and it matches the copy above.
- No horizontal overflow at 360px.
- Button is reachable by keyboard with a visible ring.
