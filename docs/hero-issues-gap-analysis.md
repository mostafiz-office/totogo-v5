# Hero Section: Issues, Root-Cause & Gap Analysis

Scope: `src/components/battery-smart/HeroBannerSVG.tsx` (and the inline hero SVG it renders). This document rewrites the user-reported issues in unambiguous language so an AI or engineer can implement fixes without re-interviewing the user.

---

## Issue 1. Walking woman (`#yellowGirl`) disappears mid-animation

### User statement (rewritten)
The yellow-dress woman animated in the middle of the scene visually disappears at some point in her walk cycle. It looks like she is being clipped or cut off, not fading out intentionally.

### Current behavior (code reference)
File: `HeroBannerSVG.tsx`, lines ~1470–1581.

- She walks along the isometric road via a GSAP timeline that translates `walkX` from `0 → 84` and `walkY` from `0 → 56` over `WALK_DUR = 7.5s`, with `repeat: -1, yoyo: true, repeatDelay: 0.25`.
- No opacity fade is applied to `#yellowGirl` itself. The comment even says "Keep the woman visible at all times."
- However, the `#yellowGirl` group lives inside the source SVG at its authored depth. Later effects re-append vehicle groups to the top of their parent (line 1460–1465), and the HQ building `<image>` is inserted at `HQ_BUILDING_SVG_RECT` (609, 864, 536×504). At the far end of her walk (`walkX≈84, walkY≈56`) her feet enter the HQ image rectangle and she is painted **under** the HQ PNG.
- Additionally, the walk-cycle `tick` skips updates when `heroVisibleRef.current` is false, but never re-anchors position, so on tab-return she can appear "gone" for a frame.

### Root cause
Z-order collision with the HQ building `<image>`. The woman is not faded, she is occluded by the opaque HQ PNG once her translated position overlaps the HQ rectangle. Because the HQ image is appended after the walking-woman effect runs, it wins the painter's algorithm.

### Fix (deterministic)
1. After the HQ image is inserted, explicitly promote `#yellowGirl` to the top of the SVG paint order (same pattern used for vehicles at 1460–1465):
   ```ts
   const girl = svg.querySelector<SVGGElement>("#yellowGirl");
   if (girl) svg.appendChild(girl);
   ```
   Do this inside the HQ-insert effect **and** at the end of the walking-woman effect, so re-mounts and hot reloads both restore order.
2. Clamp her walk range so her bounding box never crosses the HQ rectangle. Compute her bbox once, then reduce `WALK_DX`/`WALK_DY` if `girl.bbox.right + WALK_DX > HQ_BUILDING_SVG_RECT.x + 40`. Suggested safe values: `WALK_DX = 64, WALK_DY = 42` if the clamp trips.
3. Never toggle opacity on `#yellowGirl` in the visibility guard. Only pause the RAF, do not mutate transform/opacity when `heroVisibleRef.current` flips.

### Acceptance
- The woman is visible in every frame of the loop, including at both timeline extremes.
- Screenshot at `t = WALK_DUR` (end of forward walk) still shows her fully rendered above buildings.

---

## Issue 2. Tree animation not smooth, "not working"

### User statement (rewritten)
The trees do not sway smoothly. Some trees appear static or jitter instead of a soft wind motion.

### Current behavior (code reference)
File: `HeroBannerSVG.tsx`, lines ~1333–1438.

- Trees are collected from `.bs-tree` class + `TREE_IDS` list.
- For each tree, `getCanopies()` filters children to `<g>` nodes with bbox > 8×8 that are not shadows. If a tree's canopy is a `<path>` or `<use>` (not a `<g>`), `canopies.length === 0` and that tree gets **no** animation. This is why several trees look dead.
- `pivotY = bbox.y + bbox.height * 0.95` places the sway pivot at the very bottom of the canopy bbox. On tall trees whose canopy bbox includes the trunk, that pivot is below the visible foliage and the sway becomes an unnatural bottom-hinge swing rather than a top-of-trunk pivot.
- `delays` include negative values combined with `i * 0.17` offset; GSAP treats large negative delays as "start already in progress," which is fine, but combined with re-runs on `svgMarkup` change it can look like a jump on first paint.

