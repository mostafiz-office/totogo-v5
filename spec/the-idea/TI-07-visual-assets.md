# TI-07 — Visual assets

**Status:** Done

## Hero image

- Path: `src/assets/the-idea-hero.jpg`, generated (not reused), 1536×1056,
  imported as an ES6 module.
- Subject: a clean daytime Dhaka street scene with a modern electric
  three-wheeler in totooGO green and navy, calm composition, real-photo look,
  space on one side so it reads well next to text.
- Alt text: `Electric three-wheeler on a Dhaka street, part of the totooGO mobility ecosystem`.
- `loading="eager"`, `fetchPriority="high"`.

## Icons

Use `lucide-react` (already a dependency). No new icon packages.

| Section | Items → icons |
|---------|----------------|
| Problem (TI-03) | Low Driver Income → `Wallet`; Limited Financing → `HandCoins`; Unsafe Vehicles → `ShieldAlert`; Long Charging Downtime → `Timer` |
| Ecosystem slider (TI-04) | Affordable Electric Vehicles → `CarFront`; Battery-as-a-Service → `BatteryCharging`; Rapid Battery Swapping → `Repeat`; Accessible Financing → `BadgePercent`; Digital Technology → `Cpu` |
| Why It Matters (TI-05) | all five → `CheckCircle2` in green, 18px |

Icon chips: 40×40, `--c-green-soft` background, radius 12px, navy icon 20px,
`aria-hidden="true"` on every icon (labels carry the meaning).

## Acceptance

- Hero image renders sharp on a 2× display and does not distort at any width.
- No new dependencies added; no brown or warm tan tones in the generated image.
