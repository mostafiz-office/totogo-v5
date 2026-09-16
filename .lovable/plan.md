# Website Issues — Feedback Spec (write specs only, no fixes yet)

Source: Google Doc "totoGO - Feedback", tab **Website Issues** (received 24 Aug, UAT link https://totogo-v5.lovable.app). The tab holds a 3-column table: SL / Screenshot / Remark — 7 filled rows. All 7 screenshots were downloaded and read, so each short remark below is expanded into what the picture actually shows.

This step only produces the written specs. Nothing on the site changes until you review and approve them.

## Folder to create

```text
spec/
  website-issues/
    README.md          index: all 7 tasks, status table, source of truth
    WI-01-...md        one file per task (7 files)
    screenshots/       the 7 screenshots from the doc, named per task
```

## The 7 tasks as I read them

| ID | Remark in doc | What the screenshot actually shows | Area |
|----|---------------|-----------------------------------|------|
| WI-01 | Missing card number | In the stacked "How It Works" cards, the step number 03 is hidden behind the card that slides over it — only a fragment shows | How It Works (stacked cards) |
| WI-02 | Proper gaps must be maintained | Vertical space between the section above and the "How It Works" section is uneven/too large; spacing rhythm between sections needs a consistent scale | Landing page section spacing |
| WI-03 | This blur on mobile devices is not necessary | The photo below the waitlist block has a soft blurred/faded left edge on mobile; client wants a clean, sharp image | Mobile image treatment |
| WI-04 | Texts break on mobile devices, responsive design | On mobile, the "EV Ownership Made Easy" list renders step 3 EARN's paragraph as ghosted/unreadable text and steps get cut; the reveal effect leaves text invisible | EV Ownership Made Easy (mobile) |
| WI-05 | Red marked area is not accessible/readable on mobile | On mobile the next stacked card covers the current card's content; the overlapping card and its "03" badge cannot be read | How It Works (mobile stack) |
| WI-06 | Redesign the navbar | Mobile drawer: cramped logo bar, plain stacked links, Call/Contact pill at the bottom — client wants the whole navbar rethought | Header / mobile menu |
| WI-07 | No. 3 is not visible while scrolling | On desktop, in "EV Ownership Made Easy", step 3 never appears while scrolling — only 1 and 2 render | EV Ownership Made Easy (desktop) |

WI-04 and WI-07 are the same component on two viewports, but they stay as separate tasks because the doc lists them separately.

## What each spec file contains

- Task ID, title, source row (SL number), and the screenshot file
- Client remark, verbatim
- Observed behaviour, described from the screenshot
- Affected files (likely): `src/components/battery-smart/HowSwappingWorks.tsx` (WI-01, WI-02, WI-05), `src/components/HowItWorks.tsx` + `src/components/how-it-works.css` (WI-04, WI-07), `src/components/battery-smart/CTASection.tsx` (WI-03), `src/components/site-header/*` (WI-06)
- Acceptance criteria, testable at stated breakpoints (360px, 768px, 1280px)
- DO NOT guardrails, so no one over-reaches into copy, brand colours, or layout the client did not mention
- Status field: `Not started` / `In progress` / `Done`

## Open question handled in the spec, not guessed

WI-06 "Redesign the navbar" is open-ended. The spec will record it as needing a direction from the client (options: keep structure and only fix the mobile drawer polish, vs. a full visual redesign), and will not prescribe a redesign until you decide.

## Not in scope of this step

- No code changes, no colour changes, no copy changes
- Other tabs in the doc (Website Banner Ideation, Investment Tab, Our Solutions Tab, The Idea Tab, Contact Us Tab) — they can each get their own folder under `spec/` later
- The existing `feedback/FEEDBACK.md` (the older PDF round) stays untouched

After you approve, I create the folder and the 8 files, then we fix the tasks one at a time in the order you choose.
