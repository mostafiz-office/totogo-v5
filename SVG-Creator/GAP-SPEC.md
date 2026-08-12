# GAP-SPEC.md — PNG ↔ SVG mismatch analysis + patch prompt

Compare `Totogo-PNG-Image/hq-building-isometric.png` (source of truth) with
`Totogo-SVG/hq-building-isometric.svg` (current AI output). The current SVG is
**structurally wrong** — it depicts a single grey cube on an isometric tile
plaza. The PNG depicts an **L-shaped royal-blue corporate HQ** with a tall
office tower joined to a wide single-story battery-swap wing. Every AI
attempting this conversion has repeated the same nine mistakes. Fix them all.

---

## 1. Building silhouette — WRONG

| Aspect | PNG (correct) | Current SVG (wrong) |
|---|---|---|
| Massing | **L-shape**: 3-storey tower (left/back) + 1-storey wing (right/front), wing ~2.2× wider than tower | Single 1-mass cube |
| Tower footprint | ~square, ~30% of total width | n/a |
| Wing footprint | long rectangle extending to the right along the +x iso axis | n/a |
| Roof heights | Tower parapet ~2× wing parapet | Single flat roof |

**Fix:** model two separate volumes (`#tower` and `#wing`) sharing one inside
corner. Tower height ≈ 3 × wing height.

## 2. Color palette — WRONG

| Token | PNG hex (sampled) | Current SVG |
|---|---|---|
| `--wall-primary` | **#1E40AF** (deep royal blue) | `#F1F5F9` light grey ❌ |
| `--wall-shade` | **#1E3A8A** (darker blue for the shaded face) | `#CBD5E1` ❌ |
| `--trim-white` | **#F8FAFC** (parapet fascia + ground slab) | ok |
| `--totoogo-green` | **#22C55E** (sign background + interior lockers) | ok |
| `--glass` | **#93C5FD** at ~85% over dark blue mullions | present but too light |
| `--solar-dark` | **#0F172A** panel frame | missing |
| `--solar-cell` | **#1E3A8A** cells with `#3B82F6` grid | oversimplified |

**Fix:** repaint all wall faces royal blue, keep parapet fascia + slab white.

## 3. totooGO signage — WRONG placement AND wrong medium

- PNG: **green rectangular signboard** (~3:1 aspect) mounted on the **front
  canopy of the tower entrance**, with white "totooGO" text inside the green
  plate. A second copy sits on the ground-floor entrance interior wall.
- Current SVG: skewed `<text>` painted directly onto the tower's shaded wall.

**Fix:** render as `<rect fill="--totoogo-green">` + white `<text>` centered
inside, positioned on the entrance canopy front face.

## 4. "BATTERY SWAP STATION" banner — MISSING

The PNG shows a **green horizontal banner** running the full length of the
wing's front parapet, white sans-serif text "BATTERY SWAP STATION". The
current SVG omits it entirely. Add it as a wing-front parapet band.

## 5. Parapet fascia trim — MISSING

PNG has **three parallel white stripes** wrapping the wing parapet just below
the roofline (a signature detail — reads as an EV-charging brand element).
Current SVG has no fascia. Add three horizontal `<polygon>` bands on the
wing's front and right faces.

## 6. Solar panels — WRONG location, WRONG count, WRONG rendering

| Aspect | PNG | Current SVG |
|---|---|---|
| Location | **On the wing roof** (the low, wide roof) | On top of the tower |
| Count | **8 panels total**, arranged as 2 rows × 4 columns | 2 tiny panels |
| Panel detail | Each panel = 4×8 dark-blue cells in a light-grey aluminum frame, tilted flat on the iso roof plane | Solid dark blue trapezoid |
| Shading | Slight highlight on top edge | Flat |

**Fix:** on `#wing-roof`, tile 2×4 panels. Each panel = frame `<polygon>` +
inner 4×8 cell grid using two `<line>` sets aligned to iso axes (slope ±0.5).

## 7. Ground floor of the wing — MISSING all interior detail

PNG shows the wing's ground floor is **open** with 3 charging bays visible
through the facade:
- Bay 1: parked green e-scooter + rider, small display terminal.
- Bay 2: **green battery locker cabinet** (~8 slots visible as a 2×4 grid
  of green rectangles) + display screen.
- Bay 3: second locker + terminal.
- Interior floor: light grey; interior back wall: mid-grey.

Current SVG has tiny generic bikes outside the building. **Move them inside
the wing's front facade** as an opening cut into the wall, and add the
locker cabinets with visible battery-slot grids.

## 8. Tower windows — WRONG geometry

- PNG: **two horizontal ribbon windows** spanning the full front face of the
  tower (floor 2 and floor 3). Each ribbon = one long dark-blue glass band
  divided by thin white mullions into ~5 panes. Small potted plants visible
  on window sills.
- Current SVG: 3 columns of small diamond windows.

**Fix:** replace the diamond grid with two full-width ribbon `<polygon>`s in
`--glass` color, then overlay 4 vertical mullion lines per ribbon.

## 9. Ground / context — WRONG

- PNG: **no isometric tile grid, no plaza.** Building sits on a plain white
  background with only a **soft drop shadow directly under it**.
- Current SVG: draws a full plaza with tile grid, curbs, grass patches, lamp
  posts, and standalone trees — none of which exist in the PNG.

