"""Pure-vector refinement loop: render SVG → diff PNG → patch → repeat.

This loop is intentionally strict: it refuses raster shortcuts. Output SVGs
must be editable Figma vectors made from SVG primitives/groups only. The loop
records similarity and gap notes, then keeps the best pure-vector result.
"""
import re, sys, json
from pathlib import Path
import numpy as np
from PIL import Image
import resvg_py
from skimage.metrics import structural_similarity as ssim

ROOT = Path(__file__).resolve().parents[1]
PNG = ROOT / "Totogo-PNG-Image" / "hq-building-isometric.png"
SVG_DIR = ROOT / "Totogo-SVG"
OUT = ROOT / "scripts" / "out"
OUT.mkdir(parents=True, exist_ok=True)
SIZE = 1024
MAX_ITERS = 40
PLATEAU_EPS = 0.002
PLATEAU_WINDOW = 5
VECTOR_TARGET = 0.92

def load_png(p):
    return np.asarray(Image.open(p).convert("RGB").resize((SIZE, SIZE), Image.LANCZOS))

def inline_vars(svg):
    vars_ = dict(re.findall(r"(--[\w-]+)\s*:\s*(#[0-9A-Fa-f]{3,8}|[a-zA-Z]+)\s*;", svg))
    return re.sub(r"var\((--[\w-]+)\)", lambda m: vars_.get(m.group(1), "#000"), svg)

def render(svg_text):
    b = resvg_py.svg_to_bytes(svg_string=inline_vars(svg_text), width=SIZE, height=SIZE)
    im = Image.open(__import__("io").BytesIO(bytes(b))).convert("RGBA")
    # composite over white so transparent bg matches PNG's white bg baseline
    bg = Image.new("RGBA", im.size, (255,255,255,255))
    bg.alpha_composite(im)
    return np.asarray(bg.convert("RGB"))

def assert_pure_vector(svg_text, path="<memory>"):
    forbidden = ["<image", "data:image", "base64", "<foreignObject"]
    hits = [token for token in forbidden if token.lower() in svg_text.lower()]
    if hits:
        raise ValueError(f"Raster/non-editable shortcut found in {path}: {', '.join(hits)}")

def score(rendered, src):
    return float(ssim(src, rendered, channel_axis=2, data_range=255))

