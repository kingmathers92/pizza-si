import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "pizza-si-f0390.firebaseapp.com",
  projectId: "pizza-si-f0390",
  storageBucket: "pizza-si-f0390.appspot.com",
  messagingSenderId: "389957607711",
  appId: "1:389957607711:web:963af04cb80131b052502a",
};

export const app = initializeApp(firebaseConfig);
