import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/db";
import { isAdminEmail } from "../auth/adminAccess";

export async function ensureUserProfile(user) {
  const ref = doc(db, "userProfiles", user.uid);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  const approved = isAdminEmail(user.email ?? "");

  const profile = {
    uid: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "",
    status: approved ? "approved" : "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(ref, profile);

  return {
    id: user.uid,
    ...profile,
  };
}

export async function getPendingUsers() {
  const pendingQuery = query(
    collection(db, "userProfiles"),
    where("status", "==", "pending"),
  );
  const snapshot = await getDocs(pendingQuery);

  return snapshot.docs.map((entry) => ({
    id: entry.id,
    ...entry.data(),
  }));
}

export async function approveUser(userId) {
  await updateDoc(doc(db, "userProfiles", userId), {
    status: "approved",
    updatedAt: serverTimestamp(),
  });
}