**Fix:** delete `#ground-plane`, `#pedestrian-details`, standalone
`#trees-back`, `#trees-front`, `#foliage-planters`. Keep only:
- one soft `#shadow-building` polygon under the L-footprint.
- small **corner planters with shrubs** at the base of the wing's front-right
  and tower's front-left corners (these ARE in the PNG).

---

## 10. Corrected required node tree (supersedes README section)

```
<svg viewBox="0 0 1024 1024">
  <defs><style>… royal-blue palette above …</style></defs>
  <g id="scene">
    <g id="shadow-building"/>                    <!-- one soft polygon -->
    <g id="building">
      <g id="wing">                              <!-- LOW wide volume, front-right -->
        <g id="wing-base-slab"/>                 <!-- white plinth -->
        <g id="wing-wall-front">
          <g id="wing-front-face"/>              <!-- royal blue -->
          <g id="wing-fascia-stripes"/>          <!-- 3 white bands -->
          <g id="wing-banner-battery-swap"/>     <!-- green banner + text -->
          <g id="wing-front-openings">           <!-- 3 bay cutouts -->
            <g id="bay-1"><g id="bay-1-locker"/><g id="bay-1-screen"/><g id="bay-1-scooter"/></g>
            <g id="bay-2">…</g>
            <g id="bay-3">…</g>
          </g>
          <g id="wing-clerestory-windows"/>      <!-- small windows above banner -->
        </g>
        <g id="wing-wall-right">
          <g id="wing-right-face"/>
          <g id="wing-right-fascia-stripes"/>
          <g id="wing-right-window"/>            <!-- 1 large window -->
        </g>
        <g id="wing-roof">
          <g id="wing-roof-slab"/>               <!-- white -->
          <g id="wing-roof-solar">
            <g id="solar-row-1"><g id="panel-1-1"/>…<g id="panel-1-4"/></g>
            <g id="solar-row-2"><g id="panel-2-1"/>…<g id="panel-2-4"/></g>
          </g>
        </g>
      </g>
      <g id="tower">                             <!-- TALL narrow volume, back-left -->
        <g id="tower-base-slab"/>
        <g id="tower-wall-front">
          <g id="tower-front-face"/>             <!-- royal blue -->
          <g id="tower-ribbon-window-floor-2"/>  <!-- long glass band + mullions -->
          <g id="tower-ribbon-window-floor-3"/>
          <g id="tower-entrance-canopy"/>        <!-- small white awning -->
          <g id="tower-signboard-totoogo"/>      <!-- green plate + white text -->
          <g id="tower-entrance-opening">        <!-- garage opening + inner green sign -->
            <g id="entrance-interior"/>
            <g id="entrance-sign-totoogo-inner"/>
          </g>
        </g>
        <g id="tower-wall-right">
          <g id="tower-right-face"/>             <!-- darker royal blue (shade) -->
          <g id="tower-right-ribbon-window-floor-2"/>
          <g id="tower-right-ribbon-window-floor-3"/>
        </g>
        <g id="tower-roof">
          <g id="tower-roof-slab"/>              <!-- white with thin green accent line -->
        </g>
      </g>
      <g id="planters">
        <g id="planter-front-left"/>             <!-- shrubs in white box -->
        <g id="planter-front-right"/>
        <g id="planter-corner"/>
      </g>
    </g>
  </g>
</svg>
```

---

## 11. Isometric geometry recipe (so the L-shape actually reads as 3D)

Use one iso helper: `iso(x, y, z) = ( cx + (x − y) × TW, cy + (x + y) × TH − z × H )`
with `TW = 40`, `TH = 20` (⇒ every wall edge slope is exactly ±0.5, dimetric
2:1), `H = 30`, `cx = 512`, `cy = 720`.

Footprint (viewer looks from front-right, +x is right-back, +y is right-front):

- **Wing:** `x ∈ [0, 10]`, `y ∈ [0, 4]`, `z ∈ [0, 3]`.
- **Tower:** `x ∈ [0, 3]`,  `y ∈ [4, 8]`, `z ∈ [0, 9]`.
  (Tower sits at the back-left corner of the wing, extending further in +y.)

Draw order (painter's algorithm, back to front):
`shadow → tower-right-face → tower-front-face → tower-roof → wing-right-face
→ wing-front-face → wing-roof + solar → planters → bay contents`.

---

## 12. Acceptance checklist (AI must self-verify BEFORE returning the SVG)

- [ ] Overall silhouette is L-shaped, not a single cube.
- [ ] Walls are royal blue (#1E40AF / #1E3A8A shade), not grey.
- [ ] White parapet + three white fascia stripes wrap the wing.
- [ ] Green "BATTERY SWAP STATION" banner sits on the wing front parapet.
- [ ] Green "totooGO" signboard sits on the tower entrance canopy.
- [ ] 8 solar panels (2×4) sit on the wing roof, each with a 4×8 cell grid.
- [ ] Tower has 2 ribbon windows per visible face (front + right).
- [ ] 3 bays cut into the wing front expose green battery lockers + scooter.
- [ ] Background is white with only one soft drop shadow under the L-footprint.
- [ ] No isometric floor tile grid, no lamp posts, no standalone trees.
- [ ] Every wall edge slope is exactly ±0.5 (verify by dividing Δy/Δx).
- [ ] File size ≤ 300 KB, `xmllint --noout` passes.

Any AI that produces the SVG must run through §12 line-by-line and reject
its own output if a single item fails. This is the gap that keeps closing
too late in the loop.
