# WI-06 — Redesign the navbar

- **Source row:** SL 6, tab "Website Issues"
- **Screenshot:** `screenshots/WI-06-navbar-redesign.png`
- **Client remark (verbatim):** "Redesign the navbar"
- **Area:** Site header — mobile drawer in the screenshot, desktop header implied
- **Viewport in screenshot:** Mobile, menu open
- **Status:** **Blocked — needs client direction before any work starts**

## Observed behaviour

The screenshot marks two regions in red:

1. The top bar — logo squeezed small on the left, a dark "Call" pill and a close icon on the right, over a grey dimmed backdrop.
2. The open drawer — plain stacked text links (The Idea, Our Solutions, Investment, Join Our Network, Tech) with chevrons, and a split navy/green "Call · Or · Contact" pill at the bottom left, left-aligned with a lot of empty space below.

The remark is a general instruction, not a specific defect. Nothing in the doc states what the redesign should look like.

## Open question — resolve before implementing

Which does the client want?

- **Option A — polish only:** keep the current structure and fix the drawer's craft (logo size/legibility, link spacing and type scale, full-width Call/Contact buttons, backdrop and close-button treatment, submenu expand behaviour).
- **Option B — full redesign:** new header concept for desktop and mobile (layout, states, motion), presented as design directions before build.

Do not choose unilaterally. Ask the project owner, who confirms with the client.

## Likely files

- `src/components/site-header/SiteHeader.tsx`
- `src/components/site-header/NavItemLink.tsx`
- `src/components/site-header/CallBookPill.tsx`
- `src/components/site-header/site-header.css`
- `src/components/site-header/nav-config.ts` (labels only — already approved, do not change)

## Acceptance criteria (apply once a direction is chosen)

1. Header and drawer look deliberate at 360px, 768px and 1280px.
2. Logo renders at a legible size and is not distorted or cramped.
3. All five nav items and their submenus remain reachable, with visible focus states and working keyboard navigation.
4. Call and Contact actions stay present and tappable (min 44px target) on mobile.
5. Body scroll lock, backdrop dismissal, and close on route change keep working.

## DO NOT

- Do not rename nav items or add/remove menu entries — the structure (The Idea · Our Solutions · Investment · Join Our Network · Tech) is already client-approved.
- Do not reintroduce the removed "Popular Topics" block.
- Do not start building before the direction question above is answered.
- Do not change brand colours away from green `#00CE7E` / logo navy `#002366`.
