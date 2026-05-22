import { db } from "./config";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveWebsite(siteData) {
  try {
    const docRef = await addDoc(collection(db, "websites"), {
      ...siteData,
      createdAt: serverTimestamp(),
    });

    console.log("Saved with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error saving website:", error);
  }
}
