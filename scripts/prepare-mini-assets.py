"""Create WeChat-friendly derivatives without modifying delivered source assets."""

from __future__ import annotations

import base64
import io
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "assets"
TARGET = ROOT / "src" / "generated-assets"
DATA_IMAGE = re.compile(r"data:image/(png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)")


def resize(image: Image.Image, max_width: int) -> Image.Image:
    if image.width <= max_width:
        return image.copy()
    height = max(1, round(image.height * max_width / image.width))
    return image.resize((max_width, height), Image.Resampling.LANCZOS)


def encode(image: Image.Image, quality: int, preserve_alpha: bool) -> tuple[str, bytes]:
    output = io.BytesIO()
    has_alpha = image.mode in {"RGBA", "LA"} or (image.mode == "P" and "transparency" in image.info)
    if preserve_alpha and has_alpha:
        image.save(output, format="PNG", optimize=True)
        return "png", output.getvalue()
    if has_alpha:
        rgba = image.convert("RGBA")
        flattened = Image.new("RGB", rgba.size, "white")
        flattened.paste(rgba, mask=rgba.getchannel("A"))
        image = flattened
    image.convert("RGB").save(output, format="JPEG", quality=quality, optimize=True, progressive=True)
    return "jpeg", output.getvalue()


def optimize_svg(relative: str, max_width: int, quality: int = 68, preserve_alpha: bool = False) -> None:
    source = SOURCE / relative
    target = TARGET / relative
    text = source.read_text(encoding="utf-8")

    def replace(match: re.Match[str]) -> str:
        raw = base64.b64decode(match.group(2))
        with Image.open(io.BytesIO(raw)) as image:
            kind, encoded = encode(resize(image, max_width), quality, preserve_alpha)
        return f"data:image/{kind};base64,{base64.b64encode(encoded).decode('ascii')}"

    optimized, count = DATA_IMAGE.subn(replace, text)
    if count == 0:
        raise RuntimeError(f"No embedded image found in {relative}")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(optimized, encoding="utf-8", newline="\n")


def optimize_raster(relative: str, output_relative: str, max_width: int, quality: int = 68) -> None:
    source = SOURCE / relative
    target = TARGET / output_relative
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        prepared = resize(image, max_width).convert("RGB")
        prepared.save(target, format="JPEG", quality=quality, optimize=True, progressive=True)


def main() -> None:
    svg_jobs = {
        "avator.svg": (480, True),
        "about.svg": (1000, False),
        "home/background.svg": (1000, True),
        "cases/flag-football-intro/thumbnail.svg": (640, False),
        "cases/flag-football-intro/carousel-001.svg": (1000, False),
        "cases/primary-volleyball-intro/carousel-001.svg": (1000, False),
        "resources/boundless-girls/image.svg": (1000, False),
        "resources/boundless-girls/thumbnail.svg": (400, True),
        "resources/EV/image.svg": (1000, False),
        "resources/EV/thumbnail.svg": (400, True),
    }
    for relative, (width, preserve_alpha) in svg_jobs.items():
        optimize_svg(relative, width, preserve_alpha=preserve_alpha)

    optimize_raster("home/carousel-001.png", "home/carousel-001.jpg", 1000, 68)

    for page in range(1, 4):
        name = f"lesson-plan-page-{page:03}.jpg"
        optimize_raster(f"cases/flag-football-intro/{name}", f"cases/flag-football-intro/{name}", 700, 62)
    for page in range(1, 7):
        source = f"cases/flag-football-intro/course-{page:03}.png"
        target = f"cases/flag-football-intro/course-{page:03}.jpg"
        optimize_raster(source, target, 700, 62)

    for page in range(1, 3):
        name = f"lesson-plan-{page:03}.jpg"
        optimize_raster(f"cases/primary-volleyball-intro/{name}", f"cases/primary-volleyball-intro/{name}", 700, 62)
    for page in range(1, 16):
        name = f"course-page-{page:03}.jpg"
        optimize_raster(f"cases/primary-volleyball-intro/{name}", f"cases/primary-volleyball-intro/{name}", 700, 62)


if __name__ == "__main__":
    main()
