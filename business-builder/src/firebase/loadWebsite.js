import { db } from "./db";
import { doc, getDoc } from "firebase/firestore";

export async function loadWebsite(id) {
  try {
    const ref = doc(db, "websites", id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data();
    }

    return null;
  } catch (err) {
    console.error("Load error:", err);
  }
}
