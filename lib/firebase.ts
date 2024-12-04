import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_gOjEdQwa4BlycU34TbjWzJ2KSZKjFWc",
  authDomain: "banco-de-horas-cd346.firebaseapp.com",
  projectId: "banco-de-horas-cd346",
  storageBucket: "banco-de-horas-cd346.firebasestorage.app",
  messagingSenderId: "62728679571",
  appId: "1:62728679571:web:20763f4455461ea702dd66"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };