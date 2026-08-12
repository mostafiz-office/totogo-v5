# TOTOOGO Client Feedback — AI Execution Spec

Source of truth: `feedback/TOTOOGO_Website_Structure.pdf` (client-supplied, 3 pages).
This file is the machine-readable translation of that PDF. If the PDF and this file ever disagree, the PDF wins — update this file.

## How to use this file

- Execute **one group at a time**, in order (A → B → C → D). Stop after each group and wait for the user to review and say "next".
- Every task below has: target file(s), exact copy, and explicit **DO NOT** guardrails.
- Never invent copy, numbers, statistics, images, routes, or sections that are not written here.
- Copy strings are literal. Preserve capitalization exactly as written (e.g. `totooGO`, `TOTOOGO`, `E3W`, `Tk. 20,000`).
- Resolved decisions from the client: brand color is **green `#00CE7E` as primary**; brown is being retired.

---

## Group A — Header navigation (SMALL — batch all four together)

Files: `src/components/site-header/nav-config.ts`, `src/components/site-header/NavItemLink.tsx`

| # | Task | Detail |
|---|------|--------|
| A1 | Rename nav item | `About Us` → `The Idea` (label only; path may stay or become `/the-idea/`) |
| A2 | Trim mega menu | Remove the **Popular Topics** block from the `Our Solutions` mega menu. Delete the `popularTopics` render in `NavItemLink.tsx` and the `popularTopics` export in `nav-config.ts`. |
| A3 | Rename nav item | `Safety Center` → `Investment` |
| A4 | Replace Media menu | Remove `Media` entirely. Add `Join Our Network` with children: `Own an EV`, `Dealership`, `Franchise Program` (short one-line descriptions + suitable lucide icons allowed). |

**DO NOT:**
- Do not touch the `Tech` nav item.
- Do not change header layout, spacing, hover/animation behaviour, or the mega-menu component structure.
- Do not create new pages or React Router routes; placeholder paths are fine.
- Do not keep any leftover `popularTopics` references (dead code = failure).

---

## Group B — Brand color pass (MEDIUM — one batch)

Files: `src/components/battery-smart/HowSwappingWorks.tsx` (scoped `<style>` block), `src/index.css` (if brown tokens exist)

Client note: *"Change the brown color to brand color, follow the logo."*

Retire these hardcoded browns/creams:
`#6B4423`, `#4A2E17`, `#FAF6EE`, `#F0E8DC`, `#E8DCC8`

Replace with a green-led palette:
- Primary / accent: `#00CE7E`
- Light surfaces: neutral off-white / pale green tints
- Dark surfaces: deep neutral or deep green (not brown)
- Text on light: near-black neutral; text on dark: white

**DO NOT:**
- Do not change layout, grid, spacing, radii, typography, or the sticky-stack scroll behaviour. **Color only.**
- Do not introduce purple/indigo or any color not derived from the logo.
- Do not leave any brown hex value anywhere in the codebase after this group.

---

## Group C — Landing "How It Works" section rewrite (LARGE — do alone)

Primary file: `src/components/battery-smart/HowSwappingWorks.tsx`

The section changes from **five** steps to **four**: CHOOSE, BUY, SWAP, EARN.

### Section header (exact copy)

- Eyebrow: `HOW IT WORKS`
- Heading: `Own & earn your freedom, buy, swap, earn, in four simple steps` — render `four simple steps` in italic (existing `<em>` treatment).
- Intro paragraph:
  > totooGO helps CNG three-wheeler drivers own an electric three-wheeler with easy, affordable financing. Our battery subscription removes the worry of costly battery replacement, while lower operating costs and higher earnings help drivers achieve financial freedom.

### Step 1 — CHOOSE
- Category: `CHOOSE`
- Title: `Choose your E3W, Start your ELECTRIC journey!`
- Body: `Select a totooGO electric three-wheeler built for affordable, efficient everyday driving.`
- Stat 1: value `3-5 kW Motor` — label `Built for low-cost, efficient mobility.`
- Stat 2: value `Comfortable Ride` — label `Designed for the real needs of CNG & EV drivers.`

### Step 2 — BUY
- Category: `BUY`
- Title: `Own your vehicle! Own Your Future!`
- Body: `Get your TOTOOGO E3W with easy, pocket-friendly financing and start building your own asset!`
- Stat 1: value `Tk. 20,000` — label `Downpayment starts from`
- Stat 2: value `Tk 600-900` — label `Daily installment, less than CNG rent.`

### Step 3 — SWAP
- Category: `SWAP`
- Title: `Swap & Drive, No Expensive Battery Replacement!`
- Body: `With totooGO, you don't pay for costly battery replacement—only a simple subscription that keeps you on the road.`
- Stat 1: value `24/7 On Road` — label `Keep driving anytime with uninterrupted battery access.`
- Stat 2: value `30-Second Quick Swap` — label `Swap your battery in seconds and get back to earning. Stay moving and pay only for what you use.`

### Step 4 — EARN
- Category: `Earn`
- Title: `Drive More. Earn More. Build Your Freedom!`
- Body: `With lower running costs and more time on the road, totooGO helps you keep more of what you earn and build towards financial freedom.`
- Stat 1: value `70% Lower Costs` — label `Save on everyday operating expenses.`
- Stat 2: value `30% Higher Earnings` — label `Spend more time earning and keep more of your income.`

### Closing line
Below the four cards: `Drive with TOTOOGO and earn your freedom.`

**DO NOT:**
- Do not keep any of the old five steps (Locate / Identify / Swap / Drive / Track) or their copy.
- Do not keep the old stats (`120+`, `<2 km`, `90 sec`, `৳600+`, `3×`, `৳18k+`, `1.2 t`) — they are replaced.
- Do not invent extra steps, extra stats, testimonials, or images.
- Do not change the sticky-card interaction pattern or convert it to a different layout.
- Do not reference Dhaka/Chattogram/Sylhet station counts anymore.
- Stat values here are short phrases, not just numbers — the card must render longer values without clipping.

---

## Group D — Reconcile the legacy 3-step section (SMALL — confirm first)

File: `src/components/HowItWorks.tsx` (rendered on `/` and `/v2`)

It still shows BUY / SWAP / EARN with older copy, which now duplicates Group C's messaging.

Options, decided with the user at execution time:
1. Remove it from `src/pages/Index.tsx` and `src/pages/IndexV2.tsx`, or
2. Align its copy with the Group C four-step content.

**DO NOT:** Do not delete the component file or make this call unilaterally — ask the user first.

---

## Global guardrails (apply to every group)

- Only frontend/presentation changes. No backend, no database, no new dependencies.
- Do not redesign anything that the client did not comment on (hero, footer, EV potential section, CTA).
- Do not replace or generate imagery unless a task explicitly asks for it.
- Keep all existing accessibility attributes (aria-labels, alt text, focus styles).
- After each group: verify visually in the preview before reporting done.
