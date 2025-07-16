// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtTthhMUqLJgqEgw-G0Sr21lQ5qjHJuyE",
  authDomain: "finanzen-ff684.firebaseapp.com",
  projectId: "finanzen-ff684",
  storageBucket: "finanzen-ff684.firebasestorage.app",
  messagingSenderId: "566375937826",
  appId: "1:566375937826:web:eff454a46efaeffec2977b",
  measurementId: "G-G8N0C4P9NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);