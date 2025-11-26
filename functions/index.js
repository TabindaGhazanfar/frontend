/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Firebase function settings
const { setGlobalOptions } = require("firebase-functions");
setGlobalOptions({ maxInstances: 10 });

// Required modules
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { Buffer } = require("buffer"); // ✅ FIXED — Buffer imported correctly

// Initialize firebase admin
admin.initializeApp();

// ==========================
// 📸 Image Upload Function
// ==========================
exports.uploadImage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Only POST allowed
      if (req.method !== "POST") {
        return res.status(400).json({ error: "Invalid request method" });
      }

      const { fileData, fileName, userId } = req.body;

      // Validate fields
      if (!fileData || !fileName || !userId) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const bucket = admin.storage().bucket();
      const file = bucket.file(`users/${userId}/${fileName}`);

      // Convert base64 → buffer
      const buffer = Buffer.from(fileData, "base64");

      // Save file in storage
      await file.save(buffer, {
        metadata: { contentType: "image/jpeg" },
      });

      // Generate signed download URL
      const downloadURL = await file.getSignedUrl({
        action: "read",
        expires: "03-17-2030",
      });

      return res.json({
        url: downloadURL[0],
        message: "Uploaded successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
});
