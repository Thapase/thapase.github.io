/**
 * ============================================================================
 * T.H.H. Thapase — Portfolio Interactions & File Explorer Dossiers
 * Aesthetic: Parivan Vansjalia Editorial Flow + Skeuomorphic Dossier Folders
 * Responsive for Desktop & Mobile
 * ============================================================================
 */

// Global Folder Definitions
const VALID_FOLDERS = [
  "professional",
  "education",
  "extracurriculars",
  "writings",
  "travel",
  "ascent"
];

const FOLDER_TITLES = {
  professional: "01 / Professional Experience",
  education: "02 / Academic Rigor & Education",
  extracurriculars: "03 / Life Away From Work",
  writings: "04 / Articles & Thought Leadership",
  travel: "05 / Travel & Expeditions",
  ascent: "06 / The Ascent — Transit & Passport Dispatch"
};

/**
 * Open Folder Dossier Modal
 * Exposed globally on window immediately so inline onclick and event listeners work 100%
 */
function openFolder(folderId) {
  if (!VALID_FOLDERS.includes(folderId)) {
    folderId = "professional";
  }

  const dossierWindow = document.getElementById("dossier-window");
  if (!dossierWindow) {
    console.error("Dossier window element (#dossier-window) not found.");
    return;
  }

  // 1. Toggle Content Visibility
  VALID_FOLDERS.forEach((key) => {
    const section = document.getElementById(`folder-content-${key}`);
    if (section) {
      if (key === folderId) {
        section.classList.remove("hidden");
        section.style.display = "block";
      } else {
        section.classList.add("hidden");
        section.style.display = "none";
      }
    }
  });

  // 2. Update Nav Tabs State
  const navTabs = document.querySelectorAll(".dossier-nav-tab");
  navTabs.forEach((btn) => {
    const isTarget = btn.getAttribute("data-folder") === folderId;
    btn.classList.toggle("active-tab", isTarget);
    if (isTarget) {
      btn.classList.add("bg-[#75482E]", "text-[#F2EEDC]");
      btn.classList.remove("text-[#4C5848]", "dark:text-[#A4B39E]");
    } else {
      btn.classList.remove("bg-[#75482E]", "text-[#F2EEDC]");
      btn.classList.add("text-[#4C5848]", "dark:text-[#A4B39E]");
    }
  });

  // 3. Update Breadcrumb Title
  const breadcrumbEl = document.getElementById("dossier-breadcrumb-title");
  if (breadcrumbEl) {
    breadcrumbEl.textContent = FOLDER_TITLES[folderId] || "Dossier Archive";
  }

  // 4. Reveal Window with Animation
  dossierWindow.style.display = "flex";
  void dossierWindow.offsetWidth;
  dossierWindow.classList.add("open");
  document.body.style.overflow = "hidden";

  // 5. Reset Scroll Position
  const scrollArea = document.getElementById("dossier-scroll-area");
  if (scrollArea) {
    scrollArea.scrollTop = 0;
  }

  // 5b. Initialize Transit & Passport Dispatch Map if opening ascent folder
  if (folderId === "ascent") {
    setTimeout(() => {
      if (typeof initTransitMap === "function") {
        initTransitMap();
      }
      if (typeof selectTransitStop === "function") {
        selectTransitStop(transitActiveIdx || 0, { animate: false, scrollMap: true });
      }
    }, 50);
  }

  // 6. Safe URL Hash Update (Only on http/https, never interferes with local file://)
  try {
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      history.replaceState(null, "", `#folder-${folderId}`);
    }
  } catch (e) {
    // Ignore security exceptions
  }
}

/**
 * Close Folder Dossier Modal
 */
function closeFolder() {
  if (typeof transitAnimFrame === "number" && transitAnimFrame) {
    cancelAnimationFrame(transitAnimFrame);
    transitAnimFrame = null;
  }

  const dossierWindow = document.getElementById("dossier-window");
  if (dossierWindow) {
    dossierWindow.classList.remove("open");
    dossierWindow.style.display = "none";
  }
  document.body.style.overflow = "";

  try {
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      history.replaceState(null, "", window.location.pathname);
    }
  } catch (e) {
    // Ignore security exceptions
  }
}

/**
 * Travel Sub-Tabs Switcher (Treks & Adventures vs Vacations)
 */
