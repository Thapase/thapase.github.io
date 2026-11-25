$content = [System.IO.File]::ReadAllText("c:\Users\nagal\Documents\Portfolio website\index.html", [System.Text.Encoding]::UTF8)

# The pattern inserted at every '        </div>'
$insertedPattern = @"
        </div>

        <!-- ==================================================================
             FOLDER 6: The Mountain Ascent (Milestones & Expedition Route)
             ================================================================== -->
        <div id="folder-content-ascent" class="space-y-6 hidden">

          <!-- Expedition Route Banner -->
          <div class="p-5 sm:p-6 rounded-2xl bg-[#F2EEDC] dark:bg-[#16211A] border border-[#829078]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="space-y-1.5 min-w-0">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[#75482E]/15 text-[#75482E] dark:text-[#d89667] font-bold">EXPEDITION ROUTE</span>
                <span class="text-xs font-mono text-[#4C5848] dark:text-[#A4B39E]">2019 – 2026 • 14 Milestones • 1,800m – 5,200m</span>
              </div>
              <h3 class="editorial-heading text-xl sm:text-2xl text-[#233124] dark:text-[#F2EEDC]">
                The Mountain Ascent — Milestones & Career Elevation
              </h3>
              <p class="text-xs sm:text-sm font-serif text-[#4C5848] dark:text-[#A4B39E] leading-relaxed max-w-2xl">
                From the foundation meadows of SRM University, through distance endurance milestones and high ridge storms, ascending to the snow-capped summit of global executive mobility.
              </p>
            </div>
            
            <div class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F1] dark:bg-black/25 border border-[#829078]/25 text-xs font-mono shrink-0">
              <i class="fa-solid fa-mountain text-[#75482E] dark:text-[#d89667]"></i>
              <span class="font-bold text-[#233124] dark:text-[#F2EEDC]">5,200m Summit</span>
            </div>
          </div>

          <!-- Altitude Route Gauge -->
          <div class="flex items-center justify-between flex-wrap gap-2 px-4 py-3 rounded-xl bg-[#FAF8F1] dark:bg-[#16201a] border border-[#829078]/25 text-[10px] sm:text-xs font-mono text-[#4C5848] dark:text-[#A4B39E]">
            <span class="inline-flex items-center gap-1.5">
              <span>⛺</span> <strong class="text-[#233124] dark:text-[#F2EEDC]">Base Camp:</strong> 1,800m
            </span>
            <span class="opacity-30">➔</span>
            <span class="inline-flex items-center gap-1.5">
              <span>⚡</span> <strong class="text-[#233124] dark:text-[#F2EEDC]">Storm Ridge:</strong> 3,950m
            </span>
            <span class="opacity-30">➔</span>
            <span class="inline-flex items-center gap-1.5">
              <span>🌸</span> <strong class="text-[#233124] dark:text-[#F2EEDC]">High Pass:</strong> 4,600m
            </span>
            <span class="opacity-30">➔</span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#75482E]/15 dark:bg-[#d89667]/20 border border-[#75482E]/35 text-[#75482E] dark:text-[#d89667] font-semibold">
              <span>🏔️</span> <strong>Summit:</strong> 5,200m
            </span>
          </div>

          <!-- Milestones S-Curve Container -->
          <div class="trek-ascent-wrapper space-y-4 sm:space-y-5">

            <!-- 1. May 2019: SRM University (Base Camp) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4" data-alt="1800">
              <div class="trek-cairn-node" title="Altitude: 1,800m">⛺</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">May 2019</span>
                    <span class="alt-pill">Alt: 1,800m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-slate-700/10 dark:bg-slate-400/15 text-slate-800 dark:text-slate-300 border border-slate-600/20">
                    Base Camp
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Graduated from SRM University with Distinction
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Completed Bachelor of Technology with academic distinction, establishing engineering fundamentals and first-principles reasoning.
                </p>
              </div>
            </div>

            <!-- 2. Mar 2021: IIM Sirmaur (Camp I) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8" data-alt="2200">
              <div class="trek-cairn-node" title="Altitude: 2,200m">🎓</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Mar 2021</span>
                    <span class="alt-pill">Alt: 2,200m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-indigo-700/10 dark:bg-indigo-400/15 text-indigo-800 dark:text-indigo-300 border border-indigo-600/20">
                    Camp I
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Graduated from IIM Sirmaur (MBA)
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Earned Master of Business Administration with focus on operations strategy, decision science, and economic theory.
                </p>
              </div>
            </div>

            <!-- 3. Aug 2021: Joined Genpact (Trailhead) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-16" data-alt="2500">
              <div class="trek-cairn-node" title="Altitude: 2,500m">📈</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Aug 2021</span>
                    <span class="alt-pill">Alt: 2,500m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-700/10 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-300 border border-emerald-600/20">
                    Trailhead
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Joined Genpact as Supply Chain Consultant
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Commenced enterprise advisory, streamlining complex procurement, inventory flow, and network optimization.
                </p>
              </div>
            </div>

            <!-- 4. Jan 2023: Promoted to Project Lead (Camp II) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-12" data-alt="2900">
              <div class="trek-cairn-node" title="Altitude: 2,900m">💼</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Jan 2023</span>
                    <span class="alt-pill">Alt: 2,900m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-700/10 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-300 border border-emerald-600/20">
                    Camp II
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Promoted to Project Lead at Genpact
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Entrusted to lead cross-functional units executing multi-million-dollar supply chain programs for aerospace and energy leaders.
                </p>
              </div>
            </div>

            <!-- 5. July 2023: Scored 760 on GMAT (Quantitative Peak) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-6" data-alt="3400">
              <div class="trek-cairn-node" title="Altitude: 3,400m">🎯</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">July 2023</span>
                    <span class="alt-pill">Alt: 3,400m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-amber-700/10 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 border border-amber-600/20">
                    Quantitative Peak
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Scored 760 on GMAT (Top 1% Globally)
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Achieved 99th percentile global score in quantitative logic, data sufficiency, and critical reasoning.
                </p>
              </div>
            </div>

            <!-- 6. Dec 2024: Filed L1A Blanket Visa -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-0" data-alt="3600">
              <div class="trek-cairn-node" title="Altitude: 3,600m">📄</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Dec 2024</span>
                    <span class="alt-pill">Alt: 3,600m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-purple-700/10 dark:bg-purple-400/15 text-purple-800 dark:text-purple-300 border border-purple-600/20">
                    Expansion
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Filed L1A Blanket Visa Petition
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Initiated corporate mobility petition for cross-border leadership across North American Fortune 500 accounts.
                </p>
              </div>
            </div>

            <!-- 7. Jan 2025: Dubai Expedition -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8" data-alt="3800">
              <div class="trek-cairn-node" title="Altitude: 3,800m">✈️</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Jan 2025</span>
                    <span class="alt-pill">Alt: 3,800m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-blue-700/10 dark:bg-blue-400/15 text-blue-800 dark:text-blue-300 border border-blue-600/20">
                    Global Transit
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  First International Trip: Dubai
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  First overseas voyage, observing global multimodal transit infrastructure, airport city planning, and logistics engineering.
                </p>
              </div>
            </div>

            <!-- 8. Mar 2025: L1A Blanket Rejected (Storm on the Ridge) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-16" data-alt="3950">
              <div class="trek-cairn-node" title="Altitude: 3,950m">⚡</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4 border-l-4 border-l-red-600/70">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Mar 2025</span>
                    <span class="alt-pill">Alt: 3,950m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-red-700/10 dark:bg-red-400/15 text-red-800 dark:text-red-300 border border-red-600/20">
                    The Storm Ridge
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  L1A Blanket Rejected — The Strategic Pivot
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Confronted consular rejection under blanket petition scrutiny; treated the setback as an operational problem and immediately structured an individual petition.
                </p>
              </div>
            </div>

            <!-- 9. July 2025: Completed First 5K (The Running Ridge) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-12" data-alt="4050">
              <div class="trek-cairn-node" title="Altitude: 4,050m">👟</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">July 2025</span>
                    <span class="alt-pill">Alt: 4,050m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-orange-700/10 dark:bg-orange-400/15 text-orange-800 dark:text-orange-300 border border-orange-600/20">
                    Endurance
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Completed First 5K
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Ignited formal distance road running, establishing cardiovascular aerobic baselines and compounding discipline on Strava.
                </p>
              </div>
            </div>

            <!-- 10. Sep 2025: Completed First 10K -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-6" data-alt="4150">
              <div class="trek-cairn-node" title="Altitude: 4,150m">🏃</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Sep 2025</span>
                    <span class="alt-pill">Alt: 4,150m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-orange-700/10 dark:bg-orange-400/15 text-orange-800 dark:text-orange-300 border border-orange-600/20">
                    Endurance
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Completed First 10K Benchmark
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Scaled up road distance progression to cross the official 10-kilometer mark, proving mental stamina and pacing control.
                </p>
              </div>
            </div>

            <!-- 11. Oct 2025: Filed for L1A Individual Visa -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-0" data-alt="4250">
              <div class="trek-cairn-node" title="Altitude: 4,250m">🧭</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Oct 2025</span>
                    <span class="alt-pill">Alt: 4,250m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-amber-700/10 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 border border-amber-600/20">
                    Resilience
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Filed L1A Individual Visa Petition
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Reframed petition architecture and executive leadership thesis for targeted individual consular filing.
                </p>
              </div>
            </div>

            <!-- 12. Nov 2025: Vietnam Expedition -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8" data-alt="4350">
              <div class="trek-cairn-node" title="Altitude: 4,350m">🌏</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Nov 2025</span>
                    <span class="alt-pill">Alt: 4,350m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-blue-700/10 dark:bg-blue-400/15 text-blue-800 dark:text-blue-300 border border-blue-600/20">
                    Journeys
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  Vietnam Expedition
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Explored Southeast Asian cultural crossroads, northern karst limestone ranges, and dynamic decentralized manufacturing networks.
                </p>
              </div>
            </div>

            <!-- 13. Aug 2026: Valley of Flowers Trek (High Pass) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-16" data-alt="4600">
              <div class="trek-cairn-node" title="Altitude: 4,600m">🌸</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-[#75482E] dark:text-[#E28C52]">Aug 2026</span>
                    <span class="alt-pill">Alt: 4,600m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-teal-700/10 dark:bg-teal-400/15 text-teal-800 dark:text-teal-300 border border-teal-600/20">
                    High Glacial Pass
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  First High-Altitude Trek: Valley of Flowers
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Ascended the glacial Himalayan alpine wilderness (14,000+ ft), testing altitude resilience, physical conditioning, and mountain fortitude.
                </p>
              </div>
            </div>

            <!-- 14. Sep 2026: L1A Individual Approved (The Summit Ridge) -->
            <div class="trek-waypoint flex items-start gap-3 sm:gap-4 sm:ml-8" data-alt="5200">
              <div class="trek-cairn-node bg-emerald-700/15 dark:bg-emerald-400/20 !border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-md" title="Altitude: 5,200m">🏔️</div>
              <div class="trek-waypoint-card flex-1 p-3.5 sm:p-4 border-emerald-600/40 bg-emerald-700/[0.04] dark:bg-emerald-400/[0.04]">
                <div class="flex items-center justify-between flex-wrap gap-1.5 mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-400">Sep 2026</span>
                    <span class="alt-pill !bg-emerald-700/15 !text-emerald-800 dark:!text-emerald-300 !border-emerald-600/30">Alt: 5,200m</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-700/15 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 font-semibold">
                    The Summit
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-serif font-bold text-[#233124] dark:text-[#F2EEDC]">
                  L1A Individual Visa Approved
                </h4>
                <p class="text-xs font-serif text-[#4C5848] dark:text-[#C5D0BF] leading-relaxed mt-0.5">
                  Secured US intra-company executive transfer approval following strategic petition overhaul; green light for US strategic leadership and enterprise transformation deployment.
                </p>
              </div>
            </div>

          </div>

        </div>
"@

# Normalize line endings
$content = $content -replace "\r\n", "`n"
$insertedPattern = $insertedPattern -replace "\r\n", "`n"

# Replace the inserted pattern back to the original single '        </div>'
$restored = $content.Replace($insertedPattern, "        </div>")

Write-Output "Original length: $($content.Length)"
Write-Output "Restored length: $($restored.Length)"

# Save restored
[System.IO.File]::WriteAllText("c:\Users\nagal\Documents\Portfolio website\index.html", $restored.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)
