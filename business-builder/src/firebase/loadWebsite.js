import { db } from "./config";

import { doc, getDoc } from "firebase/firestore";

export async function loadWebsite(id) {
  try {
    const docRef = doc(db, "websites", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No document found");
      return null;
    }
  } catch (error) {
    console.error("Error loading website:", error);
  }
}
