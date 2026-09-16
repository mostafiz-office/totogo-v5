# Investment Page — Build Checklist

Tick each line as the tasks are completed. Anything unticked blocks calling the
page done.

## Before building

- [ ] Content copied verbatim from `README.md` → "Verbatim content from the document"
- [ ] Decisions in `README.md` → "Resolved decisions" read and followed
- [ ] No new colours, fonts or spacing values invented

## Content accuracy

- [ ] H1 = `Invest in a New Era of Mobility` (exactly one `<h1>` on the page)
- [ ] Eyebrow = `JOIN OUR CURRENT PRE-SEED ROUND`
- [ ] Both hero paragraphs word for word
- [ ] `US$750K / Target Raise`
- [ ] `US$5M / Pre-Money Valuation`
- [ ] `US$50K / Minimum Investment`
- [ ] `Up to 15 / Minimum-Ticket Allocations*`
- [ ] Footnote `*Minimum-ticket allocations`
- [ ] CTA heading = `Explore the Investment Opportunity`
- [ ] Buttons `Request Investor Deck` and `Book a Call`, both `href="#"`, with
      `data-cta="investor-deck"` / `data-cta="book-a-call"`

## Design system

- [ ] Colours only from tokens: `--c-green`, `--c-navy`, `--c-green-soft`,
      `--c-surface`, `--c-surface-alt`, `--c-ink`, `--c-muted`, `--c-border`
- [ ] No hardcoded hex, no `text-white` / `bg-black` utilities
- [ ] No brown, tan or warm tones anywhere
- [ ] Every section uses `.sec-pad` (`--sec-y` = 56 / 80 / 112px)
- [ ] Horizontal padding `px-4 sm:px-6 md:px-[var(--pad-x)]`, content max 1200px
- [ ] Buttons use the shared `src/components/ui/button.tsx` component
- [ ] Primary button: green fill, navy label; secondary: outline
- [ ] CTA card matches the homepage rounded-card look (2rem radius)

## Motion

- [ ] Reveals reuse the global `.reveal` / `.is-in` classes from `src/index.css`
- [ ] Observers unobserve after firing (single run)
- [ ] Counters animate once, never restart
- [ ] `prefers-reduced-motion: reduce` → no reveal, no counting, final values shown

## Accessibility

- [ ] Each section has an `aria-label`
- [ ] Counter values announced once via `aria-label` + `aria-hidden` inner text
- [ ] All controls ≥ 44px touch target, visible focus ring
- [ ] Text contrast ≥ 4.5:1 (white on navy, navy on green, navy on mint)
- [ ] Hero image has meaningful alt text

## Routing and navigation

- [ ] `/investment` and `/investment/` both render the page
- [ ] Route added above the catch-all `*` in `src/App.tsx`
- [ ] "Investment" nav item shows `aria-current="page"` on this page
- [ ] Mobile drawer closes and body scroll unlocks after navigating
- [ ] Page opens scrolled to the top
- [ ] Tab title and description set on mount, restored on unmount

## Responsive

- [ ] 360px — single column, full-width buttons, 2×2 numbers, no horizontal scroll
- [ ] 393px — headline wraps cleanly
- [ ] 768px — hero visual below copy, CTA buttons in a row
- [ ] 1024px — two-column hero, numbers 1×4
- [ ] 1280px — content capped at 1200px, full section padding
- [ ] 1519px — content centred, nothing stretched
- [ ] `scrollWidth === clientWidth` at every width above

## Regression guards

- [ ] `/`, `/v2`, `/how-it-works`, `/evpotential` unchanged
- [ ] Header and footer markup untouched
- [ ] No new variables added to `:root`
- [ ] Build log shows `build OK`, browser console has zero errors
- [ ] Screenshots captured at 360 / 768 / 1280
- [ ] `README.md` status table updated for every finished task
