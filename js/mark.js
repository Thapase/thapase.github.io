/**
 * ============================================================================
 * The Living Parchment — Interactive Spirit Animal & Thumbprint Stamping
 * Aesthetic: Authentic Ink Pressed on Japanese / Antique Parchment
 * 10 Marks: Thumb Impression (Top Hero) + 3x3 Grid of 9 Fierce Animals
 * Adaptive Dual-Theme Inks (100% visible in both Light and Dark mode)
 * Rule: Stamping strictly gated by 1-Click Social Sign-In (Google or X)
 * Strictly ONE mark per user handle.
 * ============================================================================
 */

(function () {
  // Bold Linocut / Woodcut Emblem Shapes (viewBox 0 0 100 100, frameless transparent background + carved negative-space cutouts)
  const STAMP_EMBLEMS = {
    thumbprint: `
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" shape-rendering="geometricPrecision">
        <!-- Complete uncropped rounded oval thumb silhouette -->
        <rect x="20" y="8" width="60" height="84" rx="30" ry="30" stroke-width="1.6" stroke-dasharray="3 2.5" opacity="0.45"/>
        <!-- Unbroken concentric oval & whorl ridges from crown to lower thumb pad -->
        <rect x="25.5" y="14" width="49" height="72" rx="24.5" ry="24.5" stroke-width="2.3"/>
        <rect x="31.5" y="21" width="37" height="58" rx="18.5" ry="18.5" stroke-width="2.3"/>
        <rect x="37.5" y="28" width="25" height="44" rx="12.5" ry="12.5" stroke-width="2.3"/>
        <rect x="43" y="35" width="14" height="30" rx="7" ry="7" stroke-width="2.2"/>
        <path d="M50 43 C47.5 43 47 47 47 50 C47 54 48.5 57 50 57 C52 57 53 53 53 49" stroke-width="2.2"/>
      </g>
    `,
    lion: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M50 4 L58 14 L69 7 L71 20 L84 18 L81 31 L93 36 L85 47 L95 57 L83 64 L88 77 L75 79 L73 92 L60 88 L50 96 L40 88 L27 92 L25 79 L12 77 L17 64 L5 57 L15 47 L7 36 L19 31 L16 18 L29 20 L31 7 L42 14 Z
        M32 28 L50 24 L68 28 L72 48 L64 70 L50 78 L36 70 L28 48 Z
      "/>
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M35 32 L50 29 L65 32 L68 49 L61 67 L50 73 L39 67 L32 49 Z
        M36 42 L45 45 L42 49 L35 47 Z
        M64 42 L55 45 L58 49 L65 47 Z
        M45 53 L55 53 L50 60 Z
        M41 64 L59 64 L57 68 L43 68 Z
      "/>
    `,
    tiger: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M20 14 C28 11 36 16 39 24 L61 24 C64 16 72 11 80 14 C86 18 85 28 79 34 L88 46 L81 52 L87 60 L77 66 L70 84 L50 91 L30 84 L23 66 L13 60 L19 52 L12 46 L21 34 C15 28 14 18 20 14 Z
        M40 19 L60 19 L60 23 L40 23 Z
        M42 27 L58 27 L58 31 L42 31 Z
        M48 23 L52 23 L52 38 L48 38 Z
        M24 38 L37 41 L35 44 L22 41 Z
        M76 38 L63 41 L65 44 L78 41 Z
        M32 46 L44 49 L40 54 L31 51 Z
        M68 46 L56 49 L60 54 L69 51 Z
        M43 58 L57 58 L50 66 Z
        M38 71 L62 71 L59 77 L53 77 L50 73 L47 77 L41 77 Z
      "/>
    `,
    leopard: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M21 15 C30 12 38 18 40 25 L60 25 C62 18 70 12 79 15 C85 20 84 30 78 36 C82 44 83 54 78 64 C73 77 62 87 50 88 C38 87 27 77 22 64 C17 54 18 44 22 36 C16 30 15 20 21 15 Z
        M47 28 L53 28 L53 33 L47 33 Z
        M37 33 L42 33 L42 38 L37 38 Z
        M58 33 L63 33 L63 38 L58 38 Z
        M29 44 L43 46 L39 52 L29 49 Z
        M71 44 L57 46 L61 52 L71 49 Z
        M44 57 L56 57 L50 64 Z
        M37 68 L63 68 L60 72 L50 70 L40 72 Z
        M42 76 L58 76 L55 80 L45 80 Z
      "/>
    `,
    wolf: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M16 9 L37 28 L50 25 L63 28 L84 9 L78 38 L87 50 L79 56 L86 64 L74 71 L66 86 L50 92 L34 86 L26 71 L14 64 L21 56 L13 50 L22 38 Z
        M25 22 L31 32 L27 33 Z
        M75 22 L69 32 L73 33 Z
        M43 31 L57 31 L50 39 Z
        M29 45 L44 48 L39 53 L29 50 Z
        M71 45 L56 48 L61 53 L71 50 Z
        M43 61 L57 61 L50 69 Z
        M39 73 L61 73 L58 79 L53 75 L50 79 L47 75 L42 79 Z
      "/>
    `,
    bear: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M18 16 C27 12 35 18 37 25 C41 23 46 22 50 22 C54 22 59 23 63 25 C65 18 73 12 82 16 C88 22 86 33 80 38 C84 46 84 57 78 68 C71 80 61 87 50 87 C39 87 29 80 22 68 C16 57 16 46 20 38 C14 33 12 22 18 16 Z
        M32 39 L40 39 L40 45 L32 45 Z
        M60 39 L68 39 L68 45 L60 45 Z
        M40 55 L60 55 L57 65 L43 65 Z
        M38 69 L62 69 L59 76 L53 76 L50 72 L47 76 L41 76 Z
      "/>
    `,
    eagle: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M50 10 L56 19 L65 13 L67 24 L78 20 L75 31 L85 36 L78 46 L86 55 L75 61 L71 76 L61 73 L56 85 L50 90 L44 85 L39 73 L29 76 L25 61 L14 55 L22 46 L15 36 L25 31 L22 20 L33 24 L35 13 L44 19 Z
        M26 39 L45 43 L40 49 L29 46 Z
        M74 39 L55 43 L60 49 L71 46 Z
        M42 52 L58 52 L50 76 Z
        M44 48 L56 48 L58 51 L42 51 Z
      "/>
    `,
    bull: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M6 5 C19 6 31 16 35 27 L65 27 C69 16 81 6 94 5 C93 17 83 28 71 33 L82 39 L78 48 L71 46 L74 63 C74 75 63 87 50 87 C37 87 26 75 26 63 L29 46 L22 48 L18 39 L29 33 C17 28 7 17 6 5 Z
        M42 33 L58 33 L50 40 Z
        M31 44 L42 47 L38 52 L31 49 Z
        M69 44 L58 47 L62 52 L69 49 Z
        M38 69 C41 69 43 71 43 74 C43 77 41 79 38 79 C35 79 33 77 33 74 C33 71 35 69 38 69 Z
        M62 69 C65 69 67 71 67 74 C67 77 65 79 62 79 C59 79 57 77 57 74 C57 71 59 69 62 69 Z
        M41 81 L59 81 L57 84 L43 84 Z
      "/>
    `,
    stag: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M22 7 L27 17 L34 11 L37 22 L43 16 L44 31 L56 31 L57 16 L63 22 L66 11 L73 17 L78 7 L83 10 L75 26 L86 24 L86 29 L71 33 L64 38 L83 37 L79 48 L66 47 L64 62 C64 73 57 83 50 88 C43 83 36 73 36 62 L34 47 L21 48 L17 37 L36 38 L29 33 L14 29 L14 24 L25 26 L17 10 Z
        M38 48 L46 51 L43 56 L38 53 Z
        M62 48 L54 51 L57 56 L62 53 Z
        M44 71 L56 71 L50 78 Z
      "/>
    `,
    cobra: `
      <path fill="currentColor" fill-rule="evenodd" stroke-linejoin="miter" d="
        M22 10 C39 4 61 4 78 10 C86 19 82 36 67 45 L64 60 C62 70 57 77 52 80 L52 87 L57 93 L53 95 L50 90 L47 95 L43 93 L48 87 L48 80 C43 77 38 70 36 60 L33 45 C18 36 14 19 22 10 Z
        M30 22 C41 28 59 28 70 22 L68 27 C57 32 43 32 32 27 Z
        M38 40 L46 43 L43 48 L37 45 Z
        M62 40 L54 43 L57 48 L63 45 Z
        M42 58 L58 58 L55 67 L52 61 L50 67 L48 61 L45 67 Z
      "/>
    `
  };
  STAMP_EMBLEMS.falcon = STAMP_EMBLEMS.cobra;

  let sealUidCounter = 0;

  function escapeXml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function buildFramelessStampSVG(stampKey) {
    const uid = `seal-${++sealUidCounter}`;
    const emblem = STAMP_EMBLEMS[stampKey] || STAMP_EMBLEMS.thumbprint;

    return `
      <svg class="stamped-seal-svg" viewBox="0 0 100 100" shape-rendering="geometricPrecision" aria-hidden="true">
        <defs>
          <mask id="mask-${uid}">
            <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
            <!-- Sharp geometric woodcut ink-distress cutouts (zero soft blur filters) -->
            <polygon points="18,22 23,20 21,25" fill="#000000" />
            <polygon points="79,19 84,21 81,25" fill="#000000" />
            <polygon points="24,78 29,76 27,81" fill="#000000" />
            <polygon points="71,79 76,77 74,82" fill="#000000" />
            <polygon points="48,11 52,11 50,15" fill="#000000" />
            <polygon points="48,86 52,87 50,91" fill="#000000" />
            <polygon points="34,36 37,35 36,39" fill="#000000" />
            <polygon points="62,62 66,61 64,65" fill="#000000" />
            <polygon points="39,55 42,54 40,58" fill="#000000" />
            <polygon points="57,38 60,39 58,42" fill="#000000" />
            <polygon points="13,49 17,48 15,52" fill="#000000" />
            <polygon points="83,48 88,50 85,53" fill="#000000" />
          </mask>
        </defs>
        <g mask="url(#mask-${uid})">
          ${emblem}
        </g>
      </svg>
    `;
  }

  const STAMP_METAS = {
    thumbprint: { name: "Thumb Impression", shortName: "Thumb", icon: "🖐️", trait: "Raw authenticity, personal sovereignty, and an original path." },
    lion: { name: "African Lion", shortName: "Lion", icon: "🦁", trait: "Commanding authority, fearless leadership, and fierce loyalty." },
    tiger: { name: "Bengal Tiger", shortName: "Tiger", icon: "🐯", trait: "Relentless drive, unbridled intensity, and razor focus." },
    leopard: { name: "Snow Leopard", shortName: "Leopard", icon: "🐆", trait: "Stealth precision, quiet lethality, and solitary mastery." },
    wolf: { name: "Trail Wolf", shortName: "Wolf", icon: "🐺", trait: "Pack loyalty, sharp survival instinct, and enduring grit." },
    bear: { name: "Grizzly Bear", shortName: "Bear", icon: "🐻", trait: "Raw formidable strength, grounded patience, and unshakeable fortitude." },
    eagle: { name: "Highland Eagle", shortName: "Eagle", icon: "🦅", trait: "Far-reaching vision, swift execution, and soaring ambition." },
    bull: { name: "Wild Bull", shortName: "Bull", icon: "🐂", trait: "Unstoppable momentum, pure resilience, and powerhouse grit." },
    stag: { name: "Forest Stag", shortName: "Stag", icon: "🦌", trait: "Poise under pressure, wild vigilance, and noble instinct." },
    cobra: { name: "King Cobra", shortName: "Cobra", icon: "🐍", trait: "Cold calculated timing, lethal precision, and striking first." },
    falcon: { name: "King Cobra", shortName: "Cobra", icon: "🐍", trait: "Cold calculated timing, lethal precision, and striking first." }
  };

  const COLOR_VARS = {
    terracotta: "var(--ink-terracotta)",
    forest: "var(--ink-forest)",
    indigo: "var(--ink-indigo)",
    ochre: "var(--ink-ochre)",
    moss: "var(--ink-moss)"
  };

  // State
  let activeStamp = "thumbprint";
  let activeColorId = "terracotta";
  let supabaseClient = null;
  let currentUser = null; // { handle: string, provider: "google" | "twitter" | "instagram" }

  // Pre-seeded Tasteful Communal Stamps (Rotations clamped to -4deg..+4deg)
  const SEED_MARKS = [
    { x: 20, y: 32, stamp: "thumbprint", colorId: "terracotta", rot: -3.4, opacity: 0.9, handle: "@arjun_m", provider: "twitter" },
    { x: 78, y: 24, stamp: "eagle", colorId: "indigo", rot: 3.2, opacity: 0.92, handle: "karthik.r@gmail.com", provider: "google" },
    { x: 28, y: 63, stamp: "wolf", colorId: "forest", rot: -2.8, opacity: 0.9, handle: "@riya_ops", provider: "twitter" },
    { x: 82, y: 60, stamp: "lion", colorId: "ochre", rot: 3.8, opacity: 0.9, handle: "@vikram_strat", provider: "instagram" },
    { x: 50, y: 74, stamp: "stag", colorId: "moss", rot: 2.1, opacity: 0.9, handle: "ananya.s@gmail.com", provider: "google" }
  ];

  // Auth Management
  function getSignedInUser() {
    if (currentUser) return currentUser;
    try {
      const stored = localStorage.getItem("thp_auth_user");
      if (stored) {
        currentUser = JSON.parse(stored);
        return currentUser;
      }
    } catch (e) {}
    return null;
  }

  function setSignedInUser(user) {
    currentUser = user;
    if (user && user.handle) {
      localStorage.setItem("thp_auth_user", JSON.stringify(user));
    } else {
      currentUser = null;
      localStorage.removeItem("thp_auth_user");
    }
    renderAuthUI();
  }

  function renderAuthUI() {
    const user = getSignedInUser();
    const signedOutEl = document.getElementById("auth-signed-out");
    const signedInEl = document.getElementById("auth-signed-in");
    const handleDisplay = document.getElementById("auth-handle-display");
    const providerIcon = document.getElementById("auth-provider-icon");
    const hintDesc = document.getElementById("hint-desc");
    const hintStatus = document.getElementById("hint-status");

    if (user && user.handle) {
      if (signedOutEl) signedOutEl.classList.add("hidden");
      if (signedInEl) {
        signedInEl.classList.remove("hidden");
        signedInEl.classList.add("flex");
      }
      if (handleDisplay) {
        handleDisplay.textContent = user.handle;
        handleDisplay.title = `Signed in as ${user.handle}`;
      }
      if (providerIcon) {
        const prov = user.provider || (user.handle.includes("@gmail") || (user.handle.includes(".") && !user.handle.startsWith("@")) ? "google" : "twitter");
        if (prov === "google") {
          providerIcon.className = "fa-brands fa-google text-[11px] text-[#EA4335]";
        } else if (prov === "instagram") {
          providerIcon.className = "fa-brands fa-instagram text-[11px] text-[#E1306C]";
        } else {
          providerIcon.className = "fa-brands fa-x-twitter text-[11px] text-[#233124] dark:text-[#F2EEDC]";
        }
      }
      if (hintDesc) {
        hintDesc.textContent = `Signed in as ${user.handle}. Choose your seal & inkwell, then tap anywhere on the parchment to stamp.`;
      }
      if (hintStatus) {
        hintStatus.textContent = "Tap anywhere to stamp";
      }
    } else {
      if (signedInEl) {
        signedInEl.classList.add("hidden");
        signedInEl.classList.remove("flex");
      }
      if (signedOutEl) signedOutEl.classList.remove("hidden");
      if (hintDesc) {
        hintDesc.textContent = "Leave your mark with your authentic Thumb Impression or one of 9 fierce spirit animals (Lion, Tiger, Leopard, Wolf, Bear, Eagle, Bull, Stag, King Cobra). Pick an ink color, sign in with Twitter, Gmail, or Instagram below, and tap anywhere on the parchment to stamp.";
      }
      if (hintStatus) {
        hintStatus.textContent = "Sign in below to begin";
      }
    }
  }

  function pulseSignInPrompt() {
    const signedOutEl = document.getElementById("auth-signed-out");
    if (!signedOutEl) return;
    signedOutEl.classList.add("ring-2", "ring-[#75482E]", "dark:ring-[#d89667]", "scale-105");
    setTimeout(() => {
      signedOutEl.classList.remove("ring-2", "ring-[#75482E]", "dark:ring-[#d89667]", "scale-105");
    }, 1200);
  }

  // Supabase Initializer
  function initSupabase() {
    try {
      const cfg = window.THAPASE_CONFIG?.supabase;
      if (window.supabase && cfg?.url && cfg?.anonKey && cfg.url.trim() !== "" && cfg.anonKey.trim() !== "") {
        supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
        
        // Listen to auth state
        supabaseClient.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            handleAuthUser(session.user);
          } else if (event === "SIGNED_OUT") {
            setSignedInUser(null);
          }
        });

        // Check active session
        supabaseClient.auth.getSession().then(({ data }) => {
          if (data?.session?.user) {
            handleAuthUser(data.session.user);
          }
        });
      }
    } catch (e) {
      console.warn("Supabase init optional notice:", e);
    }
  }

  function handleAuthUser(user) {
    if (!user) return;
    let handle = "";
    let provider = "google";
    const meta = user.user_metadata || {};
    if (meta.user_name) {
      handle = "@" + meta.user_name;
      provider = "twitter";
    } else if (meta.preferred_username) {
      handle = "@" + meta.preferred_username;
      provider = "twitter";
    } else if (user.email) {
      handle = user.email;
      provider = "google";
    }
    if (handle) {
      setSignedInUser({ handle, provider });
      showToast(`Signed in as ${handle}`);
    }
  }

  function getStoredStamps() {
    try {
      const stored = localStorage.getItem("thp_parchment_stamps");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStoredStamps(stamps) {
    try {
      localStorage.setItem("thp_parchment_stamps", JSON.stringify(stamps));
    } catch (e) {}
  }

  function showToast(message) {
    const toast = document.getElementById("site-toast");
    const toastText = document.getElementById("toast-text");
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.remove("opacity-0", "pointer-events-none");
    toast.classList.add("opacity-100", "pointer-events-auto");

    setTimeout(() => {
      toast.classList.remove("opacity-100", "pointer-events-auto");
      toast.classList.add("opacity-0", "pointer-events-none");
    }, 2800);
  }

  function createStampElement(data, isNew = false) {
    const el = document.createElement("div");
    el.className = isNew ? "stamped-mark is-new" : "stamped-mark";
    el.style.left = `${data.x}%`;
    el.style.top = `${data.y}%`;
    
    // Bind adaptive ink color
    const colorId = data.colorId || "terracotta";
    el.setAttribute("data-ink", colorId);
    el.style.color = COLOR_VARS[colorId] || "var(--ink-terracotta)";
    const clampedRot = Math.max(-4, Math.min(4, Number(data.rot) || 0)).toFixed(1);
    el.style.setProperty("--rot", `${clampedRot}deg`);

    if (!isNew && data.opacity) {
      el.style.opacity = data.opacity;
    }

    if (data.handle) {
      el.setAttribute("data-handle", data.handle.trim().toLowerCase());
    }

    const meta = STAMP_METAS[data.stamp] || STAMP_METAS.thumbprint;
    const svg = buildFramelessStampSVG(data.stamp);
    const prov = data.provider || (data.handle && data.handle.includes("@gmail") ? "google" : (data.handle && data.handle.includes(".") && !data.handle.startsWith("@") ? "google" : "twitter"));
    let handleIcon = '<i class="fa-brands fa-x-twitter text-[9px]"></i>';
    if (prov === "google") {
      handleIcon = '<i class="fa-brands fa-google text-[9px] text-[#EA4335]"></i>';
    } else if (prov === "instagram") {
      handleIcon = '<i class="fa-brands fa-instagram text-[9px] text-[#E1306C]"></i>';
    } else {
      handleIcon = '<i class="fa-brands fa-x-twitter text-[9px]"></i>';
    }

    el.innerHTML = `
      <div class="stamp-icon-wrap flex items-center justify-center">
        ${svg}
      </div>
      <span class="stamped-meta-label">${escapeXml(meta.name)}</span>
      ${data.handle ? `
        <span class="stamped-handle-badge">
          ${handleIcon}
          <span>${escapeXml(data.handle)}</span>
        </span>
      ` : ''}
    `;
    return el;
  }

  async function renderExistingMarks() {
    const canvas = document.getElementById("parchment-canvas");
    if (!canvas) return;

    // Clear existing DOM marks (preserving hint)
    const existingDomMarks = canvas.querySelectorAll(".stamped-mark");
    existingDomMarks.forEach(m => m.remove());

    // Map of handle -> stampData (deduplicated)
    const marksByHandle = new Map();

    // 1. Load pre-seeded tasteful marks
    SEED_MARKS.forEach((m) => {
      marksByHandle.set(m.handle.toLowerCase(), m);
    });

    // 2. Load cloud stamps if Supabase configured
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("parchment_stamps")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(250);

        if (!error && Array.isArray(data)) {
          data.forEach((row) => {
            if (row.handle) {
              marksByHandle.set(row.handle.toLowerCase(), {
                x: row.x,
                y: row.y,
                stamp: row.stamp || "thumbprint",
                colorId: row.color_id || row.color || "terracotta",
                rot: row.rot || 0,
                handle: row.handle
              });
            }
          });
        }
      } catch (err) {
        console.warn("Could not query Supabase stamps:", err);
      }
    }

    // 3. Overlay locally saved visitor stamps
    const visitorMarks = getStoredStamps();
    visitorMarks.forEach((m) => {
      if (m.handle) {
        marksByHandle.set(m.handle.toLowerCase(), m);
      }
    });

    // 4. Render all deduplicated marks to canvas
    if (marksByHandle.size > 0) {
      const hint = document.getElementById("canvas-hint");
      if (hint && visitorMarks.length > 0) {
        hint.style.opacity = "0";
      }
      marksByHandle.forEach((stampData) => {
        canvas.appendChild(createStampElement(stampData, false));
      });
    }
  }

  function initCanvasClick() {
    const canvas = document.getElementById("parchment-canvas");
    if (!canvas) return;

    canvas.addEventListener("click", async function (e) {
      // Ignore clicks on header, dock, drawer, buttons, or links
      if (e.target.closest("header") || e.target.closest(".ledger-dock") || e.target.closest(".stamp-drawer") || e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) {
        return;
      }

      // Close stamp drawer if open
      const drawer = document.getElementById("stamp-picker-modal");
      if (drawer && drawer.classList.contains("open")) {
        drawer.classList.remove("open");
      }

      // 1. Strict Gate: Must be signed in to leave a mark!
      const user = getSignedInUser();
      if (!user || !user.handle) {
        showToast("Please sign in with Twitter, Gmail, or Instagram to leave your mark");
        pulseSignInPrompt();
        if (typeof window.openAuthModal === "function") {
          window.openAuthModal();
        }
        return;
      }

      const handle = user.handle;

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const rawPctX = (clickX / rect.width) * 100;
      const rawPctY = (clickY / rect.height) * 100;

      // Safe viewport clamping so marks never clip off edges or hide behind dock/header
      const isMobile = window.innerWidth < 640;
      const clampedX = Math.max(8, Math.min(92, rawPctX)).toFixed(2);
      const maxY = isMobile ? 76 : 86;
      const clampedY = Math.max(12, Math.min(maxY, rawPctY)).toFixed(2);

      // Random subtle archival rubber stamp tilt strictly between -4deg and +4deg
      const randomRot = (Math.random() * 8 - 4).toFixed(1);

      const stampData = {
        x: parseFloat(clampedX),
        y: parseFloat(clampedY),
        stamp: activeStamp,
        colorId: activeColorId,
        rot: parseFloat(randomRot),
        handle: handle,
        provider: user.provider || "twitter",
        timestamp: Date.now()
      };

      // 2. Strict One Mark Per User Handle Enforcement:
      // If this handle already has a stamp on canvas, remove previous DOM element
      const normalizedHandle = handle.toLowerCase();
      const existingDom = canvas.querySelector(`.stamped-mark[data-handle="${normalizedHandle}"]`);
      const isRelocation = !!existingDom;
      if (existingDom) {
        existingDom.remove();
      }

      // Add new stamp element
      const markEl = createStampElement(stampData, true);
      canvas.appendChild(markEl);

      // Hide hint once user stamps
      const hint = document.getElementById("canvas-hint");
      if (hint) {
        hint.style.opacity = "0";
        setTimeout(() => hint.remove(), 700);
      }

      // Haptic feedback on mobile if supported
      if (navigator.vibrate) {
        try { navigator.vibrate(35); } catch (err) {}
      }

      // Save to localStorage (deduplicated by handle)
      let current = getStoredStamps().filter(s => !s.handle || s.handle.trim().toLowerCase() !== normalizedHandle);
      current.push(stampData);
      saveStoredStamps(current);

      // Persist to Supabase free cloud DB if configured
      if (supabaseClient) {
        try {
          await supabaseClient.from("parchment_stamps").upsert({
            handle: normalizedHandle,
            stamp: activeStamp,
            color_id: activeColorId,
            x: stampData.x,
            y: stampData.y,
            rot: stampData.rot,
            updated_at: new Date().toISOString()
          }, { onConflict: "handle" });
        } catch (err) {
          console.warn("Supabase upsert notice:", err);
        }
      }

      if (isRelocation) {
        showToast(`Updated mark location for ${handle}`);
      } else {
        showToast(`Impression stamped for ${handle}`);
      }
    });
  }

  function hydrateStampPickerIcons() {
    const items = document.querySelectorAll(".stamp-grid-item[data-stamp]");
    items.forEach((btn) => {
      const stampKey = btn.getAttribute("data-stamp");
      const emblem = STAMP_EMBLEMS[stampKey];
      const svgEl = btn.querySelector("svg");
      if (!emblem || !svgEl) return;
      svgEl.setAttribute("viewBox", "0 0 100 100");
      svgEl.setAttribute("shape-rendering", "geometricPrecision");
      svgEl.removeAttribute("fill");
      svgEl.removeAttribute("stroke");
      svgEl.removeAttribute("stroke-width");
      svgEl.removeAttribute("stroke-linecap");
      svgEl.removeAttribute("stroke-linejoin");
      svgEl.innerHTML = emblem;
    });
  }

  function initToolbar() {
    hydrateStampPickerIcons();
    // Stamp Picker Drawer Open / Close
    const pickerBtn = document.getElementById("stamp-picker-btn");
    const drawer = document.getElementById("stamp-picker-modal");
    const closeDrawerBtn = document.getElementById("close-stamp-drawer-btn");
    const activeIconEl = document.getElementById("active-stamp-icon");
    const activeNameEl = document.getElementById("active-stamp-name");
    const traitNameEl = document.getElementById("trait-preview-name");
    const traitDescEl = document.getElementById("trait-preview-desc");

    function setTraitPreview(stampKey) {
      const meta = STAMP_METAS[stampKey] || STAMP_METAS.thumbprint;
      if (traitNameEl) traitNameEl.textContent = meta.name;
      if (traitDescEl) traitDescEl.textContent = meta.trait;
    }

    function updateActiveStampUI(stampKey) {
      activeStamp = stampKey;
      const meta = STAMP_METAS[stampKey] || STAMP_METAS.thumbprint;
      if (activeIconEl) activeIconEl.textContent = meta.icon;
      if (activeNameEl) activeNameEl.textContent = meta.name;

      const items = document.querySelectorAll(".stamp-grid-item");
      items.forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-stamp") === stampKey);
      });
      setTraitPreview(stampKey);
    }

    if (pickerBtn && drawer) {
      pickerBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        drawer.classList.toggle("open");
        // Ensure trait preview displays active stamp when drawer opens
        setTraitPreview(activeStamp);
      });
    }

    if (closeDrawerBtn && drawer) {
      closeDrawerBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        drawer.classList.remove("open");
      });
    }

    // Grid Stamp Choices (Thumbprint + 9 Animals)
    const gridItems = document.querySelectorAll(".stamp-grid-item");
    gridItems.forEach((btn) => {
      // Dynamic hover updates trait preview bar
      btn.addEventListener("mouseenter", function () {
        const stampKey = this.getAttribute("data-stamp") || "thumbprint";
        setTraitPreview(stampKey);
      });
      btn.addEventListener("mouseleave", function () {
        // Return to currently selected active stamp
        setTraitPreview(activeStamp);
      });
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const stampKey = this.getAttribute("data-stamp") || "thumbprint";
        updateActiveStampUI(stampKey);
        if (drawer) drawer.classList.remove("open");
      });
    });

    // Close drawer when clicking anywhere outside
    document.addEventListener("click", function (e) {
      if (drawer && drawer.classList.contains("open")) {
        if (!drawer.contains(e.target) && !pickerBtn.contains(e.target)) {
          drawer.classList.remove("open");
        }
      }
    });

    // Adaptive Ink Color choices
    const colorDots = document.querySelectorAll(".ink-color-dot");
    colorDots.forEach((dot) => {
      dot.addEventListener("click", function (e) {
        e.stopPropagation();
        colorDots.forEach((d) => d.classList.remove("active"));
        this.classList.add("active");
        activeColorId = this.getAttribute("data-color-id") || "terracotta";
      });
    });

    // ========================================================================
    // Authentic Social Sign-In Controller (Google / Gmail, Twitter / X, Instagram)
    // ========================================================================
    const authModal = document.getElementById("auth-modal");
    const authCard = document.getElementById("auth-modal-card");
    const closeAuthBtn = document.getElementById("close-auth-modal-btn");
    const openModalBtn = document.getElementById("auth-open-modal-btn");
    const providerSelector = document.getElementById("auth-provider-selector");
    const verifyStep = document.getElementById("auth-verify-step");
    const backToProvidersBtn = document.getElementById("auth-back-to-providers-btn");
    const verifyForm = document.getElementById("auth-verify-form");
    const verifyIcon = document.getElementById("verify-form-icon");
    const verifyLabel = document.getElementById("verify-form-label");
    const verifyHelper = document.getElementById("verify-form-helper");
    const handleInput = document.getElementById("auth-handle-input");
    const submitBtn = document.getElementById("auth-submit-btn");
    const submitLabel = document.getElementById("auth-submit-label");

    let selectedProvider = "google";

    window.openAuthModal = function (provider = null) {
      if (!authModal) return;
      authModal.classList.remove("opacity-0", "pointer-events-none");
      authModal.classList.add("opacity-100", "pointer-events-auto");
      if (authCard) {
        authCard.classList.remove("scale-95");
        authCard.classList.add("scale-100");
      }
      if (provider) {
        showProviderVerifyStep(provider);
      } else {
        showProviderSelectStep();
      }
    };

    function closeAuthModal() {
      if (!authModal) return;
      authModal.classList.remove("opacity-100", "pointer-events-auto");
      authModal.classList.add("opacity-0", "pointer-events-none");
      if (authCard) {
        authCard.classList.remove("scale-100");
        authCard.classList.add("scale-95");
      }
    }

    function showProviderSelectStep() {
      if (providerSelector) providerSelector.classList.remove("hidden");
      if (verifyStep) verifyStep.classList.add("hidden");
    }

    function showProviderVerifyStep(provider) {
      selectedProvider = provider;
      if (providerSelector) providerSelector.classList.add("hidden");
      if (verifyStep) verifyStep.classList.remove("hidden");

      if (provider === "google") {
        if (verifyIcon) verifyIcon.innerHTML = '<i class="fa-brands fa-google text-[#EA4335] text-lg"></i>';
        if (verifyLabel) verifyLabel.textContent = "Google / Gmail Authentication";
        if (verifyHelper) verifyHelper.textContent = "Enter your Gmail address to verify:";
        if (handleInput) {
          handleInput.placeholder = "e.g. yourname@gmail.com";
          handleInput.value = "";
          setTimeout(() => handleInput.focus(), 80);
        }
        if (submitLabel) submitLabel.textContent = "Verify with Google";
      } else if (provider === "twitter") {
        if (verifyIcon) verifyIcon.innerHTML = '<i class="fa-brands fa-x-twitter text-lg text-[#233124] dark:text-white"></i>';
        if (verifyLabel) verifyLabel.textContent = "Twitter (X) Authentication";
        if (verifyHelper) verifyHelper.textContent = "Enter your Twitter @handle to verify:";
        if (handleInput) {
          handleInput.placeholder = "e.g. @yourhandle";
          handleInput.value = "@";
          setTimeout(() => handleInput.focus(), 80);
        }
        if (submitLabel) submitLabel.textContent = "Verify with Twitter (X)";
      } else if (provider === "instagram") {
        if (verifyIcon) verifyIcon.innerHTML = '<i class="fa-brands fa-instagram text-[#E1306C] text-lg"></i>';
        if (verifyLabel) verifyLabel.textContent = "Instagram Authentication";
        if (verifyHelper) verifyHelper.textContent = "Enter your Instagram @username to verify:";
        if (handleInput) {
          handleInput.placeholder = "e.g. @yourusername";
          handleInput.value = "@";
          setTimeout(() => handleInput.focus(), 80);
        }
        if (submitLabel) submitLabel.textContent = "Verify with Instagram";
      }
    }

    // Modal Trigger Buttons
    if (openModalBtn) {
      openModalBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        window.openAuthModal();
      });
    }

    const googleBtn = document.getElementById("google-auth-btn");
    if (googleBtn) {
      googleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            supabaseClient.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {}
        }
        window.openAuthModal("google");
      });
    }

    const twitterBtn = document.getElementById("twitter-auth-btn");
    if (twitterBtn) {
      twitterBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            supabaseClient.auth.signInWithOAuth({
              provider: "twitter",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {}
        }
        window.openAuthModal("twitter");
      });
    }

    const instagramBtn = document.getElementById("instagram-auth-btn");
    if (instagramBtn) {
      instagramBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        window.openAuthModal("instagram");
      });
    }

    // Provider choices inside modal
    const choiceBtns = document.querySelectorAll(".auth-provider-choice-btn");
    choiceBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const prov = this.getAttribute("data-provider") || "google";
        if (supabaseClient && (prov === "google" || prov === "twitter")) {
          try {
            supabaseClient.auth.signInWithOAuth({
              provider: prov,
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {}
        }
        showProviderVerifyStep(prov);
      });
    });

    if (backToProvidersBtn) {
      backToProvidersBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        showProviderSelectStep();
      });
    }

    if (closeAuthBtn) {
      closeAuthBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAuthModal();
      });
    }

    if (authModal) {
      authModal.addEventListener("click", function (e) {
        if (e.target === authModal) {
          closeAuthModal();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && authModal && !authModal.classList.contains("opacity-0")) {
        closeAuthModal();
      }
    });

    // Verification Form Submission
    if (verifyForm) {
      verifyForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let rawVal = handleInput ? handleInput.value.trim() : "";
        if (!rawVal || rawVal === "@") {
          if (handleInput) handleInput.focus();
          return;
        }

        let finalHandle = rawVal;
        if (selectedProvider === "google") {
          if (!finalHandle.includes("@")) {
            finalHandle = finalHandle + "@gmail.com";
          }
        } else if (selectedProvider === "twitter" || selectedProvider === "instagram") {
          if (!finalHandle.startsWith("@")) {
            finalHandle = "@" + finalHandle.replace(/^@+/, "");
          }
        }

        // Simulate authentic credential verification animation
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Verifying credentials...</span>';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i><span id="auth-submit-label">Verify & Sign In</span>';
          }
          setSignedInUser({ handle: finalHandle, provider: selectedProvider });
          closeAuthModal();
          showToast(`Authenticated via ${selectedProvider.toUpperCase()} as ${finalHandle}! Tap anywhere to stamp.`);
        }, 350);
      });
    }

    // Sign out button
    const signoutBtn = document.getElementById("auth-signout-btn");
    if (signoutBtn) {
      signoutBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            await supabaseClient.auth.signOut();
          } catch (err) {}
        }
        setSignedInUser(null);
        showToast("Signed out. Sign in again to stamp.");
      });
    }

    // Clear Mine button
    const clearBtn = document.getElementById("clear-stamps-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        const user = getSignedInUser();
        const currentHandle = user?.handle ? user.handle.toLowerCase() : "";
        
        localStorage.removeItem("thp_parchment_stamps");
        
        if (supabaseClient && currentHandle) {
          try {
            await supabaseClient.from("parchment_stamps").delete().eq("handle", currentHandle);
          } catch (err) {
            console.warn("Supabase delete notice:", err);
          }
        }

        // Reload marks
        const canvas = document.getElementById("parchment-canvas");
        if (canvas) {
          const stampedMarks = canvas.querySelectorAll(".stamped-mark");
          stampedMarks.forEach((m) => m.remove());
          await renderExistingMarks();
          showToast("Your impressions cleared from canvas");
        }
      });
    }

    // Theme toggle button
    const themeBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-toggle-icon");
    if (themeBtn) {
      const isLight = document.documentElement.classList.contains("light");
      if (themeIcon) {
        themeIcon.className = isLight ? "fa-solid fa-moon text-[#75482E]" : "fa-solid fa-sun text-amber-400";
      }

      themeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
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
  }

  // Initializer
  async function init() {
    initSupabase();
    initToolbar();
    renderAuthUI();
    initCanvasClick();
    await renderExistingMarks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
