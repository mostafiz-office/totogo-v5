# FL-05 — Sections 3 and 4

**Status:** Not started

## Section 3 — Built for Commercial Use

**Component:** `FleetCommercial.tsx` · background `--c-surface` · `.sec-pad`

- `<h2>`: `Built for Commercial Use`
- Intro line: `Ideal for:`
- Five pill chips (verbatim, in this order): `Passenger transport`,
  `Delivery fleets`, `FMCG distribution`, `Small cargo transport`,
  `Utility vehicles`.
- Chips: mint `--c-green-soft` background, navy label, radius pill, wrap freely.
  Render as a `<ul>` so it reads as a list; chips are not links or buttons.

## Section 4 — A Complete Transition

**Component:** `FleetTransition.tsx` · background `--c-surface-alt` · `.sec-pad`

- `<h2>`: `A Complete Transition`
- Paragraph: `totooGO supports the shift from conventional vehicles to electric through one connected ecosystem.`
- Chain strip (verbatim): `Vehicles + Batteries + Swapping + Technology + Support`
  — render as five navy-outlined tokens joined by green `+` separators, wrapping
  on small screens. The `+` separators are decorative (`aria-hidden`) and the
  full sentence stays readable to screen readers.
- Secondary button: `Talk to Our Fleet Team`, `href="#"`

## Accept when

- All five chips and five chain tokens present, verbatim, nothing added.
- Wraps without overflow at 360px.
