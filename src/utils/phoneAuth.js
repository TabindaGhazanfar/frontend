// src/utils/phoneAuth.js 
// Firebase v9+ Compatible Phone Authentication Helper
// Ensures Recaptcha works correctly and prevents crashes.

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithPhoneNumber,
} from "firebase/auth";

/**
 * Create reCAPTCHA verifier (INVISIBLE by default)
 * CORRECT FIREBASE V9 SIGNATURE:
 * new RecaptchaVerifier(auth, containerId, options)
 */
export function setupRecaptcha(
  auth,
  containerId = "recaptcha-container",
  invisible = true
) {
  if (!auth) throw new Error("Auth instance required");

  // Clear previous instance
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {}
    window.recaptchaVerifier = null;
  }

  const size = invisible ? "invisible" : "normal";

  // ✅ Correct Firebase v9 Syntax
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth, // must be first argument
    containerId,
    {
      size,
    }
  );

  console.log(`[phoneAuth] reCAPTCHA initialized in ${size} mode`);
  return window.recaptchaVerifier;
}

/**
 * Send OTP to phone number
 * Handles both: signInWithPhoneNumber + linkWithPhoneNumber
 */
export async function sendOtpForSignIn(
  auth,
  phoneNumber,
  containerId = "recaptcha-container",
  invisible = true
) {
  if (!auth) throw new Error("Auth required");
  if (!phoneNumber) throw new Error("Phone number required");

  // Ensure Recaptcha exists
  const appVerifier =
    window.recaptchaVerifier || setupRecaptcha(auth, containerId, invisible);

  try {
    if (auth.currentUser) {
      console.log("[phoneAuth] Linking phone →", phoneNumber);
      return await linkWithPhoneNumber(auth.currentUser, phoneNumber, appVerifier);
    }

    console.log("[phoneAuth] Sending OTP →", phoneNumber);
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  } catch (err) {
    console.error("[phoneAuth] sendOtp error:", err);

    // Reset recaptcha on error
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } catch (e) {}

    throw err;
  }
}

/**
 * Verify SMS OTP Code
 */
export async function verifyOtp(confirmationResult, otpCode) {
  if (!confirmationResult) throw new Error("confirmationResult missing");
  if (!otpCode) throw new Error("OTP code missing");

  try {
    const userCredential = await confirmationResult.confirm(otpCode);
    console.log("[phoneAuth] OTP Verified:", userCredential);
    return userCredential;
  } catch (err) {
    console.error("[phoneAuth] verifyOtp error:", err);
    throw err;
  }
}