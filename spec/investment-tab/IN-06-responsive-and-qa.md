# IN-06 — Responsive behaviour and QA pass

**Status:** Done
**Depends on:** IN-01 … IN-05

## Breakpoints to verify

| Width | What to check |
|-------|---------------|
| 360px | Single-column hero, full-width buttons, 2×2 numbers grid, stacked CTA buttons, no horizontal scroll |
| 393px | Same as 360, headline does not wrap awkwardly |
| 768px | Hero visual below copy, numbers 2×2 or 4-up (whichever is chosen), CTA buttons in a row |
| 1024px | Two-column hero begins, numbers 1×4 |
| 1280px | Full desktop layout, content capped at 1200px, generous section padding |
| 1519px | No stretched or off-centre content at the user's own viewport width |

## Checks at every breakpoint

1. `document.documentElement.scrollWidth === clientWidth` (no horizontal overflow).
2. Section top/bottom padding matches `--sec-y` (56 / 80 / 112px).
3. No element overlaps the header when scrolling.
4. Counters fire once and produce the exact final strings:
   `US$750K`, `US$5M`, `US$50K`, `Up to 15`.
5. All text visible, nothing clipped or truncated mid-word.
6. Tab order: header nav → hero primary → hero secondary → CTA primary →
   CTA secondary → footer. Every stop has a visible focus ring.
7. Mobile drawer closes after tapping "Investment", body scroll is unlocked, and
   the page opens at the top (regression guard for the earlier scroll-lock fix).
8. `prefers-reduced-motion: reduce` → no reveal animation, no counting, final
   values shown.
9. Both `/investment` and `/investment/` load the page (the nav links to the
   trailing-slash form).
10. The "Investment" nav item carries `aria-current="page"` while on the page,
    on desktop and in the mobile drawer.
11. Tab title is "Investment Opportunity | totooGO" on the page and reverts to
    the site default after navigating away.

## Regression guards

- Homepage `/`, `/v2`, `/how-it-works` and `/evpotential` render unchanged.
- Header and footer markup untouched.
- No new global CSS variables; nothing added to `:root` beyond what already exists.
- Build log (`/tmp/observability/build-errors.log`) shows `build OK`.

## Evidence to capture

Playwright screenshots at 360px, 768px and 1280px of the full Investment page,
plus a console check with zero errors.

## Acceptance criteria

All checks above pass and screenshots are reviewed before marking the
Investment page complete in `README.md`.
