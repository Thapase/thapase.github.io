$filePath = "c:\Users\nagal\Documents\Portfolio website\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Locate the journey section
$journeyStartComment = "    <!-- ========================================================================`r`n         The Mountain Ascent — Synchronized Alpine Trek Path (S-Curve Parallax)"
$journeyEndTag = "    </section>"

$idxStart = $content.IndexOf($journeyStartComment)
if ($idxStart -lt 0) {
    # Try with \n only
    $journeyStartComment = "    <!-- ========================================================================`n         The Mountain Ascent — Synchronized Alpine Trek Path (S-Curve Parallax)"
    $idxStart = $content.IndexOf($journeyStartComment)
}

$idxEnd = $content.IndexOf($journeyEndTag, $idxStart) + $journeyEndTag.Length

if ($idxStart -lt 0 -or $idxEnd -le $idxStart) {
    throw "Could not locate #journey section boundaries."
}

# Extract journey section
$journeyRaw = $content.Substring($idxStart, $idxEnd - $idxStart)

# 2. Build the #folder-content-ascent HTML from the journey section
$ascentFolderHtml = @"
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
"@

# Extract the trek-ascent-wrapper from $journeyRaw
$trekWrapperStart = "      <!-- S-Curve Winding Trek Trail Container -->"
$trekWrapperEnd = "      </div>`r`n    </section>"
if (-not $journeyRaw.Contains($trekWrapperEnd)) {
    $trekWrapperEnd = "      </div>`n    </section>"
}
$idxTrekStart = $journeyRaw.IndexOf($trekWrapperStart)
$idxTrekEnd = $journeyRaw.IndexOf($trekWrapperEnd) + "      </div>".Length

$trekWrapper = $journeyRaw.Substring($idxTrekStart, $idxTrekEnd - $idxTrekStart)

# Indent trekWrapper for inside folder
$ascentFolderHtml += "`r`n`r`n" + $trekWrapper + "`r`n`r`n        </div>`r`n"

# 3. Remove journey section from main page flow
$contentWithoutJourney = $content.Substring(0, $idxStart) + $content.Substring($idxEnd)

# Clean up extra blank lines where journey used to be
$contentWithoutJourney = $contentWithoutJourney.Replace("    </div>`r`n`r`n`r`n    <!-- Bottom of the Page", "    </div>`r`n`r`n    <!-- Bottom of the Page")
$contentWithoutJourney = $contentWithoutJourney.Replace("    </div>`n`n`n    <!-- Bottom of the Page", "    </div>`n`n    <!-- Bottom of the Page")

# 4. Insert #folder-content-ascent right before the end of #dossier-scroll-area
$targetInsertion = "        </div>`r`n`r`n      </div>`r`n`r`n      <!-- Dossier Window Bottom Bar -->"
$isCrLf = $true
if (-not $contentWithoutJourney.Contains($targetInsertion)) {
    $targetInsertion = "        </div>`n`n      </div>`n`n      <!-- Dossier Window Bottom Bar -->"
    $isCrLf = $false
}

$replacementInsertion = "        </div>`r`n`r`n" + $ascentFolderHtml + "`r`n      </div>`r`n`r`n      <!-- Dossier Window Bottom Bar -->"
if (-not $isCrLf) {
    $replacementInsertion = "        </div>`n`n" + ($ascentFolderHtml -replace "`r`n", "`n") + "`n      </div>`n`n      <!-- Dossier Window Bottom Bar -->"
}

$finalContent = $contentWithoutJourney.Replace($targetInsertion, $replacementInsertion)

[System.IO.File]::WriteAllText($filePath, $finalContent, [System.Text.Encoding]::UTF8)
Write-Output "Successfully moved #journey into #folder-content-ascent inside #dossier-scroll-area!"
