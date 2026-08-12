# Hero Animation Fix Spec (Animation-Only, No Layout Changes)

**Scope lock (do NOT change):**
- HQ building position, size, rotation, overlay rect, or shear.
- Any other building placement.
- Road geometry, plaza, people positions.
- Overall SVG viewBox or scaling.

The current static layout is approved. This spec covers ONLY the missing animations and one stray white square in the top-left tree area.

Reference: https://www.batterysmart.in/ (competitor hero we are matching for motion feel).
Target file: `src/components/battery-smart/HeroBannerSVG.tsx`
SVG asset: `src/assets/battery-smart-hero.svg`

---

## Issues to fix

### Issue 1, Main three-wheeler does not drive
The main auto (three-wheeler) should drive along the horizontal road and loop. Currently it is static.
**Root cause:** the animation code targets `#threeWheelerHero`, but the current SVG export uses a generic `Group_###` id for that vehicle. GSAP silently no-ops on missing IDs.
**Fix:** at mount, locate the three-wheeler group by its known bbox / fill signature and alias it to `id="threeWheelerHero"`. Do not move it visually; only tag the DOM node. Then re-enable the existing route tween.

### Issue 2, Second three-wheeler never appears
A second, staggered auto should follow the first on the same road (as on batterysmart.in).
**Root cause:** clone step depends on `#threeWheelerHero` existing. Once Issue 1 is fixed, clone as `#threeWheeler2`, offset start time, and reuse the same route with a small lane offset (≤ 6 SVG units) so it doesn't overlap.

### Issue 3, Two-wheeler with rider does not move
The scooter(s) with rider should drive in on the diagonal/vertical road and loop.
**Root cause:** same as Issue 1. `#twoWheeler1` and `#twoWheeler2` do not exist in the current SVG.
**Fix:** DOM-tag the two scooter groups as `#twoWheeler1` and `#twoWheeler2` at mount. Re-enable the tweens. Stagger so scooters don't collide with the autos at the intersection.

### Issue 4, Trees are not animating
Trees should have a subtle, natural leaf sway (like wind), non-synchronized across trees. Currently they are static.
**Root cause:** existing tree tween looks for `*_canopy` children that don't exist. The current tree groups are flat.
**Fix:** at mount, for each named tree (`firstTreeIn2WheelerWay`, `extraTree1/3/4/5`, `treeBesideRoad`, `treeNearStation`), detect canopy sub-paths heuristically (top ~60% of the tree's bbox, green-ish fill) and animate ONLY those with:
- rotation: ±1.2° to ±2°
- duration: 5–8s, `sine.inOut`
- per-tree phase offset: 0–3s
- transform-origin: bottom of canopy bbox
- trunk and shadow paths: untouched
If canopy detection fails on a tree, fall back to animating the whole tree group with a very small rotation (±0.6°) around its bottom center, so the trunk/shadow visual shift is imperceptible.

### Issue 5, Stray white square in top-left tree area
There is a white filled rectangle where a tree shadow should be (top-left area of the scene). It reads as a bug.
**Fix:** at mount, find the white/near-white `<rect>` or `<path>` in the top-left tree region (roughly SVG x < 400, y < 900) whose bbox aspect ratio is ~square and whose fill is `#fff` / `#ffffff` / `white`, and set `display: none` on it. Do not remove other white elements (road, HQ walls, etc.). Restrict the search to that region only.

---

## Explicit non-goals (do NOT do)
- Do NOT move, resize, rotate, or re-shear the HQ overlay.
- Do NOT touch `HQ_BUILDING_SVG_RECT`.
- Do NOT reposition roads, plaza, station, phone-with-two-men, or any person.
- Do NOT touch turbines (they are considered acceptable now; user did not list them).
- Do NOT touch the walking woman (she is considered acceptable now; user did not list her).
- Do NOT re-export or regenerate the SVG asset.
- Do NOT fade vehicles in/out to hide route problems, they should loop naturally off-screen.

---

## Implementation rules
1. All fixes happen inside `HeroBannerSVG.tsx` via a `useLayoutEffect` DOM pass that runs after the SVG is injected.
2. The DOM pass ONLY: adds `id` aliases, adds `data-canopy` markers, and hides the one stray white square. No geometry edits.
3. Vehicle IDs must be verified present in the DOM before starting the GSAP timeline. If missing after tagging, log a single warning and skip that tween (do not crash).
4. Vehicle routes stay on the visible road. If a route needs recalibration for the current road, adjust `ROUTES` numeric values only, never move the road art.
5. Verify in the browser at 1280×1800 before claiming done: 2 autos moving, 2 scooters moving, tree canopies swaying, no white square top-left.

---

## Acceptance criteria
- Main three-wheeler visibly drives along the horizontal road and loops.
- Second three-wheeler follows on a staggered timer, also on the road.
- At least one scooter with rider drives in on the diagonal road and loops.
- All named trees show subtle non-synchronized canopy sway; trunks/shadows do not visibly move.
- Top-left stray white square is gone.
- HQ, other buildings, roads, plaza, people: pixel-identical to current approved layout.
