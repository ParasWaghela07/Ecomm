import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {toast} from "react-hot-toast";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
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
  const [cart,setcart]=useState([]);

  const googleProvider = new GoogleAuthProvider();
  const [loading,setloading] = useState(false);

 async function fetchCartData() {
  try {
    const token = await user.getIdToken();

    const response = await fetch('http://localhost:4000/getCartItems', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Cart data fetched:", data);
    if (data.success) {
      setcart(data.cart);
    } else {
      console.error("Failed to fetch cart data:", data.message);
      toast.error("Failed to fetch cart data.");
    }
  } catch (e) {
    console.error("Error fetching cart data:", e);
    toast.error("An error occurred while fetching cart data.");
  }
  }

  useEffect(()=>{
    if (user) {
      fetchCartData();
    } else {
      setcart([]);
    }
  },[user]);
  useEffect(() => {
    setloading(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      console.log(firebaseUser);
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
    cart,
    setcart
  };

  return (
    <>
      <FirebaseContext.Provider value={value}>
        {children}
      </FirebaseContext.Provider>
    </>
  );
}
