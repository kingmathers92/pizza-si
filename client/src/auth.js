//import { app } from "./firebase.js";
import { getAuth } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

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
