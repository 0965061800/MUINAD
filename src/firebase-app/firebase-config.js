// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, getStream } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEtqVxoCC995g4XTz6EEl2JOXY5K2lJx4",
  authDomain: "muinimage.firebaseapp.com",
  projectId: "muinimage",
  storageBucket: "muinimage.appspot.com",
  messagingSenderId: "754665785521",
  appId: "1:754665785521:web:0ce4186f45d709c83dba90",
  measurementId: "G-6TPS1LMLEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
