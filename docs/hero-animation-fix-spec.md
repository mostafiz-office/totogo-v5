# Totogo Hero Animation Fix Spec

This document is a handoff spec for fixing the hero SVG placement and animation problems. It explains the current animation structure, the exact known issues, why previous AI edits failed, and the rules any AI or developer must follow before changing the hero again.

## Current source of truth

- Live hero SVG asset: `src/assets/battery-smart-hero.svg`
- Latest uploaded public SVG: `public/totogosvgupdated.svg`
- Both files currently match.
- MD5: `2105688c3f30368ff64ec744e6b61a56`
- SVG viewBox: `0 0 1922 2083`
- Runtime entry point: `src/components/battery-smart/Hero.tsx`
- Animation engine: `src/components/battery-smart/HeroBannerSVG.tsx`
- Layout scaling: `src/index.css`

## How the hero currently renders

1. `Hero.tsx` imports the SVG as raw markup with `?raw`.
2. `Hero.tsx` passes the raw markup into `<HeroBannerSVG svgMarkup={heroSvgMarkup} />`.
3. `HeroBannerSVG.tsx` injects the raw SVG with `dangerouslySetInnerHTML`.
4. Several `useEffect` and `useLayoutEffect` blocks then mutate the inline SVG by ID.
5. `src/index.css` scales the banner to `100vw` and pulls it upward with `top: -38vw` on desktop.
6. At a 1280 px wide viewport, the SVG renders at about `1280 x 1387 px`, so `1 SVG unit` is about `0.666 px` on screen.

## Current measured runtime positions at 1280 px viewport

These are current live measurements from Playwright after the hero has mounted.

| Element | Current status | Screen box at 1280 px | SVG bbox |
|---|---:|---:|---:|
| `totogoHqBuildingOverlay` | present | x 400.9, y 244.7, w 357.0, h 335.6 | x 602, y 871, w 536, h 504 |
| `loader` | present and animated | x 663.9, y 660.5, w 59.6, h 59.6 | x 278.8, y 1040.9, w 89.5, h 89.5 |
| `threeWheelerHero` | missing | none | none |
| `twoWheeler1` | missing | none | none |
| `twoWheeler2` | missing | none | none |
| `yellowGirl` | present and animated | x 850.1, y 523.4, w 24.7, h 41.3 | x 1222.7, y 1255.2, w 37.1, h 62.0 |
| `Woman F` | present inside walking woman | same as `yellowGirl` | same as `yellowGirl` |
| `Man` | present and animated | x 371.7, y 513.5, w 20.5, h 42.7 | x 557.0, y 1276.6, w 30.7, h 63.7 |
| `Man_2` | present and animated | x 904.1, y 430.6, w 19.6, h 39.3 | x 1358.0, y 1151.3, w 28.3, h 58.1 |
| `PartnerApp` | present and animated | x 212.9, y 682.3, w 50.4, h 13.3 | x 319.7, y 1528.1, w 75.7, h 19.9 |
| `denseBatteryStation` | present | x 873.8, y 440.2, w 157.3, h 111.8 | x 1312.0, y 1164.6, w 236.2, h 167.9 |

## Required visual direction

The hero should feel like a busy but controlled city animation. The motion must look intentional, road-bound, human, and natural. Nothing should randomly pop, float, disappear, drift through buildings, or leave the road.

The TotoGo headquarter must visually connect to the white road. The front side, especially the front door and entrance face, must read as facing toward the group with three bikes and three men. Do not move or distort the back side of the headquarter.

## Main problem summary

The current problems are not only visual. They come from a mismatch between the new Figma export and old animation code. The code is targeting IDs and coordinates from an older SVG. Several target IDs no longer exist, some visible objects are inside differently named groups, and some animation routes were calibrated for older artwork.

## Exact issues to fix

### 1. Headquarter front is not aligned to the white road

**Observed issue:** The white road does not visually lead to the main door or front window area of the TotoGo HQ. The building reads as placed near the road, not connected to it.

**Current code cause:** `HeroBannerSVG.tsx` injects a raster PNG as `#totogoHqBuildingOverlay` with this rectangle:

```ts
const HQ_BUILDING_SVG_RECT = {
  x: 602,
  y: 871,
  width: 536,
  height: 504,
};
```

That moves the whole PNG rectangle only. It cannot move only the front side of the building. If the desired change is truly front-side-only, a single SVG `<image>` cannot do it. The HQ artwork must be edited as layered vector artwork or split into front and back groups.

**Required fix:**

- Keep the back side of the HQ visually stable.
- Move or redraw only the front facade, entrance, door, steps, or connected road edge toward the three bikes and three men.
- The front door centerline must align to the white road centerline with a tolerance of `8 SVG units` or less, about `5 screen px` at 1280 px viewport.
- The road must terminate under or directly in front of the door, not beside the building wall.
- Do not fix this by shifting the entire PNG if it breaks the back side placement.

