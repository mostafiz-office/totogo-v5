# Contact Us — Gap Analysis & Audit Checklist

Audit of the spec against the real codebase, before implementation.

## Verified against the codebase

| # | Check | Result |
|---|-------|--------|
| 1 | Footer "Contact" link target | `/contact/` exists in `src/components/site-footer/SiteFooter.tsx` — route must be added; no footer edit needed |
| 2 | Route registration pattern | `src/App.tsx` registers both bare and trailing-slash paths for other pages — CU-01 follows it |
| 3 | Header/footer imports | Copy exact import pattern from `src/pages/the-idea/TheIdeaPage.tsx` (lesson from The Idea audit) |
| 4 | Slider reuse | `src/components/solutions/SolutionSlider.tsx` exists; arrows sit below the track (lesson from The Idea audit) — CU-03 may use it or a scroll-snap row |
| 5 | Navy CTA pattern | `src/components/the-idea/IdeaVisionCTA.tsx` is the reference for CU-06 |
| 6 | Copy accuracy | All headings, bodies, field names, dropdown options, email and phone copied verbatim from the Contact Us tab |
| 7 | Contact details | Document provides only investment email/phone — spec forbids inventing others |
| 8 | Form backend | No Lovable Cloud / backend connected — mailto fallback documented as a placeholder, not a hidden gap |
| 9 | Book a Call link | Calendly/Google link not supplied — stays `href="#"`, tracked as a known placeholder |
| 10 | Design tokens | Spec requires tokens only, scoped `.contact-page` stylesheet, global reveal pattern |

## Known placeholders (not bugs)

- Form submission → mailto fallback until a form backend is chosen.
- Book a Call → `href="#"` until the real Calendly/Google link is supplied.
- General/partnership/support contact details → omitted until provided.

## Verdict

Spec is buildable as-is. All copy, routes, and destinations are decided; the only new asset is the hero photo.

## Post-build verification (2026-09-16)

- Playwright at 360 / 768 / 1280: title correct, one H1, no horizontal overflow, no page errors.
- Topic card click pre-selects the matching form option and scrolls to the form.
- Empty submit shows inline errors and focuses the first field.
- Direct Contact mailto/tel links verified.
- Build log: `build OK`.
- All CU-01 → CU-08 marked Done.
