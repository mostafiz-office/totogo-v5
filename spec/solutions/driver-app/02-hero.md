# DA-02 — Section 1, Hero

**Status:** Not started
**Component:** `src/components/solutions/driver-app/DriverAppHero.tsx`

## Content (verbatim)

- Eyebrow: `Driver App`
- `<h1>`: `Everything a Driver Needs, in One App.`
- Body: `Find nearby swap stations, manage your battery usage, and stay connected to the totooGO network.`
- Primary button: `Explore the Driver App`, `href="#"`

## Layout

- Two columns ≥1024px, stacked below. Background `--c-surface`, `.sec-pad`.
- Visual: app mockup image (DA-07), rounded 24px, eager + high priority,
  alt `The totooGO Driver App showing nearby battery swap stations on a phone screen.`
  Mint placeholder block of the same ratio until DA-07 lands.
- Reveal on scroll via `useReveal`.

## Accept when

- One `<h1>`, matching copy, no overflow at 360px, focus ring on the button.
