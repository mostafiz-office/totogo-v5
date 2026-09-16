# BS-06 — Closing CTA section

**Status:** Done
**Component:** `src/components/solutions/battery-swapping/BatterySwapCTA.tsx`
**Pattern:** copy the structure and styling of `src/components/investment/InvestmentCTA.tsx`

## Content

- `<h2>`: `Find Your Nearest Swap Station`
- Supporting line: `Join the totooGO battery swapping network and keep your vehicle on the road.`
- Primary button: `Find a Swap Station`, `href="#"`
- Secondary button: `Explore the Network`, `href="#"`

Both button labels are taken from the document's CTAs. The heading and
supporting line are the CTA-section wrapper text, matching the Investment page
pattern — they are the only non-document copy allowed on this page.

## Layout

- Rounded navy card (`--c-navy`), radius 24–32px, inset from the page edges.
- White heading, muted-light supporting line, buttons side by side at ≥768px,
  stacked full width below.
- `.sec-pad-b` below the card so the footer is not crowded.

## Accept when

- Contrast of white on navy ≥ 4.5:1.
- Buttons are 44px min height and focus-visible.
- Card does not overflow horizontally at 360px.
