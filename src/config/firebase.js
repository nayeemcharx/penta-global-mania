// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNwCyOwJGHBgcKl_1fIboUDJ0qHwV5QdQ",
  authDomain: "penta-movie-mania.firebaseapp.com",
  projectId: "penta-movie-mania",
  storageBucket: "penta-movie-mania.appspot.com",
  messagingSenderId: "164736132786",
  appId: "1:164736132786:web:093932052fd448cd24cbab",
  measurementId: "G-B4BY1NYCGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider= new GoogleAuthProvider()
export const db= getFirestore(app);