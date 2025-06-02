import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHuq_OmqmYQs6AIrQfhZtFspeF6kVcoL4",
  authDomain: "curso-3716a.firebaseapp.com",
  projectId: "curso-3716a",
  storageBucket: "curso-3716a.firebasestorage.app",
  messagingSenderId: "133730436328",
  appId: "1:133730436328:web:dd157480b6e956d600b55d",
  measurementId: "G-MN8XMRCQ7N"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };

