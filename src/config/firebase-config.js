import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgzWrUEs8fvLa-fmHK6Itv7MtTpUbuIJY",
  authDomain: "fir-course-b7a8f.firebaseapp.com",
  projectId: "fir-course-b7a8f",
  storageBucket: "fir-course-b7a8f.appspot.com",
  messagingSenderId: "408697813523",
  appId: "1:408697813523:web:51b2df7c5dacef46a05de6",
  measurementId: "G-HN77QLRDQZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
