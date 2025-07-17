import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChn9Km2tf8Knc3CUp9qzo7oCqKJlQ5B4Q",
  authDomain: "target75-44c9b.firebaseapp.com",
  projectId: "target75-44c9b",
  storageBucket: "target75-44c9b.firebasestorage.app",
  messagingSenderId: "606502955630",
  appId: "1:606502955630:web:8b9a81cf02c0beb4f7147f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged};