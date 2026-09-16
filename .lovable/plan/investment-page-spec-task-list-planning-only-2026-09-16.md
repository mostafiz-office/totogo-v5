# Investment Page — Spec & Task List (planning only)

This step creates the written spec only. No website code changes yet. After you approve each task, we build it one by one.

## What gets created now

A new folder `spec/investment-tab/` containing:

- `README.md` — index, source of content (Investment Tab of the feedback doc), design rules, build order, status table
- `IN-01-page-route-and-nav.md` — new Investment page at `/investment/`, linked from the existing "Investment" menu item
- `IN-02-hero-section.md` — Section 01 hero with right-side visual
- `IN-03-stats-counter-section.md` — the four funding numbers, counting up when scrolled into view
- `IN-04-cta-section.md` — "Explore the Investment Opportunity" with the two buttons
- `IN-05-visual-assets.md` — hero graphic, icons, background treatment
- `IN-06-responsive-and-qa.md` — mobile/tablet/desktop checks and acceptance criteria
- `wireframe.md` — text wireframe of the full page, top to bottom

## Content taken from the document

Hero title: "Invest in a New Era of Mobility"
Hero body: the two paragraphs about the end-to-end electric mobility ecosystem and building the infrastructure for affordable, scalable electric mobility.
Eyebrow: "JOIN OUR CURRENT PRE-SEED ROUND"

Numbers section:
- US$750K — Target Raise
- US$5M — Pre-Money Valuation
- US$50K — Minimum Investment
- Up to 15 — Minimum-Ticket Allocations*

CTA section: heading "Explore the Investment Opportunity", buttons "Request Investor Deck" and "Book a Call".

Per your answer, both buttons point to `#` for now — no form and no booking link yet.

## Page wireframe

```text
[ Existing site header ]

SECTION 1 — HERO
  left  : eyebrow, H1, two paragraphs, two buttons
  right : illustration / image panel with soft green-mint backdrop

SECTION 2 — NUMBERS
  four cards in a row (2x2 on mobile), each number counts up on scroll
  footnote: *Minimum-ticket allocations

SECTION 3 — CTA
  rounded card, navy background, heading + the two buttons

[ Existing site footer ]
```

## Design rules the spec will lock in

- Reuse the homepage look: same header/footer, same rounded-card CTA pattern, same fonts and sizes.
- Colours from existing tokens only: logo green `#00CE7E`, logo navy `#002366`, mint tints, near-white page background. No new colours.
- Section spacing uses the existing `.sec-pad` tokens (56 / 80 / 112px).
- Scroll-reveal animation matches the homepage; counters respect reduced-motion settings.

## Build order once approved

1. IN-01 route + menu link
2. IN-02 hero
3. IN-03 numbers
4. IN-04 CTA
5. IN-05 visuals polish
6. IN-06 responsive QA

## Technical notes

- New route `/investment/` registered in `src/App.tsx` above the catch-all, page at `src/pages/investment/InvestmentPage.tsx` with a scoped `investment.css`.
- Nav entry already exists in `src/components/site-header/nav-config.ts` pointing at `/investment/`; only the route is missing.
- Counters use an IntersectionObserver hook mirroring the reveal pattern in `CTASection.tsx`, single-run, `prefers-reduced-motion` falls back to final values.
- Hero visual sourced as a generated image in `src/assets/`, imported as an ES6 import.
- Page title and meta description set for SEO; single H1 ("Invest in a New Era of Mobility").
