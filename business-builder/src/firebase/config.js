// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI5JXE9h_uLEcAwOU--ukgizVbOET_S-0",
  authDomain: "small-business-website-builder.firebaseapp.com",
  projectId: "small-business-website-builder",
  storageBucket: "small-business-website-builder.firebasestorage.app",
  messagingSenderId: "434408802584",
  appId: "1:434408802584:web:81ea693a45f7615091b66d",
  measurementId: "G-50R1RZN57Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
