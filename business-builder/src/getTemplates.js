import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase/db";

export async function getTemplates() {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const templatesQuery = query(
    collection(db, "templates"),
    where("ownerUid", "==", user.uid),
  );
  const snapshot = await getDocs(templatesQuery);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((template) => {
      return (
        template.siteData &&
        typeof template.siteData === "object" &&
        typeof template.siteData.businessName === "string"
      );
    })
    .sort((a, b) => {
      const aMillis = a.createdAt?.toMillis?.() ?? 0;
      const bMillis = b.createdAt?.toMillis?.() ?? 0;
      return bMillis - aMillis;
    });
}