function switchTravelTab(tabName) {
  const treksView = document.getElementById("travel-view-treks");
  const vacationsView = document.getElementById("travel-view-vacations");
  const treksBtn = document.getElementById("tab-btn-treks");
  const vacationsBtn = document.getElementById("tab-btn-vacations");

  if (tabName === "treks") {
    if (treksView) {
      treksView.classList.remove("hidden");
      treksView.style.display = "block";
    }
    if (vacationsView) {
      vacationsView.classList.add("hidden");
      vacationsView.style.display = "none";
    }
    if (treksBtn) {
      treksBtn.classList.add("bg-[#75482E]", "text-[#F2EEDC]");
      treksBtn.classList.remove("text-[#4C5848]", "dark:text-[#A4B39E]");
    }
    if (vacationsBtn) {
      vacationsBtn.classList.remove("bg-[#75482E]", "text-[#F2EEDC]");
      vacationsBtn.classList.add("text-[#4C5848]", "dark:text-[#A4B39E]");
    }
  } else {
    if (treksView) {
      treksView.classList.add("hidden");
      treksView.style.display = "none";
    }
    if (vacationsView) {
      vacationsView.classList.remove("hidden");
      vacationsView.style.display = "block";
    }
    if (vacationsBtn) {
      vacationsBtn.classList.add("bg-[#75482E]", "text-[#F2EEDC]");
      vacationsBtn.classList.remove("text-[#4C5848]", "dark:text-[#A4B39E]");
    }
    if (treksBtn) {
      treksBtn.classList.remove("bg-[#75482E]", "text-[#F2EEDC]");
      treksBtn.classList.add("text-[#4C5848]", "dark:text-[#A4B39E]");
    }
  }
}

/**
 * CV Modal Controller
 */
function openCvModal() {
  const cvModal = document.getElementById("cv-modal");
  if (cvModal) {
    cvModal.style.display = "flex";
    void cvModal.offsetWidth;
    cvModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeCvModal() {
  const cvModal = document.getElementById("cv-modal");
  if (cvModal) {
    cvModal.classList.remove("open");
    cvModal.style.display = "none";
  }
  const dossierWindow = document.getElementById("dossier-window");
  if (!dossierWindow || !dossierWindow.classList.contains("open")) {
    document.body.style.overflow = "";
  }
}

/**
 * Toast Notification Controller
 */
function showToast(message) {
  const toast = document.getElementById("site-toast");
  const toastText = document.getElementById("toast-text");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove("opacity-0", "pointer-events-none", "translate-y-6");
  toast.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
    toast.classList.add("opacity-0", "pointer-events-none", "translate-y-6");
  }, 3500);
}

/**
 * ============================================================================
 * 06 / The Ascent — Illustrated Transit & Passport Dispatch Map Controller
 * ============================================================================
 */
