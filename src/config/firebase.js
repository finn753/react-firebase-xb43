import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxLNGYGk8Rugl-tzXL2NDdpzMcWXj_l1c",
  authDomain: "fir-react-a5273.firebaseapp.com",
  projectId: "fir-react-a5273",
  storageBucket: "fir-react-a5273.appspot.com",
  messagingSenderId: "93512151042",
  appId: "1:93512151042:web:5bc06a4497d4e6eda7b71b",
  measurementId: "G-ZKSJER3KEV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
