# Mobile Navbar Correction

## Goal
Refine only the mobile navigation drawer. Keep the desktop navbar, approved labels, routes, logo, and brand colours unchanged.

## Changes
1. **Create one consistent left-aligned menu list**
   - Give The Idea, Our Solutions, Investment, Join Our Network, and Tech the same font size, weight, row height, and left edge.
   - Override the centered styling currently affecting the two expandable rows.
   - Keep chevrons aligned on the right while all labels remain aligned on the left.

2. **Keep dropdown content aligned and compact**
   - Open Our Solutions and Join Our Network directly beneath their parent rows.
   - Left-align submenu icons, titles, and descriptions.
   - Keep accordion expansion within the menu flow without shifting unrelated rows unexpectedly.

3. **Place actions immediately after Tech**
   - Remove the automatic bottom anchoring currently applied to the action area.
   - Display Call and Contact directly below the final Tech row so they remain visible without scrolling to the bottom.

4. **Fix the close behaviour and drawer surface**
   - Make the drawer an opaque mobile surface so homepage content cannot show through the menu.
   - Reproduce closing from multiple page scroll positions, then preserve the exact original page position when the cross, backdrop, or Escape key closes the drawer.
   - Prevent closing from jumping to the footer or changing the page URL.

5. **Validate without desktop changes**
   - Check closed, open, expanded, and closed-again states at 360px, 393px, and 768px.
   - Verify Call and Contact appear after Tech, labels share one alignment and text style, and no content overlaps.
   - Confirm the desktop navbar remains visually unchanged at 1280px.

## Technical scope
Update the mobile branch in `SiteHeader.tsx` and its mobile-only rules in `site-header.css`. Recheck the body scroll-lock restoration logic at non-zero scroll positions. Do not change desktop navigation components or navigation data.
