# BS-05 — Section 3 heading + Section 4

**Status:** Done

## Section 3 — Why Battery Swapping

**Component:** `BatterySwapWhy.tsx` (wraps the slider from BS-04)

- Background `--c-surface`, `.sec-pad`.
- `<h2>`: `Why Battery Swapping`
- Body: none in the document — heading then slider, nothing invented.

## Section 4 — Built for Everyday Mobility

**Component:** `BatterySwapEveryday.tsx`

- Background `--c-surface-alt`, `.sec-pad`.
- `<h2>`: `Built for Everyday Mobility`
- Paragraph (verbatim): `Designed for electric three-wheelers, delivery vehicles, commercial fleets, and other high-usage EVs.`
- Secondary button: `Explore the Network`, `href="#"`.
- Centred column, `max-width: 720px`, reveal on scroll.

## Accept when

- Both headings are `<h2>`, navy, correct order in the DOM.
- Button matches the secondary style and is keyboard focusable.
- Section backgrounds alternate as described in the wireframe.