const TRANSIT_STOPS = [
  {
    idx: 0,
    x: 76,
    y: 174,
    shortDate: "MAY '19",
    shortCode: "SRM",
    date: "May 2019",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "MAA → ORG",
    title: "Graduated from SRM University with Distinction",
    summary: "Completed Bachelor of Technology with academic distinction, establishing engineering fundamentals, systems modeling, and first-principles reasoning.",
    stampShape: "customs",
    stampColorVar: "var(--ink-indigo)",
    stampRot: "-5deg",
    stampSub: "ACADEMIC DISPATCH",
    stampCode: "ORIGINS"
  },
  {
    idx: 1,
    x: 158,
    y: 106,
    shortDate: "MAR '21",
    shortCode: "IIM-S",
    date: "Mar 2021",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "MAA → HPQ",
    title: "Graduated from IIM Sirmaur (MBA)",
    summary: "Earned Master of Business Administration with focus on operations strategy, decision science, supply chain networks, and economic theory.",
    stampShape: "customs",
    stampColorVar: "var(--ink-indigo)",
    stampRot: "4deg",
    stampSub: "STRATEGY CORPS",
    stampCode: "MBA · HONORS"
  },
  {
    idx: 2,
    x: 240,
    y: 168,
    shortDate: "AUG '21",
    shortCode: "GENPACT",
    date: "Aug 2021",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "HPQ → BLR",
    title: "Joined Genpact as Supply Chain Consultant",
    summary: "Commenced strategic enterprise advisory in Bangalore, streamlining global procurement, inventory velocity, and multi-tier network optimization for Fortune 500 giants.",
    stampShape: "customs",
    stampColorVar: "var(--ink-forest)",
    stampRot: "-4deg",
    stampSub: "ADVISORY ENTRY",
    stampCode: "GENPACT · BLR"
  },
  {
    idx: 3,
    x: 322,
    y: 98,
    shortDate: "JAN '23",
    shortCode: "LEAD",
    date: "Jan 2023",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "BLR → LEAD",
    title: "Promoted to Project Lead at Genpact",
    summary: "Entrusted to direct cross-functional consulting units executing multi-million-dollar supply chain transformations for aerospace and energy technology leaders.",
    stampShape: "customs",
    stampColorVar: "var(--ink-forest)",
    stampRot: "5deg",
    stampSub: "COMMAND CLEARANCE",
    stampCode: "PROJECT LEAD"
  },
  {
    idx: 4,
    x: 404,
    y: 162,
    shortDate: "JUL '23",
    shortCode: "GMAT 760",
    date: "July 2023",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "BLR → TOP 1%",
    title: "Scored 760 on GMAT (Top 1% Globally)",
    summary: "Mastered 99th percentile global benchmark in quantitative logic, data sufficiency, and critical reasoning under standardized high-stakes conditions.",
    stampShape: "customs",
    stampColorVar: "var(--ink-ochre)",
    stampRot: "-6deg",
    stampSub: "QUANT BENCHMARK",
    stampCode: "GMAT · 760"
  },
  {
    idx: 5,
    x: 486,
    y: 94,
    shortDate: "DEC '24",
    shortCode: "L1A-B",
    date: "Dec 2024",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "BLR → US-B",
    title: "Filed L1A Blanket Visa Petition",
    summary: "Initiated corporate mobility petition for cross-border strategic leadership across North American Fortune 500 accounts.",
    stampShape: "customs",
    stampColorVar: "var(--ink-terracotta)",
    stampRot: "3deg",
    stampSub: "MOBILITY DESK",
    stampCode: "DISPATCH · L1A"
  },
  {
    idx: 6,
    x: 568,
    y: 178,
    shortDate: "JAN '25",
    shortCode: "DXB",
    date: "Jan 2025",
    category: "travel",
    categoryLabel: "Travel & Endurance Stop",
    corridor: "BLR → DXB",
    title: "First International Trip: Dubai",
    summary: "First overseas voyage, observing global multimodal transit infrastructure, airport city planning, and cross-border logistics engineering.",
    stampShape: "postmark",
    stampColorVar: "var(--ink-moss)",
    stampRot: "-7deg",
    stampSub: "TRANSIT PORT",
    stampCode: "DXB · UAE"
  },
  {
    idx: 7,
    x: 650,
    y: 104,
    shortDate: "MAR '25",
    shortCode: "PIVOT",
    date: "Mar 2025",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "US-B → PIVOT",
    title: "L1A Blanket Rejected — The Strategic Pivot",
    summary: "Confronted consular rejection under blanket petition scrutiny; treated the setback as an operational problem and immediately structured an individual petition.",
    stampShape: "customs",
    stampColorVar: "var(--ink-terracotta)",
    stampRot: "6deg",
    stampSub: "ROUTE CORRECTION",
    stampCode: "REROUTED"
  },
  {
    idx: 8,
    x: 732,
    y: 182,
    shortDate: "JUL '25",
    shortCode: "5K RUN",
    date: "July 2025",
    category: "travel",
    categoryLabel: "Travel & Endurance Stop",
    corridor: "BLR → 5K",
    title: "Completed First 5K",
    summary: "Ignited formal distance road running, establishing cardiovascular aerobic baselines and compounding discipline on Strava.",
    stampShape: "postmark",
    stampColorVar: "var(--ink-moss)",
    stampRot: "-4deg",
    stampSub: "ENDURANCE LOG",
    stampCode: "5K · STRIDE"
  },
  {
    idx: 9,
    x: 814,
    y: 114,
    shortDate: "SEP '25",
    shortCode: "10K RUN",
    date: "Sep 2025",
    category: "travel",
    categoryLabel: "Travel & Endurance Stop",
    corridor: "5K → 10K",
    title: "Completed First 10K Benchmark",
    summary: "Scaled up road distance progression to cross the official 10-kilometer mark, proving mental stamina and pacing control under endurance loads.",
    stampShape: "postmark",
    stampColorVar: "var(--ink-ochre)",
    stampRot: "5deg",
    stampSub: "PACE CLEARANCE",
    stampCode: "10K · ROAD"
  },
  {
    idx: 10,
    x: 896,
    y: 164,
    shortDate: "OCT '25",
    shortCode: "L1A-I",
    date: "Oct 2025",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "BLR → US-I",
    title: "Filed L1A Individual Visa Petition",
    summary: "Reframed petition architecture and executive leadership thesis for targeted individual consular filing, demonstrating organizational impact.",
    stampShape: "customs",
    stampColorVar: "var(--ink-ochre)",
    stampRot: "-5deg",
    stampSub: "EXECUTIVE DOSSIER",
    stampCode: "INDIVIDUAL"
  },
  {
    idx: 11,
    x: 978,
    y: 96,
    shortDate: "NOV '25",
    shortCode: "HAN",
    date: "Nov 2025",
    category: "travel",
    categoryLabel: "Travel & Endurance Stop",
    corridor: "BLR → HAN",
    title: "Vietnam Expedition",
    summary: "Explored Southeast Asian cultural crossroads, northern karst limestone ranges, and dynamic decentralized manufacturing networks.",
    stampShape: "postmark",
    stampColorVar: "var(--ink-indigo)",
    stampRot: "6deg",
    stampSub: "ENTRY IMMIGRATION",
    stampCode: "HAN · VNM"
  },
  {
    idx: 12,
    x: 1060,
    y: 168,
    shortDate: "AUG '26",
    shortCode: "VALLEY",
    date: "Aug 2026",
    category: "travel",
    categoryLabel: "Travel & Endurance Stop",
    corridor: "BLR → VOF",
    title: "First High-Altitude Trek: Valley of Flowers",
    summary: "Ascended the glacial Himalayan alpine wilderness (14,400 ft / 4,389 m), testing altitude resilience, physical conditioning, and mountain fortitude.",
    stampShape: "postmark",
    stampColorVar: "var(--ink-moss)",
    stampRot: "-6deg",
    stampSub: "ALPINE EXPEDITION",
    stampCode: "VOF · 14.4K"
  },
  {
    idx: 13,
    x: 1142,
    y: 88,
    shortDate: "SEP '26",
    shortCode: "USA",
    date: "Sep 2026",
    category: "career",
    categoryLabel: "Career & Strategy Hub",
    corridor: "IND → USA",
    title: "L1A Individual Visa Approved",
    summary: "Secured US intra-company executive transfer approval following strategic petition overhaul; green light for US strategic leadership and enterprise transformation deployment.",
    stampShape: "customs",
    stampColorVar: "var(--ink-forest)",
    stampRot: "-3deg",
    stampSub: "BORDER CLEARANCE",
    stampCode: "CLEARED · USA"
  }
];

