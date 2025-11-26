// src/utils/uploadService.js
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * uploadVerificationFiles(storage, uid, idFile, selfieFile)
 * Uploads both files and returns { idPath, selfiePath, idUrl, selfieUrl }
 */
export async function uploadVerificationFiles(storage, uid, idFile, selfieFile) {
  if (!uid) throw new Error("Missing uid");
  if (!idFile || !selfieFile) throw new Error("Both idFile and selfieFile required");

  const timestamp = Date.now();
  const idPath = `pending_verification/${uid}/id_${timestamp}.jpg`;
  const selfiePath = `pending_verification/${uid}/selfie_${timestamp}.jpg`;

  const idRef = storageRef(storage, idPath);
  const selfieRef = storageRef(storage, selfiePath);

  await uploadBytes(idRef, idFile);
  await uploadBytes(selfieRef, selfieFile);

  let idUrl = null, selfieUrl = null;
  try {
    idUrl = await getDownloadURL(idRef);
    selfieUrl = await getDownloadURL(selfieRef);
  } catch (e) {
    // urls may fail in emulator or permission-restricted rules — still return paths
    console.warn("Could not get download URLs:", e);
  }

  return { idPath, selfiePath, idUrl, selfieUrl };
}
