#!/usr/bin/env node
/**
 * Automated placement validation for trees in src/assets/battery-smart-hero.svg.
 *
 * For every element whose id matches /tree/i (case-insensitive), compute its
 * effective axis-aligned bounding box in the SVG viewBox coordinate system,
 * accounting for ancestor `transform="translate(dx, dy)"` wrappers, then check
 * whether that bbox overlaps any "no-go" rectangle declared in
 * scripts/hero-no-go-zones.json (categories: road | vehicle | label | building
 * | swap-bay).
 *
 * Exit code:
 *   0 = no overlaps (or only overlaps under --warn-only)
 *   1 = at least one tree overlaps a no-go zone
 *
 * Usage:
 *   node scripts/validate-tree-placements.mjs
 *   node scripts/validate-tree-placements.mjs --warn-only
 *   node scripts/validate-tree-placements.mjs --json   # machine-readable report
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SVG_PATH   = resolve("src/assets/battery-smart-hero.svg");
const ZONES_PATH = resolve("scripts/hero-no-go-zones.json");
const WARN_ONLY  = process.argv.includes("--warn-only");
const JSON_OUT   = process.argv.includes("--json");

const log = (...a) => { if (!JSON_OUT) console.log(...a); };
const err = (...a) => { if (!JSON_OUT) console.error(...a); };

// ---------- Load inputs ----------
if (!existsSync(SVG_PATH))   { err(`Missing: ${SVG_PATH}`);   process.exit(2); }
if (!existsSync(ZONES_PATH)) { err(`Missing: ${ZONES_PATH}`); process.exit(2); }
const svg   = readFileSync(SVG_PATH, "utf8");
const zones = JSON.parse(readFileSync(ZONES_PATH, "utf8")).zones ?? [];

// ---------- Minimal SVG walker ----------
// We don't need a full XML DOM — a forgiving tag scanner is enough because we
// only care about translate() on ancestors plus geometry on leaves. Rotations
// and scales on ancestors are reported as "unsupported transform" (and the
// element is still checked with its raw bbox to avoid silent passes).

// Match individual tree elements but NOT plural container groups
// (e.g. "g-trees", "bs-extra-trees"), which would otherwise produce a
// union bbox spanning the whole scene.
const TREE_ID_RE = /tree/i;
const TREE_CONTAINER_RE = /trees\b|-trees$|^g-trees/i;

/** Tokenize SVG into a flat list of {type, name, attrs} events. */
function tokenize(src) {
  const events = [];
  const tagRe = /<\/?([A-Za-z_][\w:-]*)\b([^>]*)>/g;
  let m;
  while ((m = tagRe.exec(src))) {
    const full = m[0];
    const name = m[1];
    const rest = m[2] ?? "";
    const isClose = full.startsWith("</");
    const isSelf  = !isClose && /\/\s*>$/.test(full);
    const attrs = {};
    rest.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (_, k, v) => { attrs[k] = v; });
    if (isClose) events.push({ kind: "close", name });
    else { events.push({ kind: "open", name, attrs }); if (isSelf) events.push({ kind: "close", name }); }
  }
  return events;
}

/** Parse `transform="translate(a b) translate(c,d) ..."`. Returns {dx,dy,unsupported}. */
function parseTransform(t) {
  if (!t) return { dx: 0, dy: 0, unsupported: false };
  let dx = 0, dy = 0, unsupported = false;
  const fnRe = /([a-zA-Z]+)\s*\(([^)]*)\)/g;
  let m;
  while ((m = fnRe.exec(t))) {
    const fn = m[1].toLowerCase();
    const args = m[2].split(/[\s,]+/).filter(Boolean).map(Number);
    if (fn === "translate") {
      dx += args[0] || 0;
      dy += args[1] || 0;
    } else if (fn === "matrix" && args.length === 6 && args[0] === 1 && args[3] === 1 && args[1] === 0 && args[2] === 0) {
      dx += args[4]; dy += args[5];
    } else {
      unsupported = true;
    }
  }
  return { dx, dy, unsupported };
}

/** AABB for a single leaf SVG primitive (in its own local coords, no transform). */
function leafBBox(name, a) {
  const num = (v) => (v == null ? NaN : parseFloat(v));
  switch (name) {
    case "rect": {
      const x = num(a.x) || 0, y = num(a.y) || 0;
      const w = num(a.width) || 0, h = num(a.height) || 0;
      return [x, y, x + w, y + h];
    }
    case "circle": {
      const cx = num(a.cx) || 0, cy = num(a.cy) || 0, r = num(a.r) || 0;
      return [cx - r, cy - r, cx + r, cy + r];
    }
    case "ellipse": {
      const cx = num(a.cx) || 0, cy = num(a.cy) || 0;
      const rx = num(a.rx) || 0, ry = num(a.ry) || 0;
      return [cx - rx, cy - ry, cx + rx, cy + ry];
    }
    case "line": {
      const x1 = num(a.x1) || 0, y1 = num(a.y1) || 0;
      const x2 = num(a.x2) || 0, y2 = num(a.y2) || 0;
      return [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)];
    }
    case "polyline":
    case "polygon": {
      const pts = (a.points || "").trim().split(/[\s,]+/).map(Number);
      if (pts.length < 2) return null;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (let i = 0; i + 1 < pts.length; i += 2) {
        const x = pts[i], y = pts[i + 1];
        if (x < minX) minX = x; if (y < minY) minY = y;
        if (x > maxX) maxX = x; if (y > maxY) maxY = y;
      }
      return [minX, minY, maxX, maxY];
    }
    case "path": {
      // Coarse bbox from absolute-coord numbers in d. Good enough for trees,
      // which the project authors as plain shapes — and we union with siblings
      // anyway, so small inaccuracies are absorbed.
      const d = a.d || "";
      const nums = [...d.matchAll(/-?\d+(\.\d+)?/g)].map((x) => Number(x[0]));
      if (nums.length < 2) return null;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (let i = 0; i + 1 < nums.length; i += 2) {
        const x = nums[i], y = nums[i + 1];
        if (x < minX) minX = x; if (y < minY) minY = y;
        if (x > maxX) maxX = x; if (y > maxY) maxY = y;
      }
      return [minX, minY, maxX, maxY];
    }
    default:
      return null;
  }
}

