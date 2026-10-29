(function () {
  "use strict";

  const VIEWS = ["home", "network", "ask", "resources"];

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

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("cvlab-theme")) setTheme(e.matches ? "dark" : "light");
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
    { track: "oss", name: "CircuitVision products (official)", url: "https://www.circuitvision.com/products/", blurb: "Vendor overview of cvNetwork, cvFiber and cvTicket telecom OSS modules.", tags: "circuitvision oss inventory cvnetwork cvfiber cvticket" },
    { track: "oss", name: "NetBox circuits docs", url: "https://docs.netbox.dev/en/stable/features/circuits/", blurb: "How an open-source inventory models providers, circuits and terminations.", tags: "netbox inventory circuits providers terminations" },
    { track: "oss", name: "NetBox public demo", url: "https://demo.netbox.dev/", blurb: "Practise tracing circuits with fake data (free demo login, reset nightly).", tags: "netbox demo practice inventory" },
    { track: "oss", name: "MEF (Carrier Ethernet)", url: "https://www.mef.net/", blurb: "Standards body behind E-Line, E-LAN, EVC and service definitions.", tags: "mef carrier ethernet eline elan evc" },
    { track: "oss", name: "RFC 2544 benchmarking", url: "https://www.rfc-editor.org/rfc/rfc2544", blurb: "Throughput, latency, frame loss and back-to-back tests used at turn-up.", tags: "testing turn-up rfc2544 throughput" },
    { track: "oss", name: "ITU-T Y.1564", url: "https://www.itu.int/rec/T-REC-Y.1564", blurb: "Ethernet service activation test methodology (CIR/EIR, KPIs).", tags: "testing turn-up y1564 service activation" },
    { track: "oss", name: "RFC 4364 (MPLS L3VPN)", url: "https://www.rfc-editor.org/rfc/rfc4364", blurb: "BGP/MPLS IP VPNs — how carrier L3VPN services work.", tags: "mpls l3vpn vpn bgp vrf" },
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

  document.querySelectorAll(".resource-controls .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".resource-controls .chip").forEach((c) => c.classList.remove("active"));
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
        <span class="track-pill ${r.track}">${r.track === "oss" ? "Circuits &amp; OSS" : "Networks"}</span>
        <h3>${escapeHtml(r.name)}</h3>
        <p>${escapeHtml(r.blurb)}</p>
      </a>`
      )
      .join("");
    resourceEmpty.hidden = items.length > 0;
  }
  renderResources();

  /* ---------- Checklists ---------- */
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

})();
