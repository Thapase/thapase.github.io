/**
 * ============================================================================
 * T.H.H. Thapase — Portfolio Interactions & File Explorer Dossiers
 * Aesthetic: Parivan Vansjalia Editorial Flow + Skeuomorphic Dossier Folders
 * Responsive for Desktop & Mobile
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
    initFolderDossier();
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
 * 5. Folder Dossier Window Controller
 * Opens full brief view when a folder on the landing page is clicked
 */
function initFolderDossier() {
  const dossierWindow = document.getElementById("dossier-window");
  const closeBtn = document.getElementById("close-dossier-btn");
  if (!dossierWindow) return;

  const folderSections = {
    professional: document.getElementById("folder-content-professional"),
    education: document.getElementById("folder-content-education"),
    extracurriculars: document.getElementById("folder-content-extracurriculars"),
    writings: document.getElementById("folder-content-writings"),
    travel: document.getElementById("folder-content-travel")
  };

  const folderTabBtns = document.querySelectorAll(".dossier-nav-tab");

  function openFolder(folderId) {
    if (!folderSections[folderId]) folderId = "professional";

    // Hide all contents and show requested one
    Object.keys(folderSections).forEach(key => {
      if (folderSections[key]) {
        folderSections[key].classList.toggle("hidden", key !== folderId);
      }
    });

    // Update Tab UI
    folderTabBtns.forEach(btn => {
      const isTarget = btn.getAttribute("data-folder") === folderId;
      btn.classList.toggle("active-tab", isTarget);
      if (isTarget) {
        btn.classList.add("bg-[#75482E]", "text-[#F2EEDC]");
        btn.classList.remove("bg-[#FAF8F1]", "dark:bg-white/5", "text-[#4C5848]", "dark:text-[#A4B39E]");
      } else {
        btn.classList.remove("bg-[#75482E]", "text-[#F2EEDC]");
        btn.classList.add("bg-[#FAF8F1]", "dark:bg-white/5", "text-[#4C5848]", "dark:text-[#A4B39E]");
      }
    });

    // Update Breadcrumb
    const breadcrumbEl = document.getElementById("dossier-breadcrumb-title");
    if (breadcrumbEl) {
      const names = {
        professional: "01 / Professional Experience",
        education: "02 / Academic Rigor & Education",
        extracurriculars: "03 / Extra Curriculars & Social Impact",
        writings: "04 / Articles & Thought Leadership",
        travel: "05 / Travel & Expeditions"
      };
      breadcrumbEl.textContent = names[folderId] || "Dossier";
    }

    // Reveal Window
    dossierWindow.classList.remove("hidden");
    dossierWindow.classList.add("flex", "open");
    document.body.style.overflow = "hidden";

    // Scroll inner body to top
    const scrollContainer = document.getElementById("dossier-scroll-area");
    if (scrollContainer) scrollContainer.scrollTop = 0;

    history.replaceState(null, "", `#folder-${folderId}`);
  }

  function closeFolder() {
    dossierWindow.classList.remove("open", "flex");
    dossierWindow.classList.add("hidden");
    document.body.style.overflow = "";
    history.replaceState(null, "", window.location.pathname);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeFolder);

  dossierWindow.addEventListener("click", (e) => {
    if (e.target === dossierWindow) closeFolder();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dossierWindow.classList.contains("open")) {
      closeFolder();
    }
    // Number shortcuts 1-5 when window is closed
    const cvModal = document.getElementById("cv-modal");
    if (!dossierWindow.classList.contains("open") && (!cvModal || cvModal.classList.contains("hidden"))) {
      const numMap = { "1": "professional", "2": "education", "3": "extracurriculars", "4": "writings", "5": "travel" };
      if (numMap[e.key]) {
        openFolder(numMap[e.key]);
      }
    }
  });

  // Switch tabs inside dossier
  folderTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const folderId = btn.getAttribute("data-folder");
      if (folderId) openFolder(folderId);
    });
  });

  // Expose to window
  window.openFolder = openFolder;
  window.closeFolder = closeFolder;

  // Travel Sub-Tabs (Treks vs Vacations)
  window.switchTravelTab = function (tabName) {
    const treksView = document.getElementById("travel-view-treks");
    const vacationsView = document.getElementById("travel-view-vacations");
    const treksBtn = document.getElementById("tab-btn-treks");
    const vacationsBtn = document.getElementById("tab-btn-vacations");

    if (tabName === "treks") {
      if (treksView) treksView.classList.remove("hidden");
      if (vacationsView) vacationsView.classList.add("hidden");
      if (treksBtn) {
        treksBtn.classList.add("bg-[#75482E]", "text-[#F2EEDC]");
        treksBtn.classList.remove("bg-[#FAF8F1]", "dark:bg-white/5", "text-[#4C5848]", "dark:text-[#A4B39E]");
      }
      if (vacationsBtn) {
        vacationsBtn.classList.remove("bg-[#75482E]", "text-[#F2EEDC]");
        vacationsBtn.classList.add("bg-[#FAF8F1]", "dark:bg-white/5", "text-[#4C5848]", "dark:text-[#A4B39E]");
      }
    } else {
      if (treksView) treksView.classList.add("hidden");
      if (vacationsView) vacationsView.classList.remove("hidden");
      if (vacationsBtn) {
        vacationsBtn.classList.add("bg-[#75482E]", "text-[#F2EEDC]");
        vacationsBtn.classList.remove("bg-[#FAF8F1]", "dark:bg-white/5", "text-[#4C5848]", "dark:text-[#A4B39E]");
      }
      if (treksBtn) {
        treksBtn.classList.remove("bg-[#75482E]", "text-[#F2EEDC]");
        treksBtn.classList.add("bg-[#FAF8F1]", "dark:bg-white/5", "text-[#4C5848]", "dark:text-[#A4B39E]");
      }
    }
  };

  // Open based on URL hash if present
  const hash = window.location.hash;
  if (hash && hash.startsWith("#folder-")) {
    const folderKey = hash.replace("#folder-", "");
    openFolder(folderKey);
  }
}

/**
 * 6. Curriculum Vitae (CV) Modal View
 */
function initCvModal() {
  const cvModal = document.getElementById("cv-modal");
  const openBtns = document.querySelectorAll(".open-cv-modal-btn");
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
    const dossierWindow = document.getElementById("dossier-window");
    if (!dossierWindow || !dossierWindow.classList.contains("open")) {
      document.body.style.overflow = "";
    }
  }

  openBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeModal);

  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) closeModal();
  });

  window.openCvModal = openModal;
  window.closeCvModal = closeModal;
}
