(function () {
  var CHIPS = ["What is an LOA-CFA?", "How do I read a circuit ID?", "RFC 2544 vs Y.1564", "What is EVPL?", "BGP session stuck in Active", "OSPF stuck in EXSTART", "How many hosts in a /27?", "How do I roll back a bad change?"];
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
    var t = r.e.track === "oss" ? "Circuits & OSS" : "Networks";
    return '<article class="answer-card' + (top ? " top" : "") + '"><div class="answer-meta">' + (top ? "Best match · " : "") + t + "</div><h3>" + esc(r.e.q) + "</h3><p>" + esc(r.e.a) + '</p><div class="srcs">Sources: ' +
      r.e.src.map(function (s) { return s.u.charAt(0) === "#" ? '<a href="' + esc(s.u) + '">' + esc(s.t) + "</a>" : '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a>"; }).join("") + "</div></article>";
  }
  function run(q) {
    if (!engine) { results.innerHTML = "<p>Loading…</p>"; return; }
    document.getElementById("askInput").value = q;
    var r = engine.search(q, 4);
    if (window.CVElsewhere) window.CVElsewhere(q);
    if (!r.length || (r[0].cover < 0.34 && r[0].score < 6)) {
      results.innerHTML = '<article class="answer-card"><h3>No confident answer for “' + esc(q) + '”</h3><p>Try rephrasing with a key term (e.g. “LOA”, “circuit ID”, “VLAN”, “BGP”), or use the search buttons below.</p>' +
        '<p>Browse: <a href="#circuits">Circuits &amp; OSS 101</a> · <a href="#network">Networks track</a> · <a href="#toolkit">Toolkit</a> · <a href="#resources">All resources</a></p></article>' +
        (r.length ? '<h3 class="related-title">Possibly related</h3>' + r.slice(0, 3).map(function (x) { return card(x, false); }).join("") : "");
      return;
    }
    results.innerHTML = card(r[0], true) + (r.length > 1 ? '<h3 class="related-title">Related answers</h3>' + r.slice(1, 4).map(function (x) { return card(x, false); }).join("") : "");
  }
})();
