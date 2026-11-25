# -*- coding: utf-8 -*-
import re

# Update mark.html
with open('mark.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update #auth-signed-out to include Google, Twitter, and Instagram, plus make the "sign in to stamp" badge an interactive button that opens the modal
old_signed_out = """      <!-- State A: Signed Out (Prompts to sign in via Google or X) -->
      <div id="auth-signed-out" class="flex items-center gap-1.5 transition-all">
        <button id="google-auth-btn" type="button" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F1] dark:bg-white/5 border border-[#829078]/40 hover:border-[#75482E] flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm shrink-0" title="Sign in with Google / Gmail">
          <i class="fa-brands fa-google text-[10px] sm:text-[11px] text-red-500"></i>
        </button>

        <button id="twitter-auth-btn" type="button" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F1] dark:bg-white/5 border border-[#829078]/40 hover:border-[#75482E] flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm shrink-0" title="Sign in with Twitter / X">
          <i class="fa-brands fa-x-twitter text-[10px] sm:text-[11px] text-[#233124] dark:text-[#F2EEDC]"></i>
        </button>

        <div class="px-2.5 py-1 rounded-full bg-[#FAF8F1]/80 dark:bg-black/25 border border-[#829078]/35 text-[11px] text-[#75482E] dark:text-[#d89667] flex items-center gap-1">
          <i class="fa-solid fa-lock text-[9px] opacity-70"></i>
          <span>sign in to stamp</span>
        </div>
      </div>"""

new_signed_out = """      <!-- State A: Signed Out (Prompts to sign in via Google, Twitter, or Instagram) -->
      <div id="auth-signed-out" class="flex items-center gap-1 sm:gap-1.5 transition-all">
        <button id="google-auth-btn" type="button" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F1] dark:bg-white/5 border border-[#829078]/40 hover:border-[#EA4335] flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm shrink-0" title="Sign in with Google / Gmail">
          <i class="fa-brands fa-google text-[10px] sm:text-[11px] text-[#EA4335]"></i>
        </button>

        <button id="twitter-auth-btn" type="button" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F1] dark:bg-white/5 border border-[#829078]/40 hover:border-[#233124] dark:hover:border-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm shrink-0" title="Sign in with Twitter / X">
          <i class="fa-brands fa-x-twitter text-[10px] sm:text-[11px] text-[#233124] dark:text-[#F2EEDC]"></i>
        </button>

        <button id="instagram-auth-btn" type="button" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F1] dark:bg-white/5 border border-[#829078]/40 hover:border-[#E1306C] flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm shrink-0" title="Sign in with Instagram">
          <i class="fa-brands fa-instagram text-[10px] sm:text-[11px] text-[#E1306C]"></i>
        </button>

        <button id="auth-open-modal-btn" type="button" class="px-2.5 py-1 rounded-full bg-[#FAF8F1]/90 dark:bg-black/30 border border-[#829078]/35 hover:border-[#75482E] text-[11px] text-[#75482E] dark:text-[#d89667] flex items-center gap-1 cursor-pointer transition-all hover:scale-105" title="Open sign-in options">
          <i class="fa-solid fa-lock text-[9px] opacity-70"></i>
          <span>sign in to stamp</span>
        </button>
      </div>"""

if old_signed_out in html:
    html = html.replace(old_signed_out, new_signed_out)
    print("Updated auth-signed-out in mark.html")
else:
    print("Warning: old_signed_out not matched exactly")

# 2. Add auth-modal right before Toast Notification
modal_html = """  <!-- ========================================================================
       Social Sign-In Modal (Google / Gmail, Twitter / X, Instagram)
       ======================================================================== -->
  <div id="auth-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300">
    <div class="relative w-full max-w-sm rounded-2xl bg-[#FAF8F1] dark:bg-[#152119] border border-[#829078]/40 dark:border-[#a4b39e]/25 shadow-2xl p-5 sm:p-6 transition-transform duration-300 scale-95" id="auth-modal-card">
      
      <!-- Close Button -->
      <button id="close-auth-modal-btn" type="button" class="absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center text-xs text-[#829078] hover:text-[#75482E] dark:hover:text-[#d89667] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" aria-label="Close sign-in modal">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Modal Header -->
      <div class="text-center mb-5">
        <div class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#75482E]/10 dark:bg-[#E28C52]/15 text-[#75482E] dark:text-[#E28C52] text-xl mb-2.5 shadow-inner">
          <i class="fa-solid fa-stamp"></i>
        </div>
        <h3 class="font-serif text-lg sm:text-xl font-medium tracking-tight text-[#233124] dark:text-[#F2EEDC]">Sign In to Leave Your Mark</h3>
        <p class="text-xs font-serif text-[#4C5848] dark:text-[#A4B39E] mt-1 max-w-xs mx-auto leading-relaxed">
          Sign in via Twitter, Gmail, or Instagram to verify your identity and stamp your authentic impression.
        </p>
      </div>

      <!-- Step 1: Provider Selection List -->
      <div id="auth-provider-selector" class="flex flex-col gap-2.5">
        
        <!-- Option A: Google / Gmail -->
        <button type="button" class="auth-provider-choice-btn group flex items-center gap-3 p-3 rounded-xl border border-[#829078]/30 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-[#EA4335]/60 hover:shadow-md transition-all text-left cursor-pointer" data-provider="google">
          <div class="w-9 h-9 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center text-base shadow-sm shrink-0 border border-black/5">
            <i class="fa-brands fa-google text-[#EA4335]"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-medium text-[#233124] dark:text-[#F2EEDC] group-hover:text-[#EA4335] transition-colors">Continue with Google (Gmail)</div>
            <div class="text-[10px] text-[#4C5848] dark:text-[#A4B39E] truncate">Verify via your @gmail.com account</div>
          </div>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#829078] group-hover:translate-x-0.5 transition-transform"></i>
        </button>

        <!-- Option B: Twitter / X -->
        <button type="button" class="auth-provider-choice-btn group flex items-center gap-3 p-3 rounded-xl border border-[#829078]/30 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-[#233124] dark:hover:border-white/40 hover:shadow-md transition-all text-left cursor-pointer" data-provider="twitter">
          <div class="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center text-base shadow-sm shrink-0">
            <i class="fa-brands fa-x-twitter"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-medium text-[#233124] dark:text-[#F2EEDC] group-hover:text-black dark:group-hover:text-white transition-colors">Continue with Twitter (X)</div>
            <div class="text-[10px] text-[#4C5848] dark:text-[#A4B39E] truncate">Verify via your @handle</div>
          </div>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#829078] group-hover:translate-x-0.5 transition-transform"></i>
        </button>

        <!-- Option C: Instagram -->
        <button type="button" class="auth-provider-choice-btn group flex items-center gap-3 p-3 rounded-xl border border-[#829078]/30 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-[#E1306C]/60 hover:shadow-md transition-all text-left cursor-pointer" data-provider="instagram">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center text-base shadow-sm shrink-0">
            <i class="fa-brands fa-instagram"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-medium text-[#233124] dark:text-[#F2EEDC] group-hover:text-[#E1306C] transition-colors">Continue with Instagram</div>
            <div class="text-[10px] text-[#4C5848] dark:text-[#A4B39E] truncate">Verify via your @username</div>
          </div>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#829078] group-hover:translate-x-0.5 transition-transform"></i>
        </button>

      </div>

      <!-- Step 2: Verification Form (slides in when provider clicked) -->
      <div id="auth-verify-step" class="hidden">
        <button id="auth-back-to-providers-btn" type="button" class="text-[11px] text-[#829078] hover:text-[#75482E] dark:hover:text-[#d89667] flex items-center gap-1 mb-3 cursor-pointer">
          <i class="fa-solid fa-arrow-left text-[9px]"></i>
          <span>Choose a different sign-in method</span>
        </button>

        <form id="auth-verify-form" class="flex flex-col gap-3">
          <div class="flex items-center gap-2 p-2 rounded-xl bg-white/50 dark:bg-black/20 border border-[#829078]/25">
            <div id="verify-form-icon" class="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0">
              <i class="fa-brands fa-google text-[#EA4335]"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div id="verify-form-label" class="text-[10px] text-[#829078] font-mono">Sign in with Google Account</div>
              <div id="verify-form-helper" class="text-xs font-mono font-medium text-[#233124] dark:text-[#F2EEDC]">Enter your Gmail address</div>
            </div>
          </div>

          <div class="relative">
            <input id="auth-handle-input" type="text" autocomplete="off" spellcheck="false" required
              class="w-full px-3.5 py-2.5 rounded-xl border border-[#829078]/40 dark:border-white/20 bg-white dark:bg-black/40 text-xs font-mono text-[#233124] dark:text-[#F2EEDC] focus:outline-none focus:ring-2 focus:ring-[#75482E] dark:focus:ring-[#d89667] transition-all"
              placeholder="e.g. yourname@gmail.com" />
          </div>

          <button id="auth-submit-btn" type="submit" class="w-full py-2.5 px-4 rounded-xl bg-[#75482E] dark:bg-[#d89667] text-[#FAF8F1] dark:text-[#121A15] font-serif font-medium text-xs tracking-wide shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <i class="fa-solid fa-check"></i>
            <span id="auth-submit-label">Verify & Sign In</span>
          </button>
        </form>
      </div>

      <div class="mt-4 pt-3 border-t border-[#829078]/20 text-center">
        <p class="text-[10px] text-[#829078] font-mono">
          <i class="fa-solid fa-shield-halved text-[9px] mr-1"></i>
          Strictly one authentic mark per verified user.
        </p>
      </div>

    </div>
  </div>\n\n"""

target_toast = "  <!-- Toast Notification -->"
if target_toast in html:
    html = html.replace(target_toast, modal_html + target_toast)
    print("Added auth-modal in mark.html")
else:
    print("Warning: target_toast not found")

with open('mark.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Saved mark.html successfully")
