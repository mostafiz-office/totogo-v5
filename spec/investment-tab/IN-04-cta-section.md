# IN-04 — CTA section

**Status:** Not started
**Depends on:** IN-01

## Goal

A closing call-to-action card in the same rounded-card language as the homepage
`CTASection`, using the document's CTA content.

## Content (exact)

- **Heading (H2):** `Explore the Investment Opportunity`
- **Buttons:**
  - `Request Investor Deck` → `href="#"` (will later open a contact-details form)
  - `Book a Call` → `href="#"` (will later open a Calendly / Google booking link)

Per the client's instruction, neither button gets a real destination in this
build — both are `#`. Keep them as real anchor/button elements with clear
`data-cta` attributes (`data-cta="investor-deck"`, `data-cta="book-a-call"`)
so wiring them up later is a one-line change.

No supporting sentence is invented. If visual balance needs one, reuse the
document line `We are creating more than an electric vehicle company.`

## Layout

- `<section className="sec-pad" aria-label="Explore the investment opportunity">`
  on `--c-surface`.
- Inner `max-w-[1200px] mx-auto`, rounded `2rem` card, background
  `hsl(var(--c-navy))`, padding 48px mobile / 72–88px desktop.
- Centered content: heading, optional line, then buttons in a row (stacked full
  width below `sm`).
- Decoration: soft green radial glow or a thin green accent arc inside the card,
  built from `--c-green` at low opacity. No images required, no brown/warm tones.

## Styling

- Heading: white/near-white on navy, weight 700, clamp ~28px → ~44px, `text-balance`.
- Supporting line: `--c-green-soft` tint, 16–18px.
- Primary button: solid green `--c-green`, navy label, hover `--c-green-deep`.
- Secondary button: transparent, 1px white/green border, white label, hover
  fills with 10% white.
- Both ≥ 48px tall, rounded-full, visible focus ring that contrasts on navy.

## Motion

Reuse the **existing global** `.reveal` / `.is-in` classes in `src/index.css`
(~597–603, reduced-motion reset ~699) — same fade-and-rise as the homepage CTA,
single run, observer unobserves after firing. No new animation CSS.

## Files touched

- new `src/pages/investment/InvestmentCTA.tsx`
- edit `src/pages/investment/investment.css`
- edit `src/pages/investment/InvestmentPage.tsx`

## Acceptance criteria

- Heading text matches the document exactly.
- Both buttons render, are keyboard focusable, and point at `#` with the
  specified `data-cta` attributes.
- Contrast of label text on the navy card ≥ 4.5:1.
- At 360px both buttons are full width and stacked; at 1280px they sit in a row.
- Card corners and padding visually match the homepage CTA card.
- `README.md` status table updated to **Done** for IN-04.
