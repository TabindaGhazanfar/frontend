import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBoA_aIR-K_940Dq34-xlYIcn7vD7rUl4I",
  authDomain: "easyrent1-9af76.firebaseapp.com",
  databaseURL: "https://easyrent1-9af76-default-rtdb.firebaseio.com",
  projectId: "easyrent1-9af76",
  storageBucket: "easyrent1-9af76.appspot.com", // <-- comma fixed
  messagingSenderId: "48393588033",
  appId: "1:48393588033:web:a60dd791e203ebfd2ca5c0"
};

const app = initializeApp(firebaseConfig);

// AUTH MUST USE initializeAuth() — NO getAuth()
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});

// DEV ONLY: disable app verification when explicitly requested via env var
// Make sure to set VITE_DISABLE_APP_VERIFICATION=true in your .env for local dev
if (import.meta.env.VITE_DISABLE_APP_VERIFICATION === "true") {
  try {
    auth.appVerificationDisabledForTesting = true; // dev-only
    console.info('Firebase: app verification disabled for testing (DEV ONLY)');
  } catch (e) {
    console.warn('Could not disable app verification:', e);
  }
}

export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDB = getDatabase(app);
export const functions = getFunctions(app);

export default app;