### Root cause
1. Canopy detection is too narrow (skips non-`<g>` canopies).
2. Sway pivot is anchored too low, producing a stiff hinge.
3. First-frame jump on mount because tweens start mid-cycle with no `immediateRender` control.

### Fix (deterministic)
1. Expand `getCanopies()` to accept the whole tree group as a fallback when no child `<g>` is found:
   ```ts
   const canopies = getCanopies(tree);
   if (canopies.length === 0) canopies.push(tree);
   ```
2. Move the pivot to the **base of the canopy, i.e. top of the trunk**: `pivotY = bbox.y + bbox.height * 0.75` (was `* 0.95`).
3. Add `immediateRender: false` to the sway tweens and set the canopy to its rest state first with `gsap.set(canopy, { rotation: 0, x: 0, y: 0 })` so the first paint is always at rest.
4. Reduce sway amplitude range to `0.6°–1.6°` and drift to `0.8–2.0` units for a calmer, smoother look. Keep `ease: "sine.inOut"`.

### Acceptance
- Every element in `TREE_IDS` visibly sways.
- No first-frame pop on hard reload.
- Motion reads as a light breeze, not a metronome.

---

## Issue 3. Second three-wheeler never arrives; current one drives off the road

### User statement (rewritten)
Only one three-wheeler (auto-rickshaw) appears. A second one should follow. Also, the visible three-wheeler ends its animation past the edge of the road (drives off into the ground/grass).

### Current behavior (code reference)
File: `HeroBannerSVG.tsx`, lines 26–46.

- `VehicleId` union defines exactly four vehicles: `loader`, `twoWheeler1`, `threeWheelerHero`, `twoWheeler2`. There is **no** `threeWheeler2`.
- `threeWheelerHero` route: `origin (774.38, 1364.36)` → `end +dx 609, +dy 382`. Endpoint = `(1383.38, 1746.36)`. Inspecting the road geometry, the drivable auto-rickshaw lane ends near `x ≈ 1290, y ≈ 1670`. So the current end overshoots by ~93 px in x and ~76 px in y, which puts the vehicle onto the dirt/grass at the far corner.
- `twoWheeler1` and `twoWheeler2` share the same origin and end (lines 41, 43), so they visually duplicate one bike. There is no second auto-rickshaw at all.

### Root cause
1. No second `threeWheeler` was ever registered in `VehicleId`, `ROUTES`, or `VEHICLE_IDS`.
2. `threeWheelerHero.end` was calibrated against an older road layout and is off by ~90 px.

### Fix (deterministic)
1. Correct the current auto-rickshaw endpoint so it stops on the road:
   ```ts
   threeWheelerHero: { origin: { x: 774.38, y: 1364.36 }, end: { dx: 516, dy: 306 } },
   ```
   (This lands at ~`(1290, 1670)`, matching the road terminus. Verify in DevTools by pausing at end frame and confirming the wheels sit on the white road stripe; nudge `dx/dy` by ±10 if needed.)
2. Add a genuine second three-wheeler using the SVG id of the currently-unused auto asset (grep the inline SVG for `threeWheeler` / `auto` groups; the second asset is `#threeWheeler2` in the source, otherwise duplicate `#threeWheelerHero` via `cloneNode(true)` with a new id `threeWheeler2`).
3. Extend the vehicle config in lockstep:
   ```ts
   type VehicleId = "loader" | "twoWheeler1" | "threeWheelerHero" | "twoWheeler2" | "threeWheeler2";

   DEFAULT_TIMING.threeWheeler2 = { delay: 20.8, duration: 4.5, hold: 14.7 }; // next slot in the 25s cycle
   ROUTES.threeWheeler2         = { origin: { x: 774.38, y: 1364.36 }, end: { dx: 516, dy: 306 } };
   VEHICLE_IDS.push("threeWheeler2");
   ```
   Update the shared cycle length comment (line 28) from 20s to 25s and re-space delays so no two vehicles overlap.
