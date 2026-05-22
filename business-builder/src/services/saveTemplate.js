import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/db";

export async function saveTemplate(data) {
  const docRef = await addDoc(collection(db, "templates"), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