let transitActiveIdx = 0;
let transitActiveFilter = "all";
let transitArcDistances = [];
let transitArcTotalLen = 0;
let transitCurrentMarkerDist = 0;
let transitAnimFrame = null;
let transitMapInitialized = false;

function transitPrefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function getFilteredTransitIndices(filter = transitActiveFilter) {
  return TRANSIT_STOPS
    .filter((s) => filter === "all" || s.category === filter)
    .map((s) => s.idx);
}

function buildTransitCurveD(stops) {
  if (!stops || !stops.length) return "";
  let d = `M ${stops[0].x} ${stops[0].y}`;
  for (let i = 1; i < stops.length; i++) {
    const prev = stops[i - 1];
    const curr = stops[i];
    const cpX = (prev.x + curr.x) / 2;
    d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function initTransitMap() {
  if (transitMapInitialized) return;
  const arcsLayer = document.getElementById("transit-arcs-layer");
  const nodesLayer = document.getElementById("transit-nodes-layer");
  if (!arcsLayer || !nodesLayer) return;

  const SVG_NS = "http://www.w3.org/2000/svg";
  const fullD = buildTransitCurveD(TRANSIT_STOPS);

  // Base full dotted route arc
  const baseArc = document.createElementNS(SVG_NS, "path");
  baseArc.setAttribute("id", "transit-arc-base");
  baseArc.setAttribute("d", fullD);
  baseArc.setAttribute("class", "transit-arc-base");
  arcsLayer.appendChild(baseArc);

  // Cumulative segment distances along curve for accurate marker/progress interpolation
  transitArcDistances = [0];
  let cumLen = 0;
  for (let i = 1; i < TRANSIT_STOPS.length; i++) {
    const prev = TRANSIT_STOPS[i - 1];
    const curr = TRANSIT_STOPS[i];
    const cpX = (prev.x + curr.x) / 2;
    const seg = document.createElementNS(SVG_NS, "path");
    seg.setAttribute("d", `M ${prev.x} ${prev.y} C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`);
    cumLen += seg.getTotalLength();
    transitArcDistances.push(cumLen);
  }
  transitArcTotalLen = baseArc.getTotalLength() || cumLen || 1;

  // Highlighted progress arc overlay
  const activeArc = document.createElementNS(SVG_NS, "path");
  activeArc.setAttribute("id", "transit-arc-active");
  activeArc.setAttribute("d", fullD);
  activeArc.setAttribute("class", "transit-arc-active");
  activeArc.setAttribute("stroke-dasharray", String(transitArcTotalLen));
  activeArc.setAttribute("stroke-dashoffset", String(transitArcTotalLen));
  arcsLayer.appendChild(activeArc);

  // Render 14 Waypoint Nodes
  TRANSIT_STOPS.forEach((stop) => {
    const g = document.createElementNS(SVG_NS, "g");
    const isTravel = stop.category === "travel";
    g.setAttribute("class", `transit-node ${isTravel ? "is-travel" : "is-career"}`);
    g.setAttribute("id", `transit-node-${stop.idx}`);
    g.setAttribute("data-idx", String(stop.idx));
    g.setAttribute("transform", `translate(${stop.x}, ${stop.y})`);
    g.setAttribute("role", "button");
    g.setAttribute("tabindex", "0");
    g.setAttribute("aria-label", `Stop ${stop.idx + 1}: ${stop.date} - ${stop.title}`);

    // Generous touch hit circle (48px diameter -> >=36px even on 920px mobile scroller)
    const hit = document.createElementNS(SVG_NS, "circle");
    hit.setAttribute("cx", "0");
    hit.setAttribute("cy", "0");
    hit.setAttribute("r", "24");
    hit.setAttribute("fill", "transparent");
    g.appendChild(hit);

    if (isTravel) {
      // Sage Compass / Pin Node
      const outer = document.createElementNS(SVG_NS, "circle");
      outer.setAttribute("cx", "0");
      outer.setAttribute("cy", "0");
      outer.setAttribute("r", "10");
      outer.setAttribute("stroke-width", "1.6");
      outer.setAttribute("stroke-dasharray", "2.5 2");
      outer.setAttribute("class", "transit-node-outer fill-[#FAF8F1] dark:fill-[#121A15] stroke-[#44543B] dark:stroke-[#96B88B]");
      g.appendChild(outer);

      const diamond = document.createElementNS(SVG_NS, "polygon");
      diamond.setAttribute("points", "0,-6.5 6.5,0 0,6.5 -6.5,0");
      diamond.setAttribute("class", "transit-node-core fill-[#44543B] dark:fill-[#96B88B]");
      g.appendChild(diamond);

      const centerDot = document.createElementNS(SVG_NS, "circle");
      centerDot.setAttribute("cx", "0");
      centerDot.setAttribute("cy", "0");
      centerDot.setAttribute("r", "2");
      centerDot.setAttribute("class", "fill-[#FAF8F1] dark:fill-[#121A15]");
      g.appendChild(centerDot);
    } else {
      // Terracotta / Amber Concentric Double-Ring Hub Node
      const outer = document.createElementNS(SVG_NS, "circle");
      outer.setAttribute("cx", "0");
      outer.setAttribute("cy", "0");
      outer.setAttribute("r", "10.5");
      outer.setAttribute("stroke-width", "1.8");
      outer.setAttribute("class", "transit-node-outer fill-[#FAF8F1] dark:fill-[#121A15] stroke-[#75482E] dark:stroke-[#E28C52]");
      g.appendChild(outer);

      const core = document.createElementNS(SVG_NS, "circle");
      core.setAttribute("cx", "0");
      core.setAttribute("cy", "0");
      core.setAttribute("r", "4.8");
      core.setAttribute("class", "transit-node-core fill-[#75482E] dark:fill-[#E28C52]");
      g.appendChild(core);
    }

    // Staggered top/bottom labels (even below, odd above) to guarantee zero label collision
    const isTop = stop.idx % 2 === 1;
    const dateText = document.createElementNS(SVG_NS, "text");
    dateText.setAttribute("x", "0");
    dateText.setAttribute("y", isTop ? "-28" : "24");
    dateText.setAttribute("text-anchor", "middle");
    dateText.setAttribute("class", "transit-node-label-date");
    dateText.textContent = stop.shortDate;
    g.appendChild(dateText);

    const codeText = document.createElementNS(SVG_NS, "text");
    codeText.setAttribute("x", "0");
    codeText.setAttribute("y", isTop ? "-16" : "37");
    codeText.setAttribute("text-anchor", "middle");
    codeText.setAttribute("class", "transit-node-label-code");
    codeText.textContent = stop.shortCode;
    g.appendChild(codeText);

    g.addEventListener("click", () => {
      if (transitActiveFilter !== "all" && stop.category !== transitActiveFilter) {
        setTransitFilter("all", stop.idx);
      } else {
        selectTransitStop(stop.idx, { animate: true, scrollMap: true });
      }
    });

    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (transitActiveFilter !== "all" && stop.category !== transitActiveFilter) {
          setTransitFilter("all", stop.idx);
        } else {
          selectTransitStop(stop.idx, { animate: true, scrollMap: true });
        }
      }
    });

    nodesLayer.appendChild(g);
  });

  transitMapInitialized = true;
}

