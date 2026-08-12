# Hero Animation Fix - Task List

Reference: `docs/hero-animation-issues-spec.md`
Target files: `src/components/battery-smart/HeroBannerSVG.tsx`, `src/assets/battery-smart-hero.svg`

## Issues (chat summary)

1. Main three-wheeler does not drive on the road (`#threeWheelerHero` missing in SVG).
2. Second three-wheeler never spawns (clone source missing, so `#threeWheeler2` never created).
3. Scooter #1 on the vertical/diagonal road does not move (`#twoWheeler1` missing).
4. Scooter #2 does not move (`#twoWheeler2` missing).
5. Turbine rotors spin around wrong pivots and mix CSS + GSAP, producing wobble.
6. Trees "sway" the entire group including trunk and shadow instead of just canopy.
7. Walking woman may pop under new vehicle layers after fixes land (needs re-verify).
8. `ROUTES` coordinates in `HeroBannerSVG.tsx` are inherited from an older SVG grid and need recalibration against the current road centerlines.

## Task list (do one by one, top to bottom)

### Phase 1 - Discovery in the SVG
- [ ] T1. Open `src/assets/battery-smart-hero.svg`, locate the parked auto group (three-wheeler) by fill color + coordinates. Record its current `Group_###` id.
- [ ] T2. Locate the two scooter groups the same way. Record their `Group_###` ids.
- [ ] T3. Locate the walking-woman group (currently `yellowGirl`). Confirm its id and bbox.
- [ ] T4. For each named tree (`firstTreeIn2WheelerWay`, `extraTree1/3/4/5`, `treeBesideRoad`, `treeNearStation`), list its child nodes and identify which child is canopy vs trunk vs shadow.

### Phase 2 - Add semantic IDs
- [ ] T5. Rename the parked auto group to `id="threeWheelerHero"` (SVG edit or DOM rename in `useLayoutEffect`).
- [ ] T6. Rename scooter groups to `id="twoWheeler1"` and `id="twoWheeler2"`.
- [ ] T7. Ensure `id="walkingWoman"` exists (alias from `yellowGirl` at mount is fine).
- [ ] T8. For each tree, tag children with `_canopy`, `_trunk`, `_shadow` suffixes (DOM pass at mount if SVG edit is impractical).

### Phase 3 - Route recalibration
- [ ] T9. Measure current horizontal road centerline (bbox of road stroke) and update `ROUTES.threeWheelerHero`.
- [ ] T10. Update `ROUTES.threeWheeler2` with a small lane offset from Hero.
- [ ] T11. Measure vertical/diagonal road and update `ROUTES.twoWheeler1` and `ROUTES.twoWheeler2` (staggered start).

### Phase 4 - Vehicle animation
- [ ] T12. Verify `#threeWheelerHero` loops along its route without leaving the road.
- [ ] T13. Verify the clone step produces `#threeWheeler2` and it animates on staggered timer.
- [ ] T14. Verify both scooters animate; adjust duration so they never overlap the autos at the intersection.

### Phase 5 - Turbines
- [ ] T15. Remove any CSS `@keyframes` spin on turbine rotors. GSAP only.
- [ ] T16. For each of `#turbineRotor1..4`, compute hub center via `getBBox()` after mount and set `transformOrigin`. Duration 10s, `ease: "none"`, `repeat: -1`, same direction.

### Phase 6 - Trees
- [ ] T17. Animate `*_canopy` nodes only: rotation `±1.5deg`, `sine.inOut`, 6-8s, per-tree phase offset 0-3s. Trunks and shadows untouched.

### Phase 7 - Walking woman re-verify
- [ ] T18. After vehicles land, confirm woman is never invisible mid-sidewalk and never covered by a new vehicle layer. Fix z-order via `PAINT_ORDER` if needed.

### Phase 8 - Visual verification
- [ ] T19. Playwright at 1280x1800: capture screenshots at 0s / 4s / 8s / 15s. Confirm: 2 autos + 2 scooters moving, 4 rotors spinning around hubs, canopies swaying, woman visible.
- [ ] T20. Update `docs/hero-animation-issues-spec.md` acceptance section with the captured screenshots and mark all issues resolved.

## Guardrails
- Never target an ID without confirming it exists in the current SVG.
- Never run CSS spin and GSAP spin on the same rotor.
- Never animate tree trunk or shadow.
- Do not move HQ, phone illustration, or plaza people.
