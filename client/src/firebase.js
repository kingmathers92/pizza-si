// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "pizza-si-1f113.firebaseapp.com",
  projectId: "pizza-si-1f113",
  storageBucket: "pizza-si-1f113.appspot.com",
  messagingSenderId: "81402966404",
  appId: "1:81402966404:web:7b0256a9d780232b3d2dd1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
