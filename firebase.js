// firebaseConfig.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// ✅ Replace with your own Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDzC67x6xZGtSqxhLUVIpQmrYsJTYzcGhY",
  authDomain: "myapp-e7622.firebaseapp.com",
  projectId: "myapp-e7622",
  storageBucket: "myapp-e7622.firebasestorage.app",
  messagingSenderId: "778568350990",
  appId: "1:778568350990:web:2f4de32e750076a453eb5f",
  measurementId: "G-49Y7ZVNDT4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export auth and firestore instances
export const auth = getAuth(app)
export const db = getFirestore(app)

