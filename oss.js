/* Circuits & OSS 101 track. Independent study aid — not affiliated with CircuitVision. Loaded before app.js. */
(function () {
  "use strict";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const L = (u, t) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
  const main = document.getElementById("main");

  const GLOSS = [
    ["Circuit ID", "The unique identifier a carrier (or your inventory system) assigns to a circuit. You quote it on every ticket, order and invoice. Formats vary by carrier; many US carriers use Telcordia CLCI-based formats."],
    ["Demarc (demarcation point)", "Where the carrier's responsibility ends and the customer's begins — usually a port on the carrier's NID or a patch panel in the customer's room."],
    ["NID (Network Interface Device)", "Carrier-owned device at the demarc. For Ethernet services it's often a small managed switch that supports loopbacks and test functions."],
    ["Extended demarc", "Cabling run from the carrier's demarc to the customer's equipment room or rack. Often a separate job — ask who owns it."],
    ["LOA / CFA", "Letter of Authorization / Connecting Facility Assignment. The LOA authorizes another party to connect to your space or port; the CFA (or LOA-CFA) names the exact panel and port where the cross-connect lands."],
    ["Cross-connect", "A physical patch (fiber or copper) inside a data center between two parties' ports — e.g. your cage panel to a carrier's panel. Ordered from the data center operator."],
    ["Meet-me room (MMR)", "The room in a data center or carrier hotel where carriers and customers interconnect via cross-connects."],
    ["DIA (Dedicated Internet Access)", "Internet service with dedicated (not shared) bandwidth, usually with an SLA, a static IP block, and often BGP or static routing to the provider."],
    ["MPLS L3VPN", "A carrier-managed private routed WAN (RFC 4364): each site gets a CE–PE link, routes are exchanged with the carrier (often via BGP), and the carrier routes between your sites in a VRF."],
    ["Metro Ethernet (Carrier Ethernet)", "Layer 2 Ethernet services across a carrier network, defined by MEF service types such as E-Line, E-LAN and E-Tree."],
    ["E-Line (EPL / EVPL)", "Point-to-point Ethernet service. EPL = private, port-based (whole port); EVPL = virtual, VLAN-based so one port can carry several EVCs."],
    ["E-LAN", "Multipoint-to-multipoint Ethernet service — all sites act like they're on one switched LAN."],
    ["EVC (Ethernet Virtual Connection)", "The MEF term for the logical connection between two or more UNIs that carries a customer's Ethernet service."],
    ["UNI / NNI", "UNI = User Network Interface, the port handing service to the customer. NNI (or ENNI) = Network-to-Network Interface between two carriers."],
    ["CIR / EIR", "Committed / Excess Information Rate. CIR is the guaranteed bandwidth; EIR traffic above it may be carried but isn't guaranteed."],
    ["QinQ (802.1ad)", "VLAN stacking: the carrier adds an outer S-tag around the customer's C-tag so customer VLANs pass through transparently."],
    ["Wavelength (wave)", "A dedicated optical channel (e.g. 10G/100G) on a carrier's DWDM system — high bandwidth, protocol-transparent, point-to-point."],
    ["Dark fiber", "Unlit fiber strands leased from a provider; you supply and manage the optics and equipment at each end."],
    ["DS1 / T1", "1.544 Mbps TDM circuit (24 × 64 kbps DS0 channels). Legacy, still seen for voice and alarm circuits."],
    ["DS3 / T3", "44.736 Mbps TDM circuit (28 DS1s). Legacy; mostly replaced by Ethernet."],
    ["OSS / BSS", "Operations Support Systems (inventory, design, provisioning, assurance) and Business Support Systems (ordering, billing, CRM)."],
    ["Inside plant (ISP) / Outside plant (OSP)", "ISP = equipment and cabling inside buildings/COs. OSP = cables, poles, conduits, manholes and splices outside."],
    ["Design Layout Record (DLR)", "Carrier document showing how a circuit is built: facilities, equipment, ports and assignments end to end."],
    ["FOC date", "Firm Order Commitment — the date the carrier commits to deliver the circuit."],
    ["Loopback", "A test mode where a device returns received traffic to the sender, used to isolate faults segment by segment."],
  ];

  const LIFECYCLE = [
    ["Quote / feasibility", "Check if the address is on-net or off-net, available bandwidth, cost, and lead time."],
    ["Order", "Customer signs; order entered with service type, bandwidth, A/Z locations, demarc details. Carrier returns an order number and later a FOC date."],
    ["Design in OSS", "Engineer designs the circuit path in the inventory/OSS: facilities, equipment, ports, VLANs/IPs. A circuit ID is assigned and a design record produced."],
    ["Assignments", "Specific ports, fiber strands, cross-connects, VLANs and IP blocks are reserved so nobody else uses them."],
    ["Build / install", "Field work: fiber splicing, cross-connects, NID install, router/switch config. Tracked as workflow tasks."],
    ["Turn-up & testing", "Light the service, verify optics, run loopback tests and an RFC 2544 or ITU-T Y.1564 test against CIR, check latency/jitter/loss."],
    ["Customer acceptance", "Customer confirms the service works; test results are shared and the circuit is marked in-service."],
    ["Billing starts", "In-service date triggers billing. Inventory record must match what's billed."],
    ["Operate / assure", "Monitoring, tickets, maintenance windows; inventory used to find which customers a fault impacts."],
    ["Change / upgrade", "Bandwidth or routing change — new order, design revision, re-test."],
    ["Disconnect", "Order to disconnect; equipment and cross-connects removed, assignments released in inventory, billing stopped. Stale records are a classic OSS problem."],
  ];

  const TURNUP = ["Circuit ID, order number and design record match on both ends", "Demarc location, panel and port confirmed (photo if possible)", "Optics: type, wavelength and Rx/Tx light levels within spec", "Physical link up; speed/duplex/MTU match the order", "Interface counters clear (no CRC/input errors after a few minutes)", "VLAN / tags (S-tag/C-tag) match the design", "IP addressing, gateway and routing (static or BGP session) up", "Loopback test with the carrier passes", "RFC 2544 or Y.1564 test at CIR passes; results saved", "Latency, jitter and loss within SLA", "Monitoring (SNMP/telemetry/ping) added for the circuit", "Inventory/OSS record set to in-service with correct assignments", "Customer acceptance received and noted on the order", "Turn-up results attached to the ticket"];

  const LOA = ["LOA-CFA received from the other party and not expired (often 30–90 days)", "Data center, building, floor, room/cage named on the LOA match yours", "Panel and port IDs on both ends verified (A side and Z side)", "Media matches: single-mode vs multimode fiber, connector type (LC/SC), copper", "Cross-connect order placed with the data center operator, quoting the LOA", "Order number and expected completion date recorded", "Port on your device is configured and admin-up before the patch", "After completion: light levels / link checked; label both ends", "Inventory updated with the cross-connect ID and panel/port", "Old/abandoned cross-connects scheduled for removal"];

  const PLAN = [
    ["Days 1–30 · Learn", ["Learn the team's circuit ID format and where it's documented", "Get access to the inventory/OSS, ticketing and monitoring tools", "Shadow a turn-up and a carrier trouble ticket", "Read 5 circuit design records end to end", "Learn the main service types sold/used (DIA, MPLS, E-Line, waves)", "Map who to call: NOC, field techs, carrier contacts, data center ops"]],
    ["Days 31–60 · Contribute", ["Open and drive carrier tickets with the template", "Do a turn-up with supervision using the checklist", "Process an LOA-CFA cross-connect end to end", "Fix 10 inventory records that don't match reality", "Write your own one-page notes on the order → design → turn-up flow"]],
    ["Days 61–90 · Own", ["Own turn-ups and tickets independently", "Propose one improvement (checklist, report, automation script)", "Learn to pull a report of impacted circuits for a maintenance", "Review your 30-60-90 progress with your manager"]],
  ];

  const TYPES = [["DIA", "Internet", "L3 (IP)", "Dedicated BW, SLA, static IPs; BGP for multihoming", "Internet for offices/data centers"], ["Broadband", "Internet", "L3 (IP)", "Shared/best effort, cheap, no strong SLA", "Small sites, backup links"], ["MPLS L3VPN", "Private WAN", "L3 (IP)", "Carrier routes between sites; QoS classes", "Multi-site enterprise WAN"], ["E-Line (EPL/EVPL)", "Private", "L2 (Ethernet)", "Point-to-point; you control routing", "Site-to-site, DC interconnect"], ["E-LAN", "Private", "L2 (Ethernet)", "Multipoint, like one big switch", "Campus/metro multi-site"], ["Wavelength", "Private", "L1 (optical)", "Very high BW, protocol-transparent", "DC interconnect, carrier backbone"], ["Dark fiber", "Private", "L1 (fiber)", "You light it; highest control and effort", "Campus, DC, long-term builds"], ["DS1 / DS3", "Private/voice", "L1 (TDM)", "Legacy, low bandwidth", "Legacy voice/alarm circuits"], ["SD-WAN overlay", "Private over Internet", "Overlay", "Runs over DIA/broadband; app-aware routing", "Branch WAN alongside/instead of MPLS"]];

  const TICKET = `Subject: [Severity] <Service type> <Circuit ID> — <short symptom>

Circuit ID: <carrier circuit ID>         Our ref: <internal ticket #>
Service: <DIA / E-Line / MPLS / wave>     Bandwidth: <e.g. 1 Gbps>
A-location: <site name, address, demarc/panel/port>
Z-location: <site / POP>
Problem start (time zone!): <YYYY-MM-DD HH:MM TZ>
Impact: <hard down / degraded / intermittent> — <users or customers affected>

Symptoms:
- <e.g. link down on our port Gi0/0/1, no light received>
- <e.g. 2% packet loss to provider gateway since 09:10>

Troubleshooting done:
- Checked our equipment and cabling: <result>
- Light levels Rx/Tx: <dBm values>
- Interface errors / logs: <summary>
- Loopback toward carrier: <result>
- Power/reboot of our CPE: <yes/no, result>

Site access: <contact name, phone, hours, access requirements>
Authorized to test intrusively? <yes/no, window>

Please provide: carrier ticket #, ETA for next update, test results.`;

  const CV_MODS = [["cvNetwork", "products/cvnetwork/", "Network and circuit inventory and design: equipment, ports, circuit/service design, order management and engineering workflow, capacity."], ["cvFiber", "products/cvfiber/", "Outside-plant (OSP) fiber mapping/GIS: cables, conduits, splices, patch panels, strand-level circuit info and impact."], ["cvTicket", "products/cvticket/", "Trouble and change/maintenance ticketing for the NOC, linked to network data to see impacted circuits and notify customers."]];

  const ck = (key, items) => {
    const st = JSON.parse(localStorage.getItem(key) || "{}");
    return items.map((t, i) => `<li class="${st[i] ? "done" : ""}"><input type="checkbox" id="${key}-${i}" data-key="${key}" data-i="${i}" ${st[i] ? "checked" : ""}/><label for="${key}-${i}">${esc(t)}</label></li>`).join("");
  };

  const s = document.createElement("section");
  s.id = "circuits"; s.className = "view"; s.hidden = true; s.setAttribute("aria-labelledby", "circuits-title");
  s.innerHTML = `<header class="view-header"><p class="eyebrow">Main track · Carrier circuits &amp; OSS</p><h1 id="circuits-title">Circuits &amp; OSS 101</h1><p class="lede">How telecom circuits are ordered, designed, built, tested and tracked in inventory/OSS tools — the day-to-day vocabulary and checklists.</p></header>
  <div class="panel disclaimer"><strong>Independent study aid.</strong> Not affiliated with or endorsed by CircuitVision or any carrier; examples are generic. <strong>Don't paste customer circuit IDs, addresses or internal data into this site</strong> — use your company's tools for real records.</div>
  <nav class="subnav" aria-label="Circuits sections"><a href="#oss-gloss">Glossary</a><a href="#oss-id">Circuit ID explainer</a><a href="#oss-life">Lifecycle</a><a href="#oss-types">Service types</a><a href="#oss-turnup">Turn-up checklist</a><a href="#oss-loa">LOA/CFA checklist</a><a href="#oss-ticket">Carrier ticket</a><a href="#oss-trace">Trace a circuit</a><a href="#oss-cv">CircuitVision overview</a><a href="#oss-plan">30-60-90 plan</a></nav>
  <article id="oss-gloss" class="panel"><h2>Glossary</h2><input type="search" id="ossGlossSearch" class="oss-search" placeholder="Filter terms… (e.g. LOA, QinQ, demarc)" aria-label="Filter glossary" /><dl class="glossary" id="ossGloss">${GLOSS.map(([t, d]) => `<div class="gl-item"><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl></article>
  <article id="oss-id" class="panel"><h2>Circuit ID explainer</h2><p>Every carrier and company has its own format. Below are <strong>made-up examples</strong> to show the kinds of fields you'll see. Tap a segment.</p>
    <div class="cid-examples">
      <div class="cid" data-ex="0"><span class="cid-label">Example A · internal inventory style (fictional)</span><div class="cid-row">${["DAL01", "DIA", "1G", "000427", "ACME"].map((p, i) => `<button type="button" class="cid-seg" data-k="a${i}">${p}</button>`).join('<span class="cid-sep">-</span>')}</div></div>
      <div class="cid" data-ex="1"><span class="cid-label">Example B · carrier style (fictional, CLCI-like layout)</span><div class="cid-row">${["12", "KQXX", "654321", "", "ZZZZ"].map((p, i) => `<button type="button" class="cid-seg" data-k="b${i}">${p || "·"}</button>`).join('<span class="cid-sep">.</span>')}</div></div>
    </div><p class="cid-explain" id="cidExplain" role="status">Tap a segment to see what it usually means.</p>
    <p class="hint">Telcordia CLCI formats are licensed standards; for the exact meaning of codes use your carrier's or company's documentation.</p></article>
  <article id="oss-life" class="panel"><h2>Circuit lifecycle</h2><ol class="flow-steps">${LIFECYCLE.map(([t, d]) => `<li><strong>${esc(t)}</strong><p class="flow-fix">${esc(d)}</p></li>`).join("")}</ol>
    <p class="hint">Testing references: ${L("https://www.rfc-editor.org/rfc/rfc2544", "RFC 2544")} (benchmarking: throughput, latency, frame loss, back-to-back) · ${L("https://www.itu.int/rec/T-REC-Y.1564", "ITU-T Y.1564")} (Ethernet service activation: CIR/EIR/policing + service performance) · ${L("https://www.rfc-editor.org/rfc/rfc6349", "RFC 6349")} (TCP throughput).</p></article>
  <article id="oss-types" class="panel"><h2>Service types compared</h2><div class="table-wrap"><table class="data-table"><thead><tr><th>Service</th><th>Kind</th><th>Layer</th><th>Key traits</th><th>Typical use</th></tr></thead><tbody>${TYPES.map((r) => `<tr>${r.map((c, i) => i ? `<td>${esc(c)}</td>` : `<td><strong>${esc(c)}</strong></td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="hint">Carrier Ethernet definitions: ${L("https://www.mef.net/", "MEF")} · MPLS L3VPN: ${L("https://www.rfc-editor.org/rfc/rfc4364", "RFC 4364")}</p></article>
  <article id="oss-turnup" class="panel"><h2>Turn-up test checklist</h2><ul class="checklist">${ck("oss-turnup-checklist", TURNUP)}</ul><button type="button" class="btn ghost no-print" data-reset="oss-turnup-checklist">Reset</button></article>
  <article id="oss-loa" class="panel"><h2>LOA/CFA cross-connect checklist</h2><ul class="checklist">${ck("oss-loa-checklist", LOA)}</ul><button type="button" class="btn ghost no-print" data-reset="oss-loa-checklist">Reset</button></article>
  <article id="oss-ticket" class="panel"><h2>Carrier trouble-ticket template</h2><pre class="code-block tpl-body" id="ossTicketText">${esc(TICKET)}</pre><div class="quiz-actions no-print"><button type="button" class="btn secondary" id="ossTicketCopy">Copy</button><button type="button" class="btn ghost" id="ossTicketDl">Download .txt</button></div></article>
  <article id="oss-trace" class="panel"><h2>Tracing a circuit in an inventory system (NetBox walkthrough)</h2>
    <p>NetBox is a popular open-source inventory tool; its public demo is a safe place to practise the same moves you'll make in any OSS. Only use made-up data there — it's public and reset nightly.</p>
    <ol class="steps"><li>Open the ${L("https://demo.netbox.dev/", "NetBox public demo")} and create a free demo user (link on the login page) or sign in.</li>
    <li>Go to <strong>Circuits → Providers</strong>: carriers are modelled as providers (${L("https://docs.netbox.dev/en/stable/models/circuits/provider/", "docs")}).</li>
    <li>Open <strong>Circuits → Circuits</strong> and pick one. Note the <em>circuit ID (cid)</em>, provider, type, status and commit rate (${L("https://docs.netbox.dev/en/stable/models/circuits/circuit/", "circuit model")}).</li>
    <li>Look at the <strong>A and Z terminations</strong>: each points to a site or provider network, with port speed and cross-connect / patch panel info (${L("https://docs.netbox.dev/en/stable/models/circuits/circuittermination/", "terminations")}).</li>
    <li>Follow the termination's <strong>cable</strong> to the device interface — use <em>Trace</em> on the interface to see the full path.</li>
    <li>From the device, check the interface's VLANs/IPs: this is the "design" side of the record.</li>
    <li>Ask: if this circuit goes down, which devices and services are impacted? That's what OSS tools answer during outages.</li></ol>
    <p class="hint">Concepts: ${L("https://docs.netbox.dev/en/stable/features/circuits/", "NetBox circuits documentation")} · ${L("https://github.com/netbox-community/netbox", "NetBox on GitHub")}</p></article>
  <article id="oss-cv" class="panel"><h2>CircuitVision modules — unofficial overview</h2><p>A generic summary based on CircuitVision's public product pages. Your company's setup, versions and workflows may differ — follow internal training for how you actually use it.</p>
    <ul class="path-list">${CV_MODS.map(([n, p, d]) => `<li>${L("https://www.circuitvision.com/" + p, n)}<p>${esc(d)}</p></li>`).join("")}</ul>
    <p class="hint">Overview: ${L("https://www.circuitvision.com/products/", "circuitvision.com/products")}. Note: the GitHub project "JKc66/CircuitVision" (electronics schematic recognition) is unrelated.</p></article>
  <article id="oss-plan" class="panel"><h2>30-60-90 day plan</h2><p>Tick items as you go; saved in this browser and included in progress export.</p>${PLAN.map(([h, items], k) => `<h3>${esc(h)}</h3><ul class="checklist">${ck("oss-plan-checklist-" + k, items)}</ul>`).join("")}</article>`;
  main.appendChild(s);

  s.addEventListener("change", (e) => {
    const c = e.target; if (!c.dataset.key) return;
    const st = JSON.parse(localStorage.getItem(c.dataset.key) || "{}"); st[c.dataset.i] = c.checked;
    localStorage.setItem(c.dataset.key, JSON.stringify(st)); c.closest("li").classList.toggle("done", c.checked);
  });
  s.querySelectorAll("[data-reset]").forEach((b) => b.addEventListener("click", () => { localStorage.removeItem(b.dataset.reset); b.previousElementSibling.querySelectorAll("input").forEach((c) => { c.checked = false; c.closest("li").classList.remove("done"); }); }));
  document.getElementById("ossGlossSearch").addEventListener("input", (e) => { const q = e.target.value.toLowerCase(); s.querySelectorAll(".gl-item").forEach((d) => (d.hidden = q && !d.textContent.toLowerCase().includes(q))); });

  const CID = { a0: "Site / location code (here a made-up Dallas site 01). Internal formats often start with the A-location.", a1: "Service type — DIA = Dedicated Internet Access. Others: MPLS, EPL, EVPL, WAVE.", a2: "Bandwidth (1 Gbps).", a3: "Sequence / serial number that makes the ID unique.", a4: "Customer or account code (fictional).",
    b0: "Prefix — in CLCI-style serial-number formats, a leading numeric field (exact meaning is defined by the carrier/standard).", b1: "Service code + modifier — letters describing the service type and options; look the code up in your carrier's documentation.", b2: "Serial number — unique per circuit.", b3: "Empty field (shown as ·) — some formats keep a blank suffix field, so you'll see two dots in a row.", b4: "Company / carrier code identifying who owns the circuit." };
  s.querySelectorAll(".cid-seg").forEach((b) => b.addEventListener("click", () => { s.querySelectorAll(".cid-seg").forEach((x) => x.classList.toggle("active", x === b)); document.getElementById("cidExplain").textContent = CID[b.dataset.k]; }));

  document.getElementById("ossTicketCopy").addEventListener("click", async (e) => { try { await navigator.clipboard.writeText(TICKET); e.target.textContent = "Copied ✓"; } catch (_) { e.target.textContent = "Select the text and copy"; } setTimeout(() => (e.target.textContent = "Copy"), 1500); });
  document.getElementById("ossTicketDl").addEventListener("click", () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([TICKET], { type: "text/plain" })); a.download = "carrier-trouble-ticket.txt"; a.click(); });

  ["oss-life", "oss-types", "oss-turnup", "oss-loa", "oss-ticket", "oss-plan"].forEach((id) => {
    const art = document.getElementById(id), b = document.createElement("button");
    b.type = "button"; b.className = "btn ghost print-btn no-print"; b.textContent = "🖨 Print / Save as PDF";
    b.addEventListener("click", () => (window.CVPrint ? window.CVPrint(art) : window.print()));
    art.querySelector("h2").insertAdjacentElement("afterend", b);
  });

  /* Ask: search elsewhere */
  const ENG = [["NetBox docs", "https://www.google.com/search?q=site%3Adocs.netbox.dev+{q}"], ["Cisco", "https://www.google.com/search?q=site%3Acisco.com+{q}"], ["Juniper docs", "https://www.google.com/search?q=site%3Ajuniper.net%2Fdocumentation+{q}"], ["MEF", "https://www.google.com/search?q=site%3Amef.net+{q}"], ["GitHub", "https://github.com/search?type=repositories&q={q}"]];
  const WKEY = "netops-wiki-search-url";
  const btns = document.getElementById("elsewhereBtns");
  function renderEngines() {
    if (!btns) return;
    const w = localStorage.getItem(WKEY);
    const list = w ? ENG.concat([["Company wiki", w]]) : ENG;
    btns.innerHTML = list.map(([n, u]) => `<button type="button" class="btn secondary" data-tpl="${esc(u)}">${esc(n)} ↗</button>`).join("");
  }
  if (btns) {
    btns.addEventListener("click", (e) => {
      const b = e.target.closest("[data-tpl]"); if (!b) return;
      const q = (document.getElementById("askInput").value || "").trim();
      if (!q) { document.getElementById("askInput").focus(); return; }
      window.open(b.dataset.tpl.replace("{q}", encodeURIComponent(q)), "_blank", "noopener");
    });
    const wi = document.getElementById("wikiUrl"), wm = document.getElementById("wikiMsg");
    wi.value = localStorage.getItem(WKEY) || "";
    document.getElementById("wikiForm").addEventListener("submit", (e) => {
      e.preventDefault(); const v = wi.value.trim();
      if (!/^https?:\/\//i.test(v) || !v.includes("{q}")) { wm.className = "quiz-feedback bad"; wm.textContent = "Use a full http(s) URL containing {q}."; return; }
      localStorage.setItem(WKEY, v); wm.className = "quiz-feedback ok"; wm.textContent = "Saved in this browser only."; renderEngines();
    });
    document.getElementById("wikiClear").addEventListener("click", () => { localStorage.removeItem(WKEY); wi.value = ""; wm.textContent = "Removed."; renderEngines(); });
    renderEngines();
  }
  window.CVElsewhere = function () {};

  /* Retire the electronics pages: redirect old links to the new track */
  const RETIRED = ["circuit", "practice", "playground"];
  function retire() { const h = location.hash.slice(1); if (RETIRED.some((r) => h === r || h.startsWith(r + "-"))) location.replace("#circuits"); }
  window.addEventListener("hashchange", retire); retire();
})();
