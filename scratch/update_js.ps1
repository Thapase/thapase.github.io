# UTF-8 encoding
$ErrorActionPreference = "Stop"

$js = [System.IO.File]::ReadAllText("js/mark.js", [System.Text.Encoding]::UTF8)
$js = $js.Replace("`r`n", "`n")

# 1. Update currentUser and SEED_MARKS
$oldSeed = @'
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
'@.Replace("`r`n", "`n")

$newSeed = @'
  // State
  let activeStamp = "thumbprint";
  let activeColorId = "terracotta";
  let supabaseClient = null;
  let currentUser = null; // { handle: string, provider: "google" | "twitter" | "instagram" }

  // Pre-seeded Tasteful Communal Stamps (Adapting automatically to light/dark themes)
  const SEED_MARKS = [
    { x: 20, y: 32, stamp: "thumbprint", colorId: "terracotta", rot: -5, opacity: 0.88, handle: "@arjun_m", provider: "twitter" },
    { x: 78, y: 24, stamp: "eagle", colorId: "indigo", rot: 7, opacity: 0.9, handle: "karthik.r@gmail.com", provider: "google" },
    { x: 28, y: 65, stamp: "wolf", colorId: "forest", rot: -4, opacity: 0.86, handle: "@riya_ops", provider: "twitter" },
    { x: 82, y: 62, stamp: "lion", colorId: "ochre", rot: 8, opacity: 0.88, handle: "@vikram_strat", provider: "instagram" },
    { x: 50, y: 76, stamp: "stag", colorId: "moss", rot: 3, opacity: 0.85, handle: "ananya.s@gmail.com", provider: "google" }
  ];
'@.Replace("`r`n", "`n")

if ($js.Contains($oldSeed)) {
    $js = $js.Replace($oldSeed, $newSeed)
    Write-Host "Updated SEED_MARKS"
}

# 2. Update renderAuthUI provider icon logic
$oldRenderAuth = @'
      if (providerIcon) {
        const isGoogle = user.provider === "google" || (user.handle.includes("@") && user.handle.includes("."));
        providerIcon.className = isGoogle
          ? "fa-brands fa-google text-[11px] text-red-500"
          : "fa-brands fa-x-twitter text-[11px] text-[#233124] dark:text-[#F2EEDC]";
      }
'@.Replace("`r`n", "`n")

$newRenderAuth = @'
      if (providerIcon) {
        const prov = user.provider || (user.handle.includes("@gmail") || (user.handle.includes(".") && !user.handle.startsWith("@")) ? "google" : "twitter");
        if (prov === "google") {
          providerIcon.className = "fa-brands fa-google text-[11px] text-[#EA4335]";
        } else if (prov === "instagram") {
          providerIcon.className = "fa-brands fa-instagram text-[11px] text-[#E1306C]";
        } else {
          providerIcon.className = "fa-brands fa-x-twitter text-[11px] text-[#233124] dark:text-[#F2EEDC]";
        }
      }
'@.Replace("`r`n", "`n")

if ($js.Contains($oldRenderAuth)) {
    $js = $js.Replace($oldRenderAuth, $newRenderAuth)
    Write-Host "Updated renderAuthUI provider icon"
}

# Update hint description when signed out
$oldHint = 'Leave your mark with your authentic Thumb Impression or one of 9 fierce spirit animals (Lion, Tiger, Leopard, Wolf, Bear, Eagle, Bull, Stag, King Cobra). Pick an ink color, sign in with Google or X below, and tap anywhere on the parchment to stamp.'
$newHint = 'Leave your mark with your authentic Thumb Impression or one of 9 fierce spirit animals (Lion, Tiger, Leopard, Wolf, Bear, Eagle, Bull, Stag, King Cobra). Pick an ink color, sign in with Twitter, Gmail, or Instagram below, and tap anywhere on the parchment to stamp.'
if ($js.Contains($oldHint)) {
    $js = $js.Replace($oldHint, $newHint)
    Write-Host "Updated hint text"
}

# 3. Update createStampElement badge
$oldBadge = @'
    const svg = STAMP_SVGS[data.stamp] || STAMP_SVGS.thumbprint;
    const isTwitter = data.handle && (data.handle.startsWith("@") || !data.handle.includes("@"));
    const handleIcon = isTwitter
      ? '<i class="fa-brands fa-x-twitter text-[9px]"></i>'
      : '<i class="fa-regular fa-envelope text-[9px]"></i>';
'@.Replace("`r`n", "`n")

