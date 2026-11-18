/**
 * ============================================================================
 * T.H.H. Thapase — Portfolio Interactions & Micro-Animations
 * Aesthetic: Wensity UI Cursor Spotlights + Parivan Vansjalia Editorial Flow
 * ============================================================================
 */

(function () {
  if (window.__THAPASE_INITIALIZED__) return;

  function init() {
    if (window.__THAPASE_INITIALIZED__) return;
    window.__THAPASE_INITIALIZED__ = true;

    initClock();
    initCopyEmail();
    initThemeToggle();
    initSpotlightHover();
    initCvModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/**
 * 1. Live Bangalore (IST) Clock
 */
function initClock() {
  const clockEl = document.getElementById("live-bangalore-clock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };
    clockEl.textContent = `${now.toLocaleTimeString("en-US", options)} IST`;
  }

  update();
  setInterval(update, 30000);
}

/**
 * 2. One-Click "Copy Email" with Toast Notification
 */
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const copyText = document.getElementById("copy-email-text");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const email = (window.THAPASE_CONFIG && window.THAPASE_CONFIG.profile.email) || "thapase@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      if (copyText) copyText.textContent = "Copied! ✓";
      showToast(`Email address (${email}) copied to clipboard!`);
      setTimeout(() => {
        if (copyText) copyText.textContent = "Copy Email";
      }, 2500);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  });
}

/**
 * Global Toast Controller
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
 * 3. Light / Dark Theme Switcher with LocalStorage
 */
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-toggle-icon");
  if (!themeBtn) return;

  // Sync icon on startup
  const isLight = document.documentElement.classList.contains("light");
  if (themeIcon) {
    themeIcon.className = isLight ? "fa-solid fa-sun text-amber-500" : "fa-solid fa-moon text-amber-400";
  }

  themeBtn.addEventListener("click", () => {
    const currentIsDark = document.documentElement.classList.contains("dark");
    if (currentIsDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("thp_site_theme", "light");
      if (themeIcon) themeIcon.className = "fa-solid fa-sun text-amber-500";
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("thp_site_theme", "dark");
      if (themeIcon) themeIcon.className = "fa-solid fa-moon text-amber-400";
    }
  });
}

/**
 * 4. Wensity UI Spotlight Cursor Follower
 * Tracks mouse movement over `.spotlight-card` elements to position the radial glow
 */
function initSpotlightHover() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach(card => {
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
 * 5. Accordion Expand / Collapse
 */
function toggleAccordion(element) {
  if (!element) return;
  element.classList.toggle("active");
}
window.toggleAccordion = toggleAccordion;

/**
 * 6. Curriculum Vitae (CV) Modal View & Keyboard Accessibility
 */
function initCvModal() {
  const cvModal = document.getElementById("cv-modal");
  const openBtn = document.getElementById("open-cv-modal-btn");
  const closeBtn = document.getElementById("close-cv-modal-btn");
  const dismissBtn = document.getElementById("dismiss-cv-modal-btn");

  if (!cvModal) return;

  function openModal() {
    cvModal.classList.remove("hidden");
    cvModal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    cvModal.classList.add("hidden");
    cvModal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeModal);

  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !cvModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  window.openCvModal = openModal;
  window.closeCvModal = closeModal;
}
