#!/usr/bin/env node
/**
 * Validates src/assets/battery-smart-hero.svg:
 *   1. Contains no <image> tags with data:image/png;base64 payloads.
 *   2. Contains exactly two rooftop totooGO wordmarks:
 *        <g id="totoogo-rooftop-left"> ... <text>...totooGO...</text> ... </g>
 *        <g id="totoogo-rooftop-right"> ... <text>...totooGO...</text> ... </g>
 *
 * Exit code 0 = pass, 1 = fail.
 *
 * Usage:  node scripts/validate-hero-svg.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SVG_PATH = resolve("src/assets/battery-smart-hero.svg");
const failures = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => { failures.push(msg); console.log(`  ✗ ${msg}`); };

console.log(`Validating ${SVG_PATH}`);

if (!existsSync(SVG_PATH)) {
  console.error(`File not found: ${SVG_PATH}`);
  process.exit(1);
}
const svg = readFileSync(SVG_PATH, "utf8");

// 1. No base64 PNG embeds anywhere in the file.
const base64Matches = svg.match(/data:image\/png;base64/gi) ?? [];
if (base64Matches.length === 0) {
  ok("no base64 PNG embeds found");
} else {
  fail(`found ${base64Matches.length} base64 PNG embed(s) — rooftop logos must be vector text, not PNG stickers`);
}

// 2. Exactly one left + one right rooftop group, each with a totooGO text node.
for (const side of ["left", "right"]) {
  const id = `totoogo-rooftop-${side}`;
  const groupRegex = new RegExp(`<g\\s+id="${id}"[^>]*>([\\s\\S]*?)<\\/g>`, "g");
  const groups = [...svg.matchAll(groupRegex)];

  if (groups.length === 0) {
    fail(`missing rooftop group #${id}`);
    continue;
  }
  if (groups.length > 1) {
    fail(`expected exactly 1 #${id} group, found ${groups.length}`);
    continue;
  }
  const inner = groups[0][1];
  // Wordmark may be a single text node or split into tspans ("tot" + "oo" + "GO").
  const textNode = inner.match(/<text\b[^>]*>[\s\S]*?<\/text>/i)?.[0];
  const stripped = textNode?.replace(/<[^>]+>/g, "").replace(/\s+/g, "");
  if (!textNode || stripped !== "totooGO") {
    fail(`#${id} does not contain a <text> node spelling "totooGO" (got ${JSON.stringify(stripped ?? null)})`);
    continue;
  }
  if (/<image\b/i.test(inner)) {
    fail(`#${id} still contains an <image> element (should be pure <text>)`);
    continue;
  }
  ok(`#${id} contains exactly one totooGO <text> wordmark`);
}

// 3. Total totooGO text-node count across the SVG must be exactly 2.
const allTextNodes = svg.match(/<text\b[^>]*>[\s\S]*?<\/text>/gi) ?? [];
const totooGoTextNodes = allTextNodes.filter(
  (t) => t.replace(/<[^>]+>/g, "").replace(/\s+/g, "") === "totooGO",
);
if (totooGoTextNodes.length === 2) {
  ok("exactly 2 totooGO <text> nodes in the SVG");
} else {
  fail(`expected 2 totooGO <text> nodes, found ${totooGoTextNodes.length}`);
}

console.log("");
if (failures.length) {
  console.error(`FAILED (${failures.length} issue${failures.length === 1 ? "" : "s"})`);
  process.exit(1);
}
console.log("PASSED");
