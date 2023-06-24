import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./Auth.css";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Authentication</h2>
      <input
        className="auth-input"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input"
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-button" onClick={signIn}>
        Sign In
      </button>

      <button className="auth-google-button" onClick={signInWithGoogle}>
        Sign In With Google
      </button>

      <button className="auth-logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
