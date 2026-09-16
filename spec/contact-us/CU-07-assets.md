# CU-07 — Assets: hero photo and icons

**Status:** Done

## Hero photo

- Generate `src/assets/contact-hero.jpg` (fast tier, ~1200×900):
  - Prompt direction: friendly daytime scene at a totooGO-style battery swapping station in Dhaka, a staff member in green/navy helping a driver beside a modern green-and-navy electric three-wheeler, realistic photo style, no readable text or logos.
- Import as an ES6 asset in the hero component; descriptive alt text (e.g. "A totooGO team member assisting a driver at a battery swapping station").

## Icons (Lucide, existing dependency)

- Driver Support → `LifeBuoy` or `Headset`
- Fleet Solutions → `Truck`
- Partnerships → `Handshake`
- Investment → `TrendingUp`
- Direct contact → `Mail`, `Phone`

## Acceptance

- Hero image loads, has alt text, no layout shift (width/height or aspect-ratio set).
- All icons render at consistent size.
