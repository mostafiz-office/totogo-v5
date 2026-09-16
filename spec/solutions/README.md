# Our Solutions — Spec Index

**Source of content:** totoGO Feedback document, tab "Our Solutions Tab" (`t.xfcmaj9cjcqo`).
**Goal:** Build the four Solutions sub-pages already listed in the header menu, using the
same design language as the homepage and the Investment page.
**Status:** Specs written. No website code changed yet.

## Pages

| # | Page | Route | Spec folder | Status |
|---|------|-------|-------------|--------|
| 1 | Battery Swapping | `/solutions/battery-swapping/` | `battery-swapping/` | Not started |
| 2 | Driver App | `/solutions/driver-app/` | `driver-app/` | Not started |
| 3 | Partner App | `/solutions/partner-app/` | `partner-app/` | Not started |
| 4 | Fleet Onboarding | `/solutions/fleet/` | `fleet-onboarding/` | Not started |

Routes above already exist in `src/components/site-header/nav-config.ts`
(`Our Solutions` mega menu). Only the React routes are missing.

Shared rules: `shared-patterns.md` — Gap-analysis audit: `CHECKLIST.md`

## Resolved decisions (do not re-litigate)

1. No separate `/solutions/` overview page. Only the four sub-pages.
2. Every `[slider]` in the document is a **swipeable feature-card slider** built
   from the feature items listed in that same section. No invented slides.
3. All CTA buttons use `href="#"` placeholders, exactly like the Investment page.
4. Each page has exactly the sections listed in its `wireframe.md` — four content
   sections from the document plus one closing CTA section.
5. Copy is used verbatim from the document. Only allowed normalisations: brand
   spelling `totooGO`, en dash for a hyphen used as a dash, and uppercase eyebrow
   labels via CSS (not by rewriting text).
6. No new dependency for the slider — one shared `SolutionSlider` component.
7. Reuse `SiteHeader`, `SiteFooter`, `useReveal`, global `.reveal` / `.is-in`,
   `.sec-pad` / `.sec-pad-b`. No `react-helmet` — metadata via `useEffect`.

## Build order

`shared` slider component (first task of page 1) →
Battery Swapping → Driver App → Partner App → Fleet Onboarding.

Within a page: `01` → `02` → `03` → `04` → `05` → `06` → `07` → `08`.

After finishing a task, set its row to **Done** in that page's `README.md`, and
set the page row above to **Done** when its `08` QA task passes.
