/**
 * ============================================================================
 * The Living Parchment — Interactive Spirit Animal & Fingerprint Stamping
 * Aesthetic: Authentic Ink Pressed on Japanese / Antique Parchment
 * Fully zero-cost architecture: Supabase free tier + LocalStorage fallback
 * Strictly ONE mark per user handle (Twitter @handle or Gmail)
 * ============================================================================
 */

(function () {
  // SVGs for Fingerprint & Spirit Animal Rubber Stamps
  const STAMP_SVGS = {
    fingerprint: `
      <svg class="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
        <path d="M2 12a10 10 0 0 1 18-6"/>
        <path d="M2 16h.01"/>
        <path d="M21.8 16c.2-2 .131-5.354 0-6"/>
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/>
        <path d="M8.65 22c.21-.66.45-1.32.57-2"/>
        <path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>
      </svg>
    `,
    leopard: `
      <svg class="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 2 5 4.5 4 7c-1 2.5-.5 5 1 7l-1 4 3-1c1.5 1 3.5 1.5 5 1.5s3.5-.5 5-1.5l3 1-1-4c1.5-2 2-4.5 1-7-1-2.5-4-5-8-5zm-3.5 8c-.8 0-1.5-.7-1.5-1.5S7.7 7 8.5 7s1.5.7 1.5 1.5S9.3 10 8.5 10zm7 0c-.8 0-1.5-.7-1.5-1.5S14.7 7 15.5 7s1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM12 15c-1.5 0-2.5-.8-3-1.5.5-.3 1.5-.5 3-.5s2.5.2 3 .5c-.5.7-1.5 1.5-3 1.5z"/>
      </svg>
    `,
    eagle: `
      <svg class="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L9 7l-7 1 5 5-1 7 6-3 6 3-1-7 5-5-7-1-3-5zm0 5c1 1.5 2 2.5 4 3-1.5 1-2.5 2.5-3 4-.5-1.5-1.5-3-3-4 2-.5 3-1.5 2-3z"/>
      </svg>
    `,
    wolf: `
      <svg class="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.5 4.5L16 2l-3 4-2-2-4 2 1 4-3 3 2 4 4-1 2 4 3-2 1-3 4-1-1.5-5.5zm-8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm4 2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
      </svg>
    `,
    stag: `
      <svg class="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8c-2 0-3.5 1.5-4 3-.5 1.5 0 3.5 1 4.5l-1 4.5 3-1 1 2 1-2 3 1-1-4.5c1-1 1.5-3 1-4.5-.5-1.5-2-3-4-3zm-6-4l2 3-3 1 1 2-3 1 4 2c-.5-1.5-.5-3.5 0-5l-1-4zm12 0l-1 4c.5 1.5.5 3.5 0 5l4-2-3-1 1-2-3-1 2-3z"/>
      </svg>
    `,
    elephant: `
      <svg class="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6c-2.5 0-4.5 1.5-5.5 3.5C12.5 8 10.5 7 8 7c-4 0-6 3-6 7 0 3 1.5 5 4 5l1 3 3-1 1-2h4l1 2 3-1 1-3c2 0 3-1.5 3-4 0-3.5-1.5-8-3-8zm-11 7c-.8 0-1.5-.7-1.5-1.5S7.2 10 8 10s1.5.7 1.5 1.5S8.8 13 8 13zm10 2c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z"/>
      </svg>
    `
  };

  // State
  let activeStamp = "fingerprint";
  let activeColor = "#75482E";
  let supabaseClient = null;

  // Pre-seeded Tasteful Communal Stamps (Simulating fellow travelers who stamped before)
  const SEED_MARKS = [
    { x: 22, y: 32, stamp: "fingerprint", color: "#75482E", rot: -5, opacity: 0.85, handle: "@arjun_m" },
    { x: 76, y: 26, stamp: "eagle", color: "#284455", rot: 7, opacity: 0.88, handle: "karthik.r@gmail.com" },
    { x: 30, y: 68, stamp: "wolf", color: "#233124", rot: -4, opacity: 0.82, handle: "@riya_ops" },
    { x: 80, y: 64, stamp: "leopard", color: "#9E6236", rot: 9, opacity: 0.85, handle: "@vikram_strat" },
    { x: 52, y: 78, stamp: "stag", color: "#526048", rot: 3, opacity: 0.8, handle: "ananya.s@gmail.com" }
  ];

  // Initialize Supabase if keys are provided in js/config.js
  function initSupabase() {
    try {
      const cfg = window.THAPASE_CONFIG?.supabase;
      if (window.supabase && cfg?.url && cfg?.anonKey && cfg.url.trim() !== "" && cfg.anonKey.trim() !== "") {
        supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
        
        // Listen to auth state
        supabaseClient.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            handleAuthUser(session.user);
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
    const meta = user.user_metadata || {};
    if (meta.user_name) {
      handle = "@" + meta.user_name;
    } else if (meta.preferred_username) {
      handle = "@" + meta.preferred_username;
    } else if (user.email) {
      handle = user.email;
    }
    if (handle) {
      localStorage.setItem("thp_user_handle", handle);
      const handleInput = document.getElementById("handle-input");
      if (handleInput) handleInput.value = handle;
      updateHandleIcon(handle);
      showToast(`Signed in as ${handle}`);
    }
  }

  function updateHandleIcon(val) {
    const handleIcon = document.getElementById("handle-type-icon");
    if (!handleIcon) return;
    if (val.includes("@") && val.includes(".")) {
      handleIcon.className = "fa-regular fa-envelope text-[11px] text-[#75482E] dark:text-[#d89667]";
    } else {
      handleIcon.className = "fa-brands fa-x-twitter text-[11px] text-[#75482E] dark:text-[#d89667]";
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
    }, 2500);
  }

  function createStampElement(data, isNew = false) {
    const el = document.createElement("div");
    el.className = "stamped-mark";
    el.style.left = `${data.x}%`;
    el.style.top = `${data.y}%`;
    el.style.color = data.color;
    el.style.setProperty("--rot", `${data.rot}deg`);

    if (!isNew && data.opacity) {
      el.style.opacity = data.opacity;
    }

    if (data.handle) {
      el.setAttribute("data-handle", data.handle.trim().toLowerCase());
    }

    const svg = STAMP_SVGS[data.stamp] || STAMP_SVGS.fingerprint;
    const isTwitter = data.handle && (data.handle.startsWith("@") || !data.handle.includes("@"));
    const handleIcon = isTwitter
      ? '<i class="fa-brands fa-x-twitter text-[9px]"></i>'
      : '<i class="fa-regular fa-envelope text-[9px]"></i>';

    el.innerHTML = `
      <div class="stamp-icon-wrap flex items-center justify-center">
        ${svg}
      </div>
      ${data.handle ? `
        <span class="stamped-handle-badge">
          ${handleIcon}
          <span>${data.handle}</span>
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
                stamp: row.stamp || "fingerprint",
                color: row.color || "#75482E",
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
    const handleInput = document.getElementById("handle-input");
    if (!canvas) return;

    canvas.addEventListener("click", async function (e) {
      // Ignore clicks on header, dock, buttons, links, or inputs
      if (e.target.closest("header") || e.target.closest(".ledger-dock") || e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) {
        return;
      }

      // 1. Get or prompt for social handle
      let handle = handleInput ? handleInput.value.trim() : "";
      if (!handle) {
        handle = localStorage.getItem("thp_user_handle") || "";
      }
      if (!handle) {
        handle = prompt("Enter your Twitter @handle or Gmail to seal your mark:\n(Strictly 1 mark allowed per user handle)", "");
        if (handle) {
          handle = handle.trim();
          if (handleInput) handleInput.value = handle;
          localStorage.setItem("thp_user_handle", handle);
          updateHandleIcon(handle);
        }
      }
      if (!handle) {
        handle = "@traveler";
      }

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

      // Random organic hand stamp tilt between -10deg and +10deg
      const randomRot = (Math.random() * 20 - 10).toFixed(1);

      const stampData = {
        x: parseFloat(clampedX),
        y: parseFloat(clampedY),
        stamp: activeStamp,
        color: activeColor,
        rot: parseFloat(randomRot),
        handle: handle,
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
            color: activeColor,
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

  function initToolbar() {
    const handleInput = document.getElementById("handle-input");

    // Pre-fill remembered handle
    const savedHandle = localStorage.getItem("thp_user_handle");
    if (savedHandle && handleInput) {
      handleInput.value = savedHandle;
      updateHandleIcon(savedHandle);
    }

    if (handleInput) {
      handleInput.addEventListener("input", function () {
        const val = this.value.trim();
        updateHandleIcon(val);
        if (val) {
          localStorage.setItem("thp_user_handle", val);
        }
      });
    }

    // 1-Click Social Sign-In: Google / Gmail
    const googleBtn = document.getElementById("google-auth-btn");
    if (googleBtn) {
      googleBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            await supabaseClient.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {
            console.warn("Supabase Google Auth notice:", err);
          }
        }
        
        // Seamless zero-config prompt
        const email = prompt("Connect with Google / Gmail:\nEnter your Gmail address to seal your mark:", localStorage.getItem("thp_user_handle") || "");
        if (email && email.trim()) {
          let val = email.trim();
          if (!val.includes("@")) val = val + "@gmail.com";
          localStorage.setItem("thp_user_handle", val);
          if (handleInput) handleInput.value = val;
          updateHandleIcon(val);
          showToast(`Connected as ${val}. Tap anywhere on parchment to stamp!`);
        }
      });
    }

    // 1-Click Social Sign-In: Twitter / X
    const twitterBtn = document.getElementById("twitter-auth-btn");
    if (twitterBtn) {
      twitterBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            await supabaseClient.auth.signInWithOAuth({
              provider: "twitter",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {
            console.warn("Supabase Twitter Auth notice:", err);
          }
        }

        // Seamless zero-config prompt
        const handle = prompt("Connect with Twitter / X:\nEnter your @handle to seal your mark:", localStorage.getItem("thp_user_handle") || "@");
        if (handle && handle.trim()) {
          let val = handle.trim();
          if (!val.startsWith("@") && !val.includes("@")) val = "@" + val;
          localStorage.setItem("thp_user_handle", val);
          if (handleInput) handleInput.value = val;
          updateHandleIcon(val);
          showToast(`Connected as ${val}. Tap anywhere on parchment to stamp!`);
        }
      });
    }

    // Stamp choices
    const stampBtns = document.querySelectorAll(".stamp-tool-btn");
    stampBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        stampBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        activeStamp = this.getAttribute("data-stamp") || "fingerprint";
      });
    });

    // Ink color choices
    const colorDots = document.querySelectorAll(".ink-color-dot");
    colorDots.forEach((dot) => {
      dot.addEventListener("click", function (e) {
        e.stopPropagation();
        colorDots.forEach((d) => d.classList.remove("active"));
        this.classList.add("active");
        activeColor = this.getAttribute("data-color") || "#75482E";
      });
    });

    // Clear Mine button
    const clearBtn = document.getElementById("clear-stamps-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        const currentHandle = (handleInput?.value.trim() || localStorage.getItem("thp_user_handle") || "").toLowerCase();
        
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
    initCanvasClick();
    await renderExistingMarks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
