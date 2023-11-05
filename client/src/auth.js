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
    auth.useDeviceLanguage();
    const result = await signInWithPopup(auth(app), provider);

    const user = result.user;
    const email = user.email;
    const displayName = user.displayName;
    const photoURL = user.photoURL;

    return { email, displayName, photoURL };
  } catch (error) {
    alert("Couldn't Sign-In with Google", error);
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(app);
    auth.useDeviceLanguage();
    const result = await signInWithPopup(auth(app), provider);
    return result.user;
  } catch (error) {
    alert("Couldn't Sign-In with Google Facebook", error);
    throw error;
  }
};
