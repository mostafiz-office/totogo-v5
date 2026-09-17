# Homepage-style visual consistency across completed pages

## Goal
Bring the completed inner pages into the same visual system as the homepage: consistent header elevation, green-highlighted major headings, the same directional text-shadow treatment, and full image-led closing calls to action. Preserve all approved wording and page structure.

## Confirmed scope
Apply the update to:
- The Idea
- Investment
- Contact Us
- Battery Swapping
- Driver App
- Partner App
- Fleet Onboarding

The homepage remains the visual reference. Navigation labels, routes, forms, sliders, and body copy stay unchanged.

## Changes

### 1. Consistent header elevation
- Keep the shared header height and behavior on every route.
- Give the header a subtle, visible separation from page content at the top of every page, with a slightly stronger shadow after scrolling.
- Keep dropdown and mobile-drawer shadows separate so opening menus does not create a doubled or clipped shadow.
- Preserve the approved desktop navigation and mobile drawer design.

### 2. Shared major-heading treatment
- Apply the selected treatment to hero titles, main section headings, and closing call-to-action titles.
- Split each existing heading into navy text plus a meaningful green-highlighted phrase, without rewriting its wording.
- Use one shared directional text-shadow recipe based on the homepage, with an accessible dark-background variant.
- Normalize type scale, line height, wrapping, and spacing so long headings remain balanced from 360px through wide desktop.
- Remove conflicting page-specific heading rules and the current global hover behavior that can make heading colors change inconsistently.

### 3. Full homepage-style closing calls to action
- Replace the compact navy closing cards on all seven inner pages with the homepage’s larger light-green, two-part composition.
- Keep each page’s approved CTA title, supporting copy, and buttons.
- Pair the copy with an existing relevant page image; do not introduce new claims or copy.
- Use consistent bullet/icon treatment only where existing content supports it; do not invent benefits.
- Stack image and copy cleanly on mobile, use the side-by-side composition on larger screens, and prevent image cropping or text clipping.

### 4. Shared styling and cleanup
- Extract reusable semantic heading/highlight and CTA styling instead of maintaining seven drifting copies.
- Express colors, shadows, and surfaces through the existing totooGO design tokens.
- Remove conflicting hardcoded visual values from the homepage CTA while preserving its appearance.
- Respect reduced-motion and maintain visible keyboard focus states.

### 5. Responsive and regression QA
Verify the homepage and all seven updated pages at 360, 393, 768, 1024, 1280, and 1519px:
- header shadow is consistent and never clipped or doubled;
- highlighted headings wrap naturally with no overlap or overflow;
- closing calls to action match the homepage style and remain readable;
- buttons remain at least 44px and keyboard accessible;
- mobile navigation, dropdowns, sliders, forms, and existing links still work;
- one H1 per page, clean console/runtime output, and no horizontal overflow.

## Technical approach
Create shared presentation primitives/classes for highlighted headings and image-led CTA layouts, then migrate each page incrementally. Reuse the existing shared header, Button component, design tokens, page imagery, and reveal behavior. No backend, copy, route, or data changes are included.
