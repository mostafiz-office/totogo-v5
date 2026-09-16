# DA-01 — Route, nav and page shell

**Status:** Not started

## Do

1. `src/pages/solutions/driver-app/DriverAppPage.tsx` using the shell in
   `../shared-patterns.md` §1.
2. `src/pages/solutions/driver-app/driver-app.css`, all rules scoped under `.da-page`.
3. Metadata in `useEffect`, restored on unmount:
   - title `Driver App | totooGO`
   - description `Find nearby swap stations, track your swaps and manage payments with the totooGO Driver App.`
4. Routes `/solutions/driver-app` and `/solutions/driver-app/` in `src/App.tsx`,
   above the catch-all.

## Do not

- Do not edit `nav-config.ts`.
- Do not duplicate the shared slider — import it from `src/components/solutions/`.

## Accept when

- Both URLs render with header and footer, correct title, active menu state.
- Build log clean.
