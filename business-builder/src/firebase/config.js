import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBI5JXE9h_uLEcAwOU--ukgizVbOET_S-0",
  authDomain: "small-business-website-builder.firebaseapp.com",
  projectId: "small-business-website-builder",
  storageBucket: "small-business-website-builder.firebasestorage.app",
  messagingSenderId: "434408802584",
  appId: "1:434408802584:web:81ea693a45f7615091b66d",
  measurementId: "G-50R1RZN57Y",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
