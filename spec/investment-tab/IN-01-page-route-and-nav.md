# IN-01 — Investment page route and menu link

**Status:** Not started
**Depends on:** nothing
**Blocks:** IN-02, IN-03, IN-04

## Problem

The header nav already contains an "Investment" item pointing at `/investment/`
(`src/components/site-header/nav-config.ts`, line ~63), but no route exists for
that path, so clicking it lands on the 404 page. Header links are plain
`<a href>` elements, so the page is entered by a full document load.

## Scope

Create the page shell and register the route. No section content yet — sections
arrive in IN-02 … IN-04.

**The finished page contains exactly three sections** (hero, numbers, CTA)
between the shared header and footer. Nothing is borrowed from the homepage —
no marquee, no swapping section, no EV-potential section.

## Files touched

- new `src/pages/investment/InvestmentPage.tsx`
- new `src/pages/investment/investment.css`
- edit `src/App.tsx`

## Changes

1. **`src/pages/investment/InvestmentPage.tsx`** — structure mirrors
   `src/pages/Index.tsx`:
   ```tsx
   <div className="min-h-screen bg-background">
     <SiteHeader />
     <main>{/* sections added by IN-02..IN-04 */}</main>
     <Footer />
   </div>
   ```
   Imports `SiteHeader` from `@/components/site-header/SiteHeader`, `Footer`
   from `@/components/site-footer/SiteFooter`, and `./investment.css`.
2. **`src/pages/investment/investment.css`** — scoped stylesheet, empty for now.
   All rules land under a `.inv-page` root class so nothing leaks to other pages.
3. **`src/App.tsx`** — import the page and register **both** spellings above the
   catch-all `*` route, because the nav links to the trailing-slash form:
   ```tsx
   <Route path="/investment" element={<InvestmentPage />} />
   <Route path="/investment/" element={<InvestmentPage />} />
   ```
4. **Scroll position** — on mount, `window.scrollTo(0, 0)` so a fresh load or an
   in-app navigation always starts at the top.
5. **Metadata** — the project has no per-page metadata mechanism and does not
   use `react-helmet-async`. Use a `useEffect` in the page that sets and then
   restores the defaults on unmount:
   - `document.title = "Investment Opportunity | totooGO"` (< 60 chars)
   - description meta (`document.querySelector('meta[name="description"]')`):
     `Invest in totooGO's end-to-end electric mobility ecosystem for Bangladesh — EVs, Battery-as-a-Service, swapping and financing.` (< 160 chars)
   - store the previous title and description first and restore both in the
     cleanup function.

## Must not change

- Nav labels, order, or paths in `nav-config.ts`.
- The homepage, `/v2`, `/how-it-works`, `/evpotential`.
- Header or footer markup, `index.html` sitewide tags.

## Acceptance criteria

- `/investment/` **and** `/investment` both render header + empty main + footer,
  no 404.
- The "Investment" item in the desktop nav shows its active state
  (`aria-current="page"`, driven by the existing `isRouteActive` helper in
  `NavItemLink.tsx`) while on the page.
- Tapping "Investment" in the mobile drawer lands on the page, drawer closed,
  page scrolled to the top, body scroll not locked.
- Browser tab title reads "Investment Opportunity | totooGO"; leaving the page
  restores the original title and description.
- Build log shows no errors.
- `README.md` status table updated to **Done** for IN-01.
