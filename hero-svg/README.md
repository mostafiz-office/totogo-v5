# Hero SVG Reference

Reference for the hero illustration in `src/assets/battery-smart-hero.svg`.
Use this folder to collect Figma layer/group IDs so future edits can move,
recolor, or restyle buildings by ID without guessing.

## Source file
- SVG in code: `src/assets/battery-smart-hero.svg`
- Rendered export (with brown fix): `/mnt/documents/current-brown-hero.svg`
- Figma file: Domains Logos (Copy) > page `current-brown-hero 1`

## Screenshots
- `figma-screenshots/building-ids-1.png` — cylindrical/right-back tower selected. Group `Group_149` (child of `Group 238759`). Size 115.9 x 218.89 at X 1135, Y 900.
- `figma-screenshots/building-ids-2.png` — residential mid-rise (bottom-left area). Groups `Group_276` and `Group_230` selected. Size 142.97 x 218.76.

## Known building IDs (from Figma)
Add rows here as we identify more. `Figma ID` is the layer name in Figma;
`SVG selector` is what we use in CSS/JS (usually `#<id>` or `[id="<id>"]`).

| Building / element              | Figma ID        | SVG selector       | Notes |
|--------------------------------|-----------------|--------------------|-------|
| Cylindrical right-back tower   | Group_149       | `#Group_149`       | inside `Group 238759`; W 115.9 H 218.89 |
| Residential mid-rise (bl area) | Group_276       | `#Group_276`       | tall beige block |
| Residential mid-rise base      | Group_230       | `#Group_230`       | sibling of Group_276 |
| HQ overlay (do NOT move)       | totogoHqBuildingOverlay | `#totogoHqBuildingOverlay` | brand HQ, keep in place |
| Small south tower              | Group_310       | `#Group_310`       | previously identified |
| Signboard plate (brown fix)    | Vector 184      | `[id="Vector 184"]`| filled dark brown via `src/index.css` |

## How to move a building by ID
Prefer CSS transforms in `src/index.css` over editing the raw SVG paths:

```css
#Group_149 { transform: translate(-400px, 0); transform-box: fill-box; }
```

For larger moves or swaps, use an absolutely-positioned overlay in
`src/components/battery-smart/Hero.tsx` and hide the original with
`display: none` on its ID.

## Adding new IDs
1. In Figma, select the layer, note its name from the Layers panel.
2. Screenshot the selection + layers panel, save to `figma-screenshots/`.
3. Add a row to the table above with the ID and a short description.
