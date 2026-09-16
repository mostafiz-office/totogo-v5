# FL-01 — Route, nav and page shell

**Status:** Done

## Do

1. `src/pages/solutions/fleet/FleetPage.tsx` using the shared shell.
2. `src/pages/solutions/fleet/fleet.css`, scoped under `.fl-page`.
3. Metadata in `useEffect`, restored on unmount:
   - title `Fleet Onboarding | totooGO`
   - description `Move your 2- and 3-wheeler fleet to electric with totooGO vehicles, battery swapping, technology and support.`
4. Routes `/solutions/fleet` and `/solutions/fleet/` in `src/App.tsx`
   (the menu path is `/solutions/fleet/` — match it exactly).

## Do not

- Do not edit `nav-config.ts`; do not fork the shared slider.

## Accept when

- Both URLs render with header and footer, correct title, active menu state,
  clean build log.
