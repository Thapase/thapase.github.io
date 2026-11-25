$htmlPath = "c:\Users\nagal\Documents\Portfolio website\index.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# 1. Remove night-stars from scene in index.html (revert to plain night sky)
$nightStarsOld = @"
    <!-- Night View Starfield (Twinkling Stars, Celestial Glow & Shooting Stars in Dark Mode) -->
    <div class="night-stars" aria-hidden="true">
      <img class="night-stars-layer" src="assets/images/night-stars.svg" alt="" decoding="async" />
      <div class="shooting-star shooting-star-1"></div>
      <div class="shooting-star shooting-star-2"></div>
    </div>
"@

$htmlContentNorm = $htmlContent -replace "\r\n", "`n"
$nightStarsOldNorm = $nightStarsOld -replace "\r\n", "`n"

if ($htmlContentNorm.Contains($nightStarsOldNorm)) {
    $htmlContentNorm = $htmlContentNorm.Replace($nightStarsOldNorm, "")
    Write-Output "Removed night-stars from index.html (plain night sky restored)."
}

# 2. Add meadow walker silhouette layer right above Layer 5 (mountain-woodland/meadows)
$meadowLayerMarker = '    <!-- Layer 5: Foreground Woodland / Pine Base -->`n    <div class="mountain-layer mountain-woodland"></div>'
$hikerLayer = @'
    <!-- Layer 5: Foreground Woodland / Pine Base -->
    <div class="mountain-layer mountain-woodland"></div>

    <!-- Layer 5b: Solitary Explorer Silhouette Traversing the Meadows -->
    <div class="meadow-walker-track" aria-hidden="true">
      <div class="meadow-hiker">
        <svg class="hiker-silhouette-svg" viewBox="0 0 32 44" width="28" height="38" fill="currentColor">
          <!-- Rucksack / Backpack -->
          <path d="M7 11 C4.5 11 4 14 4.5 19 C5 23 7 24 9 23 L9 13 Z" opacity="0.95"/>
          <!-- Head with outdoor cap/brim -->
          <circle cx="16.5" cy="5.5" r="3.2"/>
          <path d="M15 4.5 L21.5 5.8 L16.5 7 Z"/>
          <!-- Torso leaning forward into the hike -->
          <path d="M11 9 L18 9.5 L16.5 22 L10 22 Z"/>
          <!-- Trekking staff / pole -->
          <line x1="14" y1="12" x2="23" y2="42" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" class="hiker-pole"/>
          <!-- Lead leg & hiking boot -->
          <path d="M15 22 L18.5 31 L20 40 L23 41 L19 41.5 L17 32 L13.5 22 Z"/>
          <!-- Trail leg & hiking boot -->
          <path d="M11.5 22 L8.5 30 L6 38.5 L9 39.5 L5.5 40.5 L6.5 31 L10 22 Z"/>
          <!-- Forward arm holding pole grip -->
          <path d="M15 10.5 L18 15 L19.5 21 L17.5 21 L16 15 Z"/>
        </svg>
      </div>
    </div>
'@

if ($htmlContentNorm.Contains("    <div class=`"mountain-layer mountain-woodland`"></div>")) {
    $htmlContentNorm = $htmlContentNorm.Replace(
        "    <div class=`"mountain-layer mountain-woodland`"></div>",
        "    <div class=`"mountain-layer mountain-woodland`"></div>`n`n" + ($hikerLayer.Substring($hikerLayer.IndexOf("    <!-- Layer 5b:")))
    )
    Write-Output "Added meadow walker to index.html."
}

[System.IO.File]::WriteAllText($htmlPath, $htmlContentNorm.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)

# 3. Update css/style.css with meadow walker animation & clean night sky
$cssPath = "c:\Users\nagal\Documents\Portfolio website\css\style.css"
$cssContent = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)
$cssNorm = $cssContent -replace "\r\n", "`n"

$hikerCss = @'

/* ==========================================================================
   Solitary Explorer Silhouette Traversing the Rolling Meadows
   ========================================================================== */
.meadow-walker-track {
  position: absolute;
  bottom: clamp(1.2rem, 3.8vh, 2.6rem);
  left: 0;
  width: 100%;
  height: 44px;
  pointer-events: none;
  z-index: 6;
  overflow: hidden;
}

.meadow-hiker {
  position: absolute;
  bottom: 0;
  left: 0;
  color: #1a2717;
  display: flex;
  align-items: flex-end;
  animation: meadowTraverse 52s linear infinite, hikerBob 1.05s ease-in-out infinite;
  will-change: transform;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.dark .meadow-hiker {
  color: #090e0b;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.6));
}

@keyframes meadowTraverse {
  0% {
    transform: translateX(-40px);
  }
  100% {
    transform: translateX(calc(100vw + 40px));
  }
}

@keyframes hikerBob {
  0%, 100% {
    margin-bottom: 0px;
    transform: rotate(0deg);
  }
  50% {
    margin-bottom: 2.5px;
    transform: rotate(1deg);
  }
}

.hiker-pole {
  animation: poleSwing 1.05s ease-in-out infinite;
  transform-origin: 14px 12px;
}

@keyframes poleSwing {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-3deg);
  }
}
'@

# Remove starfield CSS if present
$starCssStart = "/* ==========================================================================`n   Night View Starfield"
$starCssEnd = "/* ==========================================================================`n   Print / PDF Optimization"

$idxStar1 = $cssNorm.IndexOf($starCssStart)
$idxStar2 = $cssNorm.IndexOf($starCssEnd)

if ($idxStar1 -ge 0 -and $idxStar2 -gt $idxStar1) {
    $cssNorm = $cssNorm.Substring(0, $idxStar1) + $hikerCss + "`n`n" + $cssNorm.Substring($idxStar2)
    Write-Output "Replaced starfield CSS with meadow hiker animation."
} else {
    $cssNorm = $cssNorm.Replace($starCssEnd, $hikerCss + "`n`n" + $starCssEnd)
    Write-Output "Appended meadow hiker animation to style.css."
}

[System.IO.File]::WriteAllText($cssPath, $cssNorm.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)
Write-Output "Completed updating index.html and style.css successfully!"
