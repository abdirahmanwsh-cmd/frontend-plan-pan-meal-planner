

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyuKUXirot-CVZMOhgt-HPzJJALtiLd_M",
  authDomain: "fitplate-e341f.firebaseapp.com",
  projectId: "fitplate-e341f",
  storageBucket: "fitplate-e341f.firebasestorage.app",
  messagingSenderId: "928911617640",
  appId: "1:928911617640:web:1ca9940e0684b57a1ad5dd",
  measurementId: "G-5MDF42V04H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

