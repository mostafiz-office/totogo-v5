# Hero CTA Interaction Checklist

Quick manual smoke test to confirm the green V background and animated banner
never block hover/click on any interactive hero element. Run after any change
to `Hero.tsx`, `Navbar.tsx`, `HeroBannerSVG.tsx`, or the `.Home_*` / `.bs-*`
CSS rules in `src/index.css`.

## Setup

1. Open the preview in dev mode.
2. Confirm the bottom-right **`bg overlap check: ✓ pass`** badge is visible.
   - If it shows ✗ fail, fix before continuing, see console for details.
3. Open DevTools → Console. Filter for `GreenBgOverlapCheck`.

---

## Desktop (≥ 1024 px wide)

Resize the viewport to **1280 × 800** and **1920 × 1080**. For each size:

### Navbar
- [ ] Hover each top-level link (About Us, Our Solutions, Safety Center,
      Media, Tech, ESG, Join Our Network, Marketplace) → underline appears.
- [ ] Hover **Contact Us** button → background darkens to deep blue,
      lifts up 1 px.
- [ ] Click **Contact Us** → registers (no element steals the click).
- [ ] Tab through navbar with keyboard → every item shows the blue focus
      ring; nothing is hidden behind the green background.

### Hero title area
- [ ] Move the cursor across the entire title block ("India's Largest
      Battery-Swapping Network for Electric Vehicles") → text cursor (`I-beam`)
      appears, **never** the default arrow that would indicate a blocking
      overlay.
- [ ] Try selecting the title text → selection works end-to-end.

### Banner SVG
- [ ] Hover the city scene → cursor stays default (banner has
      `pointer-events: none`, intentional). Vehicles continue animating.
- [ ] Resize the window between 1024 → 1920 → console badge re-runs and
      still shows ✓ pass.

---

## Mobile (≤ 768 px wide)

Resize to **375 × 812** (iPhone X) and **414 × 896** (iPhone 11 Pro Max).
For each size:

### Navbar
- [ ] Tap the hamburger icon → menu opens.
- [ ] Tap each menu item in the open drawer → registers.
- [ ] Close the drawer → background scrim is dismissable.

### Hero title area
- [ ] Long-press / tap-and-drag across the title → text selection works.
- [ ] No phantom tap targets on the green V area (it sits behind the
      title with `pointer-events: none`).

### Banner SVG
- [ ] Banner appears below the title, fully visible, no clipping.
- [ ] Pinch-zoom the page → green V and banner stay aligned with the title.

---

## Regression Triggers

If any of the above fails, check in this order:

1. **Console warning**, `GreenBgOverlapCheck` reports the offending element.
2. **`.bs-greenbg`** computed style: `position: absolute`, `z-index: 0`,
   `pointer-events: none`. Any change here is the most likely culprit.
3. **`.Home_bannerDesktop__IJBqP`** computed style: `z-index: 1`,
   `pointer-events: none`.
4. **`.Home_HomeTitle__hXEBP`** computed style: `position: relative`,
   `z-index: 3`.
5. **`.Home_Home__r7pEu`** must keep `isolation: isolate` so the local
   stacking context can't be inverted by ancestors.

The dev overlay component lives at
`src/components/battery-smart/GreenBgOverlapDevCheck.tsx` and only renders
when `import.meta.env.DEV` is true, production builds drop it entirely.
