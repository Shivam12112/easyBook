import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGwIQKXLvP7nrutr0tX7a8gafUfg_vDP4",
  authDomain: "easybook-6d026.firebaseapp.com",
  projectId: "easybook-6d026",
  storageBucket: "easybook-6d026.appspot.com",
  messagingSenderId: "252306673328",
  appId: "1:252306673328:web:9663844baa91875b427575",
  measurementId: "G-85D79ZQ74Y",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const database = getFirestore();

