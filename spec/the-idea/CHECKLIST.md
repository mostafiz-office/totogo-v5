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

## Can AI complete this without further input?

Yes. All copy is supplied, every destination is decided, all patterns and
components already exist in the codebase, and no backend, form, or third-party
link is required.
