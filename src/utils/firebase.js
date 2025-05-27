import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABaVaARvQv4dixn_o13LCAMP4WCJPH5uM",
  authDomain: "allallrounders-a0e20.firebaseapp.com",
  projectId: "llallrounders-a0e20",
  storageBucket: "allallrounders-a0e20.firebasestorage.app",
  messagingSenderId: "Y876707686778",
  appId: "1:876707686778:web:cb0f238ead7d9b227ecec3",
  measurementId: "G-PML3NXKREV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };