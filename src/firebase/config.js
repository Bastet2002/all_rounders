import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmVTMEXP230haArNBxoaKtBhtPmU-UXR8",
  authDomain: "allrounders-b21b1.firebaseapp.com",
  projectId: "allrounders-b21b1",
  storageBucket: "allrounders-b21b1.appspot.com", // Make sure this is correct
  messagingSenderId: "471992776437",
  appId: "1:471992776437:web:c7da233c3703e70100f7bc",
  measurementId: "G-WQ9THNNKBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };