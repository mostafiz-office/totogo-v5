# SVG Creator — PNG → 100% Editable SVG Conversion

This folder holds the source PNG of the totooGO isometric HQ building and the
target editable SVG that any AI (Claude, GPT, Gemini, Figma-AI plugin) must
generate from it. The SVG must be **pixel-faithful to the PNG** AND **fully
editable in Figma**: every logical element (walls, windows, solar panels,
logo text, bikes, charging bays, trees, shadows, people) must be an
independent, named, recolorable, animatable node.

## Folder structure

```
SVG-Creator/
├── README.md                         ← this file (the AI spec / prompt)
├── Totogo-PNG-Image/
│   └── hq-building-isometric.png     ← source raster (the "truth")
└── Totogo-SVG/
    └── hq-building-isometric.svg     ← target output (AI writes this file)
```

---

## MASTER PROMPT (paste this to the conversion AI verbatim)

> You are an expert isometric-illustration vectorizer. Convert the input PNG
> at `SVG-Creator/Totogo-PNG-Image/hq-building-isometric.png` into a single
> SVG file at `SVG-Creator/Totogo-SVG/hq-building-isometric.svg`.
>
> The SVG must look **100% identical** to the PNG when rendered at the same
> size (same silhouettes, same colors, same shadows, same light direction,
> same isometric angle of 30°), AND every logical part of the scene must be
> a separate, named, recolorable, animatable SVG node — no raster
> `<image>` tags, no auto-traced spaghetti paths, no flattened groups.
>
> ### Non-negotiable rules
>
> 1. **No `<image>` elements.** No embedded base64. 100% vector primitives
>    (`<path>`, `<polygon>`, `<rect>`, `<circle>`, `<ellipse>`, `<line>`,
>    `<linearGradient>`, `<radialGradient>`).
> 2. **`viewBox="0 0 1024 1024"`** (or the PNG's native aspect). No fixed
>    `width`/`height` on the root — use `preserveAspectRatio="xMidYMid meet"`.
> 3. **Isometric projection: 30° axes.** All building edges follow the
>    dimetric 2:1 rise (horizontal:vertical ratio = 2:1). Verify every wall
>    edge slope is exactly ±0.5.
> 4. **Semantic IDs and layer names** (see "Required node tree" below).
>    Every group's `id` matches its Figma layer name so Figma imports it
>    with a clean layer panel.
> 5. **Flat colors + one shadow tint per face.** Use CSS custom properties
>    at the top of the SVG (`--totoogo-primary`, `--wall-light`,
>    `--wall-mid`, `--wall-dark`, `--roof`, `--glass`, `--ground`,
>    `--shadow`) so Figma / code can retheme instantly.
> 6. **No filters, no blurs, no `feGaussianBlur`.** Shadows are solid
>    polygons at 15–25% opacity. Filters break Figma editing.
> 7. **Strokes off by default.** All shapes use `fill` only unless the PNG
>    shows a visible outline (window mullions, logo strokes).
> 8. **Z-order = painter's algorithm** from back-to-front along the
>    isometric depth axis (far → near, low → high).
>
> ### Required node tree (exact IDs, exact nesting)
>
> ```
> <svg id="totoogo-hq-scene" viewBox="0 0 1024 1024">
>   <defs>
>     <style>:root{--totoogo-primary:#22C55E;--wall-light:#F8FAFC;
>       --wall-mid:#E2E8F0;--wall-dark:#94A3B8;--roof:#0F172A;
>       --glass:#7DD3FC;--ground:#CBD5E1;--shadow:#0F172A;}</style>
>     <!-- gradients only if a face has a visible gradient in the PNG -->
>   </defs>
>
>   <g id="scene">
>     <g id="ground-plane">          <!-- isometric plaza tiles + grass -->
>       <g id="plaza-tiles"/>
>       <g id="grass-patches"/>
>       <g id="curb-lines"/>
>     </g>
>
>     <g id="shadows">                <!-- ground shadows of each object -->
>       <path id="shadow-building"/>
>       <path id="shadow-bikes"/>
>       <path id="shadow-trees"/>
>     </g>
>
>     <g id="trees-back"/>            <!-- trees behind the building -->
>
>     <g id="building">
>       <g id="building-base"/>       <!-- foundation slab -->
>       <g id="wall-front">
>         <g id="wall-front-face"/>
>         <g id="wall-front-windows">
>           <rect id="win-f-1-1"/> … <!-- one rect per window pane -->
>         </g>
>         <g id="wall-front-door"/>
>         <g id="wall-front-entrance-canopy"/>
>       </g>
>       <g id="wall-left">
>         <g id="wall-left-face"/>
>         <g id="wall-left-windows"/>
>         <g id="wall-left-signage-totoogo">
>           <!-- totooGO wordmark as <text> or explicit letter <path>s.
>                Font: Ubuntu Bold, letter-spacing 0. Color: --totoogo-primary. -->
>         </g>
>       </g>
>       <g id="wall-right">
>         <g id="wall-right-face"/>
>         <g id="wall-right-windows"/>
>       </g>
>       <g id="roof">
>         <g id="roof-slab"/>
>         <g id="roof-solar-panels">
>           <g id="solar-panel-array-1">
>             <rect id="solar-cell-1-1"/> …  <!-- individual cells -->
>           </g>
>           <g id="solar-panel-array-2"/>
>           <g id="solar-panel-mounts"/>
>         </g>
>         <g id="roof-hvac-units"/>
>         <g id="roof-antenna"/>
>       </g>
>     </g>
>
>     <g id="charging-station-forecourt">
>       <g id="charging-bay-1">
>         <g id="bay-1-canopy"/>
>         <g id="bay-1-swap-cabinet"/>  <!-- the totooGO battery locker -->
>         <g id="bay-1-screen"/>
>       </g>
>       <g id="charging-bay-2"/>
>       <g id="charging-bay-3"/>
>       <g id="floor-markings"/>       <!-- painted parking + arrows -->
>     </g>
>
>     <g id="vehicles">
>       <g id="ebike-1">
>         <g id="ebike-1-frame"/>
>         <g id="ebike-1-wheels"/>
>         <g id="ebike-1-battery"/>    <!-- totooGO green pack -->
>         <g id="ebike-1-seat"/>
>       </g>
>       <g id="ebike-2"/>
>       <g id="ebike-3"/>
>     </g>
>
>     <g id="trees-front"/>            <!-- foreground trees -->
>     <g id="foliage-planters"/>
>     <g id="pedestrian-details"/>     <!-- lamp posts, bollards, signs -->
>   </g>
> </svg>
> ```
>
> ### Required visual accuracy checklist
>
> - **Building form:** rectangular volume, roof exactly horizontal in
>   isometric view, three visible faces (front-right, front-left, roof).
> - **Rooftop solar farm:** 2 arrays of 4×6 photovoltaic cells (48 total),
>   each cell a dark-blue `<rect>` with a 1px `--wall-dark` grid; panels
>   tilted ~15° south (represented in iso by a small y-offset back edge).
> - **totooGO wordmark:** appears on the front-left wall in
>   `--totoogo-primary` (#22C55E), Ubuntu Bold, size ≈ 8% of building
>   height. Optionally repeat as a smaller sign above the charging bays.
> - **Ground floor / office glass:** floor-to-ceiling window band across
>   the front face, `--glass` fill at 70% opacity with subtle mullion lines
>   every ~64 SVG units.
> - **Charging station forecourt:** 3 bays under a shared shed canopy,
>   each with a totooGO green swap-cabinet and a small screen.
> - **e-Bikes:** 3 parked isometric e-bikes in front of the bays; each
>   with a visible removable green battery pack on the frame.
> - **Trees:** at least 4 trees (2 back, 2 front). Canopies are stacked
>   ellipses with a darker under-layer for volume. Trunks are single
>   `<rect>` rotated to the isometric axis, filled `#6B4226`.
> - **Shadows:** every 3D object has a matching flat ground-shadow polygon
>   offset along the light vector (light comes from top-left, so shadow
>   extends to the bottom-right at 30°). Fill `--shadow` at 18% opacity.
> - **Palette match:** sample the PNG for the actual wall / roof / accent
>   hex colors; do not invent colors. If a face in the PNG is #E9EEF3,
>   use that as `--wall-light` in the `<style>` block.
>
> ### Editability contract (this is why we're not just tracing)
>
> After the SVG is produced, a designer must be able to:
>
> 1. Open it in Figma → see the layer panel populated with the tree above.
> 2. Click any single window, solar cell, tree canopy, or bike battery
>    and change its fill in one click.
> 3. Swap `--totoogo-primary` in the `<style>` block and see every
>    branded surface (wordmark, bike batteries, swap cabinets) recolor.
> 4. Animate any group (e.g. `#solar-panel-array-1`) with CSS or GSAP
>    without hitting nested `<g transform>` conflicts.
>
> ### Prohibited techniques
>
> - ❌ Auto-tracing the whole PNG with Potrace / Vector Magic and dumping
>   one giant `<path>`.
> - ❌ Embedding the PNG as `<image xlink:href="data:image/png;base64,…">`.
> - ❌ Using `<foreignObject>`, `<filter>`, `<mask>`, or `<clipPath>`
>   (except one optional building silhouette clip if strictly required).
> - ❌ Absolute pixel coordinates outside the `viewBox`.
> - ❌ Inline `style="fill:#..."` on every node — use `fill="var(--...)"`
>   or a class, so recoloring is one edit.
>
> ### Deliverable
>
> A single file `SVG-Creator/Totogo-SVG/hq-building-isometric.svg` that:
> - opens cleanly in Chrome, Firefox, Safari at any zoom;
> - imports into Figma with the layer tree above intact;
> - passes `xmllint --noout` with zero errors;
> - is ≤ 300 KB (target ~80–150 KB) — if larger, you flattened too much.

---

## How to use

1. Give the master prompt above + the PNG at `Totogo-PNG-Image/` to your
   chosen AI (Claude 3.5 Sonnet, GPT-5, Gemini 2.5 Pro, or a Figma AI
   plugin like "Image to SVG" / "Vectorize").
2. Save its output to `Totogo-SVG/hq-building-isometric.svg`.
3. Drag that SVG into Figma to verify the layer panel matches the required
   tree, then iterate on the prompt if any layer is missing or flattened.
