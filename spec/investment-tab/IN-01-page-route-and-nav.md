# IN-01 — Investment page route and menu link

**Status:** Not started
**Depends on:** nothing
**Blocks:** IN-02, IN-03, IN-04

## Problem

The header nav already contains an "Investment" item pointing at `/investment/`
(`src/components/site-header/nav-config.ts`, line ~63), but no route exists for
that path, so clicking it lands on the 404 page.

## Scope

Create the page shell and register the route. No section content yet — sections
arrive in IN-02 … IN-04.

## Changes

1. **New file** `src/pages/investment/InvestmentPage.tsx`
   - Structure mirrors `src/pages/Index.tsx`:
     ```tsx
     <div className="min-h-screen bg-background">
       <SiteHeader />
       <main>{/* sections added by IN-02..IN-04 */}</main>
       <Footer />
     </div>
     ```
   - Imports `SiteHeader` from `@/components/site-header/SiteHeader` and
     `Footer` from `@/components/site-footer/SiteFooter`.
2. **New file** `src/pages/investment/investment.css` — empty scoped stylesheet,
   imported by the page; section rules land here in later tasks.
3. **`src/App.tsx`** — import the page and add
   `<Route path="/investment/" element={<InvestmentPage />} />`
   **above** the catch-all `*` route. Also add a redirect-free alias route
   `/investment` (no trailing slash) so both spellings work.
4. **SEO** — set inside the page with a small effect or `react-helmet`-free
   direct `document.title` assignment consistent with how other pages handle it;
   if no other page sets metadata, set `document.title` and the meta description
   in a `useEffect`:
   - title: `Investment Opportunity | totooGO` (< 60 chars)
   - description: `Invest in totooGO's end-to-end electric mobility ecosystem for Bangladesh — EVs, Battery-as-a-Service, swapping and financing.` (< 160 chars)

## Must not change

- Nav labels, order, or paths in `nav-config.ts`.
- The homepage, `/v2`, `/how-it-works`, `/evpotential`.
- Header or footer markup.

## Acceptance criteria

- Navigating to `/investment/` renders header + empty main + footer, no 404.
- Clicking "Investment" in the desktop nav and in the mobile drawer both land on
  the page and close the drawer.
- Browser tab title reads "Investment Opportunity | totooGO".
- Build log shows no errors.
