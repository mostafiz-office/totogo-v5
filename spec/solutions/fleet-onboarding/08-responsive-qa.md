# FL-08 — Responsive pass and QA

**Status:** Done

Test `/solutions/fleet` and `/solutions/fleet/` at
**360, 393, 768, 1024, 1280, 1519 px**.

## Checklist

- [ ] No horizontal page overflow at any width.
- [ ] One `<h1>`; section headings `<h2>` in document order.
- [ ] Copy verbatim against `README.md`, including the chips and chain strip.
- [ ] Hero image eager, alt text, no layout shift.
- [ ] Slider: 4 slides, swipe, arrows, arrow keys, end states.
- [ ] Chips and chain strip wrap cleanly at 360px.
- [ ] Buttons 44px, focus-visible, sane keyboard order.
- [ ] Mobile drawer: Fleet Onboarding link navigates, closes, unlocks scroll,
      top of page.
- [ ] Active state on "Our Solutions".
- [ ] Reduced motion respected.
- [ ] Other three Solutions pages still fine (shared slider regression).
- [ ] Build log clean, no console or runtime errors.