function animateMarkerAlongArc(targetDist, animate) {
  const marker = document.getElementById("transit-active-marker");
  const baseArc = document.getElementById("transit-arc-base");
  if (!marker || !baseArc) return;

  if (transitAnimFrame) {
    cancelAnimationFrame(transitAnimFrame);
    transitAnimFrame = null;
  }

  const placeAtDist = (dist) => {
    const clamped = Math.max(0, Math.min(transitArcTotalLen, dist));
    const pt = baseArc.getPointAtLength(clamped);
    const ptAhead = baseArc.getPointAtLength(Math.min(transitArcTotalLen, clamped + 2));
    const ptBehind = baseArc.getPointAtLength(Math.max(0, clamped - 2));
    const angle = Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x) * (180 / Math.PI);
    marker.setAttribute("transform", `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}) rotate(${angle.toFixed(1)})`);
  };

  if (!animate || transitPrefersReducedMotion()) {
    transitCurrentMarkerDist = targetDist;
    placeAtDist(targetDist);
    return;
  }

  const startDist = transitCurrentMarkerDist;
  const delta = targetDist - startDist;
  if (Math.abs(delta) < 1) {
    transitCurrentMarkerDist = targetDist;
    placeAtDist(targetDist);
    return;
  }

  const duration = 420;
  const startTime = performance.now();

  const tick = (now) => {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const cur = startDist + delta * eased;
    transitCurrentMarkerDist = cur;
    placeAtDist(cur);

    if (t < 1) {
      transitAnimFrame = requestAnimationFrame(tick);
    } else {
      transitCurrentMarkerDist = targetDist;
      transitAnimFrame = null;
    }
  };

  transitAnimFrame = requestAnimationFrame(tick);
}

