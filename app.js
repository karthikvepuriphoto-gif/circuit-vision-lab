(function () {
  "use strict";

  const VIEWS = ["home", "circuit", "network", "ask", "resources"];

  /* ---------- Theme ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("cvlab-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(storedTheme || (prefersDark ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cvlab-theme", next);
  });

  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    themeToggle.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  /* ---------- Nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = el.getAttribute("data-nav");
      if (!VIEWS.includes(id)) return;
      e.preventDefault();
      showView(id);
      history.pushState(null, "", "#" + id);
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("hashchange", () => routeFromHash());
  routeFromHash();

  function routeFromHash() {
    const hash = (location.hash || "#home").replace(/^#/, "");
    const base = hash.split("-")[0];
    if (VIEWS.includes(base)) {
      showView(base);
      if (hash.includes("-")) {
        const target = document.getElementById(hash);
        if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    } else if (document.getElementById(hash)) {
      const section = document.getElementById(hash);
      const parent = section.closest(".view");
      if (parent) {
        showView(parent.id);
        setTimeout(() => section.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    } else {
      showView("home");
    }
  }

  function showView(id) {
    document.querySelectorAll(".view").forEach((v) => {
      const on = v.id === id;
      v.hidden = !on;
      v.classList.toggle("active", on);
    });
    document.querySelectorAll(".site-nav a[data-nav]").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("data-nav") === id);
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ---------- Resources ---------- */
  const RESOURCES = [
    {
      track: "circuit",
      name: "CircuitVision",
      url: "https://github.com/JKc66/CircuitVision",
      blurb: "Streamlit app: image → parts → netlist. Fastest hands-on start.",
      tags: "streamlit netlist detection beginner",
    },
    {
      track: "circuit",
      name: "Image2schematic",
      url: "https://github.com/s39674/Image2schematic",
      blurb: "PCB photo to schematic pipeline with a clear teaching narrative.",
      tags: "pcb schematic pipeline",
    },
    {
      track: "circuit",
      name: "PCB-Component-Detection",
      url: "https://github.com/s39674/PCB-Component-Detection",
      blurb: "Detect and classify components on printed circuit boards.",
      tags: "pcb detection cv yolo",
    },
    {
      track: "circuit",
      name: "PCB-Detection",
      url: "https://github.com/SanderGi/PCB-Detection",
      blurb: "Alternate PCB detection approach — compare models and data.",
      tags: "pcb detection cv",
    },
    {
      track: "circuit",
      name: "Netlistify",
      url: "https://github.com/NYCU-AI-EDA/Netlistify",
      blurb: "Schematic to SPICE/netlist with stronger EDA-oriented models.",
      tags: "spice netlist schematic advanced",
    },
    {
      track: "network",
      name: "NetAutLabs",
      url: "https://github.com/NetAutLabs/netautlabs",
      blurb: "Beginner→pro network automation labs; Codespaces-friendly.",
      tags: "labs automation beginner codespaces",
    },
    {
      track: "network",
      name: "netprog_basics",
      url: "https://github.com/CiscoDevNet/netprog_basics",
      blurb: "Cisco DevNet structured NetDevOps course content.",
      tags: "cisco course netdevops python",
    },
    {
      track: "network",
      name: "DevNet Learning Labs",
      url: "https://developer.cisco.com/learning/",
      blurb: "Official Cisco interactive labs and sandboxes.",
      tags: "cisco learning sandbox api",
    },
    {
      track: "network",
      name: "Netmiko",
      url: "https://github.com/ktbyers/netmiko",
      blurb: "Multi-vendor SSH library for config push/pull in Python.",
      tags: "ssh python automation netmiko",
    },
    {
      track: "network",
      name: "Containerlab",
      url: "https://github.com/srl-labs/containerlab",
      blurb: "Real lab topologies as code for safe practice.",
      tags: "lab topology docker containerlab",
    },
    {
      track: "network",
      name: "netlab",
      url: "https://github.com/ipspace/netlab",
      blurb: "High-level network lab orchestration (ipspace).",
      tags: "lab orchestration netlab",
    },
    {
      track: "network",
      name: "awesome-network-automation",
      url: "https://github.com/networktocode/awesome-network-automation",
      blurb: "Curated directory of tools, books, and communities.",
      tags: "directory awesome ansible napalm",
    },
  ];

  let resourceFilter = "all";
  const resourceGrid = document.getElementById("resourceGrid");
  const resourceSearch = document.getElementById("resourceSearch");
  const resourceEmpty = document.getElementById("resourceEmpty");

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      resourceFilter = chip.dataset.filter;
      renderResources();
    });
  });
  resourceSearch.addEventListener("input", renderResources);

  function renderResources() {
    const q = resourceSearch.value.trim().toLowerCase();
    const items = RESOURCES.filter((r) => {
      if (resourceFilter !== "all" && r.track !== resourceFilter) return false;
      if (!q) return true;
      const hay = (r.name + " " + r.blurb + " " + r.tags + " " + r.track).toLowerCase();
      return hay.includes(q);
    });
    resourceGrid.innerHTML = items
      .map(
        (r) => `
      <a class="resource-card" href="${r.url}" target="_blank" rel="noopener">
        <span class="track-pill ${r.track}">${r.track === "circuit" ? "Circuit Vision" : "Networks"}</span>
        <h3>${escapeHtml(r.name)}</h3>
        <p>${escapeHtml(r.blurb)}</p>
      </a>`
      )
      .join("");
    resourceEmpty.hidden = items.length > 0;
  }
  renderResources();

  /* ---------- Glossaries & guides ---------- */
  const GLOSSARY = [
    ["Netlist", "A text description of components and how their pins/terminals connect. The bridge from a drawing to simulation or layout."],
    ["SPICE", "Simulation Program with Integrated Circuit Emphasis — industry-standard circuit simulator (and file formats that feed it)."],
    ["Node / Net", "An electrically common point. Wires that connect share a node name in a netlist."],
    ["Ground (0 / GND)", "Reference node, often named 0 in SPICE. All voltages are relative to ground."],
    ["Passive", "Resistors (R), capacitors (C), inductors (L) — no amplification; defined by impedance."],
    ["Active / Semiconductor", "Diodes, transistors, ICs that need models (and often power pins) for correct simulation."],
    ["Symbol vs footprint", "Schematic symbol is logical; footprint is the physical PCB land pattern. CV pipelines often mix both."],
    ["BOM", "Bill of Materials — list of part types/values/quantities extracted after detection."],
    ["Annotation", "Assigning unique designators (R1, C3, U2) so each instance is distinct in the netlist."],
    ["Schematic capture", "Drawing or reconstructing the logical circuit diagram from images or CAD."],
  ];

  document.getElementById("spiceGlossary").innerHTML = GLOSSARY.map(
    ([t, d]) => `<dt>${escapeHtml(t)}</dt><dd>${escapeHtml(d)}</dd>`
  ).join("");

  const TOOL_GUIDE = [
    {
      title: "Need a quick demo for stakeholders?",
      body: "Run a Streamlit upload → detect → netlist flow without deep ML setup.",
      rec: "Use CircuitVision",
    },
    {
      title: "Learning the full photo → schematic pipeline?",
      body: "You want to understand preprocessing, detection, and reconstruction steps.",
      rec: "Start with Image2schematic, then PCB-Component-Detection",
    },
    {
      title: "Comparing detection models / datasets?",
      body: "Evaluate accuracy on your board photos; try more than one detector.",
      rec: "PCB-Component-Detection + PCB-Detection side by side",
    },
    {
      title: "Need simulation-ready SPICE from schematics?",
      body: "Stronger EDA-oriented models and netlist fidelity matter more than a demo UI.",
      rec: "Use Netlistify",
    },
  ];

  document.getElementById("toolGuide").innerHTML =
    '<div class="decision-grid">' +
    TOOL_GUIDE.map(
      (c) => `
      <div class="decision-card">
        <h3>${escapeHtml(c.title)}</h3>
        <p>${escapeHtml(c.body)}</p>
        <p class="rec">→ ${escapeHtml(c.rec)}</p>
      </div>`
    ).join("") +
    "</div>";

  /* ---------- Checklists ---------- */
  const PHOTO_ITEMS = [
    "Even lighting; avoid harsh glare and deep shadows on silkscreen",
    "Camera parallel to the board (minimize perspective warp)",
    "Entire board in frame with a small margin; or stitch tiles if large",
    "Sharp focus on component bodies and reference designators",
    "Include a scale reference (ruler / known connector size) if sharing externally",
    "Capture both sides if double-sided; note which is top",
    "Photo of connectors / edge labels for orientation",
    "Handoff note: board name, revision, voltage domains, known hazards",
    "Export originals (not heavily compressed WhatsApp/social crops)",
    "Redact or crop proprietary markings if policy requires before upload to tools",
  ];

  const CHANGE_ITEMS = [
    "Confirm change window / approval and rollback owner",
    "Identify exact devices (hostname, IP, management VRF) in inventory",
    "Backup running-config (and startup if separate) to versioned storage",
    "Document intended diff before typing (or generate from template)",
    "Test the same change in lab / Containerlab / netlab when risk is non-trivial",
    "Disable paging; collect pre-change show outputs for key interfaces/routes",
    "Apply change; capture session log",
    "Validate with show commands / probes / monitoring dashboards",
    "Save config only after validation passes",
    "If fail: execute rollback from backup; re-validate; escalate if needed",
    "Update ticket with before/after evidence and leftover follow-ups",
  ];

  mountChecklist("photoChecklist", "cv-photo-checklist", PHOTO_ITEMS, "resetPhotoChecklist");
  mountChecklist("changeChecklist", "net-change-checklist", CHANGE_ITEMS, "resetChangeChecklist");

  function mountChecklist(listId, storageKey, items, resetBtnId) {
    const ul = document.getElementById(listId);
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

    function render() {
      ul.innerHTML = items
        .map((text, i) => {
          const checked = !!saved[i];
          return `<li class="${checked ? "done" : ""}">
            <input type="checkbox" id="${listId}-${i}" ${checked ? "checked" : ""} data-i="${i}" />
            <label for="${listId}-${i}">${escapeHtml(text)}</label>
          </li>`;
        })
        .join("");
    }

    ul.addEventListener("change", (e) => {
      const t = e.target;
      if (t.matches('input[type="checkbox"]')) {
        saved[t.dataset.i] = t.checked;
        localStorage.setItem(storageKey, JSON.stringify(saved));
        t.closest("li").classList.toggle("done", t.checked);
      }
    });

    document.getElementById(resetBtnId).addEventListener("click", () => {
      Object.keys(saved).forEach((k) => delete saved[k]);
      localStorage.setItem(storageKey, "{}");
      render();
    });

    render();
  }

  /* ---------- Component quiz ---------- */
  const QUIZ = [
    {
      answer: "Resistor",
      options: ["Resistor", "Capacitor", "Inductor", "Diode"],
      hint: "Limits current; zigzag or rectangle symbol; often color bands on through-hole parts.",
      visual: svgResistor,
    },
    {
      answer: "Capacitor",
      options: ["Resistor", "Capacitor", "Transistor", "Fuse"],
      hint: "Stores charge; two plates (or polarized can). Look for + marking on electrolytics.",
      visual: svgCapacitor,
    },
    {
      answer: "Inductor",
      options: ["Inductor", "Resistor", "Crystal", "LED"],
      hint: "Coil of wire; stores energy in a magnetic field; often a looped symbol.",
      visual: svgInductor,
    },
    {
      answer: "Diode",
      options: ["Diode", "Resistor", "Switch", "Connector"],
      hint: "Allows current mainly one way; triangle + bar. LEDs are diodes that emit light.",
      visual: svgDiode,
    },
    {
      answer: "IC / Chip",
      options: ["IC / Chip", "Resistor", "Battery", "Speaker"],
      hint: "Black rectangular package with many pins; labeled U# on schematics.",
      visual: () => `<span style="font-size:2.5rem">⬛</span><div style="font-size:0.85rem;margin-top:0.4rem;color:var(--text-muted)">Multi-pin package</div>`,
    },
    {
      answer: "Transistor",
      options: ["Transistor", "Capacitor", "Fuse", "Crystal"],
      hint: "Three-terminal amplifier/switch (BJT/MOSFET); often TO-92 or SOT packages.",
      visual: svgTransistor,
    },
    {
      answer: "Crystal / Oscillator",
      options: ["Crystal / Oscillator", "Inductor", "Diode", "Relay"],
      hint: "Provides a clock reference; metal can or tiny SMD; schematic looks like a capacitor with plates.",
      visual: () => `<span style="font-size:2.5rem">◇</span><div style="font-size:0.85rem;margin-top:0.4rem;color:var(--text-muted)">Timing reference</div>`,
    },
    {
      answer: "LED",
      options: ["LED", "Resistor", "Inductor", "Battery"],
      hint: "Light-emitting diode; diode symbol plus arrows for light; polarity matters.",
      visual: () => `<span style="font-size:2.8rem">💡</span>`,
    },
  ];

  let quizOrder = shuffle([...QUIZ.keys()]);
  let quizIndex = 0;
  let quizScore = 0;
  let answered = false;

  const quizProgress = document.getElementById("quizProgress");
  const quizVisual = document.getElementById("quizVisual");
  const quizPrompt = document.getElementById("quizPrompt");
  const quizOptions = document.getElementById("quizOptions");
  const quizFeedback = document.getElementById("quizFeedback");
  const quizNext = document.getElementById("quizNext");
  const quizRestart = document.getElementById("quizRestart");

  quizNext.addEventListener("click", () => {
    quizIndex++;
    if (quizIndex >= quizOrder.length) {
      finishQuiz();
    } else {
      loadQuizQuestion();
    }
  });
  quizRestart.addEventListener("click", startQuiz);

  function startQuiz() {
    quizOrder = shuffle([...QUIZ.keys()]);
    quizIndex = 0;
    quizScore = 0;
    quizRestart.hidden = true;
    loadQuizQuestion();
  }

  function loadQuizQuestion() {
    answered = false;
    quizNext.hidden = true;
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
    const q = QUIZ[quizOrder[quizIndex]];
    quizProgress.textContent = `Question ${quizIndex + 1} of ${quizOrder.length} · Score ${quizScore}`;
    quizVisual.innerHTML = q.visual();
    quizPrompt.textContent = "What component is this?";
    const opts = shuffle([...q.options]);
    quizOptions.innerHTML = opts
      .map((o) => `<button type="button" data-answer="${escapeAttr(o)}">${escapeHtml(o)}</button>`)
      .join("");
    quizOptions.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => onAnswer(btn, q));
    });
  }

  function onAnswer(btn, q) {
    if (answered) return;
    answered = true;
    const correct = btn.dataset.answer === q.answer;
    quizOptions.querySelectorAll("button").forEach((b) => {
      b.disabled = true;
      if (b.dataset.answer === q.answer) b.classList.add("correct");
      if (b === btn && !correct) b.classList.add("wrong");
    });
    if (correct) {
      quizScore++;
      quizFeedback.textContent = "Correct. " + q.hint;
      quizFeedback.classList.add("ok");
    } else {
      quizFeedback.textContent = `Not quite — it’s a ${q.answer}. ${q.hint}`;
      quizFeedback.classList.add("bad");
    }
    quizProgress.textContent = `Question ${quizIndex + 1} of ${quizOrder.length} · Score ${quizScore}`;
    quizNext.hidden = false;
    quizNext.textContent = quizIndex + 1 >= quizOrder.length ? "See results" : "Next";
  }

  function finishQuiz() {
    quizVisual.innerHTML = `<span style="font-size:2.5rem">✅</span>`;
    quizPrompt.textContent = `Done — ${quizScore} / ${quizOrder.length} correct`;
    quizOptions.innerHTML = "";
    quizFeedback.textContent =
      quizScore === quizOrder.length
        ? "Excellent recognition — ready to annotate boards faster."
        : "Review the misses, then retry. Designators (R, C, L, D, U, Q) help on real boards.";
    quizFeedback.className = "quiz-feedback ok";
    quizNext.hidden = true;
    quizRestart.hidden = false;
  }

  function svgResistor() {
    return `<svg viewBox="0 0 160 60" width="160" height="60" aria-hidden="true">
      <line x1="10" y1="30" x2="40" y2="30" stroke="currentColor" stroke-width="3"/>
      <polyline fill="none" stroke="currentColor" stroke-width="3" points="40,30 50,10 70,50 90,10 110,50 120,30"/>
      <line x1="120" y1="30" x2="150" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`;
  }
  function svgCapacitor() {
    return `<svg viewBox="0 0 160 60" width="160" height="60" aria-hidden="true">
      <line x1="10" y1="30" x2="65" y2="30" stroke="currentColor" stroke-width="3"/>
      <line x1="70" y1="10" x2="70" y2="50" stroke="currentColor" stroke-width="4"/>
      <line x1="90" y1="10" x2="90" y2="50" stroke="currentColor" stroke-width="4"/>
      <line x1="95" y1="30" x2="150" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`;
  }
  function svgInductor() {
    return `<svg viewBox="0 0 160 60" width="160" height="60" aria-hidden="true">
      <line x1="10" y1="35" x2="30" y2="35" stroke="currentColor" stroke-width="3"/>
      <path d="M30 35 a12 12 0 0 1 24 0 a12 12 0 0 1 24 0 a12 12 0 0 1 24 0 a12 12 0 0 1 24 0" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="126" y1="35" x2="150" y2="35" stroke="currentColor" stroke-width="3"/>
    </svg>`;
  }
  function svgDiode() {
    return `<svg viewBox="0 0 160 60" width="160" height="60" aria-hidden="true">
      <line x1="10" y1="30" x2="55" y2="30" stroke="currentColor" stroke-width="3"/>
      <polygon points="55,10 55,50 95,30" fill="currentColor"/>
      <line x1="95" y1="10" x2="95" y2="50" stroke="currentColor" stroke-width="4"/>
      <line x1="95" y1="30" x2="150" y2="30" stroke="currentColor" stroke-width="3"/>
    </svg>`;
  }
  function svgTransistor() {
    return `<svg viewBox="0 0 120 100" width="100" height="85" aria-hidden="true">
      <line x1="20" y1="50" x2="50" y2="50" stroke="currentColor" stroke-width="3"/>
      <line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="4"/>
      <line x1="50" y1="35" x2="90" y2="15" stroke="currentColor" stroke-width="3"/>
      <line x1="50" y1="65" x2="90" y2="85" stroke="currentColor" stroke-width="3"/>
      <polygon points="78,78 90,85 82,70" fill="currentColor"/>
    </svg>`;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  startQuiz();
})();
