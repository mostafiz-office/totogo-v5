# TI-01 — Page shell, route, metadata, menu link

**Status:** Not started

## Goal

Create the page shell for `/the-idea/` so the existing menu link resolves to a
real page instead of the 404 route.

## Implementation

1. Create `src/pages/the-idea/TheIdeaPage.tsx`:

```tsx
<div className="min-h-screen bg-[hsl(var(--c-surface))]">
  <SiteHeader />
  <main>
    <IdeaHero />
    <IdeaProblem />
    <IdeaEcosystem />
    <IdeaWhy />
    <IdeaVisionCTA />
  </main>
  <SiteFooter />
</div>
```

2. Create `src/pages/the-idea/the-idea.css`, imported by the page, all selectors
   scoped under `.the-idea-page`.
3. Metadata in a `useEffect` (set on mount, restore previous on unmount), same
   shape as `src/pages/investment/InvestmentPage.tsx`:
   - `document.title = "The Idea | totooGO — Electric Mobility for Bangladesh"` (<60 chars)
   - `meta[name="description"]` = `"totooGO is building a cleaner, safer and more affordable electric mobility ecosystem for Bangladesh — vehicles, battery swapping, technology and financing."` (<160 chars)
4. Register both routes in `src/App.tsx` above the catch-all:

```tsx
<Route path="/the-idea" element={<TheIdeaPage />} />
<Route path="/the-idea/" element={<TheIdeaPage />} />
```

5. Do **not** edit `nav-config.ts` or `SiteFooter.tsx` — both already link to
   `/the-idea/`.

## Acceptance

- Visiting `/the-idea/` and `/the-idea` renders the page, not the 404.
- Header menu item "The Idea" shows its active state on this route.
- Title and description are set; navigating away restores the previous values.
- Build passes, no console errors.
