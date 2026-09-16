# CU-08 — Responsive QA and accessibility

**Status:** Done

## Checks (Playwright at 360 / 768 / 1280)

1. `/contact/` loads; title "Contact Us | totooGO"; exactly one H1.
2. No horizontal overflow (`document.documentElement.scrollWidth <= innerWidth + 1`) at all three widths.
3. Hero CTA scrolls to `#contact-form`.
4. Each topic card pre-selects the correct form option.
5. Form: empty submit shows inline errors; valid submit fires mailto (intercept `window.location` change or stub) and shows the confirmation note.
6. mailto/tel links in Direct Contact have correct hrefs.
7. Tab order is logical; all interactive elements have visible focus states; selects/inputs have associated labels.
8. No page-specific console errors; build log shows `build OK`.
9. Mobile drawer (header) still works on this page.

## Acceptance

- All checks pass; results recorded in `spec/contact-us/CHECKLIST.md` and task statuses set to Done.
