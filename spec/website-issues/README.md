# Website Issues — Feedback Spec Index

**Source of truth:** Google Doc "totoGO - Feedback", tab **Website Issues**
https://docs.google.com/document/d/1ZLxmX6B4upXhO6yj_jx5DvDmtk-eksiTlqyBC_02glw/edit?tab=t.0

- Received: 24th August
- UAT link reviewed by client: https://totogo-v5.lovable.app
- Prepared By: Imran Mehedi (TPM) · Checked By: Riyad Hasan Khan (Business Lead) · Azmain Adil Rifat (CBO) · Approved By: SM Mahmudul Hyder (Head)

The doc tab is a table of SL / Screenshot / Remark with 7 filled rows. Each row is one task file below. Screenshots are mirrored in `screenshots/` with the task ID in the filename.

## Task list

| ID | Title | Area | Viewport | Status |
|----|-------|------|----------|--------|
| [WI-01](WI-01-missing-card-number.md) | Step number on stacked card is hidden | How It Works (stacked cards) | Desktop | Not started |
| [WI-02](WI-02-section-gaps.md) | Inconsistent vertical gaps between sections | Landing page spacing | All | Not started |
| [WI-03](WI-03-mobile-image-blur.md) | Remove unnecessary blur/fade on mobile image | CTA image | Mobile | Not started |
| [WI-04](WI-04-mobile-text-break.md) | Text breaks / stays invisible on mobile (cause confirmed: `nth-of-type` off-by-one) | EV Ownership Made Easy | Mobile | Not started |
| [WI-05](WI-05-mobile-card-overlap.md) | Overlapping card hides content on mobile | How It Works (stacked cards) | Mobile | Not started |
| [WI-06](WI-06-navbar-redesign.md) | Redesign the navbar | Header / mobile menu | All | Blocked — needs client direction |
| [WI-07](WI-07-step-3-not-visible.md) | Step 3 never becomes visible while scrolling | EV Ownership Made Easy | Desktop | Not started |

WI-04 and WI-07 concern the same component at different viewports but are kept separate because the client listed them separately. WI-01 and WI-05 are the same sticky stack and should be fixed in one pass.

## Known code facts (verified — read before starting any task)

- **"EV Ownership Made Easy"** = `src/components/HowItWorks.tsx`. It imports **`src/pages/how-it-works.css`** — that is the live stylesheet.
- **Dead files, do not edit:** `src/components/how-it-works.css` (imported by nothing) and `src/components/howItWorks.frame.ts` / `howItWorks.frame.test.ts` (the frame math is imported only by its own test; the component does not use it).
- That component has **no per-step opacity animation**. Desktop scroll maps to one horizontal translate (`TRACK_TRAVEL_PX = 1740`) plus the green rail width.
- Below **991px** the desktop track is hidden and a static list (`.bp-mobile`) renders instead.
- **"How It Works" four-step stack** = `src/components/battery-smart/HowSwappingWorks.tsx`, with its CSS in a scoped `<style>` block inside the file.
- **CTA image overlay** is in `src/components/battery-smart/CTASection.tsx` and applies at **all** viewports (no mobile-only condition).
- Landing page section order lives in `src/pages/Index.tsx`: Hero, EVPotentialSection, HowItWorks, CTASection, HowSwappingWorks.

## Suggested fix order

WI-04 (confirmed cause) → WI-01 + WI-05 together → WI-03 → WI-07 → WI-02 → WI-06 once unblocked.

## Rules for anyone (human or AI) executing these

1. Fix **one task at a time**, in the order agreed with the project owner. Stop after each and wait for review.
2. Change only what the task's spec names. Anything not written in the spec is out of scope.
3. Do not change brand colours, copy, or imagery unless the task explicitly asks for it. The brand palette is already settled: green `#00CE7E`, logo navy `#002366`.
4. Verify each fix live in the preview at 360px, 768px and 1280px before marking it done.
5. When a task is finished, update its `Status` field and the table above.

## Out of scope for this folder

Other tabs in the same Google Doc — Website Banner Ideation, Investment Tab, Our Solutions Tab, The Idea Tab, Contact Us Tab — are separate future spec folders. The earlier PDF round lives in `feedback/FEEDBACK.md` and stays as-is.
