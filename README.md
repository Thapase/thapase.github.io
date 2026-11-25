# T.H.H. Thapase — Personal Portfolio & The Living Parchment

A lightweight, zero-build static portfolio website for **T.H.H. Thapase** (Supply Chain Consultant at Genpact, IIM Sirmaur MBA, GMAT 760) built with semantic HTML5, Tailwind CSS (CDN), custom vanilla CSS (`css/style.css`), and modular vanilla JavaScript (`js/config.js`, `js/main.js`, `js/mark.js`).

The site pairs an editorial parchment-and-evergreen mountain aesthetic with desktop-style archival dossier folders, an interactive Alpine expedition timeline ("The Ascent"), and a companion communal rubber-stamp canvas (**The Living Parchment**, `mark.html`).

---

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [Visual Design, Dual Themes & Living Landscape](#2-visual-design-dual-themes--living-landscape)
3. [Main Portfolio (`index.html`)](#3-main-portfolio-indexhtml)
4. [The Living Parchment (`mark.html`)](#4-the-living-parchment-markhtml)
5. [JavaScript Controllers & Configuration](#5-javascript-controllers--configuration)
6. [Antigravity Customizations (`.agents/` & `AGENTS.md`)](#6-antigravity-customizations-agents--agentsmd)
7. [Local Preview & Deployment](#7-local-preview--deployment)
8. [Integrated Profiles & Links](#8-integrated-profiles--links)

---

## 1. Project Architecture

```text
Portfolio website/
├── index.html                  # Primary landing page, dossier modal archive (6 folders), & print-ready CV modal
├── mark.html                   # Companion "Living Parchment" canvas for fingerprint & spirit-animal stamping
├── README.md                   # Complete documentation of features, files, and workflows
├── AGENTS.md                   # Project skeleton & preservation rules for AI agents
├── .nojekyll                   # Disables Jekyll processing for static GitHub Pages / edge CDN hosting
├── css/
│   └── style.css               # Landscape parallax layers, sky/cloud drift, Manila folder graphics,
│                               # spotlight cards, polaroids, Ascent HUD & switchback styles, ledger canvas, print CSS
├── js/
│   ├── config.js               # Centralized THAPASE_CONFIG (profile, metrics, Supabase & Google Auth config)
│   ├── main.js                 # Dossier modal router, Ascent HUD/beacon controller, parallax, CV modal, theme, copy-email
│   └── mark.js                 # 10 SVG seals, dual-theme ink palette, #auth-modal verification flow, Supabase/localStorage ledger
├── assets/
│   ├── fonts/
│   │   └── bellefair.woff2     # Local serif display font preload
│   ├── images/
│   │   ├── profile.jpg         # Profile portrait
│   │   ├── continuous-sky.webp # Drifting sky backdrop
│   │   ├── mountains.webp      # Distant mountain layer
│   │   ├── woodland-intact.webp# Foreground woodland layer
│   │   ├── meadows.svg         # Rolling meadow vector layer
│   │   ├── night-stars.svg     # Vector star asset
│   │   ├── snow-capped-mountains.svg
│   │   ├── clouds-cumulus-transparent.png
│   │   ├── clouds-mist-transparent.png
│   │   └── travel/             # Polaroid expedition & travel photos (.webp)
│   └── docs/                   # Folder for downloadable CV / static documents
└── .agents/
    ├── rules/
    │   └── ui-polish.md        # Glob-triggered UI contrast, spacing, and reduced-motion rules
    └── skills/
        ├── upgrade-section/SKILL.md # Iterative section-by-section polish workflow
        └── visual-qa/SKILL.md       # Chrome desktop (1440x900) & mobile (390x844) QA workflow
```

---

## 2. Visual Design, Dual Themes & Living Landscape

### Color Palette & Typography
Configured directly inside the Tailwind CDN script in `index.html` and `mark.html`, plus custom CSS tokens in `css/style.css`:
- **Light Mode (Antique Parchment)**: Warm paper tones (`#F2EEDC` base, `#FAF8F1` elevated cards), deep evergreen ink (`#233124`), muted sage (`#4C5848`, `#829078`), and terracotta accents (`#75482E`).
- **Dark Mode (Nocturnal Evergreen)**: Deep forest night (`#121A15` / `#0E1612`), warm parchment text (`#F2EEDC`), sage secondary text (`#A4B39E`), and warm amber/copper accents (`#d89667` / `#E28C52`), paired with a serene, plain night sky.
- **Fonts**: `Bellefair` (editorial serif headings & primary copy), `Plus Jakarta Sans` (supporting UI text), and `JetBrains Mono` (altimeter readouts, metrics, badges, and controls).
- **Theme Persistence**: An inline head script reads `localStorage` (`thp_site_theme`) before paint and applies the `.dark` or `.light` class on `<html>` to avoid unstyled theme flashes.

### Synchronized Multi-Layer Background Scenery
Both `index.html` and `mark.html` render a fixed, `aria-hidden="true"` atmospheric mountain horizon behind the UI (`css/style.css`):
1. **Drifting Sky (`.scene` / `.painted-sky-drift`)**: Slow-panning `continuous-sky.webp`.
2. **Distant Mountain Peaks (`.mountain-distant`)**: Snow-capped horizon backdrop.
3. **High & Mid Cloud Drift (`.cloud-track-high`, `.cloud-track-mid`)**: Dual seamless cloud loops (`clouds-cumulus-transparent.png` and `clouds-mist-transparent.png`) drifting across altitudes.
4. **Mid Foothills & Foreground Woodland (`.mountain-mid`, `.mountain-woodland`)**: Layered hills and clean rolling meadows (`woodland-intact.webp`).
5. **Ground Fog Veil (`.cloud-track-low`)**: Ambient mist across the valley floor.
6. **Reduced Motion**: `css/style.css` respects `prefers-reduced-motion` for animations and transitions.

---

## 3. Main Portfolio (`index.html`)

### Landing Viewport
- **Top Control Bar**: One-click **Copy Email** pill (`#copy-email-btn`, copies `thapase@gmail.com` and triggers `#site-toast`) and **Light/Dark Theme Toggle** (`#theme-toggle-btn`).
- **Center Hero**: Circular framed profile portrait (`assets/images/profile.jpg` with Unsplash fallback), verified badge, name (`T.H.H. Thapase`), role summary (`Supply Chain Consultant • ML Enthusiast • Learning to Vibe Code`), and executive bio covering Genpact, IIM Sirmaur MBA, GMAT 760 (Top 1% globally), high-altitude trekking, rural girl-child education, Strava endurance running, and strategy writing.
- **Archival Desktop Folder Grid**: 6 skeuomorphic Manila folder buttons (`professional`, `education`, `extracurriculars`, `writings`, `travel`, `ascent`) with layered paper-peek animations on hover.
- **"Leave Your Mark" Entry Pill (`#open-mark-btn`)**: Links directly to `mark.html`.
- **Editorial Footer**: Direct social links (LinkedIn, Strava, Medium, Topmate 1:1, X/Twitter, Instagram, GitHub, and `mailto:`) and minimal copyright bar.

### Archival Dossier Modal (`#dossier-window`)
Clicking any folder (or pressing keyboard keys `1`–`6`, or visiting `#folder-<id>`) opens `#dossier-window` with top desktop tabs, a compact mobile switcher strip, a **CV** button, and `Esc`/backdrop dismissal. It houses 6 sections:

1. **`01 / Professional Experience` (`#folder-content-professional`)**
   - **Genpact Leadership Banner** (`Aug 2021 – Present`, Assistant Manager — Supply Chain Consultant): ~$30M/annum in audited client savings across 3+ divisions for a $37B energy technology leader; Genpact Bronze Medal.
   - **4 Spotlight Metric Cards** (`.spotlight-card` with cursor-tracking glow):
     - *Cycle Time Compression*: 12 → 3 Weeks (75% cut, +20–30% OTIF) across a ~$600M Chemical Division portfolio (~$10M/yr savings; Q1-2024 Best Project).
     - *PCP Predictive Cost Model*: Product Cost Pacing IP built in 90 days for $250M Wirelines Division (~$10M/annum savings).
     - *Circular ESG Sourcing*: Reclaimed parts program in $1.2B Pump Division (~$2M/yr saved, Mission 2030 zero-waste-to-landfill).
     - *Digital Inventory Intelligence*: Power BI + SAP governance tracking $100M+ quarterly inventory, saving 5,000 man-hours.
   - **AI Supplier Predictability Card**: Handpicked core team of 10 for a $10B Aerospace Manufacturer (~$5M annual inventory buffer reduction, $500K engagement extension).

2. **`02 / Academic Rigor & Education` (`#folder-content-education`)**
   - **Indian Institute of Management (IIM) Sirmaur (2019–2021)**: MBA in Operations & Strategy, **GMAT 760 (99th percentile / Top 1% Globally)**, Etherisc GTM strategy, Athulya Vikas Foundation outreach, KPMG Six Sigma Green Belt.
   - **SRM University (SRMIST) (2015–2019)**: B.Tech in Electrical & Electronics Engineering (EEE), **88% First Class with Distinction**.

3. **`03 / Life Away From Work` (`#folder-content-extracurriculars`)**
   - **320 Young Girls' Rural Education**: Raised $6,000/year to build sanitary facilities at a rural government school, boosting daily attendance to 85%.
   - **Endurance Road Runner**: Weekly mileage linked to Strava profile.
   - **Disaster & Flood Relief (Goonj)**: Enterprise-wide clothing and emergency aid mobilization.
   - **1:1 Advisory & Consulting Mentorship (Topmate)**: Mentoring 100+ MBA aspirants and early-career professionals.

4. **`04 / Articles & Thought Leadership` (`#folder-content-writings`)**
   - Medium profile header (`@thapasethh`) and 3 linked essay cards:
     - *In Aerospace, You Can’t Expedite a Forging* (Jun 2026 • 11 min read)
     - *The Inventory Paradox: Why Holding More Stock Costs You More and Holding Less Costs You Even More* (Mar 2026 • 14 min read)
     - *A Foreign Supplier’s Strategic Dilemma: Entering Malaysia’s OEM Market via Local Presence or Exports* (Sep 2025 • 6 min read)

5. **`05 / Travel & Expeditions` (`#folder-content-travel`)**
   - Interactive sub-tabs (`switchTravelTab('treks' | 'vacations')`) displaying Polaroid-styled vignettes (`.polaroid-card`) backed by `assets/images/travel/*.webp`:
     - **Treks & Adventures**: Valley of Flowers Trek, Kudremukha Peak Trek, Uttari Betta (Hutridurga), Manali to Atal Tunnel Ride, Surfing & Ocean Sports.
     - **Vacations**: Dubai, Vietnam, Wayanad, Coorg (Kodagu).

6. **`06 / The Ascent — Expedition Route & Milestones` (`#folder-content-ascent`)**
   - Combines a **sticky Live Elevation Altimeter HUD** (`1,800m` Base Camp up to `5,200m` Summit), **progress bar**, **14 numbered jump pills**, **Prev / Auto-Climb / Next controls** (plus `←` / `→` / `Space` keyboard support), and a **climbing beacon** that moves across 14 staggered S-curve cairn waypoints (`#waypoint-0` to `#waypoint-13`).
   - Waypoints span SRM (`1,800m`), IIM Sirmaur (`2,200m`), Genpact (`2,500m`), Project Lead (`2,900m`), GMAT 760 (`3,400m`), L1A Blanket Applied (`3,600m`), Dubai (`3,800m`), Strategic Pivot (`3,950m`), First 5K (`4,050m`), First 10K (`4,150m`), L1A Individual Filed (`4,250m`), Vietnam (`4,350m`), Valley of Flowers Trek (`4,600m` / `14,400 ft`), and L1A Visa Approved (`5,200m`).
   - Scrolling inside `#dossier-scroll-area` drives `initTrekParallax()`, shifting background mountain, meadow, and cloud layers relative to ascent progress.

### Print-Ready Curriculum Vitae Modal (`#cv-modal`)
Accessible from the dossier top bar (`CV`) or Experience banner (`View Full CV`), `#cv-modal` presents a structured single-page resume summary with a **Print / PDF** button (`window.print()`) paired with `@media print` rules in `css/style.css`.

---

## 4. The Living Parchment (`mark.html`)

`mark.html` is a full-screen interactive guestbook where visitors stamp a personal seal onto shared parchment.

### Key Capabilities (`mark.html` & `js/mark.js`)
- **10 Custom Vector Seals (`STAMP_SVGS`)**:
  - Top Hero Seal: **Thumb Impression** (biometric line-art).
  - 3×3 Spirit Animal Grid: **African Lion**, **Bengal Tiger**, **Snow Leopard**, **Trail Wolf**, **Grizzly Bear**, **Highland Eagle**, **Wild Bull**, **Forest Stag**, and **King Cobra**.
  - Hovering or selecting a seal updates `#drawer-trait-preview` with its corresponding trait description (`STAMP_METAS`).
- **5 Adaptive Dual-Theme Inks**:
  - `terracotta`, `forest`, `indigo`, `ochre`, and `moss` mapped to CSS variables (`--ink-*`) in `css/style.css` so stamps stay legible in both Light and Dark modes.
- **Authentic 3-Provider Social Sign-In Gate (`#auth-modal`)**:
  - Stamping on `#parchment-canvas` is strictly gated behind sign-in; tapping the canvas while signed out opens `#auth-modal` (and pulses the dock sign-in prompt).
  - Supports **Google / Gmail** (`#google-auth-btn`), **Twitter / X** (`#twitter-auth-btn`), and **Instagram** (`#instagram-auth-btn`) via a two-step modal flow (choose provider → enter & normalize Gmail address or `@handle`), or live Supabase OAuth when `THAPASE_CONFIG.supabase` credentials are populated.
  - Each stamped impression displays a provider-accurate badge icon (`fa-google`, `fa-x-twitter`, or `fa-instagram`) alongside the user's handle.
- **One Mark Per User & Persistence**:
  - Pre-seeded with 5 tasteful communal marks (`SEED_MARKS`).
  - Enforces **one active stamp per verified user handle** (re-clicking moves/replaces that user's seal rather than spamming), and **Clear Mine** (`#clear-stamps-btn`) removes only the currently signed-in user's mark.
  - Stores marks in Supabase (`marks` table) when configured, with seamless `localStorage` fallback (`thp_auth_user`, `thp_parchment_stamps`).

---

## 5. JavaScript Controllers & Configuration

- **`js/config.js`**: Defines `window.THAPASE_CONFIG` containing:
  - `profile`: Name, role, location (`Bangalore, India`), email (`thapase@gmail.com`), phone, LinkedIn, Medium, Strava, Topmate, X, Instagram, and GitHub URLs.
  - `supabase`: `url` and `anonKey` (empty strings by default, enabling local fallback mode out of the box).
  - `googleAuth`: `clientId` placeholder.
- **`js/main.js`**:
  - `openFolder()`, `closeFolder()`: Dossier modal state, tab synchronization, `#folder-*` URL hash updates, and Ascent initialization.
  - `switchTravelTab()`: Toggles Treks vs. Vacations Polaroid views.
  - `ascentJumpTo()`, `ascentStep()`, `ascentTogglePlay()`: Altimeter HUD, progress bar, climbing beacon positioning, and `3200ms` Auto-Climb playback.
  - `initTrekParallax()`: Scroll-linked `requestAnimationFrame` transforms across `.mountain-meadows`/`.mountain-woodland`, `.mountain-mid`, `.mountain-distant`, and cloud tracks.
  - `initSpotlightHover()`, `initCopyEmail()`, `initThemeToggle()`, `openCvModal()`, `closeCvModal()`, `showToast()`, and global keyboard shortcuts (`1`–`6`, `Esc`, `ArrowLeft`, `ArrowRight`, `Space`).
- **`js/mark.js`**:
  - Self-contained IIFE managing `STAMP_SVGS`, `STAMP_METAS`, `SEED_MARKS`, Supabase client/auth listeners, `#auth-modal` two-step verification UI, `#stamp-picker-modal` drawer, ink selection, click-to-stamp coordinate percentage placement, and `Clear Mine`.

---

## 6. Antigravity Customizations (`.agents/` & `AGENTS.md`)

To keep future UI enhancements consistent with the static architecture:
- **`AGENTS.md`**: Locks in the zero-build static stack, authentic biographical data, dual-theme contrast requirements, and preservation guardrails (modify in place, keep folder tabs and Ascent/Living Parchment interactions intact).
- **`.agents/rules/ui-polish.md`**: File-scoped rule (`*.html, *.css, *.js, *.jsx, *.tsx`) enforcing interactive cards/metrics, responsive breakpoints, keyboard focus states, and `prefers-reduced-motion`.
- **`.agents/skills/upgrade-section/SKILL.md`**: Iterative workflow to polish one portfolio section at a time against `AGENTS.md`.
- **`.agents/skills/visual-qa/SKILL.md`**: Browser QA workflow across desktop (`1440×900`) and mobile (`390×844`) viewports in both themes.

---

## 7. Local Preview & Deployment

### Instant Local Preview
Because all assets, styles, and client scripts are static:
- Open `index.html` directly in a browser, **or**
- Serve the directory over any local static HTTP server (e.g., `npx serve .` or a local PowerShell/Node static server) and open `http://localhost:<port>/index.html`. Running over HTTP/HTTPS also enables `#folder-<name>` URL hash state.

### Enabling Cloud Persistence on `mark.html` (Optional)
By default, `mark.html` runs in standalone `localStorage` mode. To enable shared multi-visitor cloud persistence and real OAuth redirects:
1. Add your Supabase project `url` and `anonKey` to `THAPASE_CONFIG.supabase` in `js/config.js`.
2. Ensure your Supabase project has a `marks` table (`id`, `user_id`, `handle`, `provider`, `stamp`, `color_id`, `x`, `y`, `rot`, `opacity`) and Google/X OAuth providers enabled.

### Static Deployment (GitHub Pages / Cloudflare Pages)
- **Zero build step** is required; set the publish/root directory to `/`.
- `.nojekyll` is already included at the repository root so static folders/files are served directly without Jekyll processing.

---

## 8. Integrated Profiles & Links

- **LinkedIn**: [linkedin.com/in/t-h-h-thapase-strategy-consultant](https://www.linkedin.com/in/t-h-h-thapase-strategy-consultant)
- **Medium**: [medium.com/@thapasethh](https://medium.com/@thapasethh)
- **Strava**: [strava.app.link/czwhREDvY7b](https://strava.app.link/czwhREDvY7b)
- **Topmate 1:1**: [topmate.io/thapase_thh](https://topmate.io/thapase_thh)
- **Twitter / X**: [x.com/THHThapase](https://x.com/THHThapase)
- **Instagram**: [instagram.com/thapase.thh](https://www.instagram.com/thapase.thh)
- **GitHub**: [github.com/Thapase](https://github.com/Thapase)
