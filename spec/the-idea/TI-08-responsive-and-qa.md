# TI-08 — Responsive + QA pass

**Status:** Done

## Viewports to verify (Playwright, 1800px tall context)

360px, 768px, 1024px, 1280px.

## Checks

1. **Overflow** — `document.documentElement.scrollWidth <= innerWidth + 1` at
   every viewport. The slider track is the only horizontally scrollable element.
2. **Content** — every string in `README.md` "Verbatim content" appears on the
   page exactly once, spelled identically.
3. **Headings** — exactly one `<h1>`; sections 2–5 use `<h2>`; the CTA card uses `<h3>`.
4. **Links** — hero CTA scrolls to `#the-idea-ecosystem`; closing CTA navigates
   to `/solutions/battery-swapping/`. No `href="#"` left on this page.
5. **Navigation** — header "The Idea" is marked active; mobile drawer opens,
   closes on Escape, locks body scroll, and the page behind does not shift.
6. **Keyboard** — tab order follows visual order; every interactive element has a
   visible focus ring; slider arrows reachable and operable.
7. **Motion** — with `prefers-reduced-motion: reduce`, reveals show content
   immediately and slider scrolling is instant.
8. **Console** — no page-specific errors or warnings in the browser console.
9. **Build** — `/tmp/observability/build-errors.log` shows `build OK` after the
   final edit.
10. **Regression** — homepage, `/investment/`, and the four Solutions pages still
    render unchanged.

## Acceptance

All ten checks pass, with evidence captured (screenshots at 360px and 1280px).
Then mark TI-01 … TI-08 Done in `README.md`.
