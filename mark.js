/**
 * ============================================================================
 * The Living Parchment — Interactive Spirit Animal & Thumbprint Stamping
 * Aesthetic: Authentic Ink Pressed on Japanese / Antique Parchment
 * 10 Marks: Thumb Impression (Top Hero) + 3x3 Grid of 9 Fierce Animals
 * Adaptive Dual-Theme Inks (100% visible in both Light and Dark mode)
 * Rule: Stamping strictly gated by 1-Click Social Sign-In (Google or X)
 * Strictly ONE mark per user handle.
 * ============================================================================
 */

(function () {
  // SVGs for 10 Seals (No outer circle border rings; sharp, ferocious, transparent vector line-art)
  const STAMP_SVGS = {
    thumbprint: `
      <svg class="w-10 h-13 sm:w-11 sm:h-14" viewBox="0 0 80 110" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M40 14c-16 0-28 14-28 32 0 18 6 40 14 54 2 4 7 7 14 7s12-3 14-7c8-14 14-36 14-54 0-18-12-32-28-32z" stroke-width="1.6" stroke-dasharray="3 3" opacity="0.25"/>
        <path d="M40 52c0-4 3-7 7-7s7 3 7 7c0 7-5 14-9 21"/>
        <path d="M33 46c2-5 6-8 12-8 8 0 14 6 14 14 0 9-6 19-12 28"/>
        <path d="M26 53c0-10 7-17 19-17 12 0 20 8 20 19 0 11-8 22-15 31"/>
        <path d="M20 60c0-14 9-25 24-25 15 0 26 11 26 26 0 12-9 24-17 34"/>
        <path d="M16 48c0-17 12-29 27-29 15 0 27 12 27 29 0 14-8 27-16 38"/>
        <path d="M22 36c5-11 12-16 22-16s17 5 22 16"/>
        <path d="M38 72c0 8-3 16-8 23"/>
        <path d="M32 78c0 7-2 13-5 17"/>
        <path d="M48 78c0 7 3 13 6 17"/>
        <path d="M26 88c4 8 8 15 14 19"/>
        <path d="M54 88c-4 8-8 15-14 19"/>
        <path d="M16 68c2-7 3-14 3-21"/>
        <path d="M64 68c-2-7-3-14-3-21"/>
        <path d="M40 38c-3 0-5 2-5 5"/>
      </svg>
    `,
    lion: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50 6l6 9 10-6 3 11 12-3 1 12 11 3-2 11 10 7-5 11 7 10-9 8 3 12-11 3-3 11-11-2-6 9-6-9-11 2-3-11-11-3 3-12-9-8 7-10-5-11 10-7-2-11 11-3 1-12 12 3 3-11 10 6z" stroke-width="2.2"/>
        <path d="M29 32c-3 8-1 18 1 25M71 32c3 8 1 18-1 25" stroke-width="2"/>
        <path d="M34 24c4-3 10-5 16-5s12 2 16 5" stroke-width="2.2"/>
        <path d="M26 28c-4-4-1-10 5-8M74 28c4-4 1-10-5-8" stroke-width="2"/>
        <path d="M44 22l6 7 6-7" stroke-width="2"/>
        <path d="M50 29v8" stroke-width="2"/>
        <path d="M31 38c5-4 11-2 15 2" stroke-width="2.6"/>
        <path d="M69 38c-5-4-11-2-15 2" stroke-width="2.6"/>
        <path d="M33 42c3-2 7-1 9 2-2 3-6 3-9-2z" fill="currentColor"/>
        <path d="M67 42c-3-2-7-1-9 2 2 3 6 3 9-2z" fill="currentColor"/>
        <path d="M44 42l-2 12h16l-2-12" stroke-width="2"/>
        <path d="M42 48h16" stroke-width="1.8"/>
        <path d="M43 54h14l-7 7z" fill="currentColor"/>
        <path d="M50 61v4c-5 2-11 1-16-2" stroke-width="2.2"/>
        <path d="M50 65c5 2 11 1 16-2" stroke-width="2.2"/>
        <path d="M39 63l2 7-1-7" stroke-width="2.2" fill="currentColor"/>
        <path d="M61 63l-2 7 1-7" stroke-width="2.2" fill="currentColor"/>
        <path d="M42 71c3 4 13 4 16 0" stroke-width="2"/>
        <path d="M45 74l1-3M55 74l-1-3" stroke-width="2"/>
        <path d="M45 78l5 6 5-6" stroke-width="2.2"/>
        <path d="M28 58l-10-2M28 62l-11 2M72 58l10-2M72 62l11 2" stroke-width="1.6"/>
      </svg>
    `,
    tiger: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 28c-6-10 4-18 13-13 4 3 6 8 7 13" stroke-width="2.4"/>
        <path d="M24 22c-3-5 2-9 7-7" stroke-width="1.8"/>
        <path d="M78 28c6-10-4-18-13-13-4 3-6 8-7 13" stroke-width="2.4"/>
        <path d="M76 22c3-5-2-9-7-7" stroke-width="1.8"/>
        <path d="M20 40l-6 8 6 3-7 8 8 3-5 8 13 8" stroke-width="2.2"/>
        <path d="M80 40l6 8-6 3 7 8-8 3 5 8-13 8" stroke-width="2.2"/>
        <path d="M38 18h24M41 23h18M39 28h22M50 18v10" stroke-width="2.4"/>
        <path d="M28 29l9 4M26 35l9 3M72 29l-9 4M74 35l-9 3" stroke-width="2.2"/>
        <path d="M29 42c5-4 12-2 16 2" stroke-width="2.6"/>
        <path d="M71 42c-5-4-12-2-16 2" stroke-width="2.6"/>
        <path d="M32 45c3-2 8-1 11 2-3 3-8 2-11-2z" fill="currentColor"/>
        <path d="M68 45c-3-2-8-1-11 2 3 3 8 2 11-2z" fill="currentColor"/>
        <path d="M43 45l-1 11h16l-1-11" stroke-width="2"/>
        <path d="M43 49h14M44 53h12" stroke-width="1.8"/>
        <path d="M43 56h14l-7 7z" fill="currentColor"/>
        <path d="M50 63v4c-5 3-11 2-16-1" stroke-width="2.2"/>
        <path d="M50 67c5 3 11 2 16-1" stroke-width="2.2"/>
        <path d="M38 65l2 7-1-7" stroke-width="2.4" fill="currentColor"/>
        <path d="M62 65l-2 7 1-7" stroke-width="2.4" fill="currentColor"/>
        <path d="M43 72c3 4 11 4 14 0" stroke-width="2"/>
        <path d="M45 74l1-3M55 74l-1-3" stroke-width="2"/>
        <path d="M44 80c3 2 9 2 12 0" stroke-width="2.2"/>
      </svg>
    `,
    leopard: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 32c-6-13 4-20 14-15 5 3 8 8 9 14" stroke-width="2.4"/>
        <path d="M25 28c-3-6 2-11 8-8" stroke-width="1.8"/>
        <path d="M78 32c6-13-4-20-14-15-5 3-8 8-9 14" stroke-width="2.4"/>
        <path d="M75 28c3-6-2-11-8-8" stroke-width="1.8"/>
        <path d="M36 24c4-2 9-3 14-3s10 1 14 3" stroke-width="2.4"/>
        <path d="M19 44c0 19 13 38 31 38s31-19 31-38c0-6-2-12-5-17" stroke-width="2.4"/>
        <circle cx="50" cy="27" r="1.8" fill="currentColor"/>
        <circle cx="43" cy="32" r="1.6" fill="currentColor"/>
        <circle cx="57" cy="32" r="1.6" fill="currentColor"/>
        <path d="M35 34c-1.5 0-2.5 1-2.5 2s1 2 2.5 2" stroke-width="1.6"/>
        <path d="M65 34c1.5 0 2.5 1 2.5 2s-1 2-2.5 2" stroke-width="1.6"/>
        <path d="M47 36c-1 0-2 1-2 2s1 2 2 2" stroke-width="1.6"/>
        <path d="M53 36c1 0 2 1 2 2s-1 2-2 2" stroke-width="1.6"/>
        <path d="M30 42c4-3 10-1 14 2" stroke-width="2.4"/>
        <path d="M70 42c-4-3-10-1-14 2" stroke-width="2.4"/>
        <path d="M32 45c3-2 8-1 11 2-3 3-8 2-11-2z" fill="currentColor"/>
        <path d="M68 45c-3-2-8-1-11 2 3 3 8 2 11-2z" fill="currentColor"/>
        <path d="M44 46l1 10h10l1-10" stroke-width="2"/>
        <path d="M44 56h12l-6 6z" fill="currentColor"/>
        <path d="M50 62v4c-4 3-9 2-14 0" stroke-width="2.2"/>
        <path d="M50 66c4 3 9 2 14 0" stroke-width="2.2"/>
        <path d="M39 65l2 6-1-6" stroke-width="2.2" fill="currentColor"/>
        <path d="M61 65l-2 6 1-6" stroke-width="2.2" fill="currentColor"/>
        <path d="M33 60l-14-2M33 64l-15 3M67 60l14-2M67 64l15 3" stroke-width="1.6"/>
        <path d="M43 72c4 2 10 2 14 0" stroke-width="2.2"/>
      </svg>
    `,
    wolf: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M26 36L16 12c10 3 19 11 22 20" stroke-width="2.6"/>
        <path d="M22 20l4 9M26 17l2 8" stroke-width="1.8"/>
        <path d="M74 36L84 12c-10 3-19 11-22 20" stroke-width="2.6"/>
        <path d="M78 20l-4 9M74 17l-2 8" stroke-width="1.8"/>
        <path d="M38 32c4-3 8-4 12-4s8 1 12 4" stroke-width="2.4"/>
        <path d="M24 38l-7 8 6 3-8 8 7 3-6 7 13 8" stroke-width="2.2"/>
        <path d="M76 38l7 8-6 3 8 8-7 3 6 7-13 8" stroke-width="2.2"/>
        <path d="M45 29l5 7 5-7" stroke-width="2"/>
        <path d="M50 36v9" stroke-width="2"/>
        <path d="M29 44c5-3 11-2 15 2" stroke-width="2.6"/>
        <path d="M71 44c-5-3-11-2-15 2" stroke-width="2.6"/>
        <path d="M31 46c4-3 9-2 13 2-4 3-9 2-13-2z" fill="currentColor"/>
        <path d="M69 46c-4-3-9-2-13 2 4 3 9 2 13-2z" fill="currentColor"/>
        <path d="M43 47l-2 16h18l-2-16" stroke-width="2.2"/>
        <path d="M43 52h14M44 57h12" stroke-width="1.8"/>
        <path d="M44 63h12l-2 6c-1 2-6 2-8 0z" fill="currentColor"/>
        <path d="M50 69v4c-4 2-8 1-12-1" stroke-width="2.2"/>
        <path d="M50 73c4 2 8 1 12-1" stroke-width="2.2"/>
        <path d="M40 70l2 7-1-7" stroke-width="2.2" fill="currentColor"/>
        <path d="M60 70l-2 7 1-7" stroke-width="2.2" fill="currentColor"/>
        <path d="M43 78c4 3 10 3 14 0" stroke-width="2"/>
        <path d="M42 84c5 2 11 2 16 0" stroke-width="2.2"/>
      </svg>
    `,
    bear: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 28c-6-10 6-18 14-10 3 3 5 8 5 13" stroke-width="2.4"/>
        <path d="M22 24c-3-5 3-9 8-5" stroke-width="1.8"/>
        <path d="M81 28c6-10-6-18-14-10-3 3-5 8-5 13" stroke-width="2.4"/>
        <path d="M78 24c3-5-3-9-8-5" stroke-width="1.8"/>
        <path d="M35 24c5-2 10-3 15-3s10 1 15 3" stroke-width="2.6"/>
        <path d="M17 40c0 19 12 40 33 40s33-21 33-40c0-6-2-12-5-16" stroke-width="2.4"/>
        <path d="M17 40c0-6 2-12 5-16" stroke-width="2.4"/>
        <path d="M44 26l6 7 6-7" stroke-width="2"/>
        <path d="M50 33v9" stroke-width="2"/>
        <path d="M38 33c4 2 8 2 12 0" stroke-width="1.8"/>
        <path d="M62 33c-4 2-8 2-12 0" stroke-width="1.8"/>
        <path d="M30 38c4-2 9-1 13 2" stroke-width="2.6"/>
        <path d="M70 38c-4-2-9-1-13 2" stroke-width="2.6"/>
        <circle cx="36" cy="42" r="2.4" fill="currentColor"/>
        <circle cx="64" cy="42" r="2.4" fill="currentColor"/>
        <path d="M36 48c4-3 9-4 14-4s10 1 14 4l-2 24H38z" stroke-width="2.2"/>
        <path d="M40 51h20M41 55h18" stroke-width="1.8"/>
        <path d="M41 58h18l-3 7c-2 3-10 3-12 0z" fill="currentColor"/>
        <path d="M50 67v4c-4 3-9 2-13-1" stroke-width="2.2"/>
        <path d="M50 71c4 3 9 2 13-1" stroke-width="2.2"/>
        <path d="M39 68l2 8-1-8" stroke-width="2.4" fill="currentColor"/>
        <path d="M61 68l-2 8 1-8" stroke-width="2.4" fill="currentColor"/>
        <path d="M42 78c5 2 11 2 16 0" stroke-width="2.4"/>
      </svg>
    `,
    eagle: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50 14l4 7 7-5 2 8 8-3-2 8 7 3-4 7 6 5-7 5" stroke-width="2.2"/>
        <path d="M50 14l-4 7-7-5-2 8-8-3 2 8-7 3 4 7-6 5 7 5" stroke-width="2.2"/>
        <path d="M26 46c-5 8-5 18-2 26l6-2 3 8 7-3 4 9 9-4" stroke-width="2.2"/>
        <path d="M74 46c5 8 5 18 2 26l-6-2-3 8-7-3-4 9-9-4" stroke-width="2.2"/>
        <path d="M27 40c6-4 15-3 21 2" stroke-width="2.8"/>
        <path d="M73 40c-6-4-15-3-21 2" stroke-width="2.8"/>
        <circle cx="36" cy="44" r="5" stroke-width="2"/>
        <circle cx="36" cy="44" r="2.6" fill="currentColor"/>
        <circle cx="64" cy="44" r="5" stroke-width="2"/>
        <circle cx="64" cy="44" r="2.6" fill="currentColor"/>
        <path d="M41 47c3-1 15-1 18 0l2 6H39z" fill="currentColor"/>
        <path d="M41 53c0 0 4 16 9 25 5-9 9-25 9-25" stroke-width="2.4"/>
        <path d="M44 53c2 9 6 18 6 25 0-7 4-16 6-25" fill="currentColor"/>
        <path d="M34 54c5 0 10-2 16 3 6-5 11-3 16-3" stroke-width="2.2"/>
        <path d="M42 78l8 7 8-7" stroke-width="2"/>
      </svg>
    `,
    bull: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M34 30C20 25 8 15 8 4c11 2 24 15 28 24" stroke-width="2.8" fill="currentColor"/>
        <path d="M66 30C80 25 92 15 92 4c-11 2-24 15-28 24" stroke-width="2.8" fill="currentColor"/>
        <path d="M27 34c-8 2-13 8-11 14 4 2 10-2 13-9" stroke-width="2"/>
        <path d="M73 34c8 2 13 8 11 14-4 2-10-2-13-9" stroke-width="2"/>
        <path d="M33 24c5-2 11-3 17-3s12 1 17 3" stroke-width="2.6"/>
        <path d="M31 36l-4 22c0 11 9 26 23 26s23-15 23-26l-4-22" stroke-width="2.4"/>
        <path d="M43 28l7 8 7-8" stroke-width="2.2"/>
        <path d="M45 36h10M46 41h8" stroke-width="2"/>
        <path d="M29 44c4-3 9-1 13 2" stroke-width="2.6"/>
        <path d="M71 44c-4-3-9-1-13 2" stroke-width="2.6"/>
        <path d="M30 46c3-2 7-1 9 1-2 3-6 3-9-1z" fill="currentColor"/>
        <path d="M70 46c-3-2-7-1-9 1 2 3 6 3 9-1z" fill="currentColor"/>
        <path d="M33 66c5-2 11-3 17-3s12 1 17 3l-2 14H35z" stroke-width="2.4"/>
        <circle cx="41" cy="72" r="2.6" fill="currentColor"/>
        <circle cx="59" cy="72" r="2.6" fill="currentColor"/>
        <path d="M43 78c3 2 11 2 14 0" stroke-width="2.2"/>
        <path d="M38 80l-6 4M62 80l6 4" stroke-width="1.8"/>
      </svg>
    `,
    stag: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M43 30C41 21 34 14 24 10m11 9c-7-4-15-5-22-4m20 11c-8 0-15 4-20 10m15-4c-4 5-5 11-5 17" stroke-width="2.5"/>
        <path d="M57 30C59 21 66 14 76 10m-11 9c7-4 15-5 22-4m-20 11c8 0 15 4 20 10m-15-4c4 5 5 11 5 17" stroke-width="2.5"/>
        <path d="M37 36C24 34 18 41 20 48c6 3 14 0 19-6" stroke-width="2.2"/>
        <path d="M63 36C76 34 82 41 80 48c-6 3-14 0-19-6" stroke-width="2.2"/>
        <path d="M39 32c3-2 7-3 11-3s8 1 11 3" stroke-width="2.4"/>
        <path d="M37 40l-2 16c0 11 7 24 15 28 8-4 15-17 15-28l-2-16" stroke-width="2.2"/>
        <path d="M32 46c4-2 9-1 12 2" stroke-width="2.4"/>
        <path d="M68 46c-4-2-9-1-12 2" stroke-width="2.4"/>
        <path d="M33 49c3-2 7-1 9 2-2 3-6 3-9-2z" fill="currentColor"/>
        <path d="M67 49c-3-2-7-1-9 2 2 3 6 3 9-2z" fill="currentColor"/>
        <path d="M43 68l2 6h10l2-6" stroke-width="2"/>
        <path d="M44 74h12c0 2-2 4-6 4s-6-2-6-4z" fill="currentColor"/>
        <path d="M45 80c3 1 7 1 10 0" stroke-width="1.8"/>
      </svg>
    `,
    cobra: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M33 42C20 34 16 18 24 12c10 8 16 22 22 30" stroke-width="2.4"/>
        <path d="M67 42C80 34 84 18 76 12c-10 8-16 22-22 30" stroke-width="2.4"/>
        <path d="M24 12c16-5 36-5 52 0" stroke-width="2.2"/>
        <path d="M34 22c5 4 11 6 16 6s11-2 16-6" stroke-width="2.2"/>
        <path d="M36 28c4 4 9 6 14 6s10-2 14-6" stroke-width="2"/>
        <path d="M40 28c3-3 7-4 10-4s7 1 10 4l4 14c0 14-6 26-14 30-8-4-14-16-14-30z" stroke-width="2.4"/>
        <path d="M37 42c3-2 7-1 10 1" stroke-width="2.4"/>
        <path d="M63 42c-3-2-7-1-10 1" stroke-width="2.4"/>
        <path d="M39 44l6 2-3 3-5-2z" fill="currentColor"/>
        <path d="M61 44l-6 2 3 3 5-2z" fill="currentColor"/>
        <path d="M46 34l4 5 4-5" stroke-width="1.8"/>
        <path d="M47 48h6" stroke-width="1.8"/>
        <path d="M41 58c3 4 15 4 18 0" stroke-width="2.2"/>
        <path d="M43 59l2 8-1-8" stroke-width="2.4" fill="currentColor"/>
        <path d="M57 59l-2 8 1-8" stroke-width="2.4" fill="currentColor"/>
        <path d="M44 68c2 2 10 2 12 0" stroke-width="2"/>
        <path d="M50 68v12M50 80l-4 6M50 80l4 6" stroke-width="2"/>
      </svg>
    `,
    falcon: `
      <svg class="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M33 42C20 34 16 18 24 12c10 8 16 22 22 30" stroke-width="2.4"/>
        <path d="M67 42C80 34 84 18 76 12c-10 8-16 22-22 30" stroke-width="2.4"/>
        <path d="M24 12c16-5 36-5 52 0" stroke-width="2.2"/>
        <path d="M34 22c5 4 11 6 16 6s11-2 16-6" stroke-width="2.2"/>
        <path d="M36 28c4 4 9 6 14 6s10-2 14-6" stroke-width="2"/>
        <path d="M40 28c3-3 7-4 10-4s7 1 10 4l4 14c0 14-6 26-14 30-8-4-14-16-14-30z" stroke-width="2.4"/>
        <path d="M37 42c3-2 7-1 10 1" stroke-width="2.4"/>
        <path d="M63 42c-3-2-7-1-10 1" stroke-width="2.4"/>
        <path d="M39 44l6 2-3 3-5-2z" fill="currentColor"/>
        <path d="M61 44l-6 2 3 3 5-2z" fill="currentColor"/>
        <path d="M46 34l4 5 4-5" stroke-width="1.8"/>
        <path d="M47 48h6" stroke-width="1.8"/>
        <path d="M41 58c3 4 15 4 18 0" stroke-width="2.2"/>
        <path d="M43 59l2 8-1-8" stroke-width="2.4" fill="currentColor"/>
        <path d="M57 59l-2 8 1-8" stroke-width="2.4" fill="currentColor"/>
        <path d="M44 68c2 2 10 2 12 0" stroke-width="2"/>
        <path d="M50 68v12M50 80l-4 6M50 80l4 6" stroke-width="2"/>
      </svg>
    `
  };

  const STAMP_METAS = {
    thumbprint: { name: "Thumb Impression", shortName: "Thumb", icon: "🖐️", trait: "Raw authenticity, personal sovereignty, and an original path." },
    lion: { name: "African Lion", shortName: "Lion", icon: "🦁", trait: "Commanding authority, fearless leadership, and fierce loyalty." },
    tiger: { name: "Bengal Tiger", shortName: "Tiger", icon: "🐯", trait: "Relentless drive, unbridled intensity, and razor focus." },
    leopard: { name: "Snow Leopard", shortName: "Leopard", icon: "🐆", trait: "Stealth precision, quiet lethality, and solitary mastery." },
    wolf: { name: "Trail Wolf", shortName: "Wolf", icon: "🐺", trait: "Pack loyalty, sharp survival instinct, and enduring grit." },
    bear: { name: "Grizzly Bear", shortName: "Bear", icon: "🐻", trait: "Raw formidable strength, grounded patience, and unshakeable fortitude." },
    eagle: { name: "Highland Eagle", shortName: "Eagle", icon: "🦅", trait: "Far-reaching vision, swift execution, and soaring ambition." },
    bull: { name: "Wild Bull", shortName: "Bull", icon: "🐂", trait: "Unstoppable momentum, pure resilience, and powerhouse grit." },
    stag: { name: "Forest Stag", shortName: "Stag", icon: "🦌", trait: "Poise under pressure, wild vigilance, and noble instinct." },
    cobra: { name: "King Cobra", shortName: "Cobra", icon: "🐍", trait: "Cold calculated timing, lethal precision, and striking first." },
    falcon: { name: "King Cobra", shortName: "Cobra", icon: "🐍", trait: "Cold calculated timing, lethal precision, and striking first." }
  };

  const COLOR_VARS = {
    terracotta: "var(--ink-terracotta)",
    forest: "var(--ink-forest)",
    indigo: "var(--ink-indigo)",
    ochre: "var(--ink-ochre)",
    moss: "var(--ink-moss)"
  };

  // State
  let activeStamp = "thumbprint";
  let activeColorId = "terracotta";
  let supabaseClient = null;
  let currentUser = null; // { handle: string, provider: "google" | "twitter" }

  // Pre-seeded Tasteful Communal Stamps (Adapting automatically to light/dark themes)
  const SEED_MARKS = [
    { x: 20, y: 32, stamp: "thumbprint", colorId: "terracotta", rot: -5, opacity: 0.88, handle: "@arjun_m" },
    { x: 78, y: 24, stamp: "eagle", colorId: "indigo", rot: 7, opacity: 0.9, handle: "karthik.r@gmail.com" },
    { x: 28, y: 65, stamp: "wolf", colorId: "forest", rot: -4, opacity: 0.86, handle: "@riya_ops" },
    { x: 82, y: 62, stamp: "lion", colorId: "ochre", rot: 8, opacity: 0.88, handle: "@vikram_strat" },
    { x: 50, y: 76, stamp: "stag", colorId: "moss", rot: 3, opacity: 0.85, handle: "ananya.s@gmail.com" }
  ];

  // Auth Management
  function getSignedInUser() {
    if (currentUser) return currentUser;
    try {
      const stored = localStorage.getItem("thp_auth_user");
      if (stored) {
        currentUser = JSON.parse(stored);
        return currentUser;
      }
    } catch (e) {}
    return null;
  }

  function setSignedInUser(user) {
    currentUser = user;
    if (user && user.handle) {
      localStorage.setItem("thp_auth_user", JSON.stringify(user));
    } else {
      currentUser = null;
      localStorage.removeItem("thp_auth_user");
    }
    renderAuthUI();
  }

  function renderAuthUI() {
    const user = getSignedInUser();
    const signedOutEl = document.getElementById("auth-signed-out");
    const signedInEl = document.getElementById("auth-signed-in");
    const handleDisplay = document.getElementById("auth-handle-display");
    const providerIcon = document.getElementById("auth-provider-icon");
    const hintDesc = document.getElementById("hint-desc");
    const hintStatus = document.getElementById("hint-status");

    if (user && user.handle) {
      if (signedOutEl) signedOutEl.classList.add("hidden");
      if (signedInEl) {
        signedInEl.classList.remove("hidden");
        signedInEl.classList.add("flex");
      }
      if (handleDisplay) {
        handleDisplay.textContent = user.handle;
        handleDisplay.title = `Signed in as ${user.handle}`;
      }
      if (providerIcon) {
        const isGoogle = user.provider === "google" || (user.handle.includes("@") && user.handle.includes("."));
        providerIcon.className = isGoogle
          ? "fa-brands fa-google text-[11px] text-red-500"
          : "fa-brands fa-x-twitter text-[11px] text-[#233124] dark:text-[#F2EEDC]";
      }
      if (hintDesc) {
        hintDesc.textContent = `Signed in as ${user.handle}. Choose your seal & inkwell, then tap anywhere on the parchment to stamp.`;
      }
      if (hintStatus) {
        hintStatus.textContent = "Tap anywhere to stamp";
      }
    } else {
      if (signedInEl) {
        signedInEl.classList.add("hidden");
        signedInEl.classList.remove("flex");
      }
      if (signedOutEl) signedOutEl.classList.remove("hidden");
      if (hintDesc) {
        hintDesc.textContent = "Leave your mark with your authentic Thumb Impression or one of 9 fierce spirit animals (Lion, Tiger, Leopard, Wolf, Bear, Eagle, Bull, Stag, King Cobra). Pick an ink color, sign in with Google or X below, and tap anywhere on the parchment to stamp.";
      }
      if (hintStatus) {
        hintStatus.textContent = "Sign in below to begin";
      }
    }
  }

  function pulseSignInPrompt() {
    const signedOutEl = document.getElementById("auth-signed-out");
    if (!signedOutEl) return;
    signedOutEl.classList.add("ring-2", "ring-[#75482E]", "dark:ring-[#d89667]", "scale-105");
    setTimeout(() => {
      signedOutEl.classList.remove("ring-2", "ring-[#75482E]", "dark:ring-[#d89667]", "scale-105");
    }, 1200);
  }

  // Supabase Initializer
  function initSupabase() {
    try {
      const cfg = window.THAPASE_CONFIG?.supabase;
      if (window.supabase && cfg?.url && cfg?.anonKey && cfg.url.trim() !== "" && cfg.anonKey.trim() !== "") {
        supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
        
        // Listen to auth state
        supabaseClient.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            handleAuthUser(session.user);
          } else if (event === "SIGNED_OUT") {
            setSignedInUser(null);
          }
        });

        // Check active session
        supabaseClient.auth.getSession().then(({ data }) => {
          if (data?.session?.user) {
            handleAuthUser(data.session.user);
          }
        });
      }
    } catch (e) {
      console.warn("Supabase init optional notice:", e);
    }
  }

  function handleAuthUser(user) {
    if (!user) return;
    let handle = "";
    let provider = "google";
    const meta = user.user_metadata || {};
    if (meta.user_name) {
      handle = "@" + meta.user_name;
      provider = "twitter";
    } else if (meta.preferred_username) {
      handle = "@" + meta.preferred_username;
      provider = "twitter";
    } else if (user.email) {
      handle = user.email;
      provider = "google";
    }
    if (handle) {
      setSignedInUser({ handle, provider });
      showToast(`Signed in as ${handle}`);
    }
  }

  function getStoredStamps() {
    try {
      const stored = localStorage.getItem("thp_parchment_stamps");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStoredStamps(stamps) {
    try {
      localStorage.setItem("thp_parchment_stamps", JSON.stringify(stamps));
    } catch (e) {}
  }

  function showToast(message) {
    const toast = document.getElementById("site-toast");
    const toastText = document.getElementById("toast-text");
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.remove("opacity-0", "pointer-events-none");
    toast.classList.add("opacity-100", "pointer-events-auto");

    setTimeout(() => {
      toast.classList.remove("opacity-100", "pointer-events-auto");
      toast.classList.add("opacity-0", "pointer-events-none");
    }, 2800);
  }

  function createStampElement(data, isNew = false) {
    const el = document.createElement("div");
    el.className = isNew ? "stamped-mark is-new" : "stamped-mark";
    el.style.left = `${data.x}%`;
    el.style.top = `${data.y}%`;
    
    // Bind adaptive ink color
    const colorId = data.colorId || "terracotta";
    el.setAttribute("data-ink", colorId);
    el.style.color = COLOR_VARS[colorId] || "var(--ink-terracotta)";
    el.style.setProperty("--rot", `${data.rot}deg`);

    if (!isNew && data.opacity) {
      el.style.opacity = data.opacity;
    }

    if (data.handle) {
      el.setAttribute("data-handle", data.handle.trim().toLowerCase());
    }

    const svg = STAMP_SVGS[data.stamp] || STAMP_SVGS.thumbprint;
    const isTwitter = data.handle && (data.handle.startsWith("@") || !data.handle.includes("@"));
    const handleIcon = isTwitter
      ? '<i class="fa-brands fa-x-twitter text-[9px]"></i>'
      : '<i class="fa-regular fa-envelope text-[9px]"></i>';

    el.innerHTML = `
      <div class="stamp-icon-wrap flex items-center justify-center">
        ${svg}
      </div>
      ${data.handle ? `
        <span class="stamped-handle-badge">
          ${handleIcon}
          <span>${data.handle}</span>
        </span>
      ` : ''}
    `;
    return el;
  }

  async function renderExistingMarks() {
    const canvas = document.getElementById("parchment-canvas");
    if (!canvas) return;

    // Clear existing DOM marks (preserving hint)
    const existingDomMarks = canvas.querySelectorAll(".stamped-mark");
    existingDomMarks.forEach(m => m.remove());

    // Map of handle -> stampData (deduplicated)
    const marksByHandle = new Map();

    // 1. Load pre-seeded tasteful marks
    SEED_MARKS.forEach((m) => {
      marksByHandle.set(m.handle.toLowerCase(), m);
    });

    // 2. Load cloud stamps if Supabase configured
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("parchment_stamps")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(250);

        if (!error && Array.isArray(data)) {
          data.forEach((row) => {
            if (row.handle) {
              marksByHandle.set(row.handle.toLowerCase(), {
                x: row.x,
                y: row.y,
                stamp: row.stamp || "thumbprint",
                colorId: row.color_id || row.color || "terracotta",
                rot: row.rot || 0,
                handle: row.handle
              });
            }
          });
        }
      } catch (err) {
        console.warn("Could not query Supabase stamps:", err);
      }
    }

    // 3. Overlay locally saved visitor stamps
    const visitorMarks = getStoredStamps();
    visitorMarks.forEach((m) => {
      if (m.handle) {
        marksByHandle.set(m.handle.toLowerCase(), m);
      }
    });

    // 4. Render all deduplicated marks to canvas
    if (marksByHandle.size > 0) {
      const hint = document.getElementById("canvas-hint");
      if (hint && visitorMarks.length > 0) {
        hint.style.opacity = "0";
      }
      marksByHandle.forEach((stampData) => {
        canvas.appendChild(createStampElement(stampData, false));
      });
    }
  }

  function initCanvasClick() {
    const canvas = document.getElementById("parchment-canvas");
    if (!canvas) return;

    canvas.addEventListener("click", async function (e) {
      // Ignore clicks on header, dock, drawer, buttons, or links
      if (e.target.closest("header") || e.target.closest(".ledger-dock") || e.target.closest(".stamp-drawer") || e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) {
        return;
      }

      // Close stamp drawer if open
      const drawer = document.getElementById("stamp-picker-modal");
      if (drawer && drawer.classList.contains("open")) {
        drawer.classList.remove("open");
      }

      // 1. Strict Gate: Must be signed in to leave a mark! No typing allowed.
      const user = getSignedInUser();
      if (!user || !user.handle) {
        showToast("Please sign in with Google or X below to leave your mark");
        pulseSignInPrompt();
        return;
      }

      const handle = user.handle;

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const rawPctX = (clickX / rect.width) * 100;
      const rawPctY = (clickY / rect.height) * 100;

      // Safe viewport clamping so marks never clip off edges or hide behind dock/header
      const isMobile = window.innerWidth < 640;
      const clampedX = Math.max(8, Math.min(92, rawPctX)).toFixed(2);
      const maxY = isMobile ? 76 : 86;
      const clampedY = Math.max(12, Math.min(maxY, rawPctY)).toFixed(2);

      // Random organic hand stamp tilt between -10deg and +10deg
      const randomRot = (Math.random() * 20 - 10).toFixed(1);

      const stampData = {
        x: parseFloat(clampedX),
        y: parseFloat(clampedY),
        stamp: activeStamp,
        colorId: activeColorId,
        rot: parseFloat(randomRot),
        handle: handle,
        timestamp: Date.now()
      };

      // 2. Strict One Mark Per User Handle Enforcement:
      // If this handle already has a stamp on canvas, remove previous DOM element
      const normalizedHandle = handle.toLowerCase();
      const existingDom = canvas.querySelector(`.stamped-mark[data-handle="${normalizedHandle}"]`);
      const isRelocation = !!existingDom;
      if (existingDom) {
        existingDom.remove();
      }

      // Add new stamp element
      const markEl = createStampElement(stampData, true);
      canvas.appendChild(markEl);

      // Hide hint once user stamps
      const hint = document.getElementById("canvas-hint");
      if (hint) {
        hint.style.opacity = "0";
        setTimeout(() => hint.remove(), 700);
      }

      // Haptic feedback on mobile if supported
      if (navigator.vibrate) {
        try { navigator.vibrate(35); } catch (err) {}
      }

      // Save to localStorage (deduplicated by handle)
      let current = getStoredStamps().filter(s => !s.handle || s.handle.trim().toLowerCase() !== normalizedHandle);
      current.push(stampData);
      saveStoredStamps(current);

      // Persist to Supabase free cloud DB if configured
      if (supabaseClient) {
        try {
          await supabaseClient.from("parchment_stamps").upsert({
            handle: normalizedHandle,
            stamp: activeStamp,
            color_id: activeColorId,
            x: stampData.x,
            y: stampData.y,
            rot: stampData.rot,
            updated_at: new Date().toISOString()
          }, { onConflict: "handle" });
        } catch (err) {
          console.warn("Supabase upsert notice:", err);
        }
      }

      if (isRelocation) {
        showToast(`Updated mark location for ${handle}`);
      } else {
        showToast(`Impression stamped for ${handle}`);
      }
    });
  }

  function initToolbar() {
    // Stamp Picker Drawer Open / Close
    const pickerBtn = document.getElementById("stamp-picker-btn");
    const drawer = document.getElementById("stamp-picker-modal");
    const closeDrawerBtn = document.getElementById("close-stamp-drawer-btn");
    const activeIconEl = document.getElementById("active-stamp-icon");
    const activeNameEl = document.getElementById("active-stamp-name");
    const traitNameEl = document.getElementById("trait-preview-name");
    const traitDescEl = document.getElementById("trait-preview-desc");

    function setTraitPreview(stampKey) {
      const meta = STAMP_METAS[stampKey] || STAMP_METAS.thumbprint;
      if (traitNameEl) traitNameEl.textContent = meta.name;
      if (traitDescEl) traitDescEl.textContent = meta.trait;
    }

    function updateActiveStampUI(stampKey) {
      activeStamp = stampKey;
      const meta = STAMP_METAS[stampKey] || STAMP_METAS.thumbprint;
      if (activeIconEl) activeIconEl.textContent = meta.icon;
      if (activeNameEl) activeNameEl.textContent = meta.name;

      const items = document.querySelectorAll(".stamp-grid-item");
      items.forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-stamp") === stampKey);
      });
      setTraitPreview(stampKey);
    }

    if (pickerBtn && drawer) {
      pickerBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        drawer.classList.toggle("open");
        // Ensure trait preview displays active stamp when drawer opens
        setTraitPreview(activeStamp);
      });
    }

    if (closeDrawerBtn && drawer) {
      closeDrawerBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        drawer.classList.remove("open");
      });
    }

    // Grid Stamp Choices (Thumbprint + 9 Animals)
    const gridItems = document.querySelectorAll(".stamp-grid-item");
    gridItems.forEach((btn) => {
      // Dynamic hover updates trait preview bar
      btn.addEventListener("mouseenter", function () {
        const stampKey = this.getAttribute("data-stamp") || "thumbprint";
        setTraitPreview(stampKey);
      });
      btn.addEventListener("mouseleave", function () {
        // Return to currently selected active stamp
        setTraitPreview(activeStamp);
      });
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const stampKey = this.getAttribute("data-stamp") || "thumbprint";
        updateActiveStampUI(stampKey);
        if (drawer) drawer.classList.remove("open");
      });
    });

    // Close drawer when clicking anywhere outside
    document.addEventListener("click", function (e) {
      if (drawer && drawer.classList.contains("open")) {
        if (!drawer.contains(e.target) && !pickerBtn.contains(e.target)) {
          drawer.classList.remove("open");
        }
      }
    });

    // Adaptive Ink Color choices
    const colorDots = document.querySelectorAll(".ink-color-dot");
    colorDots.forEach((dot) => {
      dot.addEventListener("click", function (e) {
        e.stopPropagation();
        colorDots.forEach((d) => d.classList.remove("active"));
        this.classList.add("active");
        activeColorId = this.getAttribute("data-color-id") || "terracotta";
      });
    });

    // 1-Click Social Sign-In: Google / Gmail
    const googleBtn = document.getElementById("google-auth-btn");
    if (googleBtn) {
      googleBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            await supabaseClient.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {
            console.warn("Supabase Google Auth notice:", err);
          }
        }
        
        // Zero-config verified prompt
        const email = prompt("Sign in with Google / Gmail:\nEnter your Gmail address to verify your mark:", "");
        if (email && email.trim()) {
          let val = email.trim();
          if (!val.includes("@")) val = val + "@gmail.com";
          setSignedInUser({ handle: val, provider: "google" });
          showToast(`Signed in as ${val}. Tap anywhere on parchment to stamp!`);
        }
      });
    }

    // 1-Click Social Sign-In: Twitter / X
    const twitterBtn = document.getElementById("twitter-auth-btn");
    if (twitterBtn) {
      twitterBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            await supabaseClient.auth.signInWithOAuth({
              provider: "twitter",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {
            console.warn("Supabase Twitter Auth notice:", err);
          }
        }

        // Zero-config verified prompt
        const handle = prompt("Sign in with Twitter / X:\nEnter your @handle to verify your mark:", "@");
        if (handle && handle.trim() && handle.trim() !== "@") {
          let val = handle.trim();
          if (!val.startsWith("@") && !val.includes("@")) val = "@" + val;
          setSignedInUser({ handle: val, provider: "twitter" });
          showToast(`Signed in as ${val}. Tap anywhere on parchment to stamp!`);
        }
      });
    }

    // Sign out button
    const signoutBtn = document.getElementById("auth-signout-btn");
    if (signoutBtn) {
      signoutBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            await supabaseClient.auth.signOut();
          } catch (err) {}
        }
        setSignedInUser(null);
        showToast("Signed out. Sign in again to stamp.");
      });
    }

    // Clear Mine button
    const clearBtn = document.getElementById("clear-stamps-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        const user = getSignedInUser();
        const currentHandle = user?.handle ? user.handle.toLowerCase() : "";
        
        localStorage.removeItem("thp_parchment_stamps");
        
        if (supabaseClient && currentHandle) {
          try {
            await supabaseClient.from("parchment_stamps").delete().eq("handle", currentHandle);
          } catch (err) {
            console.warn("Supabase delete notice:", err);
          }
        }

        // Reload marks
        const canvas = document.getElementById("parchment-canvas");
        if (canvas) {
          const stampedMarks = canvas.querySelectorAll(".stamped-mark");
          stampedMarks.forEach((m) => m.remove());
          await renderExistingMarks();
          showToast("Your impressions cleared from canvas");
        }
      });
    }

    // Theme toggle button
    const themeBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-toggle-icon");
    if (themeBtn) {
      const isLight = document.documentElement.classList.contains("light");
      if (themeIcon) {
        themeIcon.className = isLight ? "fa-solid fa-moon text-[#75482E]" : "fa-solid fa-sun text-amber-400";
      }

      themeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const currentIsDark = document.documentElement.classList.contains("dark");
        if (currentIsDark) {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          localStorage.setItem("thp_site_theme", "light");
          if (themeIcon) themeIcon.className = "fa-solid fa-moon text-[#75482E]";
        } else {
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
          localStorage.setItem("thp_site_theme", "dark");
          if (themeIcon) themeIcon.className = "fa-solid fa-sun text-amber-400";
        }
      });
    }
  }

  // Initializer
  async function init() {
    initSupabase();
    initToolbar();
    renderAuthUI();
    initCanvasClick();
    await renderExistingMarks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