4. Remove the duplicate `twoWheeler2` route or give it a distinct lane (e.g. offset origin `y + 40`) so it stops mirroring `twoWheeler1`.

### Acceptance
- Two distinct auto-rickshaws pass through the scene per loop, with a visible gap.
- Neither auto-rickshaw ends its motion outside the painted road.

---

## Issue 4. HQ building: front face must lean toward the three-bike plaza; back must stay put

### User statement (rewritten)
Only the front-facing side of the HQ building should shift toward the plaza with the three bikes and three men. The back side of the HQ must remain in its current position.

### Current behavior (code reference)
File: `HeroBannerSVG.tsx`, lines 48–67, 830–860.

- HQ is a **single flat PNG** (`hq-building-isometric-warm.png`) placed via one `<image>` at `HQ_BUILDING_SVG_RECT = { x: 609, y: 864, width: 536, height: 504 }`.
- The comment at lines 56–61 explicitly notes: a prior nudge to `(628, 902)` shifted the front toward the plaza but dragged the back with it, because the asset is one flat image. The current code reverted to `(609, 864)` to keep the back correct at the cost of the front lean.

### Root cause
The HQ asset is not split into `hqFrontSide` and `hqBackSide` layers, so any transform moves both. This is an **asset limitation**, not a code bug.

### Fix (choose one; option A is the correct long-term fix, option B is a code-only stopgap)

**Option A. Split the asset (recommended).**
1. Export two PNGs from Figma with the same overall pixel dimensions and transparent alpha:
   - `hq-building-isometric-back.png`, everything from the ridgeline back.
   - `hq-building-isometric-front.png`, the front facade, main door, and any awnings that should visually tilt toward the plaza.
2. Place them as two `<image>` nodes, back first (lower in DOM), front second:
   ```ts
   const back  = createImage(hqBackImg,  HQ_BUILDING_SVG_RECT);              // unchanged
   const front = createImage(hqFrontImg, { ...HQ_BUILDING_SVG_RECT, x: 628, y: 890 }); // ~19px right, 26px down toward plaza
   ```
3. Both images sit at the same z-index band as the current HQ. The back stays at `(609, 864)`; the front is nudged by `+19, +26` (adjust to taste, but keep the offset small; the goal is "leans toward" not "detaches").

**Option B. Code-only stopgap using CSS 3D perspective (no new asset).**
Apply a slight `matrix3d`/`skew` to the single HQ `<image>` element so the right (plaza-facing) edge is nudged while the left edge is pinned. This never looks as clean as a real split; only use if the asset split is blocked.
```ts
hqImage.setAttribute("transform",
  "matrix(1 0 0.02 1 6 4) "        // small shear + translate toward plaza
);
```

### Acceptance
- Back roofline of HQ occupies the same pixels as it does today.
- Front door / facade is measurably closer to the plaza where the three bikes and three men stand.

---

## Issue 5. Wind turbine behavior is wrong

### User statement (rewritten)
The turbines rotate incorrectly. Either the rotor spins around the wrong point (looks like the whole windmill orbits), or blades detach visually from the hub, or the direction/speed feels unnatural.

### Current behavior (code reference)
File: `HeroBannerSVG.tsx`, lines 1289–1331.

- For each `#turbineRotor{1..4}`, code computes `cx, cy` from `getBBox()` center and sets `svgOrigin` to that center, then tweens `rotation: 0 → 360` over 10.5–13s.
- Problem: `getBBox()` on a rotor group returns the bounding box of the **three blades in their current orientation**, not the hub. For a Y-shaped rotor, the bbox center is offset from the true hub, so the rotor visibly wobbles / orbits instead of spinning around the hub. This matches the "wrong behavior" the user describes.

### Root cause
Wrong pivot. The correct pivot is the hub center, which in Figma is typically the center of a small circle element inside the rotor group (e.g. `#turbineHub{n}`), not the bbox center of the whole rotor.

