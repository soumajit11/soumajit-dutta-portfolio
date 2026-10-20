"""Inspect the source avatar video and create a representative contact sheet.

Usage:
    python scripts/inspect_character_video.py
    python scripts/inspect_character_video.py --video public/IMG/character.mp4

The script intentionally performs no segmentation or synthetic pose creation. It
reports the footage that actually exists and saves representative source frames
for visual review.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import cv2
import numpy as np


DEFAULT_VIDEO = Path("public/IMG/character.mp4")
DEFAULT_OUTPUT = Path("public/frames/inspection")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--video", type=Path, default=DEFAULT_VIDEO)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    return parser.parse_args()


def rgb_hex(rgb: tuple[int, int, int]) -> str:
    return "#%02X%02X%02X" % rgb


def sample_background(frame: np.ndarray) -> dict[str, object]:
    """Estimate the background from corner patches and quantized colors."""
    height, width = frame.shape[:2]
    patch_size = max(8, min(height, width) // 12)
    patches = [
        frame[:patch_size, :patch_size],
        frame[:patch_size, width - patch_size :],
        frame[height - patch_size :, :patch_size],
        frame[height - patch_size :, width - patch_size :],
    ]
    pixels = np.concatenate([patch.reshape(-1, 3) for patch in patches], axis=0)
    pixels_rgb = pixels[:, ::-1].astype(np.int16)
    quantized = (pixels_rgb // 8) * 8
    colors, counts = np.unique(quantized, axis=0, return_counts=True)
    dominant = colors[int(np.argmax(counts))]
    distances = np.linalg.norm(pixels_rgb - dominant, axis=1)
    return {
        "dominant_rgb": [int(value) for value in dominant],
        "dominant_hex": rgb_hex(tuple(int(value) for value in dominant)),
        "corner_mean_rgb": [int(round(value)) for value in pixels_rgb.mean(axis=0)],
        "corner_std_rgb": [round(float(value), 2) for value in pixels_rgb.std(axis=0)],
        "corner_match_under_20px": round(float(np.mean(distances < 20)), 4),
    }


def add_label(image: np.ndarray, label: str) -> np.ndarray:
    canvas = image.copy()
    cv2.rectangle(canvas, (0, 0), (canvas.shape[1], 42), (8, 3, 5), -1)
    cv2.putText(
        canvas,
        label,
        (16, 28),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (230, 215, 217),
        1,
        cv2.LINE_AA,
    )
    return canvas


def main() -> None:
    args = parse_args()
    if not args.video.exists():
        raise FileNotFoundError(f"Video not found: {args.video}")

    args.output.mkdir(parents=True, exist_ok=True)
    capture = cv2.VideoCapture(str(args.video))
    if not capture.isOpened():
        raise RuntimeError(f"Could not open video: {args.video}")

    width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = float(capture.get(cv2.CAP_PROP_FPS) or 0)
    frame_count = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps if fps else 0
    sample_indices = np.linspace(0, max(frame_count - 1, 0), 9, dtype=int)
    sampled: list[tuple[int, np.ndarray]] = []

    for index in sample_indices:
        capture.set(cv2.CAP_PROP_POS_FRAMES, int(index))
        ok, frame = capture.read()
        if ok:
            sampled.append((int(index), frame))
            cv2.imwrite(str(args.output / f"source-{int(index):04d}.png"), frame)

    capture.release()
    if not sampled:
        raise RuntimeError("No decodable frames were found")

    first_background = sample_background(sampled[0][1])
    background_samples = [sample_background(frame) for _, frame in sampled]
    background_values = np.array([item["dominant_rgb"] for item in background_samples])
    background_summary = {
        **first_background,
        "dominant_rgb_range": [
            int(background_values[:, channel].min()) for channel in range(3)
        ]
        + [int(background_values[:, channel].max()) for channel in range(3)],
        "appears_uniform": bool(np.ptp(background_values, axis=0).max() <= 24),
    }

    tile_width = 220
    tiles: list[np.ndarray] = []
    for index, frame in sampled:
        scale = tile_width / frame.shape[1]
        tile = cv2.resize(frame, (tile_width, int(frame.shape[0] * scale)))
        tiles.append(add_label(tile, f"frame {index} // {index / fps:.2f}s" if fps else f"frame {index}"))

    tile_height = max(tile.shape[0] for tile in tiles)
    rows: list[np.ndarray] = []
    for row_start in range(0, len(tiles), 3):
        row_tiles = tiles[row_start : row_start + 3]
        row = np.zeros((tile_height, tile_width * 3, 3), dtype=np.uint8)
        for column, tile in enumerate(row_tiles):
            row[: tile.shape[0], column * tile_width : (column + 1) * tile_width] = tile
        rows.append(row)
    contact_sheet = np.vstack(rows)
    contact_sheet_path = args.output / "contact-sheet.jpg"
    cv2.imwrite(str(contact_sheet_path), contact_sheet, [cv2.IMWRITE_JPEG_QUALITY, 92])

    report = {
        "video": str(args.video).replace("\\", "/"),
        "width": width,
        "height": height,
        "fps": fps,
        "frame_count": frame_count,
        "duration_seconds": round(duration, 4),
        "representative_frames": [
            {"index": index, "timestamp_seconds": round(index / fps, 4) if fps else None}
            for index, _ in sampled
        ],
        "background": background_summary,
        "visual_assessment": {
            "pose_type": "continuous animated sequence",
            "directional_pose_count": "not classified into synthetic directions",
            "note": "Review contact-sheet.jpg before changing the neutral frame or face-center configuration.",
        },
        "contact_sheet": str(contact_sheet_path).replace("\\", "/"),
    }
    (args.output / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
