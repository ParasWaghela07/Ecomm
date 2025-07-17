import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {toast} from "react-hot-toast";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const FirebaseContext = createContext();

export default function FirebaseContextProvider({ children }) {
  const firebaseConfig = {
    apiKey: "AIzaSyDODuABlymldT19a-nObYMFi-O5cYFcY8Q",
    authDomain: "ecomm-4ad22.firebaseapp.com",
    projectId: "ecomm-4ad22",
    storageBucket: "ecomm-4ad22.appspot.com",
    messagingSenderId: "615805914255",
    appId: "1:615805914255:web:b88a0d087eb0f0bc5374fa",
    measurementId: "G-01E9Z15HS1",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const [loading,setloading] = useState(false);


useEffect(() => {
  setloading(true);
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser || null);
    setloading(false);
  });
  return () => unsubscribe();
}, []);



  async function registerWithEmailAndPassword(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  async function loginWithEmailAndPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  }

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }

  const value = {
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    signInWithGoogle,
    logout,
    user,
    loading,
    setloading,
  };

  return (
    <>
      <FirebaseContext.Provider value={value}>
        {children}
      </FirebaseContext.Provider>
    </>
  );
}
