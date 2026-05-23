import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/db";

export async function getWebsites() {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const websitesQuery = query(
    collection(db, "websites"),
    where("ownerUid", "==", user.uid),
  );
  const snapshot = await getDocs(websitesQuery);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => {
      const aMillis = a.updatedAt?.toMillis?.() ?? a.createdAt?.toMillis?.() ?? 0;
      const bMillis = b.updatedAt?.toMillis?.() ?? b.createdAt?.toMillis?.() ?? 0;
      return bMillis - aMillis;
    });
}
