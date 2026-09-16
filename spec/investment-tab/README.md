# Investment Page — Spec Index

**Source of content:** totoGO Feedback document, tab "Investment Tab" (`t.e5avofd2o9f9`).
**Goal:** Build a new Investment page at `/investment/` that matches the existing homepage design language.
**Status:** Specs written. No website code changed yet.

## Tasks

| ID | Task | File | Status |
|----|------|------|--------|
| IN-01 | Page route + menu link | `IN-01-page-route-and-nav.md` | Done |
| IN-02 | Hero / Investment Opportunity section | `IN-02-hero-section.md` | Done |
| IN-03 | Numbers (animated counters) section | `IN-03-stats-counter-section.md` | Done |
| IN-04 | CTA section | `IN-04-cta-section.md` | Done |
| IN-05 | Visual assets (hero graphic, icons, background) | `IN-05-visual-assets.md` | Done |
| IN-06 | Responsive + QA pass | `IN-06-responsive-and-qa.md` | Done |

Wireframe: `wireframe.md` — Build checklist: `CHECKLIST.md`

After finishing a task, update its row in the table above to **Done**.

## Resolved decisions (do not re-litigate)

1. Numbers footnote is exactly `*Minimum-ticket allocations` — nothing invented.
2. Numbers section sits on a full-width `--c-surface-alt` band (no inner card).
3. No icons in the numbers section.
4. Primary button = green fill with a navy label; secondary = navy outline.
5. Hero image is newly generated as `src/assets/investment-hero.jpg`; existing
   assets are not reused.
6. `Request Investor Deck` and `Book a Call` both use `href="#"` for now.
7. The page has exactly three sections — hero, numbers, CTA.
8. `.reveal` / `.is-in` already exist globally in `src/index.css` (~597–603,
   reduced-motion reset ~699). Reuse them; only write the IntersectionObserver.
9. No `react-helmet` in this project — page metadata is set and restored in a
   `useEffect` (see IN-01).

## Build order

IN-01 → IN-02 → IN-03 → IN-04 → IN-05 → IN-06

## Global design rules (apply to every task)

1. **Reuse, don't reinvent.** Same `SiteHeader` and `SiteFooter` as the homepage. CTA uses the rounded-card pattern from `src/components/battery-smart/CTASection.tsx`.
2. **Colour tokens only** — defined in `src/index.css`. No hardcoded hex, no `text-white`/`bg-black` utilities.
   - Green `--c-green` / `--c-primary-brand` = `#00CE7E`
   - Navy `--c-navy` / `--c-primary-brand-deep` = `#002366`
   - Mint tint `--c-green-soft` = `#CFF1DF`
   - Page surface `--c-surface` = `#F8FBF9`, band `--c-surface-alt` = `#E8F3EE`
   - Ink `--c-ink`, muted copy `--c-muted`, hairline `--c-border`
   - No brown / warm tan anywhere (removed site-wide earlier).
3. **Spacing** — use the shared section tokens `.sec-pad` / `.sec-pad-b` (`--sec-y`: 56px mobile / 80px tablet / 112px desktop). Horizontal padding `px-4 sm:px-6 md:px-[var(--pad-x)]`, content capped at `max-width: 1200px`.
4. **Typography** — inherit the homepage scale. One `<h1>` per page. Headings in navy, body copy in `--c-muted`.
5. **Motion** — reuse the global `.reveal` / `.is-in` classes already in `src/index.css`; write only the IntersectionObserver (same shape as `CTASection.tsx`), single run, unobserve after firing. JS-driven motion such as the counters must check `prefers-reduced-motion` itself.
6. **Accessibility** — semantic `<section>` landmarks, `aria-label` on each section, focus-visible rings, minimum 44px touch targets, text contrast ≥ 4.5:1 (white on navy, navy on mint).
7. **Links** — per client decision, "Request Investor Deck" and "Book a Call" both use `href="#"` for now. No form, no Calendly link, no backend. Buttons must still be keyboard focusable and styled as real CTAs so wiring them later is a one-line change.

## Verbatim content from the document

> **SECTION 01 — HERO / INVESTMENT OPPORTUNITY**
> **Invest in a New Era of Mobility**
> totooGO is building an end-to-end electric mobility ecosystem designed for Bangladesh - combining electric vehicles, Battery-as-a-Service, rapid battery swapping, accessible financing, digital technology, and service infrastructure.
> We are creating more than an electric vehicle company. We are building the infrastructure required to make electric mobility affordable, commercially viable, and scalable.
> JOIN OUR current Pre-Seed Round
> US$750K Target Raise
> US$5M Pre-Money Valuation
> US$50K Minimum Investment
> Up to 15 Minimum-Ticket Allocations*
> CTA: Explore the Investment Opportunity - Book a call [calendly/google link]
> CTA: Request Investor Deck [Opens up a form to leave basic contact details]

Copy must be used exactly as written above, with only these normalisations:
- "totooGO" keeps the brand spelling used across the site.
- The hyphen in "designed for Bangladesh -" becomes an en dash "–".
- "JOIN OUR current Pre-Seed Round" is rendered as the eyebrow label `JOIN OUR CURRENT PRE-SEED ROUND` (uppercase via CSS, not by rewriting the text).
