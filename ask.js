(function () {
  var CHIPS = ["How do I find pin 1 on a chip?", "What is a netlist?", "How do I train YOLO?", "Netmiko times out", "How do I roll back a bad change?", "VLAN not working", "NETCONF vs RESTCONF", "Start a Containerlab lab"];
  var engine = null, results = document.getElementById("askResults");
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  fetch("kb.json").then(function (r) { return r.json(); }).then(function (kb) {
    engine = AskEngine.build(kb);
    var q = new URLSearchParams(location.search).get("q");
    if (q) run(q);
  }).catch(function () { results.innerHTML = '<p class="empty-state">Could not load the knowledge base. Refresh to try again.</p>'; });

  document.querySelectorAll("[data-chips]").forEach(function (box) {
    box.innerHTML = CHIPS.map(function (c) { return '<button type="button" class="chip">' + esc(c) + "</button>"; }).join("");
    box.addEventListener("click", function (e) { if (e.target.matches("button")) ask(e.target.textContent); });
  });
  document.querySelectorAll("[data-ask-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); var v = f.querySelector("input").value.trim(); if (v) ask(v); });
  });

  function ask(q) {
    document.getElementById("askInput").value = q;
    if (location.hash !== "#ask") location.hash = "#ask";
    run(q);
  }
  function card(r, top) {
    var t = r.e.track === "circuit" ? "Circuit Vision" : "Networks";
    return '<article class="answer-card' + (top ? " top" : "") + '"><div class="answer-meta">' + (top ? "Best match · " : "") + t + "</div><h3>" + esc(r.e.q) + "</h3><p>" + esc(r.e.a) + '</p><div class="srcs">Sources: ' +
      r.e.src.map(function (s) { return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a>"; }).join("") + "</div></article>";
  }
  function run(q) {
    if (!engine) { results.innerHTML = "<p>Loading…</p>"; return; }
    document.getElementById("askInput").value = q;
    var r = engine.search(q, 4);
    if (!r.length || (r[0].cover < 0.34 && r[0].score < 6)) {
      results.innerHTML = '<article class="answer-card"><h3>No confident answer for “' + esc(q) + '”</h3><p>Try rephrasing with a key term (e.g. “netlist”, “VLAN”, “Netmiko”, “PCB photo”), or a shorter question.</p>' +
        '<p>Browse: <a href="#circuit">Circuit Vision track</a> · <a href="#network">Networks track</a> · <a href="#resources">All resources</a></p>' +
        '<p class="srcs">Search docs: <a href="https://ktbyers.github.io/netmiko/" target="_blank" rel="noopener">Netmiko</a> <a href="https://docs.ansible.com/" target="_blank" rel="noopener">Ansible</a> <a href="https://containerlab.dev/" target="_blank" rel="noopener">Containerlab</a> <a href="https://docs.ultralytics.com/" target="_blank" rel="noopener">Ultralytics YOLO</a> <a href="https://developer.cisco.com/learning/" target="_blank" rel="noopener">Cisco DevNet</a></p></article>' +
        (r.length ? '<h3 class="related-title">Possibly related</h3>' + r.slice(0, 3).map(function (x) { return card(x, false); }).join("") : "");
      return;
    }
    results.innerHTML = card(r[0], true) + (r.length > 1 ? '<h3 class="related-title">Related answers</h3>' + r.slice(1, 4).map(function (x) { return card(x, false); }).join("") : "");
  }
})();
