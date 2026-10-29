# Circuit Vision Lab

Job-ready dual-track learning portal for:

- **Track A — Circuit Vision** (electronics CV: PCB/schematic from images)
- **Track B — Network Config & Management** (labs, Netmiko, topology-as-code)

Static site · no signup · works on GitHub Pages.

## Live site

https://karthikvepuriphoto-gif.github.io/circuit-vision-lab/

## Local preview

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
```

## Contents

- Curated learning paths with links to public GitHub / DevNet resources
- Component ID quiz, photo & config-change checklists
- SPICE/netlist glossary, tool decision guide
- Netmiko cheat sheet & protocol reference
- Searchable resource directory

Prepared for learning · Circuit Vision lab

## Extras (drills, practice, templates, progress, playground)
- `extras.js` / `extras.css` add: Drills (netlist quiz, spot-the-wrong-config, flashcards),
  Practice sets (`assets/practice/*.svg`, original drawings with answer keys),
  Job templates (copy / download / print), Playground info page, My progress
  (localStorage, bookmark stars, JSON export/import), and Print / Save as PDF one-pagers.
- `playground/` — self-host instructions for the CircuitVision Streamlit app (Docker / free Hugging Face Space).
