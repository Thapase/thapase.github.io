# Create bespoke athletic silhouette modeled on Thapase's profile & athletic runner persona
$thapaseSvg = @'
<svg class="hiker-silhouette-svg" viewBox="0 0 54 72" width="38" height="50" fill="currentColor">
  <!-- Thapase Athletic Trail Walker / Runner Silhouette -->
  <g class="hiker-body">
    <!-- 1. Head with Thapase's Signature Voluminous Swept-Back Quiff & Trimmed Beard -->
    <!-- Swept-back Pompadour Hair -->
    <path d="M 23 9 C 22 5, 26 2, 31 3 C 35 3.5, 37 6, 36 10 C 35.5 12, 33 13, 31 12 C 27 12, 24 11, 23 9 Z" />
    <!-- Face Profile, Jaw & Trimmed Beard -->
    <path d="M 31 10 C 33 10, 35 12, 35.5 14 C 36 15, 37 15.5, 36.5 16.5 C 36 17.5, 34.5 18, 34 19 C 34.5 20, 33.5 21, 31 21 C 28.5 21, 27 18.5, 27 16 C 27 14, 28.5 12, 31 10 Z" />
    
    <!-- 2. Strong Athletic Neck & Broad Shoulders -->
    <path d="M 27 19 L 32 20 L 34 26 L 24 26 Z" />

    <!-- 3. Athletic Fitted T-Shirt & Torso -->
    <!-- Torso leaning forward slightly into stride -->
    <path d="M 21 26 C 24 25, 34 25, 37 27 C 36 33, 34 40, 32 44 L 23 44 C 22 39, 21 32, 21 26 Z" />
    
    <!-- 4. Arms in Natural Running / Trail Walking Swing -->
    <!-- Forward Arm (Swinging forward with GPS sports watch on wrist) -->
    <path d="M 33 27 C 36 29, 39 33, 40 37 C 41 40, 39 42, 37 42 C 36 41, 35 37, 33 34 Z" />
    <!-- GPS Sports Watch on Forward Wrist (Strava Benchmark) -->
    <rect x="37.5" y="38" width="3.2" height="2.2" rx="1" fill="#75482E" class="hiker-watch" />
    
    <!-- Back Arm (Swinging back naturally) -->
    <path d="M 23 27 C 20 30, 17 34, 16 38 C 15 41, 17 42, 19 41 C 20 38, 21 34, 23 30 Z" />

    <!-- 5. Running / Trail Shorts -->
    <path d="M 22 43 L 33 43 L 34 50 L 29.5 50.5 L 29 46 L 26 46 L 25.5 50.5 L 21 50 Z" />

    <!-- 6. Athletic Legs & Trail Running Shoes in Stride -->
    <!-- Lead Leg (Stepping forward with defined quad & calf) -->
    <path d="M 30 50 C 31 54, 32 58, 33 62 L 35 68 L 41 68.5 C 42 69, 41 71, 38 71 L 32 71 C 30 70, 30 67, 29.5 63 C 29 58, 29 54, 29.5 50 Z" />
    
    <!-- Trail Leg (Pushing off behind with flexed calf & runner shoe) -->
    <path d="M 23 50 C 21 54, 18 58, 16 62 L 14 67 L 9 68 C 8 67.5, 9 66, 11 65.5 L 14 64 C 16 60, 19 55, 22 50 Z" />
  </g>
</svg>
'@

Write-Output "SVG generated."
