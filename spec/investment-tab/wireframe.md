# Investment Page — Wireframe

Route: `/investment/`

## Desktop (≥1024px)

```text
┌──────────────────────────────────────────────────────────────┐
│  SiteHeader (existing, unchanged)                            │
└──────────────────────────────────────────────────────────────┘

SECTION 1 — HERO                              bg: --c-surface
 ┌───────────────────────────┬──────────────────────────────┐
 │ ● JOIN OUR CURRENT        │                              │
 │   PRE-SEED ROUND  (pill)  │     ┌──────────────────┐     │
 │                           │     │                  │     │
 │ Invest in a New Era       │     │   hero visual    │     │
 │ of Mobility        (H1)   │     │   rounded 2rem   │     │
 │                           │     │   mint backdrop  │     │
 │ paragraph 1 (muted)       │     │   + soft green   │     │
 │ paragraph 2 (muted)       │     │     glow blob    │     │
 │                           │     └──────────────────┘     │
 │ [Request Investor Deck]   │                              │
 │ [Book a Call]  (outline)  │                              │
 └───────────────────────────┴──────────────────────────────┘
        ~55% width                       ~45% width

SECTION 2 — NUMBERS                           bg: --c-surface-alt band
 ┌────────────┬────────────┬────────────┬────────────┐
 │  US$750K   │   US$5M    │   US$50K   │  Up to 15  │  ← count up
 │ Target     │ Pre-Money  │ Minimum    │ Minimum-   │
 │ Raise      │ Valuation  │ Investment │ Ticket     │
 │            │            │            │ Allocations*│
 └────────────┴────────────┴────────────┴────────────┘
 *Minimum-ticket allocations                         (footnote, muted)

SECTION 3 — CTA                               bg: --c-surface
 ┌──────────────────────────────────────────────────────────┐
 │  rounded 2rem card, navy #002366                         │
 │                                                          │
 │        Explore the Investment Opportunity  (H2, white)   │
 │        short supporting line (mint-tinted)               │
 │                                                          │
 │    [Request Investor Deck]   [Book a Call]               │
 │       green solid              white outline             │
 └──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  SiteFooter (existing, unchanged)                            │
└──────────────────────────────────────────────────────────────┘
```

## Tablet (768–1023px)

- Hero: visual drops below the copy, full width, max-height 380px.
- Numbers: 2 × 2 grid.
- CTA: buttons side by side, card padding reduced.

## Mobile (<768px)

```text
[ Header w/ hamburger ]

eyebrow pill
H1 (left aligned)
paragraph 1
paragraph 2
[ Request Investor Deck ]   full width
[ Book a Call ]             full width
[ hero visual, full width, rounded 1.5rem ]

── numbers band ──
[ US$750K / Target Raise ]      2 columns
[ US$5M / Pre-Money Valuation ]
[ US$50K / Minimum Investment ]
[ Up to 15 / Minimum-Ticket Allocations* ]
*footnote

── CTA card ──
heading
support line
[ Request Investor Deck ]  full width
[ Book a Call ]            full width

[ Footer ]
```

## Vertical rhythm

Every section uses `.sec-pad` — 56px mobile, 80px tablet, 112px desktop, top and bottom. No ad-hoc margins between sections.
