import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/db";

export async function saveTemplate(data) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be signed in to save templates.");
  }

  const docRef = await addDoc(collection(db, "templates"), {
    ...data,
    ownerUid: user.uid,
    ownerEmail: user.email ?? "",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
