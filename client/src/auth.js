import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { performingSignOut } from "./redux/user/userSlice";
import { auth } from "./firebase.js";

auth.useDeviceLanguage();

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result.user);
    const { displayName, photoURL } = result.user;

    const user = {
      displayName,
      photoURL,
    };
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const signOut = (dispatch) => {
  firebaseSignOut(auth)
    .then(() => {
      dispatch(performingSignOut());
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};
