"""Extract deterministic WebP frames for the cursor-tracking avatar.

Usage:
    python scripts/extract_character_frames.py
    python scripts/extract_character_frames.py --count 64 --neutral-index 191

The source is a continuous 8-second sequence. The extracted directional frames
are evenly sampled from genuine source frames; no pose is duplicated or
synthetically interpolated. ``center.webp`` is saved separately from the final
source frame, which is the neutral forward-facing frame for this footage.
"""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

import cv2
import numpy as np


DEFAULT_VIDEO = Path("public/IMG/character.mp4")
DEFAULT_OUTPUT = Path("public/frames")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--video", type=Path, default=DEFAULT_VIDEO)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--count", type=int, default=64)
    parser.add_argument(
        "--neutral-index",
        type=int,
        default=None,
        help="Source frame for center.webp; defaults to the last frame.",
    )
    parser.add_argument("--quality", type=int, default=92)
    return parser.parse_args()


def read_frame(capture: cv2.VideoCapture, index: int) -> np.ndarray:
    capture.set(cv2.CAP_PROP_POS_FRAMES, index)
    ok, frame = capture.read()
    if not ok:
        raise RuntimeError(f"Could not decode source frame {index}")
    return frame


def write_webp(path: Path, frame: np.ndarray, quality: int) -> None:
    ok = cv2.imwrite(str(path), frame, [cv2.IMWRITE_WEBP_QUALITY, quality])
    if not ok:
        raise RuntimeError(f"Could not write WebP frame: {path}")


def main() -> None:
    args = parse_args()
    if args.count < 1:
        raise ValueError("--count must be at least 1")
    if not 0 <= args.quality <= 100:
        raise ValueError("--quality must be between 0 and 100")
    if not args.video.exists():
        raise FileNotFoundError(f"Video not found: {args.video}")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    temporary_output = args.output.parent / f".{args.output.name}.tmp"
    backup_output = args.output.parent / f".{args.output.name}.backup"
    if temporary_output.exists():
        shutil.rmtree(temporary_output)
    if backup_output.exists():
        shutil.rmtree(backup_output)
    temporary_output.mkdir(parents=True)
    capture = cv2.VideoCapture(str(args.video))
    if not capture.isOpened():
        raise RuntimeError(f"Could not open video: {args.video}")

    frame_count = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
    if frame_count < 1:
        raise RuntimeError("The source video contains no frames")

    neutral_index = frame_count - 1 if args.neutral_index is None else args.neutral_index
    neutral_index = max(0, min(neutral_index, frame_count - 1))
    source_indices = np.linspace(0, frame_count - 1, args.count, dtype=int)

    write_webp(temporary_output / "center.webp", read_frame(capture, neutral_index), args.quality)
    for output_index, source_index in enumerate(source_indices):
        frame = read_frame(capture, int(source_index))
        write_webp(temporary_output / f"frame-{output_index:03d}.webp", frame, args.quality)

    capture.release()
    expected_files = args.count + 1
    if len(list(temporary_output.glob("*.webp"))) != expected_files:
        shutil.rmtree(temporary_output)
        raise RuntimeError("Frame extraction did not produce the expected number of WebP files")

    try:
        if args.output.exists():
            args.output.replace(backup_output)
        temporary_output.replace(args.output)
        if backup_output.exists():
            shutil.rmtree(backup_output)
    except Exception:
        if args.output.exists():
            shutil.rmtree(args.output)
        if backup_output.exists():
            backup_output.replace(args.output)
        if temporary_output.exists():
            shutil.rmtree(temporary_output)
        raise

    print(
        f"Extracted {args.count} genuine source frames plus center.webp "
        f"from {args.video} into {args.output}."
    )
    print(f"Neutral source frame: {neutral_index} / {frame_count - 1}")


if __name__ == "__main__":
    main()
