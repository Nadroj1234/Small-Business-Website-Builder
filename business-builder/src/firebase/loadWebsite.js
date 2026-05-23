import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./db";

export async function loadWebsite(id) {
  try {
    const ref = doc(db, "websites", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return null;
    }

    const data = snap.data();
    const user = auth.currentUser;

    if (data.ownerUid !== user?.uid) {
      return null;
    }

    return {
      id: snap.id,
      ...data,
    };
  } catch (err) {
    console.error("Load error:", err);
    return null;
  }
}

export async function loadPublishedWebsiteBySlug(slug) {
  try {
    const websiteDoc = await getDoc(doc(db, "publishedWebsites", slug));

    if (!websiteDoc.exists()) {
      return null;
    }

    const data = websiteDoc.data();

    return {
      id: data.websiteId ?? websiteDoc.id,
      ...data,
    };
  } catch (err) {
    console.error("Public load error:", err);
    return null;
  }
}
