$filePath = "c:\Users\nagal\Documents\Portfolio website\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$ascentFolderStart = '<div id="folder-content-ascent" class="space-y-6 hidden">'
$ascentFolderEnd = "        </div>`r`n`r`n      </div>`r`n`r`n      <!-- Dossier Window Bottom Bar -->"
$isCrLf = $true
if (-not $content.Contains($ascentFolderEnd)) {
    $ascentFolderEnd = "        </div>`n`n      </div>`n`n      <!-- Dossier Window Bottom Bar -->"
    $isCrLf = $false
}

$idxStart = $content.IndexOf($ascentFolderStart)
$idxEnd = $content.IndexOf($ascentFolderEnd, $idxStart)

if ($idxStart -lt 0 -or $idxEnd -le $idxStart) {
    throw "Could not find folder-content-ascent boundaries!"
}

$newAscentContent = @"
<div id="folder-content-ascent" class="space-y-6 hidden">

          <!-- Sticky Expedition HUD: Live Altimeter, Elevation Progress & Step Jump Controls -->
          <div class="ascent-hud-sticky sticky top-0 z-30 p-3 sm:p-4 rounded-2xl bg-[#F5F2E6]/95 dark:bg-[#121A15]/95 backdrop-blur-md border border-[#829078]/35 shadow-lg space-y-2.5">
            
            <!-- Row 1: Altimeter & Terrain Zone Status -->
            <div class="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#75482E]/15 text-[#75482E] dark:bg-[#E28C52]/20 dark:text-[#E28C52]">
                  <i class="fa-solid fa-mountain text-xs"></i>
                </span>
                <div>
                  <span class="text-[9px] uppercase tracking-wider text-[#829078] block">Live Elevation Altimeter</span>
                  <div class="flex items-baseline gap-1.5 font-bold">
                    <span id="ascent-altimeter-val" class="text-base sm:text-lg text-[#233124] dark:text-[#F2EEDC]">1,800m</span>
                    <span class="text-[11px] font-normal text-[#4C5848] dark:text-[#A4B39E]" id="ascent-altimeter-sub">(5,905 ft) • Sub-Alpine Valley</span>
                  </div>
                </div>
              </div>

              <!-- Active Waypoint Counter & Terrain Badge -->
              <div class="flex items-center gap-2">
                <span id="ascent-zone-badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-700/10 dark:bg-slate-400/15 text-slate-800 dark:text-slate-300 border border-slate-600/20 font-semibold">
                  Base Camp Zone
                </span>
                <span id="ascent-step-counter" class="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#829078]/15 text-[#233124] dark:text-[#F2EEDC] font-bold">
                  01 / 14
                </span>
              </div>
            </div>

            <!-- Row 2: Elevation Progress Bar -->
            <div class="w-full h-1.5 rounded-full bg-[#829078]/20 overflow-hidden">
              <div id="ascent-progress-bar" class="h-full bg-gradient-to-r from-[#75482E] via-[#A86438] to-emerald-600 transition-all duration-300" style="width: 7%;"></div>
            </div>

            <!-- Row 3: Step-by-Step Jump Controls & Waypoint Pins -->
            <div class="flex items-center justify-between flex-wrap gap-2 pt-0.5">
              
              <!-- Prev / Play / Next Buttons -->
              <div class="flex items-center gap-1.5">
                <button type="button" onclick="ascentStep(-1)" class="ascent-ctrl-btn px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#FAF8F1] dark:bg-black/30 border border-[#829078]/30 hover:border-[#75482E] text-[#233124] dark:text-[#F2EEDC] transition-all cursor-pointer flex items-center gap-1" title="Previous Waypoint (←)">
                  <i class="fa-solid fa-chevron-left text-[10px]"></i>
                  <span class="hidden sm:inline">Prev</span>
                </button>

                <button id="ascent-play-btn" type="button" onclick="ascentTogglePlay()" class="ascent-ctrl-btn px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-[#75482E] hover:bg-[#965b38] text-[#F2EEDC] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm" title="Auto-Ascend Trek Path">
                  <i class="fa-solid fa-play text-[10px]" id="ascent-play-icon"></i>
                  <span>Auto-Climb</span>
                </button>

                <button type="button" onclick="ascentStep(1)" class="ascent-ctrl-btn px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#FAF8F1] dark:bg-black/30 border border-[#829078]/30 hover:border-[#75482E] text-[#233124] dark:text-[#F2EEDC] transition-all cursor-pointer flex items-center gap-1" title="Next Waypoint (→)">
                  <span class="hidden sm:inline">Next</span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>

              <!-- 14 Mini Jump Pills (01 to 14) -->
              <div class="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full text-[10px] font-mono">
                <button type="button" onclick="ascentJumpTo(0)" class="ascent-jump-pill active-pill" data-idx="0" title="1. SRM (1,800m)">1</button>
                <button type="button" onclick="ascentJumpTo(1)" class="ascent-jump-pill" data-idx="1" title="2. IIM Sirmaur (2,200m)">2</button>
                <button type="button" onclick="ascentJumpTo(2)" class="ascent-jump-pill" data-idx="2" title="3. Genpact (2,500m)">3</button>
                <button type="button" onclick="ascentJumpTo(3)" class="ascent-jump-pill" data-idx="3" title="4. Project Lead (2,900m)">4</button>
                <button type="button" onclick="ascentJumpTo(4)" class="ascent-jump-pill" data-idx="4" title="5. GMAT 760 (3,400m)">5</button>
                <button type="button" onclick="ascentJumpTo(5)" class="ascent-jump-pill" data-idx="5" title="6. L1A Blanket Applied (3,600m)">6</button>
                <button type="button" onclick="ascentJumpTo(6)" class="ascent-jump-pill" data-idx="6" title="7. Dubai (3,800m)">7</button>
                <button type="button" onclick="ascentJumpTo(7)" class="ascent-jump-pill" data-idx="7" title="8. Strategic Pivot (3,950m)">8</button>
                <button type="button" onclick="ascentJumpTo(8)" class="ascent-jump-pill" data-idx="8" title="9. First 5K (4,050m)">9</button>
                <button type="button" onclick="ascentJumpTo(9)" class="ascent-jump-pill" data-idx="9" title="10. First 10K (4,150m)">10</button>
                <button type="button" onclick="ascentJumpTo(10)" class="ascent-jump-pill" data-idx="10" title="11. L1A Individual Filed (4,250m)">11</button>
                <button type="button" onclick="ascentJumpTo(11)" class="ascent-jump-pill" data-idx="11" title="12. Vietnam (4,350m)">12</button>
                <button type="button" onclick="ascentJumpTo(12)" class="ascent-jump-pill" data-idx="12" title="13. Valley of Flowers Trek (4,600m)">13</button>
                <button type="button" onclick="ascentJumpTo(13)" class="ascent-jump-pill" data-idx="13" title="14. L1A Visa Approved (5,200m)">14</button>
              </div>

            </div>

          </div>

          <!-- S-Curve Winding Trek Trail Container with Topo Switchbacks & Climbing Beacon -->
          <div class="trek-ascent-wrapper space-y-4 sm:space-y-6">

            <!-- Winding Dotted SVG Trail connecting cairns -->
            <svg class="trek-trail-svg hidden sm:block" viewBox="0 0 4 100" preserveAspectRatio="none">
              <line x1="2" y1="0" x2="2" y2="100" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3" class="text-[#829078]/40 dark:text-[#A4B39E]/30" />
            </svg>

            <!-- Climbing Beacon / Compass Hiker Pin -->
            <div id="ascent-climbing-beacon" class="ascent-beacon" style="top: 24px; left: 18px;" title="Current Expedition Position">
              <div class="beacon-halo"></div>
              <div class="beacon-pin">
                <i class="fa-solid fa-compass"></i>
              </div>
            </div>

            <!-- 1. May 2019: SRM University (Base Camp) -->
            <div id="waypoint-0" class="trek-waypoint flex items-start gap-3 sm:gap-4 is-active-cairn cursor-pointer" data-idx="0" data-alt="1,800m" data-sub="(5,905 ft) • Sub-Alpine Valley" data-badge="Base Camp" data-zone="Base Camp Zone" onclick="ascentJumpTo(0)">
              <div class="trek-cairn-node" title="Altitude: 1,800m">⛺</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">May 2019</span>
                    <span class="alt-pill">Alt: 1,800m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-slate-700/10 dark:bg-slate-400/15 text-slate-800 dark:text-slate-300 border border-slate-600/20 font-semibold">
                    Base Camp
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Graduated from SRM University with Distinction
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Completed Bachelor of Technology with academic distinction, establishing engineering fundamentals, systems modeling, and first-principles reasoning.
                </p>
              </div>
            </div>

            <!-- 2. Mar 2021: IIM Sirmaur (Camp I) -->
            <div id="waypoint-1" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8 cursor-pointer" data-idx="1" data-alt="2,200m" data-sub="(7,218 ft) • Foothill Pine Ridge" data-badge="Camp I" data-zone="Academic Rigor" onclick="ascentJumpTo(1)">
              <div class="trek-cairn-node" title="Altitude: 2,200m">🎓</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Mar 2021</span>
                    <span class="alt-pill">Alt: 2,200m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-indigo-700/10 dark:bg-indigo-400/15 text-indigo-800 dark:text-indigo-300 border border-indigo-600/20 font-semibold">
                    Camp I
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Graduated from IIM Sirmaur (MBA)
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Earned Master of Business Administration with focus on operations strategy, decision science, supply chain networks, and economic theory.
                </p>
              </div>
            </div>

            <!-- 3. Aug 2021: Joined Genpact (Trailhead) -->
            <div id="waypoint-2" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-16 cursor-pointer" data-idx="2" data-alt="2,500m" data-sub="(8,202 ft) • Corporate Trailhead" data-badge="Trailhead" data-zone="Consulting Ascent" onclick="ascentJumpTo(2)">
              <div class="trek-cairn-node" title="Altitude: 2,500m">📈</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Aug 2021</span>
                    <span class="alt-pill">Alt: 2,500m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-700/10 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-300 border border-emerald-600/20 font-semibold">
                    Trailhead
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Joined Genpact as Supply Chain Consultant
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Commenced strategic enterprise advisory, streamlining global procurement, inventory velocity, and multi-tier network optimization for Fortune 500 giants.
                </p>
              </div>
            </div>

            <!-- 4. Jan 2023: Promoted to Project Lead (Camp II) -->
            <div id="waypoint-3" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-12 cursor-pointer" data-idx="3" data-alt="2,900m" data-sub="(9,514 ft) • High Saddle Ridge" data-badge="Camp II" data-zone="Leadership Col" onclick="ascentJumpTo(3)">
              <div class="trek-cairn-node" title="Altitude: 2,900m">💼</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Jan 2023</span>
                    <span class="alt-pill">Alt: 2,900m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-700/10 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-300 border border-emerald-600/20 font-semibold">
                    Camp II
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Promoted to Project Lead at Genpact
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Entrusted to direct cross-functional consulting units executing multi-million-dollar supply chain transformations for aerospace and energy technology leaders.
                </p>
              </div>
            </div>

            <!-- 5. July 2023: Scored 760 on GMAT (Quantitative Peak) -->
            <div id="waypoint-4" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-6 cursor-pointer" data-idx="4" data-alt="3,400m" data-sub="(11,155 ft) • Quantitative Peak" data-badge="Quant Peak" data-zone="Top 1% Globally" onclick="ascentJumpTo(4)">
              <div class="trek-cairn-node" title="Altitude: 3,400m">🎯</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">July 2023</span>
                    <span class="alt-pill">Alt: 3,400m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-amber-700/10 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 border border-amber-600/20 font-semibold">
                    Quant Peak
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Scored 760 on GMAT (Top 1% Globally)
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Mastered 99th percentile global benchmark in quantitative logic, data sufficiency, and critical reasoning under standardized high-stakes conditions.
                </p>
              </div>
            </div>

            <!-- 6. Dec 2024: Filed L1A Blanket Visa -->
            <div id="waypoint-5" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-0 cursor-pointer" data-idx="5" data-alt="3,600m" data-sub="(11,811 ft) • Expedition Outpost" data-badge="Expansion" data-zone="Global Mobility" onclick="ascentJumpTo(5)">
              <div class="trek-cairn-node" title="Altitude: 3,600m">📄</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Dec 2024</span>
                    <span class="alt-pill">Alt: 3,600m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-purple-700/10 dark:bg-purple-400/15 text-purple-800 dark:text-purple-300 border border-purple-600/20 font-semibold">
                    Expansion
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Filed L1A Blanket Visa Petition
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Initiated corporate mobility petition for cross-border strategic leadership across North American Fortune 500 accounts.
                </p>
              </div>
            </div>

            <!-- 7. Jan 2025: Dubai Expedition -->
            <div id="waypoint-6" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8 cursor-pointer" data-idx="6" data-alt="3,800m" data-sub="(12,467 ft) • Global Transit Hub" data-badge="Transit Pass" data-zone="International Pass" onclick="ascentJumpTo(6)">
              <div class="trek-cairn-node" title="Altitude: 3,800m">✈️</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Jan 2025</span>
                    <span class="alt-pill">Alt: 3,800m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-blue-700/10 dark:bg-blue-400/15 text-blue-800 dark:text-blue-300 border border-blue-600/20 font-semibold">
                    Transit Pass
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  First International Trip: Dubai
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  First overseas voyage, observing global multimodal transit infrastructure, airport city planning, and cross-border logistics engineering.
                </p>
              </div>
            </div>

            <!-- 8. Mar 2025: L1A Blanket Rejected (Storm on the Ridge) -->
            <div id="waypoint-7" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-16 cursor-pointer" data-idx="7" data-alt="3,950m" data-sub="(12,959 ft) • The Storm Ridge" data-badge="Strategic Pivot" data-zone="The Storm Ridge" onclick="ascentJumpTo(7)">
              <div class="trek-cairn-node" title="Altitude: 3,950m">⚡</div>
              <div class="trek-waypoint-card flex-1 border-l-4 border-l-red-600/70">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Mar 2025</span>
                    <span class="alt-pill">Alt: 3,950m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-red-700/10 dark:bg-red-400/15 text-red-800 dark:text-red-300 border border-red-600/20 font-semibold">
                    Strategic Pivot
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  L1A Blanket Rejected — The Strategic Pivot
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Confronted consular rejection under blanket petition scrutiny; treated the setback as an operational problem and immediately structured an individual petition.
                </p>
              </div>
            </div>

            <!-- 9. July 2025: Completed First 5K (The Running Ridge) -->
            <div id="waypoint-8" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-12 cursor-pointer" data-idx="8" data-alt="4,050m" data-sub="(13,287 ft) • Aerobic Milepost" data-badge="5K Benchmark" data-zone="Endurance Ridge" onclick="ascentJumpTo(8)">
              <div class="trek-cairn-node" title="Altitude: 4,050m">👟</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">July 2025</span>
                    <span class="alt-pill">Alt: 4,050m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-orange-700/10 dark:bg-orange-400/15 text-orange-800 dark:text-orange-300 border border-orange-600/20 font-semibold">
                    5K Benchmark
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Completed First 5K
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Ignited formal distance road running, establishing cardiovascular aerobic baselines and compounding discipline on Strava.
                </p>
              </div>
            </div>

            <!-- 10. Sep 2025: Completed First 10K -->
            <div id="waypoint-9" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-6 cursor-pointer" data-idx="9" data-alt="4,150m" data-sub="(13,615 ft) • 10K Distance Benchmark" data-badge="10K Benchmark" data-zone="Endurance Ridge" onclick="ascentJumpTo(9)">
              <div class="trek-cairn-node" title="Altitude: 4,150m">🏃</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Sep 2025</span>
                    <span class="alt-pill">Alt: 4,150m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-orange-700/10 dark:bg-orange-400/15 text-orange-800 dark:text-orange-300 border border-orange-600/20 font-semibold">
                    10K Benchmark
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Completed First 10K Benchmark
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Scaled up road distance progression to cross the official 10-kilometer mark, proving mental stamina and pacing control under endurance loads.
                </p>
              </div>
            </div>

            <!-- 11. Oct 2025: Filed for L1A Individual Visa -->
            <div id="waypoint-10" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-0 cursor-pointer" data-idx="10" data-alt="4,250m" data-sub="(13,943 ft) • High Camp IV" data-badge="Resilience" data-zone="Individual Petition" onclick="ascentJumpTo(10)">
              <div class="trek-cairn-node" title="Altitude: 4,250m">🧭</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Oct 2025</span>
                    <span class="alt-pill">Alt: 4,250m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-amber-700/10 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 border border-amber-600/20 font-semibold">
                    Resilience
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Filed L1A Individual Visa Petition
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Reframed petition architecture and executive leadership thesis for targeted individual consular filing, demonstrating organizational impact.
                </p>
              </div>
            </div>

            <!-- 12. Nov 2025: Vietnam Expedition -->
            <div id="waypoint-11" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8 cursor-pointer" data-idx="11" data-alt="4,350m" data-sub="(14,271 ft) • Karst Limestone Col" data-badge="Journeys" data-zone="Expedition Route" onclick="ascentJumpTo(11)">
              <div class="trek-cairn-node" title="Altitude: 4,350m">🌏</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Nov 2025</span>
                    <span class="alt-pill">Alt: 4,350m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-blue-700/10 dark:bg-blue-400/15 text-blue-800 dark:text-blue-300 border border-blue-600/20 font-semibold">
                    Journeys
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Vietnam Expedition
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Explored Southeast Asian cultural crossroads, northern karst limestone ranges, and dynamic decentralized manufacturing networks.
                </p>
              </div>
            </div>

            <!-- 13. Aug 2026: Valley of Flowers Trek (High Pass) -->
            <div id="waypoint-12" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-16 cursor-pointer" data-idx="12" data-alt="4,600m" data-sub="(14,400 ft) • High Glacial Pass" data-badge="Glacial Pass" data-zone="Himalayan Wilderness" onclick="ascentJumpTo(12)">
              <div class="trek-cairn-node" title="Altitude: 4,600m">🌸</div>
              <div class="trek-waypoint-card flex-1">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Aug 2026</span>
                    <span class="alt-pill">Alt: 4,600m (14,400 ft)</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-teal-700/10 dark:bg-teal-400/15 text-teal-800 dark:text-teal-300 border border-teal-600/20 font-semibold">
                    High Glacial Pass
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  First High-Altitude Trek: Valley of Flowers
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Ascended the glacial Himalayan alpine wilderness (14,400 ft / 4,389 m), testing altitude resilience, physical conditioning, and mountain fortitude.
                </p>
              </div>
            </div>

            <!-- 14. Sep 2026: L1A Individual Approved (The Summit Ridge) -->
            <div id="waypoint-13" class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8 cursor-pointer" data-idx="13" data-alt="5,200m" data-sub="(17,060 ft) • Snow-Capped Summit" data-badge="The Summit" data-zone="Executive Summit" onclick="ascentJumpTo(13)">
              <div class="trek-cairn-node bg-emerald-700/15 dark:bg-emerald-400/20 !border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-md" title="Altitude: 5,200m">🏔️</div>
              <div class="trek-waypoint-card flex-1 border-emerald-600/40 bg-emerald-700/[0.04] dark:bg-emerald-400/[0.04]">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-400">Sep 2026</span>
                    <span class="alt-pill !bg-emerald-700/15 !text-emerald-800 dark:!text-emerald-300 !border-emerald-600/30">Alt: 5,200m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-700/15 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 font-semibold">
                    The Summit
                  </span>
                </div>
                <h3 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  L1A Individual Visa Approved
                </h3>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Secured US intra-company executive transfer approval following strategic petition overhaul; green light for US strategic leadership and enterprise transformation deployment.
                </p>
              </div>
            </div>

          </div>
"@

$finalContent = $content.Substring(0, $idxStart) + $newAscentContent + "`r`n`r`n" + $content.Substring($idxEnd)

[System.IO.File]::WriteAllText($filePath, $finalContent, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated Ascent folder with Expedition HUD and Beacon Waypoints!"
