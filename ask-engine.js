(function (root) {
  var STOP = new Set("a an the is are was do does did i my me to of in on for and or how what why which when where can should with it this that be from by at as you your vs".split(" "));
  var SYN = { pcb: "board", board: "pcb", cap: "capacitor", res: "resistor", ic: "chip", chip: "ic", config: "configuration", cfg: "config", vlans: "vlan", backup: "backups", rollback: "revert", revert: "rollback", ssh: "ssh" };
  function stem(w) { return w.length > 4 ? w.replace(/(ing|ies|es|s)$/, "") : w; }
  function tok(s) {
    var out = [];
    String(s).toLowerCase().replace(/[^a-z0-9.\s-]/g, " ").split(/[\s.-]+/).forEach(function (w) {
      if (!w || STOP.has(w)) return;
      out.push(stem(w));
      if (SYN[w]) out.push(stem(SYN[w]));
    });
    return out;
  }
  function build(kb) {
    var df = {}, docs = kb.map(function (e) {
      var f = {};
      [[e.q, 3], [e.k, 2.5], [e.a, 1]].forEach(function (p) {
        tok(p[0]).forEach(function (t) { f[t] = (f[t] || 0) + p[1]; });
      });
      Object.keys(f).forEach(function (t) { df[t] = (df[t] || 0) + 1; });
      return f;
    });
    var n = kb.length;
    function idf(t) { return Math.log(1 + n / (df[t] || 0.5)); }
    function fuzzy(t) {
      if (df[t] || t.length < 5) return [t];
      var best = [];
      Object.keys(df).forEach(function (k) {
        if (Math.abs(k.length - t.length) <= 2 && lev(k, t) <= (t.length > 7 ? 2 : 1)) best.push(k);
        else if (k.length >= 4 && (k.indexOf(t) === 0 || t.indexOf(k) === 0)) best.push(k);
      });
      return best.length ? best : [t];
    }
    return {
      search: function (query, limit) {
        var qt = []; tok(query).forEach(function (t) { qt = qt.concat(fuzzy(t)); });
        qt = Array.from(new Set(qt));
        if (!qt.length) return [];
        var maxPossible = qt.reduce(function (s, t) { return s + idf(t); }, 0);
        return docs.map(function (f, i) {
          var s = 0, hit = 0;
          qt.forEach(function (t) { if (f[t]) { s += idf(t) * (1 + Math.log(f[t])); hit++; } });
          return { e: kb[i], score: s, cover: hit / qt.length, conf: Math.min(1, s / (maxPossible * 2.2 || 1)) };
        }).filter(function (r) { return r.score > 0; })
          .sort(function (a, b) { return b.score * (0.5 + b.cover) - a.score * (0.5 + a.cover); })
          .slice(0, limit || 4);
      }
    };
  }
  function lev(a, b) {
    var d = []; for (var i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (var j = 1; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  var api = { build: build, tok: tok };
  if (typeof module !== "undefined") module.exports = api; else root.AskEngine = api;
})(this);
