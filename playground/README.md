# CircuitVision playground (self-host)

The Circuit Vision Lab site is static (GitHub Pages), so it cannot run the
image → netlist models. This folder lets anyone run the upstream
[JKc66/CircuitVision](https://github.com/JKc66/CircuitVision) Streamlit app
(Apache-2.0) themselves. **Nothing here is deployed automatically and nothing
costs money.**

Public demo by the upstream authors (third-party, may be offline):
https://CircuitVision.jawadk.me — don't upload confidential schematics.

## Requirements
- A Google Gemini API key (`GEMINI_API_KEY`) — CircuitVision uses Gemini to
  read component values. Google AI Studio has a free tier. Images are sent to
  that API.
- Docker, ~6 GB disk, 4 GB+ RAM (YOLO + SAM 2 models are downloaded on build).

## Option A — run locally with Docker
```bash
git clone https://github.com/JKc66/CircuitVision.git
cd CircuitVision
cp /path/to/circuit-vision-lab/playground/.env.example .env   # then edit .env
cp /path/to/circuit-vision-lab/playground/Dockerfile.playground .
docker compose -f /path/to/circuit-vision-lab/playground/docker-compose.yml --project-directory . up --build
# open http://localhost:8501
```
The compose file in this folder builds `Dockerfile.playground` from the current
directory (the CircuitVision checkout).

## Option B — free Hugging Face Docker Space
1. Create a free account at huggingface.co → New Space → SDK **Docker** →
   hardware **CPU basic (free)**.
2. Push the CircuitVision code to the Space repo, then copy
   `Dockerfile.playground` from this folder to the Space as `Dockerfile` and
   `space-README-header.md`'s front matter to the top of the Space's `README.md`.
3. In Space **Settings → Variables and secrets** add secret `GEMINI_API_KEY`.
4. The Space builds and serves on port 7860. Free Spaces sleep when idle.
   Docs: https://huggingface.co/docs/hub/spaces-sdks-docker

## Notes
- The upstream Dockerfile hard-codes `aarch64` library paths (ARM).
  `Dockerfile.playground` resolves the ngspice library path for the actual
  architecture (x86_64 on most hosts) instead.
- Test with the practice SVGs in `../assets/practice/` (convert to PNG first,
  e.g. `rsvg-convert set1-divider.svg -o set1.png`) and compare against the
  answer keys on the site's Practice page.