### Fix (deterministic)
1. For each rotor, look up an explicit hub element and use its center as the pivot:
   ```ts
   rotorIds.forEach((id, i) => {
     const rotor = svg.querySelector<SVGGElement>(`#${id}`);
     const hub   = svg.querySelector<SVGGraphicsElement>(`#turbineHub${i + 1}`)
                 ?? rotor?.querySelector<SVGGraphicsElement>("circle, ellipse");
     if (!rotor || !hub) return;
     const hb = hub.getBBox();
     const cx = hb.x + hb.width / 2;
     const cy = hb.y + hb.height / 2;
     gsap.set(rotor, { svgOrigin: `${cx} ${cy}` });
     gsap.to(rotor, { rotation: 360, duration: durations[i], ease: "none", repeat: -1, delay: offsets[i] });
   });
   ```
2. If no `#turbineHub{n}` exists in the source SVG, fall back to the smallest circular child of the rotor group (already handled by the `?? querySelector("circle, ellipse")` above).
3. Ensure spin direction is consistent (all clockwise) and speed range stays 10–13s per revolution so the turbines feel realistic, not frantic.
4. Keep the reduced-motion branch (`rotation: 15`) but use the new pivot so the static pose does not shift the rotor.

### Acceptance
- Each rotor spins around a fixed hub point with no visible orbit or wobble.
- All four turbines rotate in the same direction at plausible speeds.
- No blade detaches or clips into the tower.

---

## Cross-cutting: paint-order contract

Several of the above bugs share a root cause: effects run in mount order and later effects re-append nodes, silently changing z-order. Introduce a single "finalize paint order" effect that runs **last** (declare it below every other effect in the component) and enforces:

```
[background/roads/buildings]
[HQ back image]
[trees + shadows]
[vehicles: loader, twoWheeler1, twoWheeler2, threeWheelerHero, threeWheeler2]
[people: roadMan1, roadMan2, yellowGirl]
[HQ front image]  ← only if Issue 4 Option A is adopted
[callouts / highlights]
```

Implement by querying each id in order and calling `svg.appendChild(node)` on each match. This makes Issues 1 and 4 robust against future edits.

---

## Suggested implementation order

1. Paint-order contract effect (unblocks Issue 1 and future regressions).
2. Issue 5 turbine pivot fix (small, isolated).
3. Issue 2 tree sway (small, isolated).
4. Issue 3 three-wheeler endpoint + add `threeWheeler2`.
5. Issue 4 HQ split asset (needs Figma export) or Option B stopgap.

Each step is independently shippable and independently verifiable via a screenshot at `t = 0s, 5s, 10s, 15s, 20s` of the loop.

---

## Resolved (Tasks 11-20)

- Issue 1 (walking woman visibility): fixed. Walking-woman effect and HQ insert effect both call `svg.appendChild(#yellowGirl)` so she paints above the HQ overlay. Visibility guard never mutates opacity.
- Issue 2 (tree sway): fixed. `getCanopies()` falls back to the tree group itself, pivot factor set to 0.75, amplitudes clamped to 0.6-1.6 deg / 0.8-2.0 units, phase offsets desynchronized.
- Issue 3 (three-wheelers): fixed. `threeWheelerHero` endpoint recalibrated. Added `threeWheeler2`: cloned from `#threeWheelerHero` at mount with a distinct lane, extended `VehicleId`, `DEFAULT_TIMING`, `ROUTES`, `VEHICLE_IDS`, and palette override maps. Shared cycle extended to 25s. `twoWheeler2` given a distinct origin so the two bikes are visually separate.
- Issue 4 (HQ front lean): fixed with Option B (no split asset available). Applied `matrix(1 0 -0.03 1 0.03*pivotY 0)` shear anchored at the back-top-right corner: back stays anchored, front leans about 15 SVG units toward the plaza with zero rotation.
- Issue 5 (turbine pivot): fixed. Rotor pivot uses `bbox.y + Math.min(radius, bbox.height/2)` so blades spin around the hub without wobble. Durations 10-13s, all clockwise.

Cross-cutting paint-order effect appends nodes in a fixed order (roadMan1, roadMan2, vehicles, HQ overlay, walking woman, callouts) each mount.

Verified via Playwright at 1280x1800, screenshots at t = 0, 5, 10, 15, 20s. No page or console errors.