### 2. Main three-wheeler is missing or not animating

**Observed issue:** One main three-wheeler is missing from animation. Another three-wheeler or vehicle appears to move on the wrong route and goes outside the road.

**Current code cause:** Vehicle animation expects these IDs:

```ts
type VehicleId = "loader" | "twoWheeler1" | "threeWheelerHero" | "twoWheeler2";
```

Only `loader` exists in the current SVG. These required IDs are missing:

- `threeWheelerHero`
- `twoWheeler1`
- `twoWheeler2`

When an ID is missing, the GSAP tween silently skips it. That is why the main three-wheeler does not animate.

**Required fix:**

- In Figma, rename the actual main three-wheeler group to `threeWheelerHero`.
- Rename the two bike or scooter groups to `twoWheeler1` and `twoWheeler2`.
- Re-export with Include ID checked.
- After import, verify the IDs exist in the SVG before writing any animation code.
- Do not target generic names such as `Group_123` unless those IDs are documented in this file or a layer map.

### 3. Vehicle routes are old and no longer follow the road

**Observed issue:** The animated vehicle goes onto the main road, becomes invisible or partially hidden, and travels outside the visible road path.

**Current code cause:** The route table is hard-coded for an older SVG geometry:

```ts
const ROUTES = {
  loader:           { origin: { x: 56.75,   y: 916.76 },  end: { dx: 1138.11,  dy: 720.451 } },
  twoWheeler1:      { origin: { x: 1691.71, y: 933.75 },  end: { dx: -897.643, dy: 553.958 } },
  threeWheelerHero: { origin: { x: 774.38,  y: 1364.36 }, end: { dx: 609,      dy: 382 } },
  twoWheeler2:      { origin: { x: 1691.71, y: 933.75 },  end: { dx: -897.643, dy: 553.958 } },
};
```

These values are not connected to the current road art. The `origin` values are also not used as actual starting placement. They are only transform origins. The vehicle stays wherever Figma drew it, then receives an `x/y` transform.

**Required fix:**

- Recalibrate every vehicle route from the current SVG.
- Use road centerlines, not guesses.
- For each route, record:
  - visible vehicle group ID
  - start position in SVG units
  - end position in SVG units
  - road lane it belongs to
  - whether it should fade, stop, or loop off-screen
- Vehicles must remain fully inside the road shape for the entire animation.
- Do not let a vehicle fade out while it is visibly in the middle of the road unless it has reached a road edge or occlusion point.
- At 1280 px viewport, road-bound error must stay below `6 screen px`.

### 4. Car or busy traffic animation is not working

**Observed issue:** The hero should feel busy, but traffic animation is sparse or broken.

**Current code cause:** Only one vehicle ID exists and animates reliably. The other configured vehicles are missing from the SVG by ID. The animation schedule can only animate elements that exist in the DOM.

**Required fix:**

- Add stable IDs to every traffic object that must move.
- Recommended traffic IDs:
  - `trafficCar1`
  - `trafficCar2`
  - `threeWheelerHero`
  - `threeWheelerSecondary`
  - `twoWheeler1`
  - `twoWheeler2`
- Each traffic object must be a clean group containing only that vehicle, not people, roads, tree shadows, or buildings.
- Busy animation should be staggered, not all vehicles moving at the same time.

### 5. Walking woman becomes invisible

**Observed issue:** The woman starts walking, then disappears.

**Current code cause:** The current walking animation intentionally fades her out at the end of each 12 second walk cycle:

```ts
.to(girl, { opacity: 0, duration: 0.4, ease: "power1.in" }, WALK_DUR)
.add(() => {
  walkX.current = 0;
  walkY.current = 0;
})
.to(girl, { opacity: 1, duration: 0.4, ease: "power1.out" });
```

So the invisibility is not accidental. The code tells her to disappear.

**Required fix:**

- The woman should not disappear in view.
- Either make her walk a short natural loop in place, or reset her only when she is off-screen or fully hidden behind a real object.
- Preferred fix: remove opacity fade, keep her visible, and make a small repeated walking loop along the same road segment.
- Her movement must stay on the road and must not pass behind the HQ or another foreground object unless that occlusion is intentional.

### 6. Mobile with two men should not animate unnaturally

**Observed issue:** The mobile or app graphic with two men has an unnatural human-like animation. It should not be animated that way.

**Current code cause:** Two separate systems may affect it:

1. Callout scale animation targets `PartnerApp` and `partnerAppContainer`.
2. Character idle animation targets `Man` and `Man_2` regardless of whether those men belong to the phone or app graphic.

The current `Man` and `Man_2` are not standing together. Their measured SVG x positions are far apart: about `557` and `1358`. They should not be treated like a shared human pair.

