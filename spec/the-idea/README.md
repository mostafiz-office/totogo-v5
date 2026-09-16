# The Idea Page — Spec Index

**Source of content:** totoGO Feedback document, tab "The Idea Tab" (`t.gvho563387lr`).
**Goal:** Build a new page at `/the-idea/` matching the homepage / Investment / Solutions design language.
**Status:** Specs written. No website code changed yet.

## Tasks

| ID | Task | File | Status |
|----|------|------|--------|
| TI-01 | Page shell, route, metadata, menu link | `TI-01-page-route-and-nav.md` | Not started |
| TI-02 | Section 1 — Hero | `TI-02-hero.md` | Not started |
| TI-03 | Section 2 — The Problem (4 cards) | `TI-03-problem.md` | Not started |
| TI-04 | Section 3 — The Idea (5-slide slider) | `TI-04-idea-slider.md` | Not started |
| TI-05 | Section 4 — Why It Matters (5 benefits) | `TI-05-why-it-matters.md` | Not started |
| TI-06 | Section 5 — The Bigger Vision + closing CTA | `TI-06-vision-cta.md` | Not started |
| TI-07 | Visual assets (hero image, icons) | `TI-07-visual-assets.md` | Not started |
| TI-08 | Responsive + QA pass | `TI-08-responsive-and-qa.md` | Not started |

Wireframe: `wireframe.md` — Gap analysis: `CHECKLIST.md`

After finishing a task, update its row above to **Done**.

## Build order

TI-01 → TI-02 → TI-03 → TI-04 → TI-05 → TI-06 → TI-07 → TI-08

## Shared rules

This page follows `spec/solutions/shared-patterns.md` in full (tokens, spacing,
typography, motion via `useReveal`, `SolutionSlider`, buttons, accessibility,
regression guards). Read that file before implementing any task here.

Page-specific file layout:

```text
src/pages/the-idea/TheIdeaPage.tsx      page shell
src/pages/the-idea/the-idea.css         scoped styles
src/components/the-idea/IdeaHero.tsx
src/components/the-idea/IdeaProblem.tsx
src/components/the-idea/IdeaEcosystem.tsx   (Section 3, uses SolutionSlider)
src/components/the-idea/IdeaWhy.tsx
src/components/the-idea/IdeaVisionCTA.tsx
```

## Resolved decisions (do not re-litigate)

1. Route `/the-idea` and `/the-idea/` both registered in `src/App.tsx`. Menu
   already links to `/the-idea/` in `nav-config.ts` and `SiteFooter.tsx` — do not
   edit those files.
2. Copy is used exactly as written in the document. Nothing invented, no extra
   stats, no testimonials, no team section.
3. "totooGO" brand spelling kept as in the document.
4. Section 3 is a slider (the document marks it `[slider]`) using the existing
   shared `SolutionSlider` with title + body slides.
5. Sections 2, 4 use static responsive card grids, not sliders.
6. Section 5 ends with the navy rounded CTA card pattern used on Investment and
   the Solutions pages.
7. CTA buttons: hero "Discover the totooGO Ecosystem" scrolls to Section 3
   (`href="#the-idea-ecosystem"`); closing "Explore Our Solutions" links to
   `/solutions/battery-swapping/`. No other destinations, no forms.
8. Background rhythm: surface → surface-alt → surface → surface-alt → navy CTA.
9. Exactly one `<h1>`: the hero heading.

## Verbatim content from the document

> **The Idea Page**
>
> **Section 1 — Hero**
> A Better Way to Move Bangladesh
> totooGO is building a cleaner, safer, and more affordable mobility ecosystem designed around the people who keep Bangladesh moving every day.
> Electric Vehicles + Battery Swapping + Technology + Financing
> CTA: Discover the totooGO Ecosystem
>
> **Section 2 — The Problem**
> Mobility Should Work Better
> Millions of drivers and passengers still depend on vehicles that are inefficient, unsafe, expensive to operate, and difficult to finance.
> Transport operators also face limited access to vehicle ownership, while conventional and retrofitted vehicles contribute to rising operating costs and emissions.
> Low Driver Income — High operating costs reduce earning potential.
> Limited Financing — Vehicle ownership remains out of reach for many drivers.
> Unsafe Vehicles — Poorly designed and retrofitted vehicles create safety risks.
> Long Charging Downtime — Traditional EV charging does not suit high-usage commercial mobility.
>
> **Section 3 — The Idea** `[slider]`
> Build the Entire Ecosystem, Not Just the Vehicle
> totooGO connects the essential parts of electric mobility into one platform.
> Affordable Electric Vehicles — Purpose-built for everyday passenger and commercial use.
> Battery-as-a-Service — Reduce the burden of owning an expensive EV battery.
> Rapid Battery Swapping — Replace depleted batteries quickly and stay on the road.
> Accessible Financing — Create an easier path toward vehicle ownership.
> Digital Technology — Connect drivers, stations, fleets, and partners through one ecosystem.
>
> **Section 4 — Why It Matters**
> More Time on the Road. Lower Barriers to Electric.
> Our approach is designed around the real needs of drivers and commercial operators.
> Fast Swapping — Minimize downtime between journeys.
> Lower Upfront Cost — Separate battery access from vehicle ownership.
> Safer Mobility — Introduce purpose-built electric vehicles.
> Recurring Support — Connect vehicles with swapping, service, and technology.
> Cleaner Transportation — Help reduce dependence on carbon-emitting mobility.
>
> **Section 5 — The Bigger Vision**
> From Three-Wheelers to a Connected Electric Future
> totooGO starts with high-usage 2- and 3-wheel mobility, but the ecosystem is designed to grow into delivery fleets, cargo transport, utility vehicles, battery recycling, energy storage, and future electric mobility solutions.
> One Network. Multiple Possibilities.
> CTA: Explore Our Solutions
