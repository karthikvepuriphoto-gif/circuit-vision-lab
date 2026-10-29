/* Circuit Vision Lab — extras: drills, practice sets, templates, playground,
   progress/bookmarks, print one-pagers. Self-contained; loaded before app.js. */
(function () {
  "use strict";
  const KEY = "cvlab-progress-v1";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const main = document.getElementById("main");
  const nav = document.getElementById("siteNav");

  /* ---------- Progress store ---------- */
  function load() {
    try { return Object.assign({ done: {}, bookmarks: {}, scores: {} }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return { done: {}, bookmarks: {}, scores: {} }; }
  }
  let state = load();
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); renderProgress(); }
  function markDone(id, on) { if (on) state.done[id] = new Date().toISOString(); else delete state.done[id]; save(); syncDoneButtons(); }
  function setScore(id, score, total) { const prev = state.scores[id]; if (!prev || score >= prev.score) state.scores[id] = { score, total, at: new Date().toISOString() }; if (score / total >= 0.6) state.done[id] = state.done[id] || new Date().toISOString(); save(); syncDoneButtons(); }

  const LESSONS = [
    ["circuit-path", "Circuit Vision · Learning path"], ["circuit-quiz", "Circuit Vision · Component quiz"],
    ["circuit-photo", "Circuit Vision · Photo checklist"], ["circuit-glossary", "Circuit Vision · Glossary"],
    ["circuit-tools", "Circuit Vision · Tool guide"], ["net-path", "Networks · Learning path"],
    ["net-lab", "Networks · Lab path"], ["net-change", "Networks · Change checklist"],
    ["net-netmiko", "Networks · Netmiko sheet"], ["net-protocols", "Networks · Protocols"],
    ["drill-netlist", "Drill · Netlist reading quiz"], ["drill-config", "Drill · Spot the wrong config"],
    ["drill-flash", "Drill · Flashcards"], ["practice-1", "Practice · Set 1 voltage divider"],
    ["practice-2", "Practice · Set 2 RC + LED"], ["practice-3", "Practice · Set 3 board ID"],
  ];

  /* ---------- Views ---------- */
  function view(id, eyebrow, title, lede, body) {
    const s = document.createElement("section");
    s.id = id; s.className = "view"; s.hidden = true;
    s.setAttribute("aria-labelledby", id + "-title");
    s.innerHTML = `<header class="view-header"><p class="eyebrow">${eyebrow}</p><h1 id="${id}-title">${title}</h1><p class="lede">${lede}</p></header>${body}`;
    main.appendChild(s);
    return s;
  }

  /* ===== DRILLS ===== */
  const NETLIST_Q = [
    { net: "* Voltage divider\nV1 in 0 DC 12\nR1 in out 10k\nR2 out 0 10k\n.op\n.end", q: "What is the DC voltage at node out?", a: ["6 V", "12 V", "3 V", "0 V"], c: 0, why: "Equal resistors split the source in half: 12 × 10k / (10k + 10k) = 6 V." },
    { net: "* Voltage divider\nV1 in 0 DC 12\nR1 in out 10k\nR2 out 0 10k", q: "Which node is ground in SPICE?", a: ["0", "in", "out", "V1"], c: 0, why: "Node 0 is always the ground/reference node in SPICE (many tools also accept gnd)." },
    { net: "R1 in out 1k\nC1 out 0 1u", q: "What kind of filter is this (input at in, output at out)?", a: ["RC low-pass", "RC high-pass", "LC band-pass", "Voltage divider"], c: 0, why: "Series R then shunt C to ground passes low frequencies. Cutoff fc = 1/(2πRC) ≈ 159 Hz." },
    { net: "C1 out 0 100n", q: "What is the value of C1?", a: ["100 nF", "100 F", "100 mF", "100 pF"], c: 0, why: "SPICE suffix n = nano (1e-9), so 100n = 100 nF = 0.1 µF." },
    { net: "R5 a b 1M", q: "In SPICE, what is the value of R5?", a: ["1 milliohm", "1 megohm", "1 ohm", "1 kilohm"], c: 0, why: "Classic trap: SPICE suffixes are case-insensitive and M means milli. Use 1MEG (or 1e6) for a megohm." },
    { net: "D1 n2 0 LEDMODEL", q: "Which node is the diode's anode?", a: ["n2", "0", "LEDMODEL", "Cannot tell"], c: 0, why: "SPICE diode syntax is D<name> <anode> <cathode> <model>. Current flows n2 → 0 when forward biased." },
    { net: "Q1 c b e 2N3904", q: "For a BJT line, what is the node order?", a: ["Collector, base, emitter", "Base, collector, emitter", "Emitter, base, collector", "Gate, drain, source"], c: 0, why: "SPICE BJT syntax: Q<name> <collector> <base> <emitter> [substrate] <model>." },
    { net: "V1 in 0 DC 5\nR1 in a 1k\nR2 a 0 2k\nR3 a 0 2k", q: "How many elements connect to node a?", a: ["3", "2", "4", "1"], c: 0, why: "R1, R2 and R3 all list node a. Counting node connections is how you sanity-check a netlist built by a CV tool." },
  ];

  const CONFIG_Q = [
    { title: "Uplink is down after a new install", snip: "interface GigabitEthernet0/1\n description Uplink to core\n ip address 10.1.1.1 255.255.255.0\n shutdown", a: ["The interface is still administratively shut down", "The subnet mask is wrong", "Descriptions are not allowed on routed ports", "GigabitEthernet needs speed set manually"], c: 0, why: "Router interfaces on Cisco IOS default to shutdown. Add `no shutdown`; `show ip interface brief` would show “administratively down”." },
    { title: "Goal: SSH-only management", snip: "line vty 0 4\n login local\n transport input telnet", a: ["transport input should be ssh", "login local disables SSH", "vty 0 4 is too few lines", "Nothing is wrong"], c: 0, why: "`transport input telnet` allows only Telnet (clear text). For SSH-only use `transport input ssh`, and generate RSA keys first." },
    { title: "Added VLAN 30 to a trunk — VLANs 10 and 20 broke", snip: "interface GigabitEthernet1/0/48\n switchport mode trunk\n switchport trunk allowed vlan 10,20\n!\n! later change:\n switchport trunk allowed vlan 30", a: ["The second command replaced the list; it should be 'allowed vlan add 30'", "VLAN 30 does not exist by default", "Trunks need 'switchport access vlan'", "Port 48 cannot trunk"], c: 0, why: "`switchport trunk allowed vlan 30` overwrites the allowed list. Use `switchport trunk allowed vlan add 30`. A very common outage cause." },
    { title: "OSPF neighbors never come up", snip: "! R1\nrouter ospf 1\n network 10.0.12.0 0.0.0.3 area 0\n! R2\nrouter ospf 1\n network 10.0.12.0 0.0.0.3 area 1", a: ["Area ID mismatch on the shared link", "Process IDs must differ", "Wildcard 0.0.0.3 is invalid", "OSPF needs a static route first"], c: 0, why: "Both ends of a link must be in the same OSPF area. Process IDs are locally significant and may differ." },
    { title: "Route to the 192.168.10.0/24 branch doesn't work", snip: "ip route 192.168.10.0 255.255.255.255 10.0.0.2", a: ["The mask is /32 (a single host) instead of 255.255.255.0", "The next hop must be an interface name", "Static routes need 'permanent'", "192.168.10.0 is reserved"], c: 0, why: "255.255.255.255 matches only one host. For the whole branch LAN use 255.255.255.0." },
    { title: "After applying ACL, only HTTPS works — routing and SSH dropped", snip: "ip access-list extended EDGE-IN\n permit tcp any host 10.0.0.10 eq 443\n!\ninterface GigabitEthernet0/0\n ip access-group EDGE-IN in", a: ["Implicit deny at the end blocks everything not permitted", "ACLs must be applied 'out'", "Port 443 should be written https only", "Extended ACLs can't match hosts"], c: 0, why: "Every ACL ends with an implicit `deny ip any any`. Explicitly permit needed traffic (routing protocol, management) before applying." },
    { title: "Netmiko script 'runs' but config never changes", snip: "conn = ConnectHandler(**device)\nconn.send_command(\"interface Gi0/1\")\nconn.send_command(\"description TEST\")", a: ["Use send_config_set() for config commands", "device_type must be 'ios'", "ConnectHandler needs .connect()", "Descriptions need quotes"], c: 0, why: "send_command() runs exec-mode commands. send_config_set([...]) enters config mode, sends the lines, and exits. Then save with save_config()." },
  ];

  const FLASH = [
    ["NETCONF", "Default transport and port?", "SSH, TCP port 830 (RFC 6242)."],
    ["NETCONF", "Name three standard datastores.", "running, candidate, startup (candidate/startup are optional capabilities)."],
    ["NETCONF", "Which operation changes config? Which reads it?", "<edit-config> changes it; <get-config> reads config; <get> reads config + state."],
    ["NETCONF", "What data format and modeling language?", "XML-encoded RPCs; data modeled in YANG."],
    ["RESTCONF", "What is RESTCONF?", "An HTTP-based API (RFC 8040) to YANG-modeled data. Runs over HTTPS."],
    ["RESTCONF", "Common media type for JSON?", "application/yang-data+json (XML: application/yang-data+xml)."],
    ["RESTCONF", "Map HTTP methods to actions.", "GET read, POST create, PUT create/replace, PATCH merge, DELETE remove."],
    ["Ansible", "Agent or agentless?", "Agentless. Network modules usually connect over SSH (network_cli), NETCONF, or HTTP APIs (httpapi)."],
    ["Ansible", "What is idempotency?", "Running the same playbook twice makes no further changes the second time if the device is already in the desired state."],
    ["Ansible", "How do you dry-run a playbook?", "ansible-playbook site.yml --check --diff (module must support check mode)."],
    ["Ansible", "What is an inventory?", "The list of hosts and groups (INI or YAML), plus variables, that playbooks target."],
    ["Nornir", "What is Nornir?", "A pure-Python automation framework: inventory + concurrent task execution, written and debugged as normal Python."],
    ["Nornir", "How does Nornir connect to devices?", "Through plugins, e.g. nornir_netmiko, nornir_napalm, nornir_scrapli."],
    ["Nornir", "How do you target a subset of hosts?", "nr.filter(...) e.g. nr.filter(site=\"dallas\") or with F() objects for complex filters."],
    ["SSH", "Default port and recommended version?", "TCP 22; use SSHv2 only (ip ssh version 2 on Cisco IOS)."],
    ["SSH", "Cisco IOS prerequisites to enable SSH?", "hostname, ip domain-name, crypto key generate rsa (2048+ bits), local user or AAA, transport input ssh on VTYs."],
    ["SSH", "Why prefer key-based auth?", "No reusable password over the wire, easier to rotate and revoke, and works well with automation."],
  ];

  function quizBlock(id, items, renderItem) {
    return `<div class="quiz xq" id="${id}"><div class="quiz-progress" aria-live="polite"></div><div class="xq-body"></div><div class="quiz-options" role="group" aria-label="Answers"></div><p class="quiz-feedback" role="status"></p><div class="quiz-actions"><button type="button" class="btn secondary xq-next" hidden>Next</button><button type="button" class="btn primary xq-restart" hidden>Restart</button></div></div>`;
  }
  function mountQuiz(id, items, renderBody) {
    const root = document.getElementById(id);
    const prog = root.querySelector(".quiz-progress"), body = root.querySelector(".xq-body"), opts = root.querySelector(".quiz-options"), fb = root.querySelector(".quiz-feedback"), next = root.querySelector(".xq-next"), restart = root.querySelector(".xq-restart");
    let i = 0, score = 0, order = [];
    function start() { order = items.map((_, k) => k).sort(() => Math.random() - 0.5); i = 0; score = 0; show(); }
    function show() {
      const q = items[order[i]];
      prog.textContent = `Question ${i + 1} of ${items.length} · Score ${score}`;
      body.innerHTML = renderBody(q);
      fb.textContent = ""; fb.className = "quiz-feedback"; next.hidden = true; restart.hidden = true;
      const mix = q.a.map((t, k) => ({ t, k })).sort(() => Math.random() - 0.5);
      opts.innerHTML = mix.map((o) => `<button type="button" data-k="${o.k}">${esc(o.t)}</button>`).join("");
      opts.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        const ok = +b.dataset.k === q.c;
        if (ok) score++;
        opts.querySelectorAll("button").forEach((x) => { x.disabled = true; if (+x.dataset.k === q.c) x.classList.add("correct"); });
        if (!ok) b.classList.add("wrong");
        fb.className = "quiz-feedback " + (ok ? "ok" : "bad");
        fb.innerHTML = (ok ? "Correct. " : "Not quite. ") + esc(q.why).replace(/`([^`]+)`/g, "<code>$1</code>");
        prog.textContent = `Question ${i + 1} of ${items.length} · Score ${score}`;
        if (i < items.length - 1) next.hidden = false; else { restart.hidden = false; setScore(root.dataset.lesson, score, items.length); fb.innerHTML += `<br><strong>Finished: ${score}/${items.length}.</strong> Saved to My progress.`; }
      }));
    }
    next.addEventListener("click", () => { if (i < items.length - 1) { i++; show(); } });
    restart.addEventListener("click", start);
    start();
  }

  const flashCats = ["All", ...new Set(FLASH.map((f) => f[0]))];
  view("drills", "Practice · Both tracks", "Drills", "Short, self-checking drills. Scores are saved in this browser under My progress.",
    `<nav class="subnav" aria-label="Drill sections"><a href="#drill-netlist">Netlist reading</a><a href="#drill-config">Spot the wrong config</a><a href="#drill-flash">Flashcards</a></nav>
     <article id="drill-netlist" class="panel"><h2>Netlist reading quiz</h2><p>Read the SPICE netlist, then answer. This is exactly what you check after a CV tool outputs a netlist.</p>${quizBlock("xqNetlist")}</article>
     <article id="drill-config" class="panel"><h2>Spot the wrong config</h2><p>Each scenario shows a snippet (Cisco IOS-style unless noted) and a symptom. Pick the error.</p>${quizBlock("xqConfig")}</article>
     <article id="drill-flash" class="panel"><h2>Flashcards</h2><p>Tap the card to flip. NETCONF, RESTCONF, Ansible, Nornir and SSH.</p>
       <div class="filter-chips" id="flashCats" role="group" aria-label="Flashcard topic">${flashCats.map((c, k) => `<button type="button" class="chip${k ? "" : " active"}" data-cat="${c}">${c}</button>`).join("")}</div>
       <button type="button" class="flashcard" id="flashCard" aria-live="polite"></button>
       <div class="quiz-actions"><button type="button" class="btn ghost" id="flashPrev">← Prev</button><button type="button" class="btn secondary" id="flashNext">Next →</button><span class="quiz-progress" id="flashCount"></span></div></article>`);
  document.getElementById("xqNetlist").dataset.lesson = "drill-netlist";
  document.getElementById("xqConfig").dataset.lesson = "drill-config";
  mountQuiz("xqNetlist", NETLIST_Q, (q) => `<pre class="code-block">${esc(q.net)}</pre><p class="quiz-prompt">${esc(q.q)}</p>`);
  mountQuiz("xqConfig", CONFIG_Q, (q) => `<p class="quiz-prompt">Symptom: ${esc(q.title)}</p><pre class="code-block">${esc(q.snip)}</pre><p>What is wrong?</p>`);

  (function flash() {
    let cat = "All", idx = 0, flipped = false, seen = new Set();
    const card = document.getElementById("flashCard"), count = document.getElementById("flashCount");
    const list = () => FLASH.filter((f) => cat === "All" || f[0] === cat);
    function render() {
      const l = list(), f = l[idx];
      card.classList.toggle("flipped", flipped);
      card.innerHTML = `<span class="tag">${f[0]}</span><span class="fc-text">${esc(flipped ? f[2] : f[1])}</span><small>${flipped ? "Answer · tap for question" : "Tap to reveal"}</small>`;
      count.textContent = `${idx + 1} / ${l.length}`;
      if (flipped) { seen.add(f[1]); if (seen.size >= FLASH.length && !state.done["drill-flash"]) markDone("drill-flash", true); }
    }
    card.addEventListener("click", () => { flipped = !flipped; render(); });
    document.getElementById("flashNext").addEventListener("click", () => { idx = (idx + 1) % list().length; flipped = false; render(); });
    document.getElementById("flashPrev").addEventListener("click", () => { idx = (idx - 1 + list().length) % list().length; flipped = false; render(); });
    document.querySelectorAll("#flashCats .chip").forEach((b) => b.addEventListener("click", () => {
      document.querySelectorAll("#flashCats .chip").forEach((x) => x.classList.toggle("active", x === b));
      cat = b.dataset.cat; idx = 0; flipped = false; render();
    }));
    render();
  })();

  /* ===== PRACTICE SETS ===== */
  const SETS = [
    { id: "practice-1", img: "assets/practice/set1-divider.svg", title: "Set 1 · Voltage divider schematic", tasks: ["Count the components by type.", "Name the nodes and write the SPICE netlist.", "What voltage appears at OUT?"],
      key: `<p><strong>Components (3):</strong> 1 DC voltage source (V1), 2 resistors (R1, R2). Plus 1 ground symbol (not a component).</p><pre class="code-block">* Set 1 voltage divider
V1 in 0 DC 12
R1 in out 10k
R2 out 0 10k
.op
.end</pre><p><strong>V(out) = 12 × 10k / (10k + 10k) = 6 V.</strong> Long battery plate = + terminal, so node in is +12 V.</p>` },
    { id: "practice-2", img: "assets/practice/set2-rc-led.svg", title: "Set 2 · RC filter feeding an LED", tasks: ["Count and identify every component.", "Write the netlist using nodes n1, n2 and 0.", "At DC steady state, does C1 carry current? Roughly what is the LED current?"],
      key: `<p><strong>Components (5):</strong> V1 (5 V source), R1 1k, C1 1 µF, R2 330 Ω, D1 LED (triangle points toward the bar = cathode, toward ground).</p><pre class="code-block">* Set 2 RC + LED
V1 n0 0 DC 5
R1 n0 n1 1k
C1 n1 0 1u
R2 n1 n2 330
D1 n2 0 LEDMODEL
.model LEDMODEL D(IS=1e-20 N=1.8)  ; placeholder model
.op
.end</pre><p>The top-left wire is its own node (named n0 here), between V1 and R1. At DC steady state <strong>C1 is an open circuit (no current)</strong>. With a red LED (V<sub>f</sub> ≈ 2 V): I ≈ (5 − 2) / (1k + 330) ≈ <strong>2.3 mA</strong>. The RC corner frequency is 1/(2π·1k·1µ) ≈ 159 Hz (ignoring the LED branch load).</p>` },
    { id: "practice-3", img: "assets/practice/set3-board.svg", title: "Set 3 · Identify parts on a board (illustration)", tasks: ["List every reference designator and what it is.", "Decode the 3-digit resistor codes.", "What is J1 likely for, and which pin is ground?"],
      key: `<table class="data-table"><thead><tr><th>Ref</th><th>Part</th><th>Notes</th></tr></thead><tbody>
<tr><td>R1</td><td>SMD resistor</td><td>103 = 10 × 10³ = 10 kΩ</td></tr>
<tr><td>R2</td><td>SMD resistor</td><td>472 = 47 × 10² = 4.7 kΩ</td></tr>
<tr><td>R3</td><td>SMD resistor</td><td>331 = 33 × 10¹ = 330 Ω (likely LED current limit)</td></tr>
<tr><td>C1, C2</td><td>Ceramic capacitors</td><td>Unmarked; C1 next to U1 is likely a decoupling cap</td></tr>
<tr><td>D1</td><td>LED</td><td>Power/status indicator</td></tr>
<tr><td>U1</td><td>8-pin IC (SOIC-8)</td><td>Dot marks pin 1</td></tr>
<tr><td>J1</td><td>4-pin header</td><td>VCC, GND, SDA, SCL → I²C interface; pin 2 is GND</td></tr></tbody></table>
<p><strong>Totals:</strong> 3 resistors, 2 capacitors, 1 LED, 1 IC, 1 connector = 8 parts (plus 4 mounting holes). 4.7 kΩ is a common I²C pull-up value — a good hint about R2's role.</p>` },
  ];
  view("practice", "Practice · Circuit Vision", "Sample practice sets", "Original diagrams drawn for this site (free to reuse). Try the tasks first, then open the answer key.",
    SETS.map((s) => `<article id="${s.id}" class="panel"><h2>${s.title}</h2><figure class="practice-fig"><img src="${s.img}" alt="${esc(s.title)}" loading="lazy" /><figcaption><a href="${s.img}" download>Download SVG</a></figcaption></figure><ol>${s.tasks.map((t) => `<li>${t}</li>`).join("")}</ol><details class="answer"><summary>Show answer key</summary>${s.key}</details></article>`).join("") +
    `<article class="panel"><h2>More practice data</h2><p>The CircuitVision authors publish their training pipeline as public Kaggle notebooks (dataset links are inside):</p><ul><li><a href="https://www.kaggle.com/code/mah01sam/yolov11-training-and-project-pipeline" target="_blank" rel="noopener">YOLOv11 training &amp; project pipeline (Kaggle)</a></li></ul></article>`);
  document.querySelectorAll("#practice details.answer").forEach((d) => d.addEventListener("toggle", () => { const id = d.closest("article").id; if (d.open && !state.done[id]) markDone(id, true); }));

  /* ===== TEMPLATES ===== */
  const TPL = [
    ["handoff-note", "Shift / project handoff note", `# Handoff note — <project or ticket>
Date: <YYYY-MM-DD>   From: <name>   To: <name>

## Status (one line)
<On track / blocked / done>

## What was done
- 

## What is in progress (and exact next step)
- 

## Open risks / known issues
- 

## Where things live
- Files / repo / branch: 
- Images, netlists or configs: 
- Credentials: <vault entry name only — never paste secrets>

## Who to contact
- `],
    ["lab-report", "Lab report stub", `# Lab report — <title>
Author: <name>   Date: <YYYY-MM-DD>   Ticket: <id>

## Objective
<What question does this test answer?>

## Setup
- Equipment / board / devices (model, firmware, serial):
- Software and versions (e.g. CircuitVision commit, Netmiko 4.x):
- Topology or image source:

## Procedure
1. 
2. 

## Results
| Item | Expected | Observed | Pass/Fail |
|------|----------|----------|-----------|
|      |          |          |           |

## Issues and deviations

## Conclusion and next steps`],
    ["change-request", "Network change request", `# Change request — <short title>
Requester: <name>   Date: <YYYY-MM-DD>   Window: <start–end, time zone>
Risk: <low/medium/high>   Approver: <name>

## Reason for change

## Devices in scope
- <hostname> (<model>, <OS version>)

## Pre-checks
- [ ] Config backup taken (show running-config saved to <location>)
- [ ] Baseline captured (interfaces, routing table, neighbors)
- [ ] Console / out-of-band access confirmed

## Implementation steps (exact commands)
\`\`\`
<commands>
\`\`\`

## Verification
- [ ] <show command and expected output>

## Rollback plan (exact commands)
\`\`\`
<commands>
\`\`\`

## Communication
- Notify before: <who>   Notify after: <who>`],
    ["vendor-cv", "Questions for a circuit-vision tool vendor", `# Vendor questions — circuit vision / schematic-to-netlist tools
1. What input types are supported (PCB photos, scanned schematics, hand drawings, PDFs)? Minimum resolution?
2. Which component classes are detected? Can we add custom classes?
3. What output formats (SPICE netlist, KiCad, CSV BOM)? Sample output available?
4. Published accuracy on which dataset? Can we run a pilot on our own images?
5. Does processing run on-premises / offline, or are images sent to a cloud or third-party AI API?
6. Data retention: are our images stored or used for training? Can we opt out?
7. How are component values (OCR of markings) verified? Is there a human-review UI?
8. Licensing: per seat, per image, or site? Any open-source components and their licenses?
9. Integration: API, CLI, batch mode? Rate limits?
10. Support, update cadence, and export of our data if we leave.`],
    ["vendor-net", "Questions for a network gear vendor", `# Vendor questions — network hardware / NOS
1. Which management APIs are supported: NETCONF, RESTCONF, gNMI, vendor REST? Which YANG models (OpenConfig, native)?
2. Is there an official Ansible collection, and Netmiko / NAPALM / Nornir support?
3. Does the OS support candidate config, commit confirmed, and automatic rollback?
4. How are config backups and diffs done natively?
5. Streaming telemetry support and supported collectors?
6. Is there a free virtual image (for Containerlab/netlab) to test automation before buying?
7. SSH: supported key types and ciphers; AAA (TACACS+/RADIUS) support?
8. Software lifecycle: release cadence, end-of-support dates, security advisory process.
9. Licensing: which features need extra licenses (automation, telemetry, routing scale)?
10. Support SLAs and RMA process.`],
  ];
  view("templates", "Job aids", "Job templates", "Copy into your ticket or doc, or download as a Markdown file. Nothing leaves your browser.",
    TPL.map(([id, t, body]) => `<article id="tpl-${id}" class="panel"><h2>${t}</h2><pre class="code-block tpl-body">${esc(body)}</pre><div class="quiz-actions no-print"><button type="button" class="btn secondary" data-copy="${id}">Copy</button><button type="button" class="btn ghost" data-dl="${id}">Download .md</button></div></article>`).join(""));
  const tplText = (id) => TPL.find((t) => t[0] === id)[2];
  function download(name, text, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
  document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    const text = tplText(b.dataset.copy);
    try { await navigator.clipboard.writeText(text); } catch (e) { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    const o = b.textContent; b.textContent = "Copied ✓"; setTimeout(() => (b.textContent = o), 1500);
  }));
  document.querySelectorAll("[data-dl]").forEach((b) => b.addEventListener("click", () => download(b.dataset.dl + ".md", tplText(b.dataset.dl), "text/markdown")));

  /* ===== PLAYGROUND ===== */
  view("playground", "Track A · Hands-on", "CircuitVision playground", "Upload a circuit image and get a SPICE netlist. It needs a Python server with ML models, so it can't run on this static site.",
    `<article class="panel"><h2>Try it now</h2><p>The CircuitVision authors host a public demo: <a href="https://CircuitVision.jawadk.me" target="_blank" rel="noopener">CircuitVision.jawadk.me</a> (third-party, may be slow or offline). Avoid uploading confidential company schematics to any public demo.</p><p>Source: <a href="https://github.com/JKc66/CircuitVision" target="_blank" rel="noopener">JKc66/CircuitVision</a> (Apache-2.0).</p></article>
     <article class="panel"><h2>Run your own copy</h2><ol class="steps"><li><strong>Local (Docker):</strong> clone the repo, set <code>GEMINI_API_KEY</code>, run <code>docker compose up</code>, open <code>http://localhost:8501</code>.</li><li><strong>Free cloud:</strong> a Hugging Face Docker Space (free CPU tier) — step-by-step in this site's <a href="https://github.com/karthikvepuriphoto-gif/circuit-vision-lab/tree/main/playground" target="_blank" rel="noopener">playground/ folder</a>.</li><li>Use the <a href="#practice">practice sets</a> as test images and compare the output to the answer keys.</li></ol>
     <p class="hint">CircuitVision uses Google Gemini for reading component values, so it needs a Gemini API key (Google offers a free tier). Images you process are sent to that API.</p></article>`);

  /* ===== PROGRESS ===== */
  view("progress", "Saved in this browser", "My progress", "Mark lessons done, star resources, and move your progress between devices with a JSON file.",
    `<article class="panel"><h2>Overview</h2><div class="progress-bar" aria-hidden="true"><span id="progBar"></span></div><p id="progSummary"></p>
       <div class="quiz-actions"><button type="button" class="btn primary" id="progExport">Export progress (.json)</button><label class="btn secondary" for="progImport">Import progress<input type="file" id="progImport" accept="application/json,.json" hidden /></label><button type="button" class="btn ghost" id="progReset">Reset all</button></div><p class="quiz-feedback" id="progMsg" role="status"></p></article>
     <article class="panel"><h2>Lessons &amp; drills</h2><ul class="checklist" id="progList"></ul></article>
     <article class="panel"><h2>Bookmarked resources</h2><ul id="progBookmarks" class="path-list"></ul><p class="hint">Star resources on the <a href="#resources">All resources</a> page.</p></article>`);

  function renderProgress() {
    const list = document.getElementById("progList"); if (!list) return;
    const n = LESSONS.filter(([id]) => state.done[id]).length;
    document.getElementById("progBar").style.width = Math.round((n / LESSONS.length) * 100) + "%";
    document.getElementById("progSummary").textContent = `${n} of ${LESSONS.length} lessons and drills completed · ${Object.keys(state.bookmarks).length} bookmarks.`;
    list.innerHTML = LESSONS.map(([id, name]) => { const sc = state.scores[id]; return `<li class="${state.done[id] ? "done" : ""}"><input type="checkbox" id="pl-${id}" data-id="${id}" ${state.done[id] ? "checked" : ""}/><label for="pl-${id}">${esc(name)}${sc ? ` <span class="tag">best run ${sc.score}/${sc.total}</span>` : ""} <a href="#${id}">open</a></label></li>`; }).join("");
    list.querySelectorAll("input").forEach((c) => c.addEventListener("change", () => markDone(c.dataset.id, c.checked)));
    const bm = Object.entries(state.bookmarks);
    document.getElementById("progBookmarks").innerHTML = bm.length ? bm.map(([url, name]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a> <button type="button" class="btn ghost small" data-unstar="${esc(url)}">Remove</button></li>`).join("") : "<li>No bookmarks yet.</li>";
    document.querySelectorAll("[data-unstar]").forEach((b) => b.addEventListener("click", () => { delete state.bookmarks[b.dataset.unstar]; save(); syncStars(); }));
  }
  const msg = (t, ok) => { const m = document.getElementById("progMsg"); m.textContent = t; m.className = "quiz-feedback " + (ok ? "ok" : "bad"); };
  document.getElementById("progExport").addEventListener("click", () => download(`circuit-vision-lab-progress-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify({ app: "circuit-vision-lab", version: 1, exported: new Date().toISOString(), ...state, checklists: collectChecklists() }, null, 2), "application/json"));
  function collectChecklists() { const o = {}; for (let k = 0; k < localStorage.length; k++) { const key = localStorage.key(k); if (/checklist/i.test(key)) o[key] = localStorage.getItem(key); } return o; }
  document.getElementById("progImport").addEventListener("change", (e) => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then((t) => {
      const d = JSON.parse(t);
      if (d.app !== "circuit-vision-lab") throw new Error("not a Circuit Vision Lab progress file");
      state = { done: Object.assign({}, state.done, d.done), bookmarks: Object.assign({}, state.bookmarks, d.bookmarks), scores: Object.assign({}, state.scores, d.scores) };
      Object.entries(d.checklists || {}).forEach(([k, v]) => { if (/checklist/i.test(k) && typeof v === "string") localStorage.setItem(k, v); });
      save(); syncDoneButtons(); syncStars(); msg("Imported and merged. Reload to refresh checklists.", true);
    }).catch((err) => msg("Import failed: " + err.message, false));
    e.target.value = "";
  });
  document.getElementById("progReset").addEventListener("click", () => { if (confirm("Clear all saved progress and bookmarks on this device?")) { state = { done: {}, bookmarks: {}, scores: {} }; save(); syncDoneButtons(); syncStars(); } });

  /* Mark-done buttons on lesson panels */
  LESSONS.forEach(([id]) => {
    const art = document.getElementById(id); if (!art) return;
    const h = art.querySelector("h2"); if (!h) return;
    const b = document.createElement("button");
    b.type = "button"; b.className = "done-btn no-print"; b.dataset.done = id;
    b.addEventListener("click", () => markDone(id, !state.done[id]));
    h.insertAdjacentElement("afterend", b);
  });
  function syncDoneButtons() { document.querySelectorAll("[data-done]").forEach((b) => { const on = !!state.done[b.dataset.done]; b.textContent = on ? "✓ Done" : "Mark as done"; b.classList.toggle("is-done", on); b.setAttribute("aria-pressed", on); }); }

  /* Bookmark stars on resource cards (grid is rendered by app.js) */
  function syncStars() {
    document.querySelectorAll("#resourceGrid .resource-card").forEach((card) => {
      let s = card.querySelector(".star-btn");
      if (!s) { s = document.createElement("span"); s.className = "star-btn"; s.setAttribute("role", "button"); s.tabIndex = 0; card.appendChild(s);
        const toggle = (e) => { e.preventDefault(); e.stopPropagation(); const url = card.href, name = (card.querySelector("h3,strong") || card).textContent.trim().split("\n")[0];
          if (state.bookmarks[url]) delete state.bookmarks[url]; else state.bookmarks[url] = name; save(); syncStars(); };
        s.addEventListener("click", toggle); s.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") toggle(e); }); }
      const on = !!state.bookmarks[card.href];
      s.textContent = on ? "★" : "☆"; s.classList.toggle("on", on); s.setAttribute("aria-label", on ? "Remove bookmark" : "Bookmark");
    });
  }
  const grid = document.getElementById("resourceGrid");
  if (grid) new MutationObserver(() => syncStars()).observe(grid, { childList: true });

  /* ===== PRINT one-pagers ===== */
  [["circuit-photo", "Board photo checklist"], ["net-change", "Config change checklist"], ["net-netmiko", "Netmiko cheat sheet"], ["net-protocols", "Protocol table"]].forEach(([id]) => {
    const art = document.getElementById(id); if (!art) return;
    const b = document.createElement("button"); b.type = "button"; b.className = "btn ghost print-btn no-print"; b.textContent = "🖨 Print / Save as PDF";
    b.addEventListener("click", () => printPanel(art));
    art.querySelector("h2").insertAdjacentElement("afterend", b);
  });
  document.querySelectorAll("#templates article").forEach((art) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "btn ghost no-print"; b.textContent = "🖨 Print";
    b.addEventListener("click", () => printPanel(art)); art.querySelector(".quiz-actions").appendChild(b);
  });
  function printPanel(art) {
    document.body.classList.add("printing-one"); art.classList.add("print-me");
    const done = () => { document.body.classList.remove("printing-one"); art.classList.remove("print-me"); window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done); window.print(); setTimeout(done, 1000);
  }

  /* ---------- Nav links ---------- */
  const theme = document.getElementById("themeToggle");
  [["drills", "Drills"], ["practice", "Practice"], ["templates", "Templates"], ["playground", "Playground"], ["progress", "My progress"]].forEach(([id, label]) => {
    const a = document.createElement("a"); a.href = "#" + id; a.textContent = label; a.dataset.xnav = id;
    a.addEventListener("click", () => { nav.classList.remove("open"); const t = document.getElementById("navToggle"); if (t) t.setAttribute("aria-expanded", "false"); });
    nav.insertBefore(a, theme);
  });
  function navActive() { const base = (location.hash || "#home").slice(1); const v = (document.getElementById(base) || {}).closest ? document.getElementById(base).closest(".view") : null;
    document.querySelectorAll("[data-xnav]").forEach((a) => a.classList.toggle("active", !!v && a.dataset.xnav === v.id)); }
  window.addEventListener("hashchange", navActive);

  /* Home quick links */
  const home = document.getElementById("home");
  if (home) { const p = document.createElement("div"); p.className = "panel"; p.innerHTML = `<h2>New: practice &amp; job aids</h2><div class="hero-actions"><a class="btn secondary" href="#drills">Drills</a><a class="btn secondary" href="#practice">Practice sets</a><a class="btn secondary" href="#templates">Templates</a><a class="btn secondary" href="#playground">Playground</a><a class="btn primary" href="#progress">My progress</a></div>`; home.appendChild(p); }

  document.addEventListener("DOMContentLoaded", () => { syncDoneButtons(); syncStars(); renderProgress(); navActive(); });
  syncDoneButtons(); renderProgress(); setTimeout(() => { syncStars(); navActive(); }, 0);
})();