**Required fix:**

- If the phone with two men is a static app illustration, exclude it from all human walking or idle animation.
- Do not animate `PartnerApp` if it contains the phone-with-men graphic that should stay still.
- Do not animate `Man` and `Man_2` unless those exact layers are confirmed to be standalone characters on the road.
- Add separate IDs in Figma:
  - `phoneWithTwoMenStatic`
  - `roadMan1`
  - `roadMan2`
  - `roadMan3`
- Only animate `roadMan*` groups. Never animate `phoneWithTwoMenStatic`.

### 7. Tree animation is not visibly natural

**Observed issue:** Trees do not show a proper natural animation.

**Current code cause:** The tree effect tries to infer canopy groups from child structure. That works only if the Figma group structure is clean. If leaves, trunk, and shadow are flattened or mixed, the effect either moves too little or targets the wrong subparts.

Current tree IDs that exist:

- `firstTreeIn2WheelerWay`
- `extraTree1`
- `extraTree3`
- `extraTree4`
- `extraTree5`
- `treeBesideRoad`
- `treeNearStation`

**Required fix:**

- Each tree must have stable child IDs:
  - `<treeId>_canopy`
  - `<treeId>_trunk`
  - `<treeId>_shadow`
- Animate only canopy groups.
- Never animate the trunk or shadow.
- Canopy motion should be subtle:
  - rotation: `0.8` to `2.2` degrees
  - x drift: `1` to `3 SVG units`
  - y drift: `0` to `1 SVG unit`
  - duration: `5` to `9` seconds
  - easing: `sine.inOut`
- Use different phase offsets so all trees do not sway together.

### 8. Turbine animation looks bad

**Observed issue:** Turbine or windmill rotation looks wrong.

**Current code cause:** There are two turbine animation approaches:

1. CSS animates `#turbineRotor1` through `#turbineRotor4`.
2. GSAP animates `Group_226`, `Group_227`, `Group_228`, `Group_229`.

This can create double animation or mismatched origins if those groups are not the same rotor layers. The current SVG has `turbineRotor1` through `turbineRotor4`, so GSAP should target those exact IDs, or CSS should be the only turbine animation. Do not animate two different rotor ID systems at once.

**Required fix:**

- Pick one system only, preferably GSAP so the origin can be calculated from `getBBox()`.
- Target `turbineRotor1`, `turbineRotor2`, `turbineRotor3`, and `turbineRotor4` directly.
- Remove or disable the CSS rotor animation if GSAP handles the spin.
- Rotation must use each rotor center from its own bbox.
- Duration should be slow and natural: `8` to `14` seconds per full rotation.

## Required Figma layer ID contract

Before any animation work, the Figma export must include these exact IDs. If any required ID is missing, do not guess. Stop and fix the Figma layer names first.

### Vehicles

| Purpose | Required ID | Required group contents |
|---|---|---|
| Main three-wheeler | `threeWheelerHero` | only the full main three-wheeler |
| Secondary three-wheeler | `threeWheelerSecondary` | only the secondary three-wheeler |
| Two-wheeler 1 | `twoWheeler1` | only bike or scooter 1 |
| Two-wheeler 2 | `twoWheeler2` | only bike or scooter 2 |
| Traffic car 1 | `trafficCar1` | only car 1 |
| Traffic car 2 | `trafficCar2` | only car 2 |

### People and app art

| Purpose | Required ID | Animation allowed |
|---|---|---|
| Walking woman | `walkingWoman` | yes, walking loop only |
| Three men group | `threeMenPlaza` | subtle idle only |
| Road man 1 | `roadMan1` | optional idle |
| Road man 2 | `roadMan2` | optional idle |
| Road man 3 | `roadMan3` | optional idle |
| Phone with two men | `phoneWithTwoMenStatic` | no animation |

### Headquarter

| Purpose | Required ID | Notes |
|---|---|---|
| Whole HQ | `totogoHqBuildingOverlay` | current runtime injected ID |
| HQ back mass | `hqBackSide` | should stay visually stable |
| HQ front facade | `hqFrontSide` | may move toward plaza and road |
| HQ main door | `hqMainDoor` | centerline must align to road |
| HQ road endpoint | `hqRoadEndpoint` | road connection anchor |

### Trees

For each tree, use this structure:

```text
treeName
  treeName_canopy
  treeName_trunk
  treeName_shadow
```

### Turbines

| Purpose | Required ID |
|---|---|
| Rotor 1 | `turbineRotor1` |
| Rotor 2 | `turbineRotor2` |
| Rotor 3 | `turbineRotor3` |
| Rotor 4 | `turbineRotor4` |

## Why previous AI work failed

These are the specific failure patterns to avoid.

