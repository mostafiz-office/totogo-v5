"""Render SVG and compute similarity vs source PNG.

Usage: python SVG-Creator/scripts/diff.py <svg_path>
Outputs: SSIM score, per-region color deltas, side-by-side diff PNG.
"""
import sys, os, json
from pathlib import Path
import numpy as np
from PIL import Image
import resvg_py
from skimage.metrics import structural_similarity as ssim

ROOT = Path(__file__).resolve().parents[1]
PNG = ROOT / "Totogo-PNG-Image" / "hq-building-isometric.png"
OUT_DIR = ROOT / "scripts" / "out"
OUT_DIR.mkdir(parents=True, exist_ok=True)

SIZE = 1024

def load_png(p, size=SIZE):
    im = Image.open(p).convert("RGBA").resize((size, size), Image.LANCZOS)
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.alpha_composite(im)
    im = bg.convert("RGB")
    return np.asarray(im)

import re
def inline_css_vars(svg):
    # extract --name:#hex; pairs, then replace var(--name) with hex
    vars_ = dict(re.findall(r"(--[\w-]+)\s*:\s*(#[0-9A-Fa-f]{3,8}|[a-zA-Z]+)\s*;", svg))
    def sub(m):
        name = m.group(1)
        return vars_.get(name, "#000")
    return re.sub(r"var\((--[\w-]+)\)", sub, svg)

def render_svg(svg_path, size=SIZE):
    svg = Path(svg_path).read_text()
    svg = inline_css_vars(svg)
    png_bytes = resvg_py.svg_to_bytes(svg_string=svg, width=size, height=size)
    tmp = OUT_DIR / (Path(svg_path).stem + "_render.png")
    tmp.write_bytes(bytes(png_bytes))
    return load_png(tmp), tmp

REGIONS = {
    "sky":     (0, 0, 1024, 300),
    "roof":    (300, 250, 800, 500),
    "wall":    (250, 450, 800, 800),
    "ground":  (0, 850, 1024, 1024),
    "left":    (0, 400, 400, 900),
    "right":   (600, 400, 1024, 900),
    "center":  (350, 500, 700, 850),
}

def region_color(img, box):
    x1,y1,x2,y2 = box
    r = img[y1:y2, x1:x2]
    return r.reshape(-1,3).mean(axis=0)

def hex(c): return "#{:02X}{:02X}{:02X}".format(*[int(v) for v in c])

def color_dist(a,b):
    return float(np.linalg.norm(a.astype(float)-b.astype(float)))

def score(svg_path):
    src = load_png(PNG)
    rnd, rendered_path = render_svg(svg_path)
    s = ssim(src, rnd, channel_axis=2, data_range=255)
    region_report = {}
    for name, box in REGIONS.items():
        cs = region_color(src, box)
        cr = region_color(rnd, box)
        region_report[name] = {
            "png": hex(cs), "svg": hex(cr),
            "delta": round(color_dist(cs, cr), 1),
        }
    # side-by-side
    sb = Image.new("RGB", (SIZE*2+10, SIZE), "white")
    sb.paste(Image.fromarray(src), (0,0))
    sb.paste(Image.fromarray(rnd), (SIZE+10, 0))
    sb_path = OUT_DIR / (Path(svg_path).stem + "_sidebyside.png")
    sb.save(sb_path)
    return {
        "svg": str(svg_path),
        "ssim": round(float(s), 4),
        "regions": region_report,
        "sidebyside": str(sb_path),
    }

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        r = score(arg)
        print(json.dumps(r, indent=2))
