# The Idea Page — Spec, Wireframe and Task List

The content from the document's "The Idea Tab" is now written up as a full spec in
`spec/the-idea/`, in the same format used for the Investment and Our Solutions pages.
Nothing on the website has been changed yet.

## Page structure (from their copy)

```text
Header (shared)

1  Hero              A Better Way to Move Bangladesh
                     lead text + chips (Electric Vehicles / Battery Swapping /
                     Technology / Financing) + button "Discover the totooGO Ecosystem"
                     photo on the right

2  The Problem       Mobility Should Work Better
                     two intro paragraphs + 4 cards
                     Low Driver Income / Limited Financing /
                     Unsafe Vehicles / Long Charging Downtime

3  The Idea          Build the Entire Ecosystem, Not Just the Vehicle
                     swipeable slider, 5 slides
                     Affordable Electric Vehicles / Battery-as-a-Service /
                     Rapid Battery Swapping / Accessible Financing / Digital Technology

4  Why It Matters    More Time on the Road. Lower Barriers to Electric.
                     5 benefits in a light list-card layout

5  Bigger Vision     From Three-Wheelers to a Connected Electric Future
                     + navy call-to-action card "One Network. Multiple Possibilities."
                     button "Explore Our Solutions"

Footer (shared)
```

Backgrounds alternate light → mint → light → mint → navy card, exactly like the
existing pages. Green and navy branding, same spacing, same reveal-on-scroll motion,
same slider component already built for Our Solutions.

## Task list

| ID | Task |
|----|------|
| TI-01 | Page shell, `/the-idea/` route, page title/description, menu link check |
| TI-02 | Section 1 — Hero |
| TI-03 | Section 2 — The Problem (4 cards) |
| TI-04 | Section 3 — The Idea (5-slide slider) |
| TI-05 | Section 4 — Why It Matters (5 benefits) |
| TI-06 | Section 5 — Bigger Vision + closing call-to-action |
| TI-07 | Visual assets (hero photo, icons) |
| TI-08 | Responsive check + QA at 360 / 768 / 1024 / 1280 px |

Build order is TI-01 through TI-08, one at a time when you say "next".

## Decisions already locked in

- Copy is used word for word from the document; nothing invented.
- Hero button scrolls down to Section 3; closing button goes to Our Solutions →
  Battery Swapping. No placeholder links left on this page.
- Only Section 3 is a slider; Sections 2 and 4 are static grids with two different
  card styles so they don't look repetitive.
- Hero photo is newly generated in the same style as the Solutions page photos.
- The menu already points to The Idea, so only the missing route needs adding.

## Spec files created

`spec/the-idea/README.md` (index + verbatim copy), `wireframe.md`,
`TI-01` … `TI-08` task files, and `CHECKLIST.md` (gap analysis confirming the
page can be built with no further input).

## Next step

Approve this and say "next" — I'll start with TI-01 and TI-02 (page shell, route and hero).
