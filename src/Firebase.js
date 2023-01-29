import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDejY8ouOtIy7fAOUaZMD9WyfneB4fsIVI",
  authDomain: "noidea-333a4.firebaseapp.com",
  projectId: "noidea-333a4",
  storageBucket: "noidea-333a4.appspot.com",
  messagingSenderId: "1053046264078",
  appId: "1:1053046264078:web:192da9301cebd56d27875f",
};

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
