import { initializeApp } from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log("🚀 ~ firebaseConfig:", firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
getAnalytics(app);

export { auth, googleProvider, signInWithPopup };
