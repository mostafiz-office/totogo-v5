# WI-06 — Redesign the navbar

- **Source row:** SL 6, tab "Website Issues"
- **Screenshot:** `screenshots/WI-06-navbar-redesign.png`
- **Client remark (verbatim):** "Redesign the navbar"
- **Area:** Site header — mobile top bar and open drawer only; desktop stays unchanged
- **Viewport in screenshot:** Mobile, menu open
- **Status:** **Fixed (2026-09-16) — mobile-only full redesign verified at 360px, 393px, and 768px; desktop unchanged at 1280px**

## Observed behaviour

The screenshot marks two regions in red:

1. The top bar — logo squeezed small on the left, a dark "Call" pill and a close icon on the right, over a grey dimmed backdrop.
2. The open drawer — plain stacked text links (The Idea, Our Solutions, Investment, Join Our Network, Tech) with chevrons, and a split navy/green "Call · Or · Contact" pill at the bottom left, left-aligned with a lot of empty space below.

The remark is a general instruction, not a specific defect. Nothing in the doc states what the redesign should look like.

## Approved direction

The project owner approved a **full redesign of the mobile navbar only**. The desktop header is explicitly outside this feedback item and must remain unchanged.

The completed mobile direction uses the original logo, logo navy and brand green, a stable 70px top bar, clear menu hierarchy, expandable submenu rows, and separate full-width Call and Contact actions.

## Likely files

- `src/components/site-header/SiteHeader.tsx`
- `src/components/site-header/NavItemLink.tsx`
- `src/components/site-header/CallBookPill.tsx`
- `src/components/site-header/site-header.css`
- `src/components/site-header/nav-config.ts` (labels only — already approved, do not change)

## Acceptance criteria

1. Mobile header and drawer look deliberate at 360px, 393px and 768px; desktop remains unchanged at 1280px.
2. Logo renders at a legible size and is not distorted or cramped.
3. All five nav items and their submenus remain reachable, with visible focus states and working keyboard navigation.
4. Call and Contact actions stay present and tappable (min 44px target) on mobile.
5. Body scroll lock, backdrop dismissal, and close on route change keep working.

## DO NOT

- Do not rename nav items or add/remove menu entries — the structure (The Idea · Our Solutions · Investment · Join Our Network · Tech) is already client-approved.
- Do not reintroduce the removed "Popular Topics" block.
- Do not redesign or restyle the desktop navbar as part of WI-06.
- Do not change brand colours away from green `#00CE7E` / logo navy `#002366`.
