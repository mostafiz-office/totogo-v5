# IN-05 — Visual assets, icons and background treatment

**Status:** Not started
**Depends on:** IN-02, IN-03, IN-04

## Hero visual

Generate one new image and store it at `src/assets/investment-hero.jpg`, then
import it as an ES6 import in the hero component (never a string path).
Existing assets are not reused — `ev-ownership-cta-*.jpg` and the
`hq-building-isometric-*` files belong to other sections and do not fit this
page.

Brief for generation:
- Subject: a totooGO-style electric three-wheeler at a battery-swap point in a
  clean, modern Bangladeshi urban setting — or an isometric depiction of the
  ecosystem (vehicle + swap station + app).
- Palette constrained to the brand: green `#00CE7E`, navy `#002366`, mint
  `#CFF1DF`, near-white `#F8FBF9`. **No brown, tan, orange or purple.**
- Flat / semi-realistic, bright, no embedded text, no logos, no watermarks.
- Landscape, approximately 1200 × 900, `.jpg`.
- `alt`: `Electric three-wheeler at a totooGO battery swapping station`.
- `loading="lazy"`, `decoding="async"`, explicit `width`/`height` to avoid
  layout shift.

## Icons

- Library: `lucide-react` (already used across the site), size 18–20,
  `strokeWidth: 2`, colour from tokens.
- **Numbers section: no icons.** (Decision locked in IN-03.)
- Hero eyebrow: a small green dot, not an icon.
- CTA: `ArrowRight` on the primary button only.

## Background treatment

- Hero: `hsl(var(--c-surface))` with a single soft radial mint glow behind the
  visual — `radial-gradient(circle, hsl(var(--c-green-soft)/0.7), transparent 70%)`,
  `pointer-events: none`, hidden below `md` if it causes overflow.
- Numbers: solid `hsl(var(--c-surface-alt))` band, no gradient.
- CTA: navy card with a low-opacity green glow, as per IN-04.
- No gradient overlays that fade images on mobile (this caused WI-03 earlier) —
  any decorative overlay must be `hidden md:block`.

## Acceptance criteria

- `src/assets/investment-hero.jpg` exists, loads sharp, shows no brown/warm tones.
- Image has the specified alt text and reserves its space while loading.
- All icons come from `lucide-react` and are token-coloured.
- No decorative overlay blurs or fades content on mobile.
- `README.md` status table updated to **Done** for IN-05.
