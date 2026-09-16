# BS-07 — Visual assets

**Status:** Not started

## Generate

`src/assets/solutions-battery-swapping-hero.jpg` — 1280×960 (4:3)

Prompt direction: a clean, modern battery swapping station in a Bangladeshi
street setting, an electric three-wheeler pulled up beside it, a station
attendant handing over a charged battery pack. Brand palette only — green
`#00CE7E` accents, navy `#002366`, light mint and white surfaces. Bright
daylight, realistic, no text or logos in the image.

## Wire up

- Import in `BatterySwapHero.tsx` as an ES6 image import.
- `loading="eager"`, `fetchPriority="high"`, `width`/`height` set to avoid shift.
- Alt: `A totooGO battery swap station with a charged battery being handed to a rider.`

## Icons

Slider icons from `lucide-react` only (see BS-04). No icon images generated.

## Accept when

- Image renders at every breakpoint, no distortion, no layout shift.
- No brown or off-brand colours in the generated image.