const unionBBox = (a, b) => {
  if (!a) return b; if (!b) return a;
  return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])];
};
const shiftBBox = (bb, dx, dy) => bb && [bb[0] + dx, bb[1] + dy, bb[2] + dx, bb[3] + dy];
const intersects = (a, b) => !(a[2] < b[0] || b[2] < a[0] || a[3] < b[1] || b[3] < a[1]);

/** Walk the SVG and return [{id, bbox, unsupportedTransform}, ...] for every tree-ish element. */
function collectTrees(src) {
  const events = tokenize(src);
  const stack = []; // { id|null, translateDx, translateDy, unsupported, bbox }
  const trees = [];

  for (const ev of events) {
    if (ev.kind === "open") {
      const a = ev.attrs;
      const id = a.id;
      const isTreeId = id && TREE_ID_RE.test(id) && !TREE_CONTAINER_RE.test(id);
      const t = parseTransform(a.transform);
      const parent = stack[stack.length - 1];
      const frame = {
        id: id || null,
        isTree: !!isTreeId,
        dx: (parent?.dx ?? 0) + t.dx,
        dy: (parent?.dy ?? 0) + t.dy,
        unsupported: (parent?.unsupported ?? false) || t.unsupported,
        // Each tree-id frame accumulates a bbox in *scene* coords (post-translate).
        bbox: null,
      };
      // Leaf geometry contributes to the nearest enclosing tree frame.
      const leaf = leafBBox(ev.name, a);
      if (leaf) {
        const scene = shiftBBox(leaf, frame.dx, frame.dy);
        // Push contribution into every enclosing tree frame on the stack.
        for (const f of stack) if (f.isTree) f.bbox = unionBBox(f.bbox, scene);
        frame.bbox = scene;
      }
      stack.push(frame);
    } else if (ev.kind === "close") {
      const frame = stack.pop();
      if (!frame) continue;
      // Bubble the frame's bbox into its parent for non-tree containers so the
      // nearest enclosing tree picks it up.
      const parent = stack[stack.length - 1];
      if (parent && frame.bbox) parent.bbox = unionBBox(parent.bbox, frame.bbox);
      if (frame.isTree) {
        trees.push({
          id: frame.id,
          bbox: frame.bbox,
          unsupportedTransform: frame.unsupported,
        });
      }
    }
  }
  return trees;
}

// ---------- Run ----------
log(`Validating tree placements in ${SVG_PATH}`);
log(`Zones: ${ZONES_PATH} (${zones.length} no-go rectangles)`);
log("");

const trees = collectTrees(svg);
if (trees.length === 0) {
  err("No tree elements found (looked for ids matching /tree/i).");
  process.exit(2);
}

const report = [];
let overlapCount = 0;

for (const t of trees) {
  if (!t.bbox) {
    report.push({ id: t.id, status: "skipped", reason: "no resolvable geometry" });
    continue;
  }
  const [x1, y1, x2, y2] = t.bbox.map((n) => Math.round(n));
  const hits = zones
    .filter((z) => intersects(t.bbox, [z.x1, z.y1, z.x2, z.y2]))
    .map((z) => ({ name: z.name, category: z.category }));
  if (hits.length === 0) {
    report.push({ id: t.id, status: "ok", bbox: [x1, y1, x2, y2], unsupportedTransform: t.unsupportedTransform });
  } else {
    overlapCount += 1;
    report.push({
      id: t.id,
      status: "overlap",
      bbox: [x1, y1, x2, y2],
      hits,
      unsupportedTransform: t.unsupportedTransform,
    });
  }
}

if (JSON_OUT) {
  console.log(JSON.stringify({ total: trees.length, overlaps: overlapCount, results: report }, null, 2));
} else {
  for (const r of report) {
    const tx = r.unsupportedTransform ? "  ⚠ unsupported ancestor transform — bbox approximate" : "";
    if (r.status === "ok") {
      log(`  ✓ ${r.id}  bbox=[${r.bbox.join(", ")}]${tx}`);
    } else if (r.status === "skipped") {
      log(`  · ${r.id}  skipped (${r.reason})`);
    } else {
      log(`  ✗ ${r.id}  bbox=[${r.bbox.join(", ")}]${tx}`);
      for (const h of r.hits) log(`      overlaps ${h.category}: ${h.name}`);
    }
  }
  log("");
  log(`Checked ${trees.length} trees — ${overlapCount} overlap(s).`);
}

if (overlapCount > 0 && !WARN_ONLY) process.exit(1);
process.exit(0);
