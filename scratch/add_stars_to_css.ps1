$filePath = "c:\Users\nagal\Documents\Portfolio website\css\style.css"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$starsCss = @"

/* ==========================================================================
   Night View Starfield (Twinkling Stars, Celestial Glow & Shooting Stars)
   ========================================================================== */
.night-stars {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.dark .night-stars {
  opacity: 1;
}

.night-stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  animation: starsDrift 240s linear infinite;
  will-change: transform;
}

@keyframes starsDrift {
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-15px, -5px, 0); }
  100% { transform: translate3d(0, 0, 0); }
}

.dark .painted-sky-drift {
  opacity: 0.38;
  filter: brightness(0.55) contrast(1.1) saturate(0.8);
}

/* Shooting Stars */
.shooting-star {
  position: absolute;
  height: 1.5px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 60%, rgba(255, 255, 255, 1) 100%);
  border-radius: 9999px;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.85));
  opacity: 0;
  transform-origin: left center;
}

.shooting-star-1 {
  top: 15%;
  left: 18%;
  width: 85px;
  transform: rotate(-26deg);
  animation: shootMeteor1 18s ease-in-out infinite;
  animation-delay: 3s;
}

.shooting-star-2 {
  top: 25%;
  left: 60%;
  width: 110px;
  transform: rotate(-30deg);
  animation: shootMeteor2 24s ease-in-out infinite;
  animation-delay: 12s;
}

@keyframes shootMeteor1 {
  0% {
    transform: rotate(-26deg) translate3d(0, 0, 0);
    opacity: 0;
  }
  2% {
    opacity: 0.95;
  }
  5% {
    transform: rotate(-26deg) translate3d(180px, 0, 0);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes shootMeteor2 {
  0% {
    transform: rotate(-30deg) translate3d(0, 0, 0);
    opacity: 0;
  }
  2% {
    opacity: 1;
  }
  5.5% {
    transform: rotate(-30deg) translate3d(240px, 0, 0);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

/* Twinkle animations inside SVG elements */
.star-twinkle-1 {
  animation: starTwinkleA 3.5s ease-in-out infinite;
}
.star-twinkle-2 {
  animation: starTwinkleB 4.8s ease-in-out infinite 1.2s;
}
.star-twinkle-3 {
  animation: starTwinkleC 6.2s ease-in-out infinite 2.5s;
}
.star-glow {
  animation: starPulse 5s ease-in-out infinite;
}

@keyframes starTwinkleA {
  0%, 100% { opacity: 0.35; transform: scale(0.9); }
  50% { opacity: 0.95; transform: scale(1.15); }
}
@keyframes starTwinkleB {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 0.25; }
}
@keyframes starTwinkleC {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
@keyframes starPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
"@

$cNorm = $content -replace "\r\n", "`n"
$anchor = "/* ==========================================================================`n   Print / PDF Optimization"

if (-not $cNorm.Contains($anchor)) {
    throw "Could not find print optimization anchor in style.css"
}

$cUpdated = $cNorm.Replace($anchor, ($starsCss -replace "\r\n", "`n") + "`n`n" + $anchor)

[System.IO.File]::WriteAllText($filePath, $cUpdated.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)
Write-Output "Added starry night CSS styles to style.css successfully!"
