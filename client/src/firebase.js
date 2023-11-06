import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "pizza-si-f0390.firebaseapp.com",
  projectId: "pizza-si-f0390",
  storageBucket: "pizza-si-f0390.appspot.com",
  messagingSenderId: "389957607711",
  appId: "1:389957607711:web:963af04cb80131b052502a",
};

export const app = initializeApp(firebaseConfig);

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.useDeviceLanguage();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    auth.useDeviceLanguage();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Facebook Sign-In Error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const auth = getAuth();
    await auth.signOut();
  } catch (error) {
    console.error("Sign-Out Error:", error);
    throw error;
  }
};
