import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCQ7cTRkw8IiJZInu0uJA6tU7HW44Pc1EQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "uassiakad.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "uassiakad",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "uassiakad.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1099442024286",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1099442024286:web:18207393255145655361"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
