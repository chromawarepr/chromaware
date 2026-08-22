import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDdMjb6KJ1n47IffepCAqb-rVfFChwqWOA",
  authDomain: "chromaware-cdd88.firebaseapp.com",
  projectId: "chromaware-cdd88",
  storageBucket: "chromaware-cdd88.firebasestorage.app",
  messagingSenderId: "283969930826",
  appId: "1:283969930826:web:335ba5630309f35f9c08b3"
};


const app = initializeApp(firebaseConfig);


// Firestore database
export const db = getFirestore(app);


// Authentication
export const auth = getAuth(app);