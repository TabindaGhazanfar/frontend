import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom for navigation
import {
  UserPlus,
  Mail,
  Lock,
  ArrowRight,
  Camera,
  FileText,
  Smartphone,
  CheckCircle,
  Circle,
} from "lucide-react";
import { motion } from "framer-motion";

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
    role: "", // new field for dropdown
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [aiVerified, setAiVerified] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSendOtp = () => {
    if (!formData.phone) return alert("Please enter your phone number first!");
    setOtpSent(true);
    alert(`OTP sent to +92${formData.phone}`);
  };

  const handleVerifyOtp = () => {
    if (formData.otp === "1234") {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify your OTP first!");
    if (!agreePrivacy || !agreeTerms)
      return alert("Please agree to the privacy policy and terms.");
    if (!formData.role) return alert("Please select a role!");
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match!");
    setAiVerified(true);

    alert(`User Registered: ${formData.username} as ${formData.role}`);

    // Redirect to role-specific dashboard
    if (formData.role === "owner") {
      navigate("/owner/dashboard");
    } else {
      navigate("/renter/dashboard");
    }
  };

  const progress = otpVerified && aiVerified ? 100 : otpVerified ? 50 : 0;
  const progressLabel =
    progress === 0
      ? "Step 1 of 2"
      : progress === 50
      ? "Step 2 of 2"
      : "All Steps Completed ✅";

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row bg-white text-black">
      {/* LEFT SIDE — FORM */}
      <div className="flex-1 flex flex-col justify-center p-10 md:p-16">
        <h2 className="text-4xl font-bold text-[#299F93] mb-8 text-center flex items-center justify-center gap-2">
          <UserPlus size={28} /> Register on{" "}
          <span className="text-[#C47C5E]">EasyRent</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-md mx-auto"
        >
          {/* Basic Info */}
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 border px-3 py-3 rounded-md outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 border px-3 py-3 rounded-md outline-none"
              required
            />
          </div>

          {/* Role Selection Dropdown */}
          <div className="mt-3">
            <label className="block mb-2 font-semibold text-gray-700">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-3 outline-none"
              required
            >
              <option value="">-- Select Your Role --</option>
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>
          </div>

          {/* Pakistani Phone */}
          <div className="flex items-center border rounded-md px-3 py-3">
            <Smartphone size={20} className="text-gray-500 mr-2" />
            <span className="text-gray-700 font-semibold mr-1">+92</span>
            <input
              type="tel"
              name="phone"
              placeholder="3XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full outline-none"
              required
            />
          </div>

          {/* OTP Buttons */}
          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-[#299F93] text-white py-2 rounded-md"
            >
              Send OTP
            </button>
          ) : (
            <div className="flex gap-3 items-center">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="border px-3 py-3 rounded-md flex-1 outline-none"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="bg-[#299F93] text-white py-3 px-4 rounded-md"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Other Fields */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border px-3 py-3 rounded-md outline-none"
            required
          />
          <div className="flex items-center border rounded-md px-3 py-3">
            <Mail size={20} className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-md px-3 py-3">
            <Lock size={20} className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-md px-3 py-3">
            <Lock size={20} className="text-gray-500 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* AI Verification */}
          <div className="border rounded-md p-4">
            <label className="font-semibold mb-2 block">
              AI Photo Verification
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded-md w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <Camera size={20} className="text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded-md w-full"
                />
              </div>
              <p className="text-xs text-gray-500">
                Upload your CNIC photo and a live selfie for AI-based
                verification.
              </p>
            </div>
          </div>

          {/* Privacy */}
          <div className="text-sm text-gray-700 flex flex-col gap-3 mt-2">
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={() => setAgreePrivacy(!agreePrivacy)}
              />
              <span>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a href="#" className="text-[#C47C5E] font-medium">
                  privacy policy
                </a>
                .
              </span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              I agree to the{" "}
              <a href="#" className="text-[#C47C5E]">
                terms & conditions
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            className="mt-3 bg-[#299F93] hover:bg-[#227c70] text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition"
          >
            <ArrowRight size={18} /> Register
          </button>
        </form>
      </div>

      {/* RIGHT SIDE — Animated Guide with Progress */}
      <div className="hidden md:flex flex-1 flex-col justify-start p-10 bg-gradient-to-br from-[#e6f7f5] to-[#ffffff] rounded-xl shadow-lg">
        <div className="max-w-md mx-auto mt-40 space-y-8">
          <h3 className="text-2xl font-bold text-[#299F93] mb-4 text-center">
            2-Step Verification Guide
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[#299F93]">{progressLabel}</p>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                animate={{
                  width: `${progress}%`,
                  backgroundColor: progress === 100 ? "#2ecc71" : "#299F93",
                }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          <div className="relative flex flex-col space-y-10">
            <motion.div
              animate={{ scale: otpVerified ? 1 : 1.05, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`relative flex items-start gap-4 p-5 rounded-xl shadow-md border-l-4 ${
                otpVerified
                  ? "border-[#2ecc71] bg-[#d4f8e8]"
                  : "border-[#299F93] bg-white"
              }`}
            >
              {otpVerified ? (
                <CheckCircle className="text-[#2ecc71]" size={24} />
              ) : (
                <Circle className="text-[#299F93]" size={24} />
              )}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  Step 1: OTP Verification
                </h4>
                <p className="text-sm text-gray-600">
                  Enter your Phone number and verify via 4-digit code sent
                  through SMS.
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{
                scale: otpVerified ? [1, 1.05, 1] : 1,
                opacity: otpVerified ? 1 : 0.5,
              }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-start gap-4 p-5 rounded-xl shadow-md border-l-4 ${
                aiVerified
                  ? "border-[#C47C5E] bg-[#fdecea]"
                  : otpVerified
                  ? "border-[#C47C5E] bg-white"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <Camera
                size={24}
                className={aiVerified ? "text-[#C47C5E]" : "text-gray-400"}
              />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  Step 2: AI Photo Verification
                </h4>
                <p className="text-sm text-gray-600">
                  Upload your CNIC photo and a live selfie. Our AI will match
                  both to confirm your identity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