function selectTransitStop(idx, options = {}) {
  const { animate = true, scrollMap = true } = options;
  initTransitMap();

  idx = Math.max(0, Math.min(TRANSIT_STOPS.length - 1, idx));
  transitActiveIdx = idx;
  const stop = TRANSIT_STOPS[idx];

  // 1. Update SVG node active + dimmed states
  const nodes = document.querySelectorAll(".transit-node");
  nodes.forEach((node) => {
    const nodeIdx = Number(node.getAttribute("data-idx"));
    const nodeStop = TRANSIT_STOPS[nodeIdx];
    const matchesFilter = transitActiveFilter === "all" || (nodeStop && nodeStop.category === transitActiveFilter);
    node.classList.toggle("is-active", nodeIdx === idx);
    node.classList.toggle("is-dimmed", !matchesFilter);
  });

  // 2. Update active progress arc + marker
  const targetDist = transitArcDistances[idx] ?? 0;
  const activeArc = document.getElementById("transit-arc-active");
  if (activeArc && transitArcTotalLen > 0) {
    activeArc.setAttribute("stroke-dashoffset", String(Math.max(0, transitArcTotalLen - targetDist)));
  }
  animateMarkerAlongArc(targetDist, animate);

  // 3. Update Stop Progress Indicator against active filter set
  const filtered = getFilteredTransitIndices();
  const posInFilter = Math.max(0, filtered.indexOf(idx));
  const counterEl = document.getElementById("transit-stop-counter");
  if (counterEl) {
    counterEl.textContent = `Stop ${String(posInFilter + 1).padStart(2, "0")} / ${String(filtered.length).padStart(2, "0")}`;
  }

  // 4. Populate Perforated Dispatch Manifest Card & Ink Stamp
  const manifestNumEl = document.getElementById("dispatch-manifest-num");
  const corridorEl = document.getElementById("dispatch-corridor");
  const categoryEl = document.getElementById("dispatch-category-tag");
  const titleEl = document.getElementById("dispatch-title");
  const summaryEl = document.getElementById("dispatch-summary");
  const stampEl = document.getElementById("dispatch-ink-stamp");
  const stampSubEl = document.getElementById("dispatch-stamp-sub");
  const stampCodeEl = document.getElementById("dispatch-stamp-code");
  const stampDateEl = document.getElementById("dispatch-stamp-date");

  if (manifestNumEl) manifestNumEl.textContent = `Manifest #${String(idx + 1).padStart(2, "0")}`;
  if (corridorEl) corridorEl.textContent = stop.corridor;
  if (categoryEl) categoryEl.textContent = stop.categoryLabel;
  if (titleEl) titleEl.textContent = stop.title;
  if (summaryEl) summaryEl.textContent = stop.summary;

  if (stampEl) {
    stampEl.classList.toggle("stamp-customs", stop.stampShape === "customs");
    stampEl.classList.toggle("stamp-postmark", stop.stampShape === "postmark");
    stampEl.style.setProperty("--stamp-color", stop.stampColorVar);
    stampEl.style.setProperty("--stamp-rot", stop.stampRot);
  }
  if (stampSubEl) stampSubEl.textContent = stop.stampSub;
  if (stampCodeEl) stampCodeEl.textContent = stop.stampCode;
  if (stampDateEl) stampDateEl.textContent = stop.date.toUpperCase();

  // 5. Horizontally center active waypoint inside scrollable map frame
  if (scrollMap) {
    const scroller = document.getElementById("transit-map-scroller");
    const svgEl = document.getElementById("transit-svg-map");
    if (scroller && svgEl && scroller.scrollWidth > scroller.clientWidth) {
      const svgWidth = svgEl.getBoundingClientRect().width || 1040;
      const nodePixelX = (stop.x / 1220) * svgWidth;
      const targetLeft = Math.max(0, nodePixelX - (scroller.clientWidth / 2));
      scroller.scrollTo({
        left: targetLeft,
        behavior: animate && !transitPrefersReducedMotion() ? "smooth" : "auto"
      });
    }
  }
}