def sample_palette(src):
    pix = src.reshape(-1,3)
    mask = ~((pix>240).all(axis=1))
    s = pix[mask]
    q = (s // 24) * 24
    from collections import Counter
    top = Counter(map(tuple, s.tolist())).most_common(5000)
    # cluster into buckets
    buckets = {}
    for col, n in top:
        key = tuple(c//32*32 for c in col)
        buckets.setdefault(key, [0, np.zeros(3)])
        buckets[key][0] += n
        buckets[key][1] += np.array(col) * n
    ranked = sorted(buckets.values(), key=lambda x: -x[0])
    palette = []
    for w, csum in ranked[:12]:
        palette.append(tuple(int(v) for v in (csum/w)))
    return palette

def hexf(c): return "#{:02X}{:02X}{:02X}".format(*[int(v) for v in c])
def parse_hex(h):
    h=h.lstrip("#"); return np.array([int(h[i:i+2],16) for i in (0,2,4)])

def nearest(target, palette):
    t = np.array(target)
    return min(palette, key=lambda p: np.linalg.norm(np.array(p)-t))

def remap_palette(svg, png_palette):
    """Update the <style> CSS variables to snap to the nearest PNG color."""
    def repl(match):
        name = match.group(1); cur = match.group(2)
        try: cur_rgb = parse_hex(cur)
        except: return match.group(0)
        new = nearest(cur_rgb, png_palette)
        return f"{name}:{hexf(new)};"
    return re.sub(r"(--[\w-]+)\s*:\s*(#[0-9A-Fa-f]{6})\s*;", repl, svg)

def ensure_bg(svg, color="#FFFFFF"):
    if "id=\"scene-bg\"" in svg: return svg
    return svg.replace("<defs>", f'<rect id="scene-bg" width="1024" height="1024" fill="{color}"/><defs>', 1)

def write_gap_iteration(iter_no, ssim_score):
    gap = OUT / f"gap-iteration-{iter_no}.md"
    gap.write_text(f"""# Pure-vector gap iteration {iter_no}

Source: `Totogo-PNG-Image/hq-building-isometric.png`  
Candidate: pure SVG vector iteration {iter_no}  
SSIM: `{ssim_score:.4f}`

## Rule
- No `<image>` tags.
- No `data:image`.
- No base64.
- No flattened auto-trace blob.
- Every building piece must remain editable: walls, roof, windows, door, battery lockers, bikes, solar panels, signage, planters, and shadows.

## Remaining gap to close manually/algorithmically
- Improve building proportions and silhouette placement.
- Match the royal-blue wall faces and grey/white roof trim closer to PNG.
- Add more small bay details and bike geometry instead of broad approximations.
- Keep all pieces as named groups and primitive shapes.
""")
    return gap

def main():
    src = load_png(PNG)
    palette = sample_palette(src)
    print("PNG palette (top):", [hexf(c) for c in palette[:6]])

    preferred = SVG_DIR / "hq-building-isometric-v5-pure-vector.svg"
    start = preferred if preferred.exists() else SVG_DIR / "hq-building-isometric-v2.svg"
    cur = start.read_text()
    assert_pure_vector(cur, start)
    history = []
    prev = -1
    best_score = -1
    best_svg = cur
    best_iter = 2
    no_improve = 0
    for i in range(3, 3 + MAX_ITERS):
        assert_pure_vector(cur, f"iteration-{i-1}")
        rnd = render(cur)
        s = score(rnd, src)
        history.append({"iter": i-1, "ssim": round(s,4)})
        print(f"[iter {i-1}] SSIM={s:.4f}")
        write_gap_iteration(i-1, s)
        if s > best_score + PLATEAU_EPS:
            best_score = s
            best_svg = cur
            best_iter = i - 1
            no_improve = 0
        else:
            no_improve += 1
        if s >= VECTOR_TARGET:
            print("  vector target reached"); break
        if no_improve >= PLATEAU_WINDOW:
            print(f"  plateau reached (no improvement over {PLATEAU_WINDOW} iters)"); break
        # patch
        cur = ensure_bg(cur, "#FFFFFF")
        cur = remap_palette(cur, palette)
        assert_pure_vector(cur, f"patched-iteration-{i}")
        out_path = SVG_DIR / f"hq-building-isometric-v{i}.svg"
        out_path.write_text(cur)
        # save render
        Image.fromarray(rnd).save(OUT / f"v{i-1}_render.png")
    # final side-by-side
    final = render(best_svg)
    final_score = score(final, src)
    sb = Image.new("RGB", (SIZE*2+10, SIZE), "white")
    sb.paste(Image.fromarray(src), (0,0))
    sb.paste(Image.fromarray(final), (SIZE+10, 0))
    sb.save(OUT / "final_sidebyside.png")

    best_path = SVG_DIR / "hq-building-isometric-pure-vector-best.svg"
    assert_pure_vector(best_svg, "best-svg")
    best_path.write_text(best_svg)
    report = {
        "vector_history": history,
        "best_iteration": best_iter,
        "best_pure_vector_svg": str(best_path),
        "final_vector_ssim": round(final_score, 4),
        "raster_shortcuts_allowed": False,
        "forbidden_tokens_checked": ["<image", "data:image", "base64", "<foreignObject"],
        "note": "Exact pixel parity is not claimed unless it is achieved by pure vector primitives. No embedded PNG fallback is generated."
    }
    (OUT / "refine-report.json").write_text(json.dumps(report, indent=2))
    (OUT / "history.json").write_text(json.dumps(history, indent=2))
    print(json.dumps(history, indent=2))
    print("final side-by-side:", OUT / "final_sidebyside.png")
    print("best pure-vector SVG:", best_path)
    print(f"best pure-vector SSIM={final_score:.4f}")

if __name__ == "__main__":
    main()
