# IN-05 — Visual assets, icons and background treatment

**Status:** Not started
**Depends on:** IN-02, IN-03, IN-04

## Hero visual

One image, generated and stored at `src/assets/investment-hero.jpg`, imported
as an ES6 import into the hero component (never referenced by string path).

Brief for generation:
- Subject: a totooGO-style electric three-wheeler / battery-swap scene in a
  clean, modern Bangladeshi urban setting, or an abstract isometric depiction of
  the mobility ecosystem (vehicle + swap station + app).
- Palette constrained to the brand: green `#00CE7E`, navy `#002366`, mint
  `#CFF1DF`, near-white `#F8FBF9`. **No brown, tan, orange or purple.**
- Flat/semi-realistic, bright, no embedded text, no logos, no watermarks.
- Landscape, approximately 1200 × 900, `.jpg`.
- `alt` text: `Electric three-wheeler at a totooGO battery swapping station`.
- `loading="lazy"`, `decoding="async"`, explicit `width`/`height` to avoid
  layout shift.

If a suitable existing asset in `src/assets/` already fits the brand and scene,
reuse it instead of generating a new one.

## Icons

- Library: `lucide-react` (already used across the site), size 18–20,
  `strokeWidth: 2`, colour from tokens.
- Optional per-stat icons in IN-03 — only if they add clarity:
  `Target` (Target Raise), `TrendingUp` (Pre-Money Valuation),
  `Wallet` (Minimum Investment), `Users` (Minimum-Ticket Allocations).
  Icons sit above the number in a 40px mint circle. If they crowd the grid on
  mobile, drop icons entirely — numbers are the hero of that section.
- CTA buttons may use `ArrowRight` on the primary button only.

## Background treatment

- Hero: `--c-surface` with a single soft radial mint glow behind the visual,
  `radial-gradient(circle, hsl(var(--c-green-soft)/0.7), transparent 70%)`,
  `pointer-events: none`, hidden below `md` if it causes overflow.
- Numbers: solid `--c-surface-alt` band, no gradient.
- CTA: navy card with a low-opacity green glow, as per IN-04.
- No gradient overlays that fade images on mobile (this caused WI-03 earlier) —
  any decorative overlay must be `hidden md:block`.

## Acceptance criteria

- Hero image loads, is sharp on retina, and shows no brown/warm tones.
- Image has meaningful alt text and does not shift layout while loading.
- All icons come from `lucide-react` and are token-coloured.
- No decorative overlay blurs or fades content on mobile.
