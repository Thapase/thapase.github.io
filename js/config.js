/**
 * ============================================================================
 * T.H.H. Thapase — Portfolio Configuration
 * Only the fields actively used by main.js are kept here.
 * ============================================================================
 */

const THAPASE_CONFIG = {
  profile: {
    fullName: "T.H.H. Thapase",
    title: "Assistant Manager (Supply Chain Consultant)",
    company: "Genpact",
    location: "Bangalore, India",
    email: "thapase@gmail.com",
    phone: "+91 9566009174",
    timeZone: "Asia/Kolkata",
    gmatScore: 760,
    gmatPercentile: "Top 1% Worldwide (99th %ile)"
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/t-h-h-thapase-strategy-consultant",
    strava: "https://strava.app.link/czwhREDvY7b",
    medium: "https://medium.com/@thapasethh",
    topmate: "https://topmate.io/thapase_thh",
    twitter: "https://x.com/THHThapase",
    instagram: "https://www.instagram.com/thapase.thh",
    github: "https://github.com/Thapase"
  },

  // Free-tier Cloud Database & Social Auth (Supabase & Google)
  // 100% Free Forever, No Credit Card Required
  supabase: {
    url: "",      // Paste your free Supabase URL (e.g. "https://xxxx.supabase.co")
    anonKey: ""  // Paste your free Supabase anon public key
  },
  googleAuth: {
    clientId: "" // Optional: Google Cloud Console Client ID
  }
};

// Export to window for browser use
if (typeof window !== "undefined") {
  window.THAPASE_CONFIG = THAPASE_CONFIG;
}
