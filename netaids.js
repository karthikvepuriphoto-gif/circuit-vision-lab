/* Network toolkit: subnet calculator, flowcharts, show-command sheets, pre/post checklist. Loaded before app.js. */
(function (root) {
  "use strict";
  /* ---------- Subnet math (pure, exported for tests) ---------- */
  function ipToInt(ip) {
    const p = String(ip).trim().split(".");
    if (p.length !== 4 || p.some((x) => !/^\d{1,3}$/.test(x) || +x > 255)) return null;
    return ((+p[0] << 24) >>> 0) + (+p[1] << 16) + (+p[2] << 8) + +p[3];
  }
  const intToIp = (n) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
  function maskToPrefix(m) {
    const n = ipToInt(m); if (n === null) return null;
    const inv = ~n >>> 0; if ((inv & (inv + 1)) !== 0) return null; // must be contiguous ones
    let c = 0; for (let i = 31; i >= 0; i--) if ((n >>> i) & 1) c++; return c;
  }
  function calc(input, maskInput) {
    let s = String(input).trim(), ip, prefix;
    if (s.includes("/")) { [ip, prefix] = s.split("/"); prefix = prefix.trim(); prefix = /^\d{1,2}$/.test(prefix) ? +prefix : maskToPrefix(prefix); }
    else if (s.includes(" ")) { [ip, prefix] = s.split(/\s+/); prefix = maskToPrefix(prefix); }
    else { ip = s; prefix = maskInput ? (/^\/?\d{1,2}$/.test(maskInput.trim()) ? +maskInput.trim().replace("/", "") : maskToPrefix(maskInput)) : null; }
    const n = ipToInt(ip);
    if (n === null) return { error: "Enter a valid IPv4 address, e.g. 10.20.30.40/26" };
    if (prefix === null || prefix === undefined || isNaN(prefix) || prefix < 0 || prefix > 32) return { error: "Enter a prefix /0–/32 or a valid contiguous mask like 255.255.255.192" };
    const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    const net = (n & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0, size = 2 ** (32 - prefix);
    let first, last, usable;
    if (prefix === 32) { first = last = net; usable = 1; }
    else if (prefix === 31) { first = net; last = bc; usable = 2; }
    else { first = net + 1; last = bc - 1; usable = size - 2; }
    const o1 = n >>> 24, o2 = (n >>> 16) & 255;
    const type = o1 === 10 || (o1 === 172 && o2 >= 16 && o2 <= 31) || (o1 === 192 && o2 === 168) ? "Private (RFC 1918)"
      : o1 === 127 ? "Loopback" : o1 === 169 && o2 === 254 ? "Link-local (APIPA)" : o1 === 100 && o2 >= 64 && o2 <= 127 ? "Shared CGNAT (RFC 6598)"
      : o1 >= 224 && o1 <= 239 ? "Multicast" : o1 >= 240 ? "Reserved" : "Public";
    return { ip: intToIp(n), prefix, mask: intToIp(mask), wildcard: intToIp(~mask >>> 0), network: intToIp(net), broadcast: prefix >= 31 ? "n/a" : intToIp(bc),
      first: intToIp(first), last: intToIp(last), usable, total: size, type, cidr: intToIp(net) + "/" + prefix };
  }
  root.CVSubnet = { calc, ipToInt, intToIp, maskToPrefix };
  if (typeof document === "undefined") return;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const main = document.getElementById("main");

  /* ---------- Flowcharts (decision steps) ---------- */
  const FLOWS = [
    ["flow-vlan", "VLAN / trunk: hosts can't reach each other", [
      ["Is the port up/up?", "IOS: show interfaces status · NX-OS: show interface status · Junos: show interfaces terse", "If notconnect/down: cable, SFP, speed/duplex, or shutdown. If err-disabled: check show interfaces status err-disabled / logs (port-security, BPDU guard), fix cause, then shut / no shut."],
      ["Is the access port in the right VLAN?", "show vlan brief · show interfaces Gi1/0/5 switchport", "Fix with: switchport access vlan <id>. Make sure the VLAN exists on the switch (show vlan id <id>)."],
      ["Is the VLAN allowed and active on the trunk(s) in the path?", "show interfaces trunk (IOS) · show interface trunk (NX-OS) · show vlans (Junos)", "Check 'Vlans allowed and active in management domain'. Add with switchport trunk allowed vlan add <id> (never without add). Check both ends."],
      ["Native VLAN and trunk mode match on both ends?", "show interfaces trunk · show cdp neighbors detail / show lldp neighbors", "Native VLAN mismatch shows in CDP logs; mode mismatch (access vs trunk) breaks tagging. Make both ends consistent."],
      ["Is STP blocking the path?", "show spanning-tree vlan <id>", "A blocking (BLK) port in the path is normal only if a redundant path forwards. Check root bridge placement."],
      ["Does the switch learn the MACs?", "show mac address-table vlan <id> · Junos: show ethernet-switching table", "No MAC learned = host not sending or wrong VLAN/port. MAC on unexpected port = loop or patching error."],
      ["Different VLANs? Check the gateway (SVI/router).", "show ip interface brief · show ip arp · show ip route", "SVI must be up/up (needs an active port in that VLAN), host gateway must match the SVI IP, and ip routing enabled on L3 switches."]]],
    ["flow-ospf", "OSPF: neighbor not forming / routes missing", [
      ["Is there IP reachability on the link?", "ping <neighbor-ip> source <local-if>", "Fix L1/L2/IP first. Both ends must be in the same subnet."],
      ["Is OSPF enabled on the interface?", "show ip ospf interface brief · NX-OS: show ip ospf interface brief · Junos: show ospf interface", "Interface missing = network statement / ip ospf <pid> area <a> not matching. Passive interface prevents adjacency."],
      ["What state is the neighbor in?", "show ip ospf neighbor · Junos: show ospf neighbor", "None: hellos not received/mismatched. INIT: one-way (ACL/filter). EXSTART/EXCHANGE stuck: MTU mismatch. 2-WAY with DROTHER is normal on broadcast segments. FULL = good."],
      ["Do the hello parameters match?", "show ip ospf interface <if>", "Must match: area ID, subnet/mask, hello & dead timers, authentication, stub flags, network type. Router IDs must be unique."],
      ["Adjacency FULL but routes missing?", "show ip ospf database · show ip route ospf", "Check area type (stub/NSSA filters), distribute-lists, summarization, a better administrative distance route, or the network isn't advertised."]]],
    ["flow-bgp", "BGP: session down / prefixes missing", [
      ["What is the session state?", "show ip bgp summary · NX-OS: show bgp ipv4 unicast summary · Junos: show bgp summary", "A number in State/PfxRcd = Established. Idle = not trying (config/route to peer). Active = trying TCP but failing. Idle (Admin) = shut."],
      ["Can you reach the peer address from the right source?", "ping <peer> source <update-source> · telnet <peer> 179", "eBGP to loopbacks needs ebgp-multihop (or disable-connected-check) and update-source. TCP 179 must not be blocked by ACL/firewall."],
      ["Does the config match on both sides?", "show run | section bgp · show bgp neighbors <ip>", "Check neighbor IP, remote-as, local AS, MD5 password, and address-family activation. Logs show 'bad AS' or auth errors."],
      ["Established but prefix not received/advertised?", "show ip bgp neighbors <ip> advertised-routes / received-routes (needs soft-reconfig inbound) / routes", "Check network statement has exact match in RIB, route-maps/prefix-lists, max-prefix, and that iBGP-learned routes aren't re-advertised to iBGP peers (needs RR or full mesh)."],
      ["Prefix in BGP table but not in routing table?", "show ip bgp <prefix> · show ip route <prefix>", "Next hop unreachable (common with iBGP: use next-hop-self), not best path, or a lower administrative distance route wins."]]],
  ];

  /* ---------- Show commands ---------- */
  const CMDS = {
    "Cisco IOS / IOS-XE": [["Interfaces summary", "show ip interface brief"], ["Port status / VLAN / speed", "show interfaces status"], ["Interface errors and counters", "show interfaces Gi1/0/1"], ["VLANs", "show vlan brief"], ["Trunks", "show interfaces trunk"], ["MAC table", "show mac address-table"], ["ARP", "show ip arp"], ["Routing table", "show ip route"], ["OSPF neighbors", "show ip ospf neighbor"], ["BGP summary", "show ip bgp summary"], ["Neighbors (CDP/LLDP)", "show cdp neighbors detail · show lldp neighbors"], ["Spanning tree", "show spanning-tree"], ["Port-channels", "show etherchannel summary"], ["Logs", "show logging"], ["Version / uptime", "show version"], ["Config (filter)", "show running-config | section <keyword>"], ["Save config", "copy running-config startup-config"]],
    "Cisco NX-OS": [["Interfaces summary", "show ip interface brief vrf all"], ["Port status", "show interface status"], ["Interface details", "show interface Ethernet1/1"], ["VLANs", "show vlan brief"], ["Trunks", "show interface trunk"], ["MAC table", "show mac address-table"], ["ARP", "show ip arp vrf all"], ["Routing table", "show ip route vrf all"], ["OSPF neighbors", "show ip ospf neighbors"], ["BGP summary", "show bgp ipv4 unicast summary"], ["Neighbors (CDP/LLDP)", "show cdp neighbors · show lldp neighbors"], ["Port-channels", "show port-channel summary"], ["vPC", "show vpc brief"], ["Logs", "show logging logfile"], ["Version", "show version"], ["Config diff vs startup", "show running-config diff"], ["Rollback checkpoint", "checkpoint <name> · rollback running-config checkpoint <name>"]],
    "Juniper Junos": [["Interfaces summary", "show interfaces terse"], ["Interface details/errors", "show interfaces ge-0/0/0 extensive"], ["VLANs", "show vlans"], ["MAC table", "show ethernet-switching table"], ["ARP", "show arp no-resolve"], ["Routing table", "show route"], ["OSPF neighbors", "show ospf neighbor"], ["BGP summary", "show bgp summary"], ["LLDP neighbors", "show lldp neighbors"], ["LAG / LACP", "show lacp interfaces"], ["Logs", "show log messages"], ["Version / hardware", "show version · show chassis hardware"], ["Alarms", "show system alarms"], ["Config (set format)", "show configuration | display set"], ["Pending changes", "show | compare (in configure mode)"], ["Safe commit", "commit check · commit confirmed 5 · commit"], ["Roll back", "rollback 1 then commit"]],
  };

  const PREPOST = ["Ticket / change number and approved window confirmed", "Console or out-of-band access tested", "Backup: running config saved off-box (and Junos: rescue config)", "Pre-check: interfaces (show ip int brief / show interfaces terse) captured", "Pre-check: routing table size and key routes captured", "Pre-check: OSPF/BGP neighbors and prefix counts captured", "Pre-check: STP root, trunks, port-channels captured", "Pre-check: pings/traceroutes to critical services recorded", "Rollback commands written and peer-reviewed", "Safety net set: reload in 10 (IOS) / commit confirmed (Junos) / checkpoint (NX-OS)", "Change applied exactly as written", "Post-check: same commands re-run and diffed against pre-check", "Post-check: logs reviewed for errors/flaps", "Post-check: application owner / user test confirmed", "Safety net cancelled (reload cancel / final commit)", "Config saved (copy run start / commit) and backup updated", "Ticket updated with outputs and closed"];

  const s = document.createElement("section");
  s.id = "toolkit"; s.className = "view"; s.hidden = true; s.setAttribute("aria-labelledby", "toolkit-title");
  s.innerHTML = `<header class="view-header"><p class="eyebrow">Main track · Job aids</p><h1 id="toolkit-title">Network toolkit</h1><p class="lede">Daily tools for a network engineer. Everything runs in your browser.</p></header>
  <nav class="subnav" aria-label="Toolkit sections"><a href="#tk-subnet">Subnet calculator</a><a href="#tk-show">Show commands</a><a href="#flow-vlan">VLAN/trunk</a><a href="#flow-ospf">OSPF</a><a href="#flow-bgp">BGP</a><a href="#tk-prepost">Pre/post checklist</a></nav>
  <article id="tk-subnet" class="panel"><h2>Subnet / CIDR calculator</h2>
    <form id="subnetForm" class="subnet-form"><label for="subnetIn">IP with prefix or mask</label><input id="subnetIn" type="text" inputmode="decimal" placeholder="192.168.10.37/27 or 10.1.1.1 255.255.255.0" value="192.168.10.37/27" autocomplete="off" spellcheck="false" /><button class="btn primary" type="submit">Calculate</button></form>
    <p class="quiz-feedback bad" id="subnetErr" role="alert"></p>
    <div class="table-wrap"><table class="data-table" id="subnetOut"></table></div>
    <details class="answer"><summary>Quick prefix reference</summary><div class="table-wrap"><table class="data-table"><thead><tr><th>Prefix</th><th>Mask</th><th>Usable hosts</th></tr></thead><tbody>${[24, 25, 26, 27, 28, 29, 30, 31, 32].map((p) => { const r = calc("0.0.0.0/" + p); return `<tr><td>/${p}</td><td>${r.mask}</td><td>${r.usable}${p === 31 ? " (point-to-point, RFC 3021)" : ""}</td></tr>`; }).join("")}</tbody></table></div></details></article>
  <article id="tk-show" class="panel"><h2>Show-command cheat sheet</h2>
    <div class="filter-chips" role="tablist" id="cmdTabs">${Object.keys(CMDS).map((k, i) => `<button type="button" role="tab" class="chip${i ? "" : " active"}" data-os="${esc(k)}">${esc(k)}</button>`).join("")}</div>
    <div class="table-wrap"><table class="data-table" id="cmdTable"></table></div>
    <p class="hint">Interface names are examples. On IOS add <code>| include</code>, <code>| section</code> or <code>| begin</code> to filter; on Junos use <code>| match</code>.</p></article>
  ${FLOWS.map(([id, title, steps]) => `<article id="${id}" class="panel flow"><h2>${esc(title)}</h2><ol class="flow-steps">${steps.map(([q, cmd, fix]) => `<li><strong>${esc(q)}</strong><code class="flow-cmd">${esc(cmd)}</code><p class="flow-fix"><span>If not:</span> ${esc(fix)}</p></li>`).join("")}</ol></article>`).join("")}
  <article id="tk-prepost" class="panel"><h2>Pre / post change verification checklist</h2><p>Tick as you go — saved in this browser.</p><ul class="checklist" id="prepostList"></ul><button type="button" class="btn ghost no-print" id="prepostReset">Reset checklist</button></article>`;
  main.appendChild(s);

  const out = document.getElementById("subnetOut"), err = document.getElementById("subnetErr");
  function runCalc() {
    const r = calc(document.getElementById("subnetIn").value);
    if (r.error) { err.textContent = r.error; out.innerHTML = ""; return; }
    err.textContent = "";
    out.innerHTML = [["Network (CIDR)", r.cidr], ["Subnet mask", r.mask], ["Wildcard mask", r.wildcard], ["Network address", r.network], ["Broadcast", r.broadcast], ["First usable", r.first], ["Last usable", r.last], ["Usable hosts", r.usable.toLocaleString()], ["Total addresses", r.total.toLocaleString()], ["Address type", r.type]].map(([k, v]) => `<tr><th scope="row">${k}</th><td><code>${esc(v)}</code></td></tr>`).join("");
  }
  document.getElementById("subnetForm").addEventListener("submit", (e) => { e.preventDefault(); runCalc(); });
  runCalc();

  function showOs(os) {
    document.querySelectorAll("#cmdTabs .chip").forEach((b) => { const on = b.dataset.os === os; b.classList.toggle("active", on); b.setAttribute("aria-selected", on); });
    document.getElementById("cmdTable").innerHTML = `<thead><tr><th>Task</th><th>Command</th></tr></thead><tbody>${CMDS[os].map(([t, c]) => `<tr><td>${esc(t)}</td><td><code>${esc(c)}</code></td></tr>`).join("")}</tbody>`;
  }
  document.querySelectorAll("#cmdTabs .chip").forEach((b) => b.addEventListener("click", () => showOs(b.dataset.os)));
  showOs(Object.keys(CMDS)[0]);

  const PKEY = "net-prepost-checklist";
  const ul = document.getElementById("prepostList");
  function renderPP() {
    const st = JSON.parse(localStorage.getItem(PKEY) || "{}");
    ul.innerHTML = PREPOST.map((t, i) => `<li class="${st[i] ? "done" : ""}"><input type="checkbox" id="pp${i}" data-i="${i}" ${st[i] ? "checked" : ""}/><label for="pp${i}">${esc(t)}</label></li>`).join("");
    ul.querySelectorAll("input").forEach((c) => c.addEventListener("change", () => { const st2 = JSON.parse(localStorage.getItem(PKEY) || "{}"); st2[c.dataset.i] = c.checked; localStorage.setItem(PKEY, JSON.stringify(st2)); c.closest("li").classList.toggle("done", c.checked); }));
  }
  document.getElementById("prepostReset").addEventListener("click", () => { localStorage.removeItem(PKEY); renderPP(); });
  renderPP();

  ["tk-show", "flow-vlan", "flow-ospf", "flow-bgp", "tk-prepost"].forEach((id) => {
    const art = document.getElementById(id), b = document.createElement("button");
    b.type = "button"; b.className = "btn ghost print-btn no-print"; b.textContent = "🖨 Print / Save as PDF";
    b.addEventListener("click", () => (window.CVPrint ? window.CVPrint(art) : window.print()));
    art.querySelector("h2").insertAdjacentElement("afterend", b);
  });
})(typeof window !== "undefined" ? window : globalThis);