function setTransitFilter(filter, preferredIdx = null) {
  if (!["all", "career", "travel"].includes(filter)) {
    filter = "all";
  }
  transitActiveFilter = filter;

  const filterButtons = document.querySelectorAll(".transit-filter-pill");
  filterButtons.forEach((btn) => {
    const isActive = btn.getAttribute("data-filter") === filter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });

  const filtered = getFilteredTransitIndices(filter);
  let targetIdx = preferredIdx !== null ? preferredIdx : transitActiveIdx;
  if (!filtered.includes(targetIdx)) {
    targetIdx = filtered.length ? filtered[0] : 0;
  }

  selectTransitStop(targetIdx, { animate: true, scrollMap: true });
}

function stepTransitStop(direction) {
  const filtered = getFilteredTransitIndices();
  if (!filtered.length) return;

  const curPos = filtered.indexOf(transitActiveIdx);
  const startPos = curPos >= 0 ? curPos : 0;
  const nextPos = (startPos + direction + filtered.length) % filtered.length;
  selectTransitStop(filtered[nextPos], { animate: true, scrollMap: true });
}

// Attach all controllers directly to window immediately
window.openFolder = openFolder;
window.closeFolder = closeFolder;
window.switchTravelTab = switchTravelTab;
window.openCvModal = openCvModal;
window.closeCvModal = closeCvModal;
window.showToast = showToast;
window.selectTransitStop = selectTransitStop;
window.setTransitFilter = setTransitFilter;
window.stepTransitStop = stepTransitStop;

/**
 * 1. One-Click "Copy Email" with Toast Notification
 */
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const copyText = document.getElementById("copy-email-text");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const email = (window.THAPASE_CONFIG && window.THAPASE_CONFIG.profile && window.THAPASE_CONFIG.profile.email) || "thapase@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        if (copyText) copyText.textContent = "Copied! ✓";
        showToast(`Email address (${email}) copied to clipboard!`);
        setTimeout(() => {
          if (copyText) copyText.textContent = "Copy Email";
        }, 2500);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    } else {
      window.location.href = `mailto:${email}`;
    }
  });
}

/**
 * 3. Light / Dark Theme Switcher with LocalStorage
 */
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-toggle-icon");
  if (!themeBtn) return;

  const isLight = document.documentElement.classList.contains("light");
  if (themeIcon) {
    themeIcon.className = isLight ? "fa-solid fa-moon text-[#75482E]" : "fa-solid fa-sun text-amber-400";
  }

  themeBtn.addEventListener("click", () => {
    const currentIsDark = document.documentElement.classList.contains("dark");
    if (currentIsDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("thp_site_theme", "light");
      if (themeIcon) themeIcon.className = "fa-solid fa-moon text-[#75482E]";
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("thp_site_theme", "dark");
      if (themeIcon) themeIcon.className = "fa-solid fa-sun text-amber-400";
    }
  });
}

/**
 * 4. Wensity UI Spotlight Cursor Follower
 */
