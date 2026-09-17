# Make highlighted headings truly identical everywhere

You are right: the inner pages are still off. The two screenshots you sent use different greens from each other, and the inner-page headings use a third, darker green plus a different shadow tint. So nothing lines up.

## What is actually different today

- Homepage hero highlight ("Built For **Electric Vehicles**") uses the muted green #2DBA88.
- Homepage "Unleashing **EV Potential**" uses the bright logo green #00CE7E.
- All inner-page headings (The Idea, Investment, Contact, the four Solutions pages) use a darker green #00A866.
- Shadows: the navy part of every heading gets a navy-tinted drop shadow, but the green part on inner pages gets a different, darker ink-tinted shadow, so the green looks dirtier and heavier than on the homepage.
- The homepage hero also changes its green on hover, which no other page does.

## The fix

1. **One highlight green everywhere: the logo green #00CE7E.**
   Applied to the homepage hero, the "Unleashing EV Potential" block, and every inner-page heading highlight. The muted and dark greens are retired from headings.

2. **One shadow recipe for the whole heading.**
   The navy words and the green words get the exact same soft offset shadow, tuned once against the light backgrounds so it reads like the homepage. The separate darker shadow used on green words is removed. A slightly lighter variant is kept only for headings sitting on dark backgrounds so they stay readable.

3. **Remove the odd one-off behaviours.**
   The homepage hero's hover colour change goes away, so a heading never shifts colour on its own. Any page-level heading colour rules that fight the shared style are deleted.

4. **Same weight and size feel.**
   Heading sizes stay as they are per page, but the highlight and the navy text share identical weight, letter spacing, and line height so the two halves sit on the same baseline with no visual step.

## Pages touched

Homepage, The Idea, Investment, Contact Us, Battery Swapping, Driver App, Partner App, Fleet Onboarding.

## Checks before I call it done

Side-by-side screenshots of the homepage heading and one heading from each of the seven other pages at 360, 768, and 1519 px, comparing colour and shadow pixel-for-pixel. Contrast stays accessible on both light and dark sections.

## Technical notes

- Consolidate the highlight colour on `--c-green` and drop `--shadow-heading-accent` in favour of a single `--shadow-heading` (plus one on-dark variant) in `src/index.css`.
- Update `.brand-heading__accent`, `.bs-rt-accent` (including its hover rule), and the inline `color` styles in `UnleashEVPotential.tsx` and `HeroBelowSection.tsx` to use the shared token instead of hardcoded hex values.
- No copy, route, layout, or component-structure changes.
