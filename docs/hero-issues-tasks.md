# Hero Section Fix: 20-Task Plan

Source spec: `docs/hero-issues-gap-analysis.md`.
Format: Tasks 1-10 are explanation/spec tasks (AI reads code, confirms understanding, writes the exact change list). Tasks 11-20 are implementation tasks (AI writes code and verifies). Run one task per "next".

---

## Part A. Explanation tasks (1-10)

Each explanation task must produce: (a) exact file + line numbers, (b) current behavior in 2-4 lines, (c) root cause in 1-2 lines, (d) the precise diff plan (not the diff itself) with variable names and target values. No code edits in Part A.

### Task 1. Map the hero paint order end-to-end
Read `src/components/battery-smart/HeroBannerSVG.tsx` fully. List every `useEffect` that re-appends nodes (`svg.appendChild`, `parent.appendChild`) in mount order. Produce the current painter's-algorithm stack (bottom to top) and mark which layers are unstable across re-renders.

### Task 2. Explain the walking woman disappearance (Issue 1)
Locate `#yellowGirl` effect (lines ~1470-1581). Compute her bbox and her end position at `walkX=84, walkY=56`. Confirm overlap with `HQ_BUILDING_SVG_RECT` (609, 864, 536x504). State exactly why HQ paints over her and list the two code sites that must change (HQ insert effect + walking-woman effect finalization).

### Task 3. Explain the tree sway defects (Issue 2)
Read lines ~1333-1438. Enumerate every id in `TREE_IDS` and, for each, note whether `getCanopies()` returns >=1 child `<g>`. Identify which trees currently receive zero tweens. Confirm the pivot factor `0.95` is bottom-of-canopy and specify the new factor `0.75`.

### Task 4. Explain the missing second three-wheeler (Issue 3, part 1)
Read lines 26-46. Confirm `VehicleId` has no `threeWheeler2`. Find the SVG id for a second auto-rickshaw asset in the inline SVG (grep for `threeWheeler`, `auto`, `rickshaw`, `cng`). If none exists, note that `#threeWheelerHero` must be `cloneNode(true)`-d with a new id.

### Task 5. Explain the current three-wheeler off-road endpoint (Issue 3, part 2)
Compute current endpoint of `threeWheelerHero` from `origin + end`: `(774.38+609, 1364.36+382) = (1383.38, 1746.36)`. Inspect the SVG road geometry (search for the auto-rickshaw lane path/polygon) and record the true road terminus. Produce the corrected `end.dx / end.dy`.

### Task 6. Explain the HQ front-vs-back constraint (Issue 4)
Read lines 48-67 and 830-860. Confirm HQ is a single PNG. State the two viable paths: A) split asset (`hqFrontSide` + `hqBackSide`), B) CSS shear stopgap. Recommend A. Specify the exact offset (~`+19px x, +26px y`) for the front layer relative to `HQ_BUILDING_SVG_RECT`.

### Task 7. Explain the turbine wobble (Issue 5)
Read lines 1289-1331. Explain why `getBBox()` center of a Y-shaped rotor is not the hub. Search the SVG for `turbineHub{1..4}` or child `<circle>` inside each `#turbineRotor{n}`. Record which hubs exist and which need the `circle/ellipse` fallback.

### Task 8. Define the paint-order contract
Draft (in the doc, not in code) the final "finalize paint order" effect: an ordered id list, from background to callouts, matching the cross-cutting section of the gap analysis. Confirm this single effect will resolve Issue 1 permanently.

### Task 9. Define acceptance screenshots
Specify five Playwright screenshots (`t = 0s, 5s, 10s, 15s, 20s` into the loop) at viewport `1280x1800`, and list which acceptance criterion each screenshot proves for Issues 1-5.

### Task 10. Confirm scope and freeze the change list
Produce a single consolidated change list: every file to edit, every id to add/rename, every constant to change, every asset to add. This is the frozen contract for Part B. No implementation task may deviate.

---

## Part B. Implementation tasks (11-20)

Each implementation task ends with a build check and (where visual) a Playwright screenshot verification against Task 9.

### Task 11. Add the paint-order contract effect
Append a new `useEffect` at the bottom of `HeroBannerSVG` that runs the ordered `svg.appendChild(node)` sequence from Task 8. No other logic yet.

### Task 12. Fix turbine pivot (Issue 5)
Replace the rotor pivot computation in lines 1289-1331 to use `#turbineHub{n}` (with `circle, ellipse` fallback inside the rotor). Keep durations 10-13s, all clockwise. Verify with a screenshot of the turbine cluster.

### Task 13. Fix tree sway smoothness and coverage (Issue 2)
In lines 1333-1438: (a) fall back to the tree group itself when `getCanopies()` returns empty, (b) change pivot factor from `0.95` to `0.75`, (c) add `immediateRender: false` and a rest-state `gsap.set`, (d) clamp amplitudes to 0.6-1.6 deg / 0.8-2.0 units. Verify visually.

### Task 14. Correct the current three-wheeler endpoint (Issue 3, part 1)
Update `ROUTES.threeWheelerHero.end` to the values computed in Task 5 (starting from `dx: 516, dy: 306`, adjust +-10 if screenshot shows overshoot/undershoot). Verify auto stops on the road.

### Task 15. Add the second three-wheeler (Issue 3, part 2)
Extend `VehicleId`, `DEFAULT_TIMING`, `ROUTES`, `VEHICLE_IDS` with `threeWheeler2` per Task 4. Update the cycle-length comment. If the SVG lacks a second asset, clone `#threeWheelerHero` at mount and assign id `threeWheeler2`. Verify two distinct autos appear per loop.

### Task 16. Fix `twoWheeler2` duplicating `twoWheeler1` (Issue 3, cleanup)
Give `twoWheeler2` a distinct origin (offset `y + 40`) or a distinct lane so the two bikes are not visually identical. Verify.

### Task 17. Guarantee walking woman visibility (Issue 1)
Inside the walking-woman effect, after setup, call `svg.appendChild(girl)`. Add the same call inside the HQ insert effect after the HQ `<image>` node is appended. Remove any opacity mutation in the visibility guard. Verify with a screenshot at the far end of her walk.

### Task 18. HQ front-lean, code path (Issue 4)
If split assets are available (`hq-building-isometric-back.png` and `hq-building-isometric-front.png` under `src/assets/`), insert two `<image>` nodes: back at `HQ_BUILDING_SVG_RECT`, front at `{ x: 628, y: 890, width: 536, height: 504 }`. Otherwise implement Option B: `matrix(1 0 0.02 1 6 4)` transform on the single HQ image. Verify back is unchanged and front leans toward the plaza.

### Task 19. Playwright acceptance run
Run the five-screenshot sweep defined in Task 9 at `1280x1800`. View each screenshot and confirm all five acceptance criteria pass. If any fails, patch and re-run within this task.

### Task 20. Final sweep and cleanup
Remove dead comments referencing the old HQ nudge history, ensure no `console.log` was left, run the build, and update `docs/hero-issues-gap-analysis.md` with a short "Resolved" footer listing each issue and the commit-ready summary.

---

Say "next" to run Task 1. After each task I will stop and wait for the next "next".
