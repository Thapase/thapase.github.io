# T.H.H. Thapase — Portfolio Architecture & Agent Guidelines

This file defines the project skeleton, tech stack, real biographical data, and strict preservation guardrails for all AI agents working on this repository.

---

## 1. Existing Stack & Architecture

- **Format**: Lightweight, zero-build, ultra-fast static web architecture.
- **HTML / Templating**: Semantic HTML5 (`index.html`, `mark.html`).
- **Styling**: Tailwind CSS (CDN configured with warm parchment and dark evergreen palette) + Vanilla CSS (`css/style.css`).
- **Typography**: Google Fonts — `Bellefair` (display/serif headers), `Plus Jakarta Sans` (clean body), `JetBrains Mono` (altimeter/metrics/code).
- **Icons**: FontAwesome 6.5.1 Free.
- **Client Libraries**:
  - `@supabase/supabase-js@2` for communal ledger storage and OAuth authentication on `mark.html`.
  - Vanilla JavaScript ES6+ modules in `/js` (`config.js`, `main.js`, `mark.js`).
- **Artwork & Scenery**:
  - Parivan Vansjalia-inspired continuous mountain silhouettes and rolling meadow SVG knolls.
  - Manila folder tabbed dossiers with smooth modal inspection.
  - Interactive "Ascent" alpine expedition dossier with live altimeter HUD and topographic cairn switchback route.
- **Deployment & Hosting**:
  - Pure static export compatible with Cloudflare Pages, GitHub Pages (`.nojekyll` included), or any edge CDN.
  - Zero build step required; instant preview on local HTTP servers.

---

## 2. Real Content Only (No Placeholders or Lorem Ipsum)

Always use the authentic biographical and professional data defined in `js/config.js` and `index.html`:

- **Identity**: T.H.H. Thapase
- **Current Role**: Assistant Manager (Supply Chain Consultant) at **Genpact** (Bangalore, India).
- **Academic Distinction**: 
  - **GMAT**: 760 (Top 1% Worldwide, 99th percentile).
  - **Alma Mater**: National Institute of Technology (NIT) Tiruchirappalli — B.Tech in Production Engineering.
- **Professional Impact & Domain Focus**:
  - Supply chain network optimization, inventory modeling, global logistics, discrete-event simulation, ERP integrations, procurement strategy.
  - Cross-functional leadership across multi-million dollar Fortune 500 manufacturing and supply chain transformations.
- **Athletic & Creative Pursuit**:
  - High-altitude Himalayan trekking, endurance distance running (Strava), strategy essays (Medium), and mentorship (Topmate).
  - Milestone trek: Valley of Flowers & Hemkund Sahib (14,400 ft / 4,600m).
- **Official Socials & Links**:
  - LinkedIn: `https://www.linkedin.com/in/t-h-h-thapase-strategy-consultant`
  - Strava: `https://strava.app.link/czwhREDvY7b`
  - Medium: `https://medium.com/@thapasethh`
  - Topmate: `https://topmate.io/thapase_thh`
  - Twitter (X): `https://x.com/THHThapase`
  - Instagram: `https://www.instagram.com/thapase.thh`
  - GitHub: `https://github.com/Thapase`

---

## 3. Preservation Guardrails

1. **Modify in Place**: Always update existing files (`index.html`, `mark.html`, `css/style.css`, `js/*.js`) incrementally. Never replace the architectural skeleton with a generic template or framework rewrite.
2. **Preserve Navigation & Routes**:
   - Keep `index.html` (main dossier showcase) and `mark.html` (Living Parchment ledger) connected and functional.
   - Maintain Manila folder tab triggers: `about`, `experience`, `projects`, `education`, `contact`, and `ascent`.
3. **Dual-Theme Integrity**:
   - Ensure all UI upgrades maintain rich contrast in both **Light mode** (`#F2EEDC` warm antique parchment) and **Dark mode** (`#121A15` deep evergreen nocturnal sky).
   - Never introduce unstyled white flashes or unreadable low-contrast text.
4. **Signature Interactions**:
   - Preserve the live Altimeter HUD & Topographic Switchback in the Ascent section.
   - Preserve the 3-provider authentic sign-in flow (Google, Twitter, Instagram) and rubber-stamp impression engine in `mark.html`.
5. **No Visual Bloat**: Respect `prefers-reduced-motion` and avoid noisy, lagging animation loops. Keep the landscape serene and natural.
