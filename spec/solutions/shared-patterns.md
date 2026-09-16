# Shared patterns — all four Solutions pages

Read this before implementing any task in `spec/solutions/`.

## 1. Files and structure

```text
src/pages/solutions/<page>/<Page>Page.tsx     page shell (header, sections, footer)
src/pages/solutions/<page>/<page>.css         scoped styles for that page
src/components/solutions/SolutionSlider.tsx   shared slider (built once)
src/components/solutions/solution-slider.css  shared slider styles
src/components/solutions/<page>/*.tsx         section components for that page
```

Page shell mirrors `src/pages/investment/InvestmentPage.tsx`:

```tsx
<div className="min-h-screen bg-[hsl(var(--c-surface))]">
  <SiteHeader />
  <main>{/* sections */}</main>
  <SiteFooter />
</div>
```

Metadata set and restored in a `useEffect` (title + `meta[name="description"]`),
same as `InvestmentPage.tsx`. No `react-helmet`.

## 2. Routes

Register **both** variants in `src/App.tsx`, above the catch-all:

```tsx
<Route path="/solutions/battery-swapping" element={<BatterySwappingPage />} />
<Route path="/solutions/battery-swapping/" element={<BatterySwappingPage />} />
```

Nav config already points at these paths — do not edit `nav-config.ts`.

## 3. Colour tokens (no hardcoded hex, no `text-white`/`bg-black`)

| Token | Value | Use |
|-------|-------|-----|
| `--c-green` / `--c-primary-brand` | `#00CE7E` | primary buttons, accents |
| `--c-navy` / `--c-primary-brand-deep` | `#002366` | headings, dark bands, CTA card |
| `--c-green-soft` | `#CFF1DF` | mint tints, icon chips |
| `--c-surface` | `#F8FBF9` | page background |
| `--c-surface-alt` | `#E8F3EE` | alternating section band |
| `--c-ink` / `--c-muted` / `--c-border` | — | body copy, hairlines |

No brown or warm tan anywhere.

## 4. Spacing and layout

- Vertical rhythm: `.sec-pad` / `.sec-pad-b` (`--sec-y` = 56 / 80 / 112 px).
- Horizontal: `px-4 sm:px-6 md:px-[var(--pad-x)]`, content `max-width: 1200px`.
- Alternate section backgrounds: surface → surface-alt → surface → navy CTA.

## 5. Typography

- Exactly one `<h1>` per page (the hero heading). All other sections use `<h2>`.
- Headings navy, body copy `--c-muted`, same scale as the homepage.

## 6. Motion

Reuse global `.reveal` / `.is-in` from `src/index.css` with the existing
`useReveal` hook (`src/components/investment/useReveal.ts`). Single run,
unobserve after firing. Any JS-driven motion checks `prefers-reduced-motion`.

## 7. SolutionSlider (shared component)

Built once during the Battery Swapping page, reused by the other three.

**Props**

```ts
type SolutionSlide = { title: string; body?: string; icon?: ReactNode };
type SolutionSliderProps = {
  slides: SolutionSlide[];
  ariaLabel: string;      // e.g. "Battery swapping benefits"
};
```

**Behaviour**

- Horizontal scroll-snap track (`scroll-snap-type: x mandatory`, slides
  `scroll-snap-align: start`). Native touch swipe — no drag library.
- Previous / Next buttons, 44×44 px minimum, disabled at the ends, hidden from
  screen readers is NOT allowed — they carry `aria-label="Previous"` / `"Next"`.
- Keyboard: track is `tabIndex={0}` with `role="group"` and `aria-label`; Left /
  Right arrow keys scroll by one slide.
- Slides visible: 1.1 on mobile (peek), 2 at ≥768 px, 3 at ≥1024 px.
- `scroll-behavior: smooth`, disabled under `prefers-reduced-motion`.
- Cards: white background, `--c-border` hairline, radius 16px, mint icon chip,
  navy title, muted body. Equal height across a row.
- `body` is optional: title-only slides (Battery Swapping) use the centred
  layout defined in `battery-swapping/04-slider.md`.
- No autoplay.

## 8. Buttons

- Primary: green fill, navy label, radius pill, 44px min height.
- Secondary: navy outline, navy label, transparent background.
- All `href="#"` for now; keyboard focusable with a visible focus ring so wiring
  a real destination later is a one-line change.

## 9. Accessibility

Semantic `<section>` landmarks with `aria-label`, focus-visible rings, 44px touch
targets, contrast ≥ 4.5:1 (white on navy, navy on mint/green), descriptive
`alt` text on every image, hero image `loading="eager"` + `fetchPriority="high"`,
all other images lazy.

## 10. Regression guards

Do not modify: homepage, `/investment`, `nav-config.ts`, `SiteHeader`,
`SiteFooter`, global tokens in `src/index.css`. If a genuinely shared style is
needed, add a new class — never redefine an existing one.
