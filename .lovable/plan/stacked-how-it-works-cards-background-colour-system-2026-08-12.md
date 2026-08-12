# Stacked "How It Works" cards — background colour system

## What the reference does

The reference stack uses **one brand hue, stepped in value**, then lands on the dark brand colour:

```text
card 1  near-white (barely tinted)
card 2  pale tint of the accent
card 3  mid tint of the accent
card 4  full dark brand colour (navy) + white text
```

The trick: the first three cards are the *same* hue at rising saturation, so peeking edges read as one continuous ramp instead of unrelated greys. Only the last card flips to dark for contrast.

## Our current state

The four cards run: near-white → pale green → **grey-green (#D7E4DE)** → navy. The third step is desaturated and slightly muddy, so the stack loses the "one ramp" feel.

## Proposed palette (logo-derived: green #00CE7E, navy #002366)

| Card | Step | Background | Text | Icon tile |
|---|---|---|---|---|
| 1 | CHOOSE | `#F5FBF8` (mint white) | navy `#002366` | navy tile, white icon |
| 2 | BUY | `#DFF4EA` (light mint) | navy | green `#00CE7E` tile, white icon |
| 3 | SWAP | `#B8E9D2` (mid mint) | navy | navy tile, white icon |
| 4 | EARN | `#002366` (brand navy) | white | white tile, navy icon |

All four steps sit on the same green hue as the logo, rising in saturation, then resolving into logo navy — the exact structure of the reference, in our brand colours.

Body/muted text on cards 1–3 becomes navy at 80% / 60% opacity instead of near-black, so the whole stack reads navy + green only.

## Technical notes

Single file: `src/components/battery-smart/HowSwappingWorks.tsx` — the per-card `--c-bg`, `--c-text`, `--c-mute`, `--c-faint`, `--c-tile-bg`, `--c-tile-icon` custom properties in its inline style block (around lines 197–240). No structural or copy changes.

## Verification

Screenshot the section via Playwright at desktop and mobile widths and confirm the ramp reads cleanly and text contrast passes on every card.
