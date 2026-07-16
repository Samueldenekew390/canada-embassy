// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===========================
// REPLACE WITH YOUR FIREBASE CONFIG
// ===========================

const firebaseConfig = {
  apiKey: "AIzaSyC8qO2zUkxjNs69e_BcqGD57bUk_-v9p-I",
  authDomain: "qr-verification-system-27ffb.firebaseapp.com",
  projectId: "qr-verification-system-27ffb",
  storageBucket: "qr-verification-system-27ffb.firebasestorage.app",
  messagingSenderId: "887243561707",
  appId: "1:887243561707:web:3591d668bbe13275823cae",
  measurementId: "G-NF8H4GCHZQ",
};

// ===========================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