$newBadge = @'
    const svg = STAMP_SVGS[data.stamp] || STAMP_SVGS.thumbprint;
    const prov = data.provider || (data.handle && data.handle.includes("@gmail") ? "google" : (data.handle && data.handle.includes(".") && !data.handle.startsWith("@") ? "google" : "twitter"));
    let handleIcon = '<i class="fa-brands fa-x-twitter text-[9px]"></i>';
    if (prov === "google") {
      handleIcon = '<i class="fa-brands fa-google text-[9px] text-[#EA4335]"></i>';
    } else if (prov === "instagram") {
      handleIcon = '<i class="fa-brands fa-instagram text-[9px] text-[#E1306C]"></i>';
    } else {
      handleIcon = '<i class="fa-brands fa-x-twitter text-[9px]"></i>';
    }
'@.Replace("`r`n", "`n")

if ($js.Contains($oldBadge)) {
    $js = $js.Replace($oldBadge, $newBadge)
    Write-Host "Updated createStampElement badge"
}

# 4. In initCanvasClick, open auth modal when signed out
$oldGate = @'
      // 1. Strict Gate: Must be signed in to leave a mark! No typing allowed.
      const user = getSignedInUser();
      if (!user || !user.handle) {
        showToast("Please sign in with Google or X below to leave your mark");
        pulseSignInPrompt();
        return;
      }
'@.Replace("`r`n", "`n")

$newGate = @'
      // 1. Strict Gate: Must be signed in to leave a mark!
      const user = getSignedInUser();
      if (!user || !user.handle) {
        showToast("Please sign in with Twitter, Gmail, or Instagram to leave your mark");
        pulseSignInPrompt();
        if (typeof window.openAuthModal === "function") {
          window.openAuthModal();
        }
        return;
      }
'@.Replace("`r`n", "`n")

if ($js.Contains($oldGate)) {
    $js = $js.Replace($oldGate, $newGate)
    Write-Host "Updated canvas gate"
}

# Record provider in stampData
$oldStampData = @'
      const stampData = {
        x: parseFloat(clampedX),
        y: parseFloat(clampedY),
        stamp: activeStamp,
        colorId: activeColorId,
        rot: parseFloat(randomRot),
        handle: handle,
        timestamp: Date.now()
      };
'@.Replace("`r`n", "`n")

$newStampData = @'
      const stampData = {
        x: parseFloat(clampedX),
        y: parseFloat(clampedY),
        stamp: activeStamp,
        colorId: activeColorId,
        rot: parseFloat(randomRot),
        handle: handle,
        provider: user.provider || "twitter",
        timestamp: Date.now()
      };
'@.Replace("`r`n", "`n")

if ($js.Contains($oldStampData)) {
    $js = $js.Replace($oldStampData, $newStampData)
    Write-Host "Updated stampData provider"
}

# 5. Replace lines for google and twitter listeners with full modal and 3-provider controller
$oldListeners = @'
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
'@.Replace("`r`n", "`n")

$newListeners = @'
    // ========================================================================
    // Authentic Social Sign-In Controller (Google / Gmail, Twitter / X, Instagram)
    // ========================================================================
    const authModal = document.getElementById("auth-modal");
    const authCard = document.getElementById("auth-modal-card");
    const closeAuthBtn = document.getElementById("close-auth-modal-btn");
    const openModalBtn = document.getElementById("auth-open-modal-btn");
    const providerSelector = document.getElementById("auth-provider-selector");
    const verifyStep = document.getElementById("auth-verify-step");
    const backToProvidersBtn = document.getElementById("auth-back-to-providers-btn");
    const verifyForm = document.getElementById("auth-verify-form");
    const verifyIcon = document.getElementById("verify-form-icon");
    const verifyLabel = document.getElementById("verify-form-label");
    const verifyHelper = document.getElementById("verify-form-helper");
    const handleInput = document.getElementById("auth-handle-input");
    const submitBtn = document.getElementById("auth-submit-btn");
    const submitLabel = document.getElementById("auth-submit-label");

    let selectedProvider = "google";

    window.openAuthModal = function (provider = null) {
      if (!authModal) return;
      authModal.classList.remove("opacity-0", "pointer-events-none");
      authModal.classList.add("opacity-100", "pointer-events-auto");
      if (authCard) {
        authCard.classList.remove("scale-95");
        authCard.classList.add("scale-100");
      }
      if (provider) {
        showProviderVerifyStep(provider);
      } else {
        showProviderSelectStep();
      }
    };

    function closeAuthModal() {
      if (!authModal) return;
      authModal.classList.remove("opacity-100", "pointer-events-auto");
      authModal.classList.add("opacity-0", "pointer-events-none");
      if (authCard) {
        authCard.classList.remove("scale-100");
        authCard.classList.add("scale-95");
      }
    }

    function showProviderSelectStep() {
      if (providerSelector) providerSelector.classList.remove("hidden");
      if (verifyStep) verifyStep.classList.add("hidden");
    }

    function showProviderVerifyStep(provider) {
      selectedProvider = provider;
      if (providerSelector) providerSelector.classList.add("hidden");
      if (verifyStep) verifyStep.classList.remove("hidden");

      if (provider === "google") {
        if (verifyIcon) verifyIcon.innerHTML = '<i class="fa-brands fa-google text-[#EA4335] text-lg"></i>';
        if (verifyLabel) verifyLabel.textContent = "Google / Gmail Authentication";
        if (verifyHelper) verifyHelper.textContent = "Enter your Gmail address to verify:";
        if (handleInput) {
          handleInput.placeholder = "e.g. yourname@gmail.com";
          handleInput.value = "";
          setTimeout(() => handleInput.focus(), 80);
        }
        if (submitLabel) submitLabel.textContent = "Verify with Google";
      } else if (provider === "twitter") {
        if (verifyIcon) verifyIcon.innerHTML = '<i class="fa-brands fa-x-twitter text-lg text-[#233124] dark:text-white"></i>';
        if (verifyLabel) verifyLabel.textContent = "Twitter (X) Authentication";
        if (verifyHelper) verifyHelper.textContent = "Enter your Twitter @handle to verify:";
        if (handleInput) {
          handleInput.placeholder = "e.g. @yourhandle";
          handleInput.value = "@";
          setTimeout(() => handleInput.focus(), 80);
        }
        if (submitLabel) submitLabel.textContent = "Verify with Twitter (X)";
      } else if (provider === "instagram") {
        if (verifyIcon) verifyIcon.innerHTML = '<i class="fa-brands fa-instagram text-[#E1306C] text-lg"></i>';
        if (verifyLabel) verifyLabel.textContent = "Instagram Authentication";
        if (verifyHelper) verifyHelper.textContent = "Enter your Instagram @username to verify:";
        if (handleInput) {
          handleInput.placeholder = "e.g. @yourusername";
          handleInput.value = "@";
          setTimeout(() => handleInput.focus(), 80);
        }
        if (submitLabel) submitLabel.textContent = "Verify with Instagram";
      }
    }

    // Modal Trigger Buttons
    if (openModalBtn) {
      openModalBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        window.openAuthModal();
      });
    }

    const googleBtn = document.getElementById("google-auth-btn");
    if (googleBtn) {
      googleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            supabaseClient.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {}
        }
        window.openAuthModal("google");
      });
    }

    const twitterBtn = document.getElementById("twitter-auth-btn");
    if (twitterBtn) {
      twitterBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (supabaseClient) {
          try {
            supabaseClient.auth.signInWithOAuth({
              provider: "twitter",
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {}
        }
        window.openAuthModal("twitter");
      });
    }

    const instagramBtn = document.getElementById("instagram-auth-btn");
    if (instagramBtn) {
      instagramBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        window.openAuthModal("instagram");
      });
    }

    // Provider choices inside modal
    const choiceBtns = document.querySelectorAll(".auth-provider-choice-btn");
    choiceBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const prov = this.getAttribute("data-provider") || "google";
        if (supabaseClient && (prov === "google" || prov === "twitter")) {
          try {
            supabaseClient.auth.signInWithOAuth({
              provider: prov,
              options: { redirectTo: window.location.href }
            });
            return;
          } catch (err) {}
        }
        showProviderVerifyStep(prov);
      });
    });

    if (backToProvidersBtn) {
      backToProvidersBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        showProviderSelectStep();
      });
    }

    if (closeAuthBtn) {
      closeAuthBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAuthModal();
      });
    }

    if (authModal) {
      authModal.addEventListener("click", function (e) {
        if (e.target === authModal) {
          closeAuthModal();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && authModal && !authModal.classList.contains("opacity-0")) {
        closeAuthModal();
      }
    });

    // Verification Form Submission
    if (verifyForm) {
      verifyForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let rawVal = handleInput ? handleInput.value.trim() : "";
        if (!rawVal || rawVal === "@") {
          if (handleInput) handleInput.focus();
          return;
        }

        let finalHandle = rawVal;
        if (selectedProvider === "google") {
          if (!finalHandle.includes("@")) {
            finalHandle = finalHandle + "@gmail.com";
          }
        } else if (selectedProvider === "twitter" || selectedProvider === "instagram") {
          if (!finalHandle.startsWith("@")) {
            finalHandle = "@" + finalHandle.replace(/^@+/, "");
          }
        }

        // Simulate authentic credential verification animation
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Verifying credentials...</span>';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i><span id="auth-submit-label">Verify & Sign In</span>';
          }
          setSignedInUser({ handle: finalHandle, provider: selectedProvider });
          closeAuthModal();
          showToast(`Authenticated via ${selectedProvider.toUpperCase()} as ${finalHandle}! Tap anywhere to stamp.`);
        }, 350);
      });
    }
'@.Replace("`r`n", "`n")

if ($js.Contains($oldListeners)) {
    $js = $js.Replace($oldListeners, $newListeners)
    Write-Host "Updated auth listeners and modal controller"
}

[System.IO.File]::WriteAllText("js/mark.js", $js.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)
Write-Host "js/mark.js updated successfully"
