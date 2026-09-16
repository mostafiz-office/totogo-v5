# FL-07 — Visual assets

**Status:** Done

## Generate

`src/assets/solutions-fleet-hero.jpg` — 1280×960 (4:3)

Prompt direction: a row of electric three-wheelers and small electric delivery
vehicles lined up in a depot yard, a fleet manager with a tablet in the
foreground. Brand palette only — green `#00CE7E`, navy `#002366`, mint and
white. Daylight, realistic, no readable text or logos.

## Wire up

- ES6 import in `FleetHero.tsx`, eager + high priority, explicit dimensions.
- Alt: `A fleet of totooGO electric three-wheelers lined up ready for commercial use.`

## Accept when

- Crisp at all breakpoints, no layout shift, no off-brand colours.
