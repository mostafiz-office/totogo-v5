# WI-06 — Mobile Navbar Redesign

## Scope correction

Redesign only the mobile header and open navigation drawer shown in the client screenshot. Keep the desktop navbar unchanged.

## Design direction

Use the already selected Totogo treatment:
- Clean white surfaces
- Logo navy `#002366` and green `#00CE7E`
- Current website typography
- Clear, full-width mobile layout rather than a desktop-style floating navbar

## Changes

1. **Mobile top bar**
   - Keep the original Totogo logo legible and proportionate.
   - Replace the dark temporary-looking Call pill with a refined navy quick-call action.
   - Give the menu/close control a clear 44px touch target and visible focus state.
   - Keep header height stable when opening and closing the menu.

2. **Open mobile menu**
   - Redesign the full-screen drawer with stronger spacing, hierarchy, and alignment.
   - Keep all five approved items unchanged: The Idea, Our Solutions, Investment, Join Our Network, Tech.
   - Present expandable items with clear chevrons and smooth accordion states.
   - Show submenu links with readable titles, descriptions, and icons without crowding.
   - Place full-width Call and Contact actions in a deliberate bottom action area instead of the small desktop split pill.

3. **Interaction and accessibility**
   - Preserve body scroll lock, backdrop dismissal, close-on-route-change, and submenu expansion.
   - Add Escape-key dismissal and appropriate menu semantics.
   - Ensure every interactive control has a minimum 44px target and keyboard-visible focus.
   - Respect reduced-motion preferences.

4. **Validation and documentation**
   - Verify closed and open states at 360px, 393px, and 768px.
   - Confirm no clipping, overflow, overlap, or unreadable menu content.
   - Confirm desktop at 1280px is visually unchanged.
   - Mark WI-06 fixed only after these checks pass.

## Technical scope

Primary files: `SiteHeader.tsx` and `site-header.css`. Reuse the current navigation data and desktop components; do not rename links, change routes, alter page content, or reintroduce Popular Topics.
