import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtTthhMUqLJgqEgw-G0Sr21lQ5qjHJuyE",
  authDomain: "finanzen-ff684.firebaseapp.com",
  projectId: "finanzen-ff684",
  storageBucket: "finanzen-ff684.appspot.com",
  messagingSenderId: "566375937826",
  appId: "1:566375937826:web:eff454a46efaeffec2977b"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Auth e Firestore
export const auth = getAuth(app);
export const db   = getFirestore(app);