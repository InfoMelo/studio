// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL5yB4xg51uj2o85wB5arzMl3wPAQUQ00",
  authDomain: "websitersmeloy.firebaseapp.com",
  projectId: "websitersmeloy",
  storageBucket: "websitersmeloy.firebasestorage.app",
  messagingSenderId: "504002369942",
  appId: "1:504002369942:web:f48b2af2e26b282ace25b7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };