"""Validate that an SVG is a pure editable vector file, not a PNG wrapper."""
import json
import re
import sys
from pathlib import Path

FORBIDDEN = ["<image", "data:image", "base64", "<foreignObject"]
REQUIRED_IDS = [
    "building", "tower", "wing", "tower-front-face", "tower-right-face",
    "tower-roof-slab", "tower-ribbon-window-floor-2", "tower-ribbon-window-floor-3",
    "wing-front-face", "wing-right-face", "wing-roof-slab", "wing-roof-solar",
    "wing-banner-battery-swap", "tower-signboard-totoogo", "wing-front-openings",
    "bay-1", "bay-2", "bay-3", "bay-1-locker", "bay-2-locker", "bay-3-locker",
    "bay-1-scooter", "bay-2-scooter", "bay-3-scooter", "planters", "shadow-building",
]

def validate(path: Path):
    text = path.read_text()
    lower = text.lower()
    forbidden_hits = [token for token in FORBIDDEN if token.lower() in lower]
    missing_ids = [id_ for id_ in REQUIRED_IDS if f'id="{id_}"' not in text]
    primitive_count = sum(len(re.findall(fr"<{tag}\b", text)) for tag in ["path", "polygon", "rect", "circle", "ellipse", "line", "text", "use"])
    report = {
        "svg": str(path),
        "pure_vector": not forbidden_hits,
        "forbidden_hits": forbidden_hits,
        "missing_required_ids": missing_ids,
        "primitive_count": primitive_count,
        "passes": not forbidden_hits and not missing_ids and primitive_count >= 120,
    }
    print(json.dumps(report, indent=2))
    if not report["passes"]:
        raise SystemExit(1)

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        validate(Path(arg))