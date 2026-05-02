import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBdvKSUf0mOUvCA4F338kuxgf1m9i1u3w",
  authDomain: "bd-trippers.firebaseapp.com",
  projectId: "bd-trippers",
  storageBucket: "bd-trippers.appspot.com",
  messagingSenderId: "972185706940",
  appId: "1:972185706940:web:cd259421e06658805e0bb9"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
