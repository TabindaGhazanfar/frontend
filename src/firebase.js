import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";





// Firebase Config
const firebaseConfig = {
apiKey: "AIzaSyBoA_aIR-K_940Dq34-xlYIcn7vD7rUl4I",
authDomain: "easyrent1-9af76.firebaseapp.com",
projectId: "easyrent1-9af76",
storageBucket: "easyrent1-9af76.appspot.com",
messagingSenderId: "48393588033",
appId: "1:48393588033:web:a60dd791e203ebfd2ca5c0",
databaseURL: "(https://easyrent1-9af76-default-rtdb.firebaseio.com)"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);


// Initialize Firebase Services
export const auth = getAuth(app);      // Email & Phone Auth
export const db = getFirestore(app);   // Firestore Database
export const database = getDatabase(app); // Realtime Database
const storage = getStorage(app);
export { storage };

export default app;


