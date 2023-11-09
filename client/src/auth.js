import {
  signInWithPopup,
  GoogleAuthProvider,
  // FacebookAuthProvider,
  // updateProfile,
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

// export const signInWithFacebook = async () => {
//   const fbProvider = new FacebookAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, fbProvider);
//     console.log(result);
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;

//     let photoUrl =
//       result.user.photoURL + "?height=500&access_token=" + accessToken;
//     await updateProfile(auth.currentUser, { photoURL: photoUrl });
//     return result.user;
//   } catch (error) {
//     console.error("Facebook Sign-In Error:", error);
//     throw error;
//   }
// };

export const signOut = (dispatch) => {
  firebaseSignOut(auth)
    .then(() => {
      dispatch(performingSignOut());
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};
