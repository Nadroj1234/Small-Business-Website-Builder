import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/db";

export async function getTemplates() {
  const templatesQuery = query(
    collection(db, "templates"),
    orderBy("createdAt", "desc"),
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
    });
}
