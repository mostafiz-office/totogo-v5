# TOTOOGO Client Feedback — Implementation Plan

Client feedback PDF (TOTOOGO_Website_Structure.pdf) will be stored in the repo and translated into an AI-readable spec, then executed in ordered groups.

## Step 0 — Store the feedback (do this first)

- Create `feedback/` at project root.
- Copy the PDF there as `feedback/TOTOOGO_Website_Structure.pdf` (real file, openable/previewable from the repo).
- Create `feedback/FEEDBACK.md` — the machine-readable version of the client's notes: every item numbered, with exact target file, exact copy, and explicit "do NOT" guardrails so any AI can execute it without guessing.

## Group A — Header navigation (small, one batch)

File: `src/components/site-header/nav-config.ts`

1. Rename "About Us" to "The Idea".
2. "Our Solutions" — remove the Popular Topics block from the mega menu (delete `popularTopics` usage in `src/components/site-header/NavItemLink.tsx`; keep the 4 solution links).
3. Rename "Safety Center" to "Investment".
4. Replace the "Media" menu with "Join Our Network", children: Own an EV, Dealership, Franchise Program.

Do NOT: touch "Tech", change header layout/animation, or add new routes/pages in this group (links can point to placeholder paths).

## Group B — Brand color pass (medium, one batch)

Replace brown (`#6B4423`, `#4A2E17`, cream `#FAF6EE` / `#F0E8DC` / `#E8DCC8` card variants) with the logo palette led by green `#00CE7E` plus neutral light/dark surfaces.

Files: `src/components/battery-smart/HowSwappingWorks.tsx` (scoped CSS block), plus any brown tokens in `src/index.css`.

Do NOT: change layout, spacing, card structure, or the sticky-stack behaviour — color only.

## Group C — "How It Works" section rewrite (large, done alone)

The landing section becomes four steps: CHOOSE, BUY, SWAP, EARN.

New heading: "Own & earn your freedom, buy, swap, earn, in *four simple steps*" (italic on the last phrase).

New intro: totooGO helps CNG three-wheeler drivers own an electric three-wheeler with easy, affordable financing. Our battery subscription removes the worry of costly battery replacement, while lower operating costs and higher earnings help drivers achieve financial freedom.

Step content (title / subtitle / body / two stats):

1. CHOOSE — "Choose your E3W, Start your ELECTRIC journey!" — Select a totooGO electric three-wheeler built for affordable, efficient everyday driving. Stats: "3-5 kW Motor / Built for low-cost, efficient mobility" and "Comfortable Ride / Designed for the real needs of CNG & EV drivers".
2. BUY — "Own your vehicle! Own Your Future!" — Get your TOTOOGO E3W with easy, pocket-friendly financing and start building your own asset! Stats: "Tk. 20,000 / Downpayment starts from" and "Tk 600-900 / Daily installment, less than CNG rent".
3. SWAP — "Swap & Drive, No Expensive Battery Replacement!" — With totooGO, you don't pay for costly battery replacement, only a simple subscription that keeps you on the road. Stats: "24/7 On Road / Keep driving anytime with uninterrupted battery access" and "30-Second Quick Swap / Swap your battery in seconds and get back to earning. Stay moving and pay only for what you use".
4. EARN — "Drive More. Earn More. Build Your Freedom!" — With lower running costs and more time on the road, totooGO helps you keep more of what you earn and build towards financial freedom. Stats: "70% Lower Costs / Save on everyday operating expenses" and "30% Higher Earnings / Spend more time earning and keep more of your income".

Closing line under the section: "Drive with TOTOOGO and earn your freedom."

Do NOT: keep the old 5-step content (Locate/Identify/Swap/Drive/Track), invent new statistics, or change the card/sticky interaction pattern.

## Group D — Reconcile the older 3-step section (small, decision needed at execution)

`src/components/HowItWorks.tsx` still shows BUY / SWAP / EARN with old copy. Once Group C ships, this either gets the same four-step copy or is removed from the page to avoid duplicate messaging. Confirm before removing.

## Execution rule

Groups run one at a time: A, then B, then C, then D. After each group finishes you review and say "next" to proceed. Small groups (A, B, D) are single batches; C is done alone because it is the largest change.

## Technical notes

- Files touched: `feedback/` (new), `src/components/site-header/nav-config.ts`, `src/components/site-header/NavItemLink.tsx`, `src/components/battery-smart/HowSwappingWorks.tsx`, possibly `src/index.css`, `src/components/HowItWorks.tsx`.
- No backend, no new dependencies, no route changes required.
