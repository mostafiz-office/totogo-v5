# DA-08 — Responsive pass and QA

**Status:** Not started

Test `/solutions/driver-app` and `/solutions/driver-app/` at
**360, 393, 768, 1024, 1280, 1519 px**.

## Checklist

- [ ] No horizontal page overflow at any width.
- [ ] One `<h1>`; all section headings `<h2>` in document order.
- [ ] Copy matches `README.md` verbatim — nothing invented.
- [ ] Hero image eager, alt text present, no layout shift.
- [ ] Slider: 4 slides, swipe, arrows, arrow keys, end states, no page overflow.
- [ ] Buttons 44px, focus-visible, keyboard order top-to-bottom.
- [ ] Mobile drawer: Driver App link navigates, drawer closes, scroll unlocks,
      page starts at the top.
- [ ] Active state on "Our Solutions" in the header.
- [ ] Reduced motion: no reveal animation, no smooth scroll.
- [ ] Battery Swapping page still works (shared slider regression check).
- [ ] Build log clean, no console or runtime errors.
