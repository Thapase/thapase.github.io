# Generate realistic SVG starfield
$rand = New-Object System.Random(42) # fixed seed for deterministic, aesthetically balanced distribution
$stars = @()

# 1. Micro background stars (r = 0.8 to 1.1)
for ($i = 0; $i -lt 85; $i++) {
    $x = [Math]::Round($rand.NextDouble() * 1600, 1)
    # Weighted towards upper sky (y between 15 and 520)
    $y = [Math]::Round(15 + [Math]::Pow($rand.NextDouble(), 1.15) * 500, 1)
    $r = [Math]::Round(0.7 + $rand.NextDouble() * 0.5, 2)
    $op = [Math]::Round(0.4 + $rand.NextDouble() * 0.45, 2)
    $twinkleClass = "star-twinkle-" + ($rand.Next(1, 4))
    $stars += "<circle cx='$x' cy='$y' r='$r' fill='#ffffff' opacity='$op' class='$twinkleClass' />"
}

# 2. Medium bright stars (r = 1.3 to 1.8)
for ($i = 0; $i -lt 35; $i++) {
    $x = [Math]::Round($rand.NextDouble() * 1600, 1)
    $y = [Math]::Round(25 + [Math]::Pow($rand.NextDouble(), 1.2) * 460, 1)
    $r = [Math]::Round(1.3 + $rand.NextDouble() * 0.5, 2)
    $op = [Math]::Round(0.65 + $rand.NextDouble() * 0.35, 2)
    $color = if ($rand.NextDouble() -gt 0.3) { "#f8fafc" } else { if ($rand.NextDouble() -gt 0.5) { "#fef08a" } else { "#bae6fd" } }
    $twinkleClass = "star-twinkle-" + ($rand.Next(1, 4))
    $stars += "<circle cx='$x' cy='$y' r='$r' fill='$color' opacity='$op' class='$twinkleClass' />"
}

# 3. Prominent bright stars with cross/diamond flare (North Star & Alpine Constellations)
$prominentCoords = @(
    @{ x = 320; y = 90; name = "Polaris" },
    @{ x = 480; y = 140; name = "Vega" },
    @{ x = 820; y = 75; name = "Sirius" },
    @{ x = 1150; y = 120; name = "Altair" },
    @{ x = 1380; y = 180; name = "Deneb" },
    @{ x = 650; y = 210; name = "Rigel" },
    @{ x = 980; y = 160; name = "Betelgeuse" }
)

foreach ($p in $prominentCoords) {
    $x = $p.x
    $y = $p.y
    # Central glow disc
    $stars += "<circle cx='$x' cy='$y' r='2.4' fill='#ffffff' opacity='0.95' class='star-glow' />"
    $stars += "<circle cx='$x' cy='$y' r='5' fill='#ffffff' opacity='0.25' class='star-glow' />"
    # Subtle 4-point diffraction spike
    $stars += "<path d='M $x $($y - 7) L $x $($y + 7) M $($x - 7) $y L $($x + 7) $y' stroke='#ffffff' stroke-width='0.75' opacity='0.65' class='star-flare' />"
}

$svg = @"
<svg class="night-sky-stars-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  <!-- Soft Nebula Glow Dust -->
  <defs>
    <radialGradient id="nebulaGlow1" cx="65%" cy="25%" r="45%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.07" />
      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.03" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="nebulaGlow2" cx="25%" cy="35%" r="35%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="1600" height="700" fill="url(#nebulaGlow1)" />
  <rect x="0" y="0" width="1600" height="700" fill="url(#nebulaGlow2)" />
  
  <!-- Star Clusters -->
  <g class="stars-group">
    $($stars -join "`n    ")
  </g>
</svg>
"@

[System.IO.File]::WriteAllText("c:\Users\nagal\Documents\Portfolio website\assets\images\night-stars.svg", $svg, [System.Text.Encoding]::UTF8)
Write-Output "Generated assets/images/night-stars.svg successfully!"