function initSpotlightHover() {
  if (window.matchMedia && !window.matchMedia("(hover: hover)").matches) {
    return;
  }

  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/**
 * 5. Event Listener Bindings for Interactive Folders & Modals
 */
function initFolderEventListeners() {
  // Direct click event listeners on folder buttons (in addition to inline onclick)
  const folderButtons = document.querySelectorAll(".folder-container");
  folderButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const folder = this.getAttribute("data-folder") || "professional";
      openFolder(folder);
    });
  });

  // Switch tabs inside dossier window
  const navTabs = document.querySelectorAll(".dossier-nav-tab");
  navTabs.forEach((btn) => {
    btn.addEventListener("click", function () {
      const folderId = this.getAttribute("data-folder");
      if (folderId) openFolder(folderId);
    });
  });

  // Close Dossier Button
  const closeBtn = document.getElementById("close-dossier-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeFolder);
  }

  // Backdrop click on Dossier Window
  const dossierWindow = document.getElementById("dossier-window");
  if (dossierWindow) {
    dossierWindow.addEventListener("click", (e) => {
      if (e.target === dossierWindow) closeFolder();
    });
  }

  // CV Modal Buttons
  const openCvBtns = document.querySelectorAll(".open-cv-modal-btn");
  openCvBtns.forEach((btn) => {
    btn.addEventListener("click", openCvModal);
  });

  const closeCvBtn = document.getElementById("close-cv-modal-btn");
  if (closeCvBtn) {
    closeCvBtn.addEventListener("click", closeCvModal);
  }

  const dismissCvBtn = document.getElementById("dismiss-cv-modal-btn");
  if (dismissCvBtn) {
    dismissCvBtn.addEventListener("click", closeCvModal);
  }

  const cvModal = document.getElementById("cv-modal");
  if (cvModal) {
    cvModal.addEventListener("click", (e) => {
      if (e.target === cvModal) closeCvModal();
    });
  }

  // Keyboard Shortcuts (Esc to close, 1-5 to open folders)
  document.addEventListener("keydown", (e) => {
    const isDossierOpen = dossierWindow && dossierWindow.classList.contains("open");
    const isCvOpen = cvModal && cvModal.classList.contains("open");

    // Escape closes active modal
    if (e.key === "Escape") {
      if (isCvOpen) {
        closeCvModal();
        return;
      }
      if (isDossierOpen) {
        closeFolder();
        return;
      }
    }

    // Left/Right Arrow navigation while Ascent Transit Map is active
    if (isDossierOpen && !isCvOpen) {
      const ascentFolder = document.getElementById("folder-content-ascent");
      if (ascentFolder && !ascentFolder.classList.contains("hidden")) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          stepTransitStop(-1);
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          stepTransitStop(1);
          return;
        }
      }
    }

    // Number keys 1-6 when no modal is open
    if (!isDossierOpen && !isCvOpen) {
      const numMap = {
        "1": "professional",
        "2": "education",
        "3": "extracurriculars",
        "4": "writings",
        "5": "travel",
        "6": "ascent"
      };
      if (numMap[e.key]) {
        openFolder(numMap[e.key]);
      }
    }
  });

  // Check initial URL hash
  try {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#folder-")) {
      const folderKey = hash.replace("#folder-", "");
      openFolder(folderKey);
    }
  } catch (e) {
    // Ignore URL hash error
  }
}

/**
 * 4b. Expandable Professional Experience Cards (Challenge -> Methodology -> Impact)
 */
function initExpandableExperienceCards() {
  const triggers = document.querySelectorAll(".exp-card-trigger");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const card = trigger.closest(".exp-spotlight-card");
      if (!card) return;

      const isExpanded = !card.classList.contains("is-expanded");
      card.classList.toggle("is-expanded", isExpanded);
      trigger.setAttribute("aria-expanded", String(isExpanded));

      const detailId = trigger.getAttribute("aria-controls");
      const detailEl = detailId ? document.getElementById(detailId) : null;
      if (detailEl) {
        detailEl.setAttribute("aria-hidden", String(!isExpanded));
      }

      const labelEl = trigger.querySelector(".exp-card-toggle-label");
      if (labelEl) {
        labelEl.textContent = isExpanded ? "Hide breakdown" : "Challenge → Methodology → Impact";
      }
    });
  });
}

/**
 * Primary Initializer
 */
function initPortfolio() {
  if (window.__THAPASE_PORTFOLIO_INIT__) return;
  window.__THAPASE_PORTFOLIO_INIT__ = true;

  initCopyEmail();
  initThemeToggle();
  initSpotlightHover();
  initExpandableExperienceCards();
  initTransitMap();
  initFolderEventListeners();
}

// Self-executing setup
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolio);
} else {
  initPortfolio();
}
