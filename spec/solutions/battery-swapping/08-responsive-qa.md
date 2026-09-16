# BS-08 — Responsive pass and QA

**Status:** Not started

Test `/solutions/battery-swapping` and `/solutions/battery-swapping/` at
**360, 393, 768, 1024, 1280, 1519 px**.

## Checklist

- [ ] No horizontal page overflow (`scrollWidth <= clientWidth + 1`) at every width.
- [ ] Exactly one `<h1>`; section headings are `<h2>` in document order.
- [ ] All copy matches `README.md` verbatim — no invented sentences.
- [ ] Hero image loads eagerly, has alt text, no layout shift.
- [ ] Steps: 3 across ≥768px, stacked below, numbers not clipped.
- [ ] Slider: touch swipe, arrows, arrow keys, disabled end states, no page overflow.
- [ ] CTA card: readable, buttons 44px, stacked on mobile.
- [ ] Keyboard tab order is top-to-bottom, every control has a visible focus ring.
- [ ] Mobile drawer: tapping Battery Swapping navigates, closes the drawer,
      unlocks body scroll, lands at the top of the page.
- [ ] Active menu state shows on "Our Solutions".
- [ ] `prefers-reduced-motion`: no reveal animation, no smooth scroll.
- [ ] Homepage and `/investment` unchanged (spot-check both).
- [ ] Build log clean, no runtime or console errors.
