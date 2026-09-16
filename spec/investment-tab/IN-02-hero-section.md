# IN-02 — Hero / Investment Opportunity section

**Status:** Not started
**Depends on:** IN-01
**Source:** Document "SECTION 01 — HERO / INVESTMENT OPPORTUNITY"

## Goal

A two-column hero: copy on the left, a visual panel on the right, matching the
homepage hero's weight and rhythm.

## Content (exact)

- **Eyebrow pill:** `JOIN OUR CURRENT PRE-SEED ROUND`
- **H1:** `Invest in a New Era of Mobility`
- **Paragraph 1:** `totooGO is building an end-to-end electric mobility ecosystem designed for Bangladesh – combining electric vehicles, Battery-as-a-Service, rapid battery swapping, accessible financing, digital technology, and service infrastructure.`
- **Paragraph 2:** `We are creating more than an electric vehicle company. We are building the infrastructure required to make electric mobility affordable, commercially viable, and scalable.`
- **Primary button:** `Request Investor Deck` → `href="#"`
- **Secondary button:** `Book a Call` → `href="#"`

No invented copy. If a supporting line is needed anywhere, it must be composed
only from the words above.

## Layout

- `<section className="sec-pad ..." aria-label="Investment opportunity">`
- Inner `max-w-[1200px] mx-auto`, grid `lg:grid-cols-[1.1fr_0.9fr]`, gap 48–64px,
  `items-center`.
- Desktop: copy left, visual right. Below `lg`: single column, copy first,
  visual second.
- Background: `--c-surface`. Optional soft radial mint glow behind the visual
  using `--c-green-soft` at low opacity — no new colours.

## Styling details

- Eyebrow: uppercase, letter-spacing 0.08em, 12–13px, semibold, navy text on
  `--c-green-soft` pill, rounded-full, inline-flex with a small green dot.
- H1: clamp from ~34px mobile to ~60px desktop, weight 700, colour
  `hsl(var(--c-navy))`, line-height 1.08, `text-balance`.
- Paragraphs: 16–18px, `hsl(var(--c-muted))`, max-width ~56ch, 16px gap.
- Buttons: reuse the shared `Button` component
  (`src/components/ui/button.tsx`).
  - Primary — solid green `--c-green` with a **navy label** (`--c-navy`),
    hover `--c-green-deep`, rounded-full, height ≥ 48px, `ArrowRight` icon.
  - Secondary — transparent with navy border and navy label, same height.
  - Mobile: both full width, stacked with 12px gap.
  - Both `href="#"` (client decision), with `data-cta="investor-deck"` and
    `data-cta="book-a-call"`.
- Visual panel: rounded `2rem` (`1.5rem` mobile), `overflow-hidden`, subtle
  border `--c-border`, soft shadow. Aspect ratio ~4:3 desktop, ~16:10 mobile.
  The image itself is produced in IN-05 (`src/assets/investment-hero.jpg`);
  until then fill the panel with a token-coloured mint block — never a grey box
  with placeholder text.

## Motion

- Copy block and visual panel each get the **existing global** `.reveal` class
  (defined in `src/index.css` ~597–603 with the reduced-motion reset at ~699);
  only the IntersectionObserver that adds `.is-in` needs writing. Threshold
  0.15, unobserve after firing, visual delayed ~80ms via `--i`.
- No new animation CSS is added for this.

## Acceptance criteria

- Copy matches the document word for word.
- Exactly one `<h1>` on the page and it is this heading.
- At 1280px: two columns, visual fully visible, no horizontal scroll.
- At 360px: single column, both buttons full width, no text clipped, no
  horizontal overflow.
- Section top/bottom padding equals the `.sec-pad` token values.
- Buttons are keyboard focusable with a visible focus ring.
