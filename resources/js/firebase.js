// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB2Fr3IgAmTx2BWMyakkYr2QpU721kOoio",
    authDomain: "pulse-cms.firebaseapp.com",
    projectId: "pulse-cms",
    storageBucket: "pulse-cms.appspot.com",
    messagingSenderId: "83073259135",
    appId: "1:83073259135:web:9db947845700eec71c514a",
    measurementId: "G-5CEEGJ7R0G",
    databaseURL: "https://pulse-cms-default-rtdb.asia-southeast1.firebasedatabase.app",
  };
  
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
