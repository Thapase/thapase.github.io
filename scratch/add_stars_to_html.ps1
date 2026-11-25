$filePath = "c:\Users\nagal\Documents\Portfolio website\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$oldBlock = @"
  <div class="scene" aria-hidden="true">
    <div class="painted-sky-drift">
      <img class="sky-base-image" src="assets/images/continuous-sky.webp" alt="" decoding="async" />
    </div>
  </div>
"@

$newBlock = @"
  <div class="scene" aria-hidden="true">
    <div class="painted-sky-drift">
      <img class="sky-base-image" src="assets/images/continuous-sky.webp" alt="" decoding="async" />
    </div>

    <!-- Night View Starfield (Twinkling Stars, Celestial Glow & Shooting Stars in Dark Mode) -->
    <div class="night-stars" aria-hidden="true">
      <img class="night-stars-layer" src="assets/images/night-stars.svg" alt="" decoding="async" />
      <div class="shooting-star shooting-star-1"></div>
      <div class="shooting-star shooting-star-2"></div>
    </div>
  </div>
"@

# Normalize
$cNorm = $content -replace "\r\n", "`n"
$oldNorm = $oldBlock -replace "\r\n", "`n"
$newNorm = $newBlock -replace "\r\n", "`n"

if (-not $cNorm.Contains($oldNorm)) {
    throw "Could not find scene block in index.html"
}

$cUpdated = $cNorm.Replace($oldNorm, $newNorm)

[System.IO.File]::WriteAllText($filePath, $cUpdated.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)
Write-Output "Added night-stars to index.html successfully!"
