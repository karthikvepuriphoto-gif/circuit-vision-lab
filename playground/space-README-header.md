---
title: CircuitVision Playground
emoji: ⚡
colorFrom: green
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
license: apache-2.0
---
Set the Space secret GEMINI_API_KEY. The Dockerfile reads $PORT; add
`ENV PORT=7860` (or a Space variable PORT=7860) so Streamlit listens on 7860.
