# The Idea — gap analysis / build checklist

Verified against the codebase before implementation.

## Confirmed facts

| # | Check | Result |
|---|-------|--------|
| 1 | Menu link exists | `src/components/site-header/nav-config.ts:31` → `/the-idea/` |
| 2 | Footer link exists | `src/components/site-footer/SiteFooter.tsx:11` → `/the-idea/` |
| 3 | Route registered | No — TI-01 must add `/the-idea` and `/the-idea/` to `src/App.tsx` |
| 4 | Shared slider available | `src/components/solutions/SolutionSlider.tsx` — reuse, do not fork |
| 5 | Reveal hook available | `src/components/investment/useReveal.ts` |
| 6 | Metadata pattern | `useEffect` in `src/pages/investment/InvestmentPage.tsx`; no react-helmet |
| 7 | Icon library | `lucide-react` already installed |

## Content gaps resolved

| # | Gap | Resolution |
|---|-----|------------|
| 8 | Document gives no hero image direction | Generate one (TI-07) in the same photographic style as the Solutions heroes |
| 9 | Hero CTA has no destination in the document | Scroll to Section 3 (`#the-idea-ecosystem`) |
| 10 | Closing CTA "Explore Our Solutions" has no URL | Link to `/solutions/battery-swapping/`, the first Solutions page |
| 11 | Section 4 has five items in a 3-column grid | Last row holds two cards at natural width; no stretch or centring hack |
| 12 | Only Section 3 is marked `[slider]` | Sections 2 and 4 are static grids |
| 13 | "One Network. Multiple Possibilities." is a heading in the doc | Rendered as the `<h3>` inside the closing CTA card, not a separate section |
| 14 | Section 2 and 4 could look identical | Different card treatments specified (bordered cards vs left-rule list) |

## Second audit — 16 Sep 2026 (spec re-verified line by line against the code)

Re-checked every technical claim in the spec by reading the actual files.

| # | Finding | Evidence | Fix applied |
|---|---------|----------|-------------|
| 15 | TI-01 shell used `<SiteFooter />` and a hardcoded background | `InvestmentPage.tsx:3` imports the footer as `Footer`; root is `inv-page … bg-background` | TI-01 snippet corrected to `Footer`, `bg-background`, and the `the-idea-page` scope class |
| 16 | TI-04 said slider arrows sit beside the heading | `solution-slider.css:67,98` — `sol-slider__nav` renders below the track, centred then right-aligned at ≥768px | TI-04 corrected; arrows stay where the shared component puts them |
| 17 | TI-03/TI-05 asked for a 60ms reveal stagger | `index.css:603` — the only stagger rule is `.pcard.reveal` at 120ms, homepage-only | Both tasks now specify an `--i` index plus a page-scoped `transition-delay` rule |
| 18 | Slider `body` optional? | `SolutionSlider.tsx:5-10` — `body` and `icon` are optional, icon renders in a chip | No change; TI-04 already supplies both |
| 19 | All design tokens exist | `index.css` — `--c-surface`, `--c-surface-alt`, `--c-green-soft`, `--c-navy`, `--c-muted`, `--pad-x`, `.sec-pad` all defined | No change |

### Re-verified as correct

- Menu link `nav-config.ts:31` and footer link `SiteFooter.tsx:11` both point to `/the-idea/`.
- `src/App.tsx` has no `/the-idea` route yet — TI-01 must add both variants above the catch-all (`App.tsx:41`).
- `useReveal` exists at `src/components/investment/useReveal.ts`.
- Metadata pattern (title + description in `useEffect`, restored on unmount) matches `InvestmentPage.tsx:14-32`.
- `lucide-react` is installed; every icon named in TI-07 is a valid export.
- Section rhythm `--sec-y` 56 / 80 / 112px via `.sec-pad` — matches the wireframe.
- Reduced-motion override for `.reveal` already exists (`index.css:699`), so TI-08 check 7 passes for free.

## Can AI complete this without further input?

Yes — and after this audit the spec is accurate to the codebase. All copy is
supplied verbatim, every destination is decided, every component, hook, token and
CSS class the tasks reference has been confirmed to exist at the stated path, and
no backend, form, or third-party link is required. The only new asset is the
generated hero image in TI-07.

Residual risks, all low and handled inside the tasks:

1. Five items in a 3-up grid leaves an uneven last row — TI-05 states the intended behaviour.
2. Section 2 and Section 4 both being card lists — TI-03/TI-05 specify two distinct treatments.
3. Sticky header covering the scroll target — TI-02/TI-04 require `scroll-margin-top: 96px`.