1. The AI animated old IDs that no longer exist in the new Figma export.
2. The AI assumed that Include ID means semantic IDs exist. It only preserves layer names. If layers are still named `Group_###`, the code cannot know what they represent.
3. The AI reused hard-coded routes from an older SVG instead of recalibrating routes against the new roads.
4. The AI used opacity fade-outs to hide bad route endings, which made the woman or vehicles appear to disappear.
5. The AI animated broad groups that may contain people, app graphics, buildings, or shadows together.
6. The AI guessed based on generic `Group_###` IDs. Generic IDs change between exports and are unsafe.
7. The AI tried to fix HQ alignment by moving the whole HQ overlay, but the user requested only the front side to move toward the three bikes and three men.
8. The AI did not visually verify the animation in the browser at the target viewport.
9. The AI mixed CSS animation and GSAP animation on turbine rotors, causing rotation origin and speed problems.
10. The AI treated missing selectors as acceptable no-ops. For this hero, missing selectors are blockers.

## Rules for the next implementation

1. Do not guess missing objects by visual appearance alone.
2. Do not animate any element unless its ID is stable and semantic.
3. Do not animate generic Figma groups such as `Group_226` unless the ID is documented and verified.
4. Do not move the entire HQ if the problem is only the front facade alignment.
5. Do not animate the phone or app graphic with two men.
6. Do not fade the walking woman out while she is visible.
7. Do not allow any vehicle to leave the visible road.
8. Do not animate tree trunks or shadows.
9. Do not run both CSS and GSAP turbine spin on different rotor IDs.
10. Do not claim the hero is fixed without browser verification and screenshots.

## Correct implementation sequence

### Step 1: Validate SVG IDs

Run an ID check against `src/assets/battery-smart-hero.svg`. The build should fail or warn loudly if any required animation ID is missing.

Required current blockers:

- `threeWheelerHero` is missing.
- `twoWheeler1` is missing.
- `twoWheeler2` is missing.
- Semantic phone and people IDs are missing.
- HQ front facade IDs are missing.
- Tree canopy, trunk, and shadow child IDs are missing.

### Step 2: Fix Figma layer naming

Rename the real objects in Figma, not in code. Export again with Include ID checked. Verify that the MD5 differs from the current file and that the required IDs exist.

### Step 3: Replace hard-coded vehicle routes

For each vehicle, define a route from measured road centerline points:

```ts
type VehicleRoute = {
  id: string;
  start: { x: number; y: number };
  points: Array<{ x: number; y: number }>;
  duration: number;
  delay: number;
  loop: boolean;
};
```

Use multi-point routes if a road bends. Do not use one large diagonal transform if the road is not a straight line.

### Step 4: Fix walking woman

Change the woman selector from old or ambiguous IDs to `walkingWoman`. Remove visible fade-out. Use a short loop or reset only off-screen.

### Step 5: Freeze phone with two men

If the phone graphic should be static, set no GSAP animation on `phoneWithTwoMenStatic`. Also remove it from callout scale-pop if that scale-pop looks like human movement.

### Step 6: Rebuild tree animation

Animate only `<treeId>_canopy` child groups. Keep trunks and shadows locked.

### Step 7: Rebuild turbine animation

Choose GSAP only or CSS only. Preferred: GSAP only on `turbineRotor1` through `turbineRotor4`, with bbox center origin.

### Step 8: Verify in browser

Use Playwright at these viewports:

- Desktop: `1280 x 1800`
- Desktop wide: `1470 x 900`
- Mobile: `390 x 844`

Capture screenshots at:

- `0s`
- `2s`
- `6s`
- `12s`
- `20s`

Check that:

- HQ door aligns to white road.
- HQ back side did not move incorrectly.
- Main three-wheeler animates.
- All vehicles remain on roads.
- Walking woman remains visible.
- Phone with two men stays static.
- Trees sway naturally and subtly.
- Turbines rotate around their hubs only.

## Acceptance criteria

- The white road visually meets the HQ front door or entrance zone.
- HQ front side faces the three bikes and three men more clearly than before.
- HQ back side remains stable and not warped.
- `threeWheelerHero`, `twoWheeler1`, and `twoWheeler2` exist in the SVG and animate.
- No animated vehicle leaves its assigned road lane.
- No vehicle disappears mid-road.
- Walking woman never becomes invisible while visible in the scene.
- Phone with two men has no human-like bounce, walking, or handshake animation.
- Tree trunks and shadows do not move.
- Tree canopies sway with subtle non-synchronized motion.
- Turbine rotors spin around their own center points.
- Browser verification screenshots exist for desktop and mobile.

## Short instruction for any AI before editing

Before changing the hero, inspect the actual SVG IDs and current browser positions. Do not rely on memory or old code. If a needed object does not have a semantic ID, stop and request a Figma export with the exact ID. Never animate broad generic groups. Never hide an issue with opacity. Fix the geometry first, then animate.