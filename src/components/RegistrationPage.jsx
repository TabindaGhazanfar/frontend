// src/pages/RegistrationPage.jsx
import React, { useState } from "react";
import { auth, storage, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import imageCompression from "browser-image-compression";

/**
 * Upload helper using uploadBytesResumable with progress and retries.
 * setProgress callback (0-100) is optional and used to update UI.
 */
const uploadImageResumable = async (uid, file, fileName, setProgress) => {
  if (!file) return null;

  // Client-side compression options (you can tune)
  const options = {
    maxSizeMB: 0.6, // compress to ~600KB max
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.8,
  };

  // Compress the image (safe for photos)
  let uploadFile = file;
  try {
    const compressedFile = await imageCompression(file, options);
    // browser-image-compression sometimes returns same file if already small
    uploadFile = compressedFile.size < file.size ? compressedFile : file;
    console.log("Original size:", file.size, "Compressed size:", uploadFile.size);
  } catch (err) {
    console.warn("Image compression failed — proceeding with original file", err);
    uploadFile = file;
  }

  const filePath = `users/${uid}/${fileName}`;
  const storageRef = ref(storage, filePath);

  // This function performs one upload attempt and resolves download URL on success
  const performUploadAttempt = () =>
    new Promise((resolve, reject) => {
      const task = uploadBytesResumable(storageRef, uploadFile);

      task.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (setProgress) setProgress(percent);
          console.log(`Upload ${fileName} progress: ${percent}%`);
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            if (setProgress) setProgress(100);
            resolve(url);
          } catch (err) {
            reject(err);
          }
        }
      );
    });

  // Simple retry with exponential backoff
  const maxAttempts = 3;
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      const downloadUrl = await performUploadAttempt();
      return downloadUrl;
    } catch (err) {
      attempt++;
      console.warn(`Upload attempt ${attempt} failed for ${fileName}`, err.code || err.message);
      if (attempt >= maxAttempts) throw err;
      const waitMs = 500 * Math.pow(2, attempt); // exponential backoff: 1s, 2s, 4s...
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
  return null;
};

export default function RegistrationPage() {
  const [step, setStep] = useState(1); // step 1 = register, step 2 = upload docs

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [cnicFile, setCnicFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  const [cnicProgress, setCnicProgress] = useState(0);
  const [selfieProgress, setSelfieProgress] = useState(0);

  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const {
      firstName,
      lastName,
      username,
      role,
      email,
      password,
      confirmPassword,
    } = formData;

    if (!firstName || !lastName || !username || !role || !email || !password) {
      return alert("Please fill all fields.");
    }
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setVerificationSent(true);

      // Store basic info
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        role,
        email: user.email,
        emailVerified: false,
        createdAt: new Date(),
      });

      alert("Verification email sent! Please verify.");
    } catch (err) {
      console.error(err);
      alert(err.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  // Check if user verified email
  const handleCheckVerification = async () => {
    const user = auth.currentUser;
    if (!user) return alert("No user logged in in this session. Make sure you're signed in.");

    setLoading(true);
    try {
      await user.reload();

      if (user.emailVerified) {
        setEmailVerified(true);
        await updateDoc(doc(db, "users", user.uid), { emailVerified: true });

        setStep(2); // move to Step 2
      } else {
        alert("Email not verified yet.");
      }
    } catch (err) {
      console.error(err);
      alert("Could not check verification: " + (err.message || err.code));
    } finally {
      setLoading(false);
    }
  };

  // Upload documents (uses uploadImageResumable)
  const handleUploadDocuments = async () => {
    const user = auth.currentUser;
    if (!user) return alert("No user logged in. Please sign in or complete registration in this tab.");

    setLoading(true);
    try {
      const updates = {};

      if (cnicFile) {
        setCnicProgress(0);
        const idCardUrl = await uploadImageResumable(user.uid, cnicFile, "cnic.jpg", setCnicProgress);
        if (idCardUrl) updates.idCardUrl = idCardUrl;
      }

      if (selfieFile) {
        setSelfieProgress(0);
        const selfieUrl = await uploadImageResumable(user.uid, selfieFile, "selfie.jpg", setSelfieProgress);
        if (selfieUrl) updates.selfieUrl = selfieUrl;
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, "users", user.uid), updates);
      }

      alert("Documents uploaded successfully!");
      // optionally move to next step or finish
    } catch (err) {
      console.error("Document upload failed:", err);
      alert("Upload failed: " + (err.message || err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 580, margin: "20px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Registration</h2>

      {/* ------------------------- STEP 1 ---------------------------- */}
      {step === 1 && (
        <>
          {!verificationSent && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              />

              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              />

              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              />

              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              >
                <option value="">Select Role</option>
                <option value="owner">Owner</option>
                <option value="renter">Renter</option>
              </select>

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              />

              <button onClick={handleRegister} disabled={loading} style={{ width: "100%", padding: 10 }}>
                {loading ? "Registering..." : "Register & Send OTP"}
              </button>
            </>
          )}

          {verificationSent && !emailVerified && (
            <>
              <p style={{ marginTop: 20 }}>Verification email sent! Check your inbox.</p>

              <button onClick={handleCheckVerification} style={{ width: "100%", padding: 10, marginTop: 15 }}>
                I Verified My Email
              </button>
            </>
          )}
        </>
      )}

      {/* ------------------------- STEP 2 ----------------------------- */}
      {step === 2 && (
        <>
          <h3 style={{ marginTop: 20 }}>Upload Documents</h3>

          <label>Upload CNIC</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCnicFile(e.target.files[0] || null)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          {cnicProgress > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ height: 8, background: "#eee", borderRadius: 6 }}>
                <div
                  style={{
                    width: `${cnicProgress}%`,
                    height: "100%",
                    background: "#299F93",
                    borderRadius: 6,
                    transition: "width 200ms",
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>{cnicProgress}%</div>
            </div>
          )}

          <label>Upload Selfie</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelfieFile(e.target.files[0] || null)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          {selfieProgress > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ height: 8, background: "#eee", borderRadius: 6 }}>
                <div
                  style={{
                    width: `${selfieProgress}%`,
                    height: "100%",
                    background: "#2B8A8A",
                    borderRadius: 6,
                    transition: "width 200ms",
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>{selfieProgress}%</div>
            </div>
          )}

          <button onClick={handleUploadDocuments} disabled={loading} style={{ width: "100%", padding: 10 }}>
            {loading ? "Uploading..." : "Upload Documents"}
          </button>
        </>
      )}
    </div>
  );
}