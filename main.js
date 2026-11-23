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
  "travel"
];

const FOLDER_TITLES = {
  professional: "01 / Professional Experience",
  education: "02 / Academic Rigor & Education",
  extracurriculars: "03 / Extra Curriculars & Social Impact",
  writings: "04 / Articles & Thought Leadership",
  travel: "05 / Travel & Expeditions"
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
  dossierWindow.classList.add("open");
  document.body.style.overflow = "hidden";

  // 5. Reset Scroll Position
  const scrollArea = document.getElementById("dossier-scroll-area");
  if (scrollArea) {
    scrollArea.scrollTop = 0;
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
  const dossierWindow = document.getElementById("dossier-window");
  if (dossierWindow) {
    dossierWindow.classList.remove("open");
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
    cvModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeCvModal() {
  const cvModal = document.getElementById("cv-modal");
  if (cvModal) {
    cvModal.classList.remove("open");
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

// Attach all controllers directly to window immediately
window.openFolder = openFolder;
window.closeFolder = closeFolder;
window.switchTravelTab = switchTravelTab;
window.openCvModal = openCvModal;
window.closeCvModal = closeCvModal;
window.showToast = showToast;

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

    // Number keys 1-5 when no modal is open
    if (!isDossierOpen && !isCvOpen) {
      const numMap = {
        "1": "professional",
        "2": "education",
        "3": "extracurriculars",
        "4": "writings",
        "5": "travel"
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
 * Primary Initializer
 */
function initPortfolio() {
  if (window.__THAPASE_PORTFOLIO_INIT__) return;
  window.__THAPASE_PORTFOLIO_INIT__ = true;

  initClock();
  initCopyEmail();
  initThemeToggle();
  initSpotlightHover();
  initFolderEventListeners();
}

// Self-executing setup
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolio);
} else {
  initPortfolio();
}
