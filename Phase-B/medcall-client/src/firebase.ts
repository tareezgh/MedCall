import { initializeApp } from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("🚀 ~ firebaseConfig:", firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
