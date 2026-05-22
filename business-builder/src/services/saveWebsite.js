import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/db";

export async function saveWebsite(data) {
  try {
    console.log("Saving to Firestore...", data);

    const docRef = await addDoc(collection(db, "websites"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log("Saved with ID:", docRef.id);
    console.log("DB object:", db);
    return docRef.id;
  } catch (err) {
    console.error("Firestore save failed:", err);
    throw err;
  }
}
