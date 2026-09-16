# CU-01 — Page shell, route, metadata

**Status:** Not started

## Build

- Create `src/pages/contact/ContactPage.tsx`:
  - Import `SiteHeader` from `src/components/site-header/SiteHeader.tsx` and `Footer` from `src/components/site-footer/SiteFooter.tsx` — copy the exact import pattern used in `src/pages/the-idea/TheIdeaPage.tsx`.
  - Render: `SiteHeader`, `<main>` with the five sections, `Footer`.
  - Import scoped stylesheet `./contact.css`.
- Create `src/pages/contact/contact.css` — all rules scoped under `.contact-page`.
- Register both routes in `src/App.tsx` above the catch-all:
  - `/contact` → `<ContactPage />`
  - `/contact/` → `<ContactPage />`

## Metadata (in a `useEffect`, same pattern as The Idea)

- `document.title = "Contact Us | totooGO"`
- Meta description: "Whether you're a driver, fleet operator, station partner, investor, or business looking to collaborate, the totooGO team is ready to connect."

## Acceptance

- `/contact/` loads with header and footer, correct title, no console errors.
- Footer "Contact" link now resolves to a real page (no 404).
