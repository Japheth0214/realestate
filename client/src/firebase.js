// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-f81dc.firebaseapp.com",
  projectId: "real-estate-f81dc",
  storageBucket: "real-estate-f81dc.appspot.com",
  messagingSenderId: "1056177272647",
  appId: "1:1056177272647:web:243737812dadc43c227e62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);