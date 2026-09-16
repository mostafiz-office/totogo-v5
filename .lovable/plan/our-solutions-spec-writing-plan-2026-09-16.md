# Our Solutions — spec writing plan

Write the specs only. No website code changes until each task is approved.

Source: totoGO Feedback document, tab "Our Solutions Tab". It contains four
pages, each with four sections, matching the four items already in the
"Our Solutions" menu.

## Decisions already locked

1. Only the four sub-pages. No separate "Our Solutions" overview page.
2. Each `[slider]` in the document becomes a swipeable card slider built from the
   feature items listed in that section. No invented copy.
3. All buttons use placeholder links for now, exactly like the Investment page.
4. Design follows the homepage and the Investment page: same header, footer,
   green `#00CE7E` / navy `#002366` palette, shared spacing tokens, reveal
   animation, one `<h1>` per page.
5. Each page closes with a CTA section in the same style as the Investment page.

## Folder to create

```text
spec/solutions/
  README.md              index of all four pages + build order
  shared-patterns.md     design rules, tokens, components to reuse, slider spec
  CHECKLIST.md           gap-analysis checklist across all four pages
  battery-swapping/
  driver-app/
  partner-app/
  fleet-onboarding/
```

Each page folder contains:

| File | Contents |
|------|----------|
| `README.md` | page summary, route, verbatim copy from the document, status table |
| `wireframe.md` | section-by-section layout, desktop and mobile |
| `01-route-and-nav.md` | route registration, menu link, page title/description |
| `02-hero.md` | hero heading, copy, button, right-side visual |
| `03-section-two.md` | the page's second section (steps or feature cards) |
| `04-slider.md` | swipeable feature-card slider |
| `05-section-three-four.md` | the remaining two content sections |
| `06-cta.md` | closing CTA section |
| `07-visuals.md` | images/icons to generate |
| `08-responsive-qa.md` | QA at 360 / 393 / 768 / 1024 / 1280 / 1519 px |

## Content each page is built from (from the document)

**Battery Swapping** — `/solutions/battery-swapping/`
Hero "Swap in Minutes. Stay on the Road." + Find a Swap Station · How It Works
(Arrive / Swap / Go) · Why Battery Swapping (5 points + slider) · Built for
Everyday Mobility + Explore the Network.

**Driver App** — `/solutions/driver-app/`
Hero "Everything a Driver Needs, in One App." + Explore the Driver App ·
Key Features (Find Stations, Live Availability, Swap History, Payments +
slider) · Designed Around Drivers · One App. One Mobility Ecosystem. +
Join the totooGO Network.

**Partner App** — `/solutions/partner-app/`
Hero "Run Your Swap Station Smarter." + Become a Partner · Manage Everything in
One Place (Battery Inventory, Swap Management, Station Activity, Digital
Transactions + slider) · Built for Simple Operations · Grow With the Network +
Join as a Station Partner.

**Fleet Onboarding** — `/solutions/fleet/`
Hero "Move Your Fleet to Electric." + Electrify Your Fleet · What We Provide
(Electric Vehicles, Battery Swapping, Fleet Technology, Service Support +
slider) · Built for Commercial Use (Passenger transport, Delivery fleets, FMCG
distribution, Small cargo transport, Utility vehicles) · A Complete Transition +
Talk to Our Fleet Team.

Routes match the paths already in the menu, so no menu restructuring is needed —
only the missing routes.

## Gap analysis included in the specs

`CHECKLIST.md` audits the specs the same way the Investment specs were audited,
covering: route with and without trailing slash, active menu state, mobile
drawer closing and scroll restore, one `<h1>` per page, exact copy from the
document, slider keyboard and touch behaviour, reduced-motion handling, touch
targets, contrast, no horizontal overflow, and no invented content.

## Technical notes

- New pages under `src/pages/solutions/<page>/`, sections under
  `src/components/solutions/<page>/`, one scoped CSS file per page.
- Reuse `SiteHeader`, `SiteFooter`, `useReveal`, global `.reveal` / `.is-in`,
  `.sec-pad` spacing tokens, and the Investment CTA pattern.
- Slider: one shared `SolutionSlider` component used by all four pages —
  scroll-snap track, arrow buttons, drag/swipe, keyboard arrows, no new library.
- Routes registered in `src/App.tsx` with and without trailing slash.
- Hero images generated per page into `src/assets/`.

## Build order after approval

battery-swapping → driver-app → partner-app → fleet-onboarding, each page
task by task, saying "next" between steps.
