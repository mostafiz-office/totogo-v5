# BS-01 — Route, nav and page shell

**Status:** Not started

## Do

1. Create `src/pages/solutions/battery-swapping/BatterySwappingPage.tsx`
   with the shell from `../shared-patterns.md` §1 (SiteHeader, `<main>`, SiteFooter).
2. Create `src/pages/solutions/battery-swapping/battery-swapping.css` and import it
   from the page. Scope every rule under `.bs-page`.
3. Set metadata in a `useEffect` and restore the previous values on unmount:
   - title `Battery Swapping | totooGO`
   - description `Swap a depleted battery in minutes at a totooGO station and stay on the road with minimal downtime.`
4. Register in `src/App.tsx`, above the catch-all:
   `/solutions/battery-swapping` and `/solutions/battery-swapping/`.
5. Placeholder content for now: just an `<h1>` so the route is verifiable.

## Do not

- Do not edit `nav-config.ts` — the menu entry already exists.
- Do not add an overview `/solutions/` route.

## Accept when

- Both URLs render the page with the shared header and footer.
- The header's "Our Solutions" item shows its active state on this route.
- Browser tab title is correct; going back to `/` restores the previous title.
- Build log clean.
