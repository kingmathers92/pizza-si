import { app } from "./firebase.js";
import { getAuth } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth(app), provider);
    return result.user;
  } catch (error) {
    alert("Couldn't Sign-In with Google", error);
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth(app), provider);
    return result.user;
  } catch (error) {
    alert("Couldn't Sign-In with Google Facebook", error);
    throw error;
  }
};
