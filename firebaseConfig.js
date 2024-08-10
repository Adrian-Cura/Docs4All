// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "docs4all-6d284.firebaseapp.com",
  projectId: "docs4all-6d284",
  storageBucket: "docs4all-6d284.appspot.com",
  messagingSenderId: "145904020217",
  appId: "1:145904020217:web:4b3f720742e4b0f933d028",
  measurementId: "G-9Q8L0F8M61",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
