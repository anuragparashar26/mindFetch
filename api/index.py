"""Vercel entrypoint when the repository root is the project root."""

import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parents[1] / "backend"
sys.path.insert(0, str(backend_dir))

from main import app  # noqa: E402

