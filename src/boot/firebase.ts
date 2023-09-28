// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { R } from "@/models";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: R<string> = {};
const firebaseEnv = import.meta.env;

for (const key in firebaseEnv) {
  if (key.startsWith("VITE_FIREBASE")) firebaseConfig[key.replace("VITE_FIREBASE_", "")] = firebaseEnv[key];
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const analytics = getAnalytics(firebase);
const firestore = getFirestore(firebase);

export { analytics, auth, firebase, firestore };
