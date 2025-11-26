import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  ArrowRight,
  Camera,
  Smartphone,
  CheckCircle,
  Circle,
} from "lucide-react";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    otp: "",
    role: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [aiVerified, setAiVerified] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // SAFER RECAPTCHA SETUP: clear previous verifier and render fresh
  const setupRecaptcha = () => {
    try {
      if (window.recaptchaVerifier) {
        // attempt to clear previous widget if present
        if (typeof window.recaptchaVerifier.clear === "function") {
          try {
            window.recaptchaVerifier.clear();
          } catch (err) {
            console.warn("recaptcha clear failed:", err);
          }
        }
        window.recaptchaVerifier = null;
      }
    } catch (e) {
      console.warn("Error clearing recaptcha verifier:", e);
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (token) => {
          // optional: reCAPTCHA solved -> token available
          console.log("reCAPTCHA solved, token:", token);
        },
        "expired-callback": () => {
          console.warn("reCAPTCHA expired - user must solve again");
        },
      },
      auth
    );

    // render explicitly and keep widget id
    window.recaptchaVerifier
      .render()
      .then((widgetId) => (window.recaptchaWidgetId = widgetId))
      .catch((err) => console.warn("recaptcha render error:", err));
  };

  const handleSendOtp = async () => {
    if (!formData.phone) return alert("Please enter phone number!");

    try {
      setupRecaptcha();

      // ensure phone is E.164 without duplicated country code
      const phoneNumber = `+92${formData.phone.replace(/^\+|^0+/, "")}`;
      const appVerifier = window.recaptchaVerifier;

      console.log("Attempting signInWithPhoneNumber for:", phoneNumber);

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      window.confirmationResult = confirmation;
      setOtpSent(true);
      alert("OTP sent successfully! (If using test number, use the test code)");
    } catch (error) {
      console.error("sendOtp error:", error);
      alert("SMS Error: " + (error.code || error.message));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await window.confirmationResult.confirm(formData.otp);
      setOtpVerified(true);
      alert("OTP Verified Successfully!");
    } catch (err) {
      console.error("verifyOtp error:", err);
      alert("Invalid OTP. Try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpVerified) return alert("Please verify OTP first!");
    if (!agreePrivacy || !agreeTerms) return alert("Please accept privacy policy & terms.");
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");

    setAiVerified(true);
    alert(`User Registered: ${formData.username}`);

    if (formData.role === "owner") navigate("/owner/dashboard");
    else navigate("/renter/dashboard");
  };

  const progress = otpVerified && aiVerified ? 100 : otpVerified ? 50 : 0;
  const progressLabel =
    progress === 0 ? "Step 1 of 2" : progress === 50 ? "Step 2 of 2" : "All Steps Completed ✅";

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row bg-white text-black">
      <div className="flex-1 flex flex-col justify-center p-10 md:p-16">
        <h2 className="text-4xl font-bold text-[#299F93] mb-8 text-center flex items-center justify-center gap-2">
          <UserPlus size={28} /> Register on <span className="text-[#C47C5E]">EasyRent</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md mx-auto">
          <div className="flex gap-3">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-1/2 border px-3 py-3 rounded-md outline-none" required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-1/2 border px-3 py-3 rounded-md outline-none" required />
          </div>

          <div className="mt-3">
            <label className="block mb-2 font-semibold text-gray-700">Select Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded-md px-3 py-3 outline-none" required>
              <option value="">-- Select Your Role --</option>
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>
          </div>

          <div className="flex items-center border rounded-md px-3 py-3">
            <Smartphone size={20} className="text-gray-500 mr-2" />
            <span className="text-gray-700 font-semibold mr-1">+92</span>
            <input type="tel" name="phone" placeholder="3XXXXXXXXX" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" className="w-full outline-none" required />
          </div>

          <div id="recaptcha-container"></div>

          {!otpSent ? (
            <button type="button" onClick={handleSendOtp} className="bg-[#299F93] text-white py-2 rounded-md">Send OTP</button>
          ) : (
            <div className="flex gap-3 items-center">
              <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className="border px-3 py-3 rounded-md flex-1 outline-none" />
              <button type="button" onClick={handleVerifyOtp} className="bg-[#299F93] text-white py-3 px-4 rounded-md">Verify OTP</button>
            </div>
          )}

          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="border px-3 py-3 rounded-md outline-none" required />

          <div className="flex items-center border rounded-md px-3 py-3">
            <Mail size={20} className="text-gray-500 mr-2" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full outline-none" required />
          </div>

          <div className="flex items-center border rounded-md px-3 py-3">
            <Lock size={20} className="text-gray-500 mr-2" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full outline-none" required />
          </div>

          <div className="flex items-center border rounded-md px-3 py-3">
            <Lock size={20} className="text-gray-500 mr-2" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full outline-none" required />
          </div>

          <div className="text-sm text-gray-700 flex flex-col gap-3 mt-2">
            <label className="flex gap-2">
              <input type="checkbox" checked={agreePrivacy} onChange={() => setAgreePrivacy(!agreePrivacy)} />
              <span>Your personal data will be used as per our <a className="text-[#C47C5E]">privacy policy</a>.</span>
            </label>

            <label className="flex gap-2">
              <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />
              I agree to the <a className="text-[#C47C5E]">terms & conditions</a>.
            </label>
          </div>

          <button type="submit" className="mt-3 bg-[#299F93] hover:bg-[#227c70] text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition">
            <ArrowRight size={18} /> Register
          </button>
        </form>
      </div>

      <div className="hidden md:flex flex-1 flex-col justify-start p-10 bg-gradient-to-br from-[#e6f7f5] to-[#ffffff] rounded-xl shadow-lg">
        <div className="max-w-md mx-auto mt-40 space-y-8">
          <h3 className="text-2xl font-bold text-[#299F93] mb-4 text-center">2-Step Verification Guide</h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[#299F93]">{progressLabel}</p>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" animate={{ width: `${progress}%`, backgroundColor: progress === 100 ? "#2ecc71" : "#299F93" }} transition={{ duration: 0.6 }} />
            </div>
          </div>

          <div className="relative flex flex-col space-y-10">
            <motion.div animate={{ scale: otpVerified ? 1 : 1.05, opacity: 1 }} transition={{ duration: 0.5 }} className={`relative flex items-start gap-4 p-5 rounded-xl shadow-md border-l-4 ${otpVerified ? "border-[#2ecc71] bg-[#d4f8e8]" : "border-[#299F93] bg-white"}`}>
              {otpVerified ? <CheckCircle className="text-[#2ecc71]" size={24} /> : <Circle className="text-[#299F93]" size={24} />}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Step 1: OTP Verification</h4>
                <p className="text-sm text-gray-600">Enter your phone number and verify with 4-digit SMS OTP.</p>
              </div>
            </motion.div>

            <motion.div animate={{ scale: otpVerified ? [1, 1.05, 1] : 1, opacity: otpVerified ? 1 : 0.5 }} transition={{ duration: 0.6 }} className={`relative flex items-start gap-4 p-5 rounded-xl shadow-md border-l-4 ${aiVerified ? "border-[#C47C5E] bg-[#fdecea]" : otpVerified ? "border-[#C47C5E] bg-white" : "border-gray-200 bg-gray-50"}`}>
              <Camera size={24} className={aiVerified ? "text-[#C47C5E]" : "text-gray-400"} />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Step 2: AI Photo Verification</h4>
                <p className="text-sm text-gray-600">Upload CNIC & Selfie (AI matching will be added later).</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
