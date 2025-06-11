import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvghVqJFGYtdUi66vf6grgi2vK4cNEhG8",
  authDomain: "chat-app-e56d1.firebaseapp.com",
  databaseURL: "https://chat-app-e56d1-default-rtdb.firebaseio.com",
  projectId: "chat-app-e56d1",
  storageBucket: "chat-app-e56d1.firebasestorage.app",
  messagingSenderId: "481550594826",
  appId: "1:481550594826:web:1624a0b489730947e280f3",
  measurementId: "G-GND446DNVZ"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();