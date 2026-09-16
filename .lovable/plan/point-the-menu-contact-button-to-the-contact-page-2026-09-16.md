# Point the menu Contact button to the Contact page

## Problem

The header "Contact" button (the "Call / Or / Contact" pill, also shown in the mobile drawer) links to `#contact` — an anchor that scrolls to the contact CTA section on the homepage. Now that a real Contact Us page exists at `/contact/`, the button should open that page.

## Current state (verified)

- `src/components/site-header/SiteHeader.tsx` lines 24–27: `DEFAULT_BOOK = { label: "Contact", href: "#contact" }`.
- Every page renders `<SiteHeader />` with default props (Index, How It Works, Investment, Contact, The Idea, all four Solutions pages), so one change fixes desktop pills, the mobile drawer Contact action, and all pages at once.
- The homepage CTA section keeps its `id="contact"` anchor; nothing else needs to change.

## Change

1. In `src/components/site-header/SiteHeader.tsx`, change `DEFAULT_BOOK.href` from `"#contact"` to `"/contact/"`.

## Verification

- Playwright: open the homepage, click the header "Contact" pill → URL is `/contact/`, Contact Us hero renders.
- Repeat from `/investment/` (desktop pill) and via mobile drawer (360px) to confirm navigation everywhere.
- Confirm no overflow or console errors; check build output.
