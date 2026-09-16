# Our Solutions — gap analysis and build checklist

Audit of the four page specs against the real codebase, in the same format as
the Investment audit. Run through this before and after each page is built.

## A. Gaps found during the audit (already resolved in the specs)

| # | Gap | Resolution |
|---|-----|------------|
| 1 | The menu paths already exist but no routes do | Each `01-route-and-nav.md` registers both slash variants in `src/App.tsx`; `nav-config.ts` is explicitly off-limits |
| 2 | Fleet menu path is `/solutions/fleet/`, not `/solutions/fleet-onboarding/` | FL-01 pins the route to the menu path |
| 3 | The document's "Why Battery Swapping" list has titles but no descriptions | BS-04 specifies title-only cards and forbids invented body copy |
| 4 | `[slider]` appears on all four pages | One shared `SolutionSlider`, built in BS-04, reused unchanged; later pages may only extend it with optional props |
| 5 | Document headings say "Driver Solution" / "Partner Solution" | Page titles follow the menu wording; internal doc headings are not page copy |
| 6 | Sections 2 on pages 2–4 list features *and* a slider | Features render inside the slider — no duplicated grid |
| 7 | CTA sections need a heading the document doesn't supply | Each `06-cta.md` fixes the exact wrapper heading and supporting line; button labels stay verbatim |
| 8 | Fleet Section 4 has an unusual "A + B + C" chain line | FL-05 defines the chain strip and its accessibility treatment |
| 9 | No `react-helmet` in this project | Metadata set and restored via `useEffect`, like `InvestmentPage.tsx` |
| 10 | Homepage sticky How-It-Works animation could be copied by mistake | BS-03 forbids it — static three-card row |
| 11 | Hero images did not exist | One generated image per page, listed in each `07-visuals.md`, with eager loading and alt text |
| 12 | Risk of regressing shared files | `shared-patterns.md` §10 lists the do-not-touch files |

## B. Per-page build checklist

For each page: Battery Swapping · Driver App · Partner App · Fleet Onboarding

- [ ] Route registered with and without a trailing slash, above the catch-all
- [ ] Page title and meta description set, and restored on leaving the page
- [ ] "Our Solutions" shows its active state on the route
- [ ] Shared `SiteHeader` and `SiteFooter` render unchanged
- [ ] Exactly one `<h1>`; all other section headings `<h2>` in document order
- [ ] Every sentence matches the page `README.md` verbatim — nothing invented
- [ ] Colours from tokens only; no hardcoded hex, no brown
- [ ] `.sec-pad` spacing, alternating surface / surface-alt backgrounds
- [ ] Reveal animation via global `.reveal` + `useReveal`, single run
- [ ] Slider: swipe, arrows, arrow keys, disabled end states, 1.1 / 2 / 3 slides
- [ ] Buttons 44px min, `href="#"`, visible focus ring
- [ ] Hero image eager + high priority with descriptive alt; others lazy
- [ ] No horizontal overflow at 360, 393, 768, 1024, 1280, 1519 px
- [ ] Mobile drawer link navigates, closes, unlocks scroll, lands at page top
- [ ] `prefers-reduced-motion`: no reveal, no smooth scroll
- [ ] Homepage, `/investment` and previously built Solutions pages unaffected
- [ ] Build log clean; no console or runtime errors

## C. Still open (needs client input, not blocking the build)

1. Real destinations for every CTA button — all placeholders for now.
2. Whether a `/solutions/` overview page is wanted later (currently out of scope).
3. Real photography, if the client prefers it over generated hero images.
