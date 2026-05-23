import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/db";
import { slugify } from "../utils/slugify";

async function buildUniqueSlug(baseName, websiteId) {
  const baseSlug = slugify(baseName) || "my-business-site";
  let candidate = baseSlug;
  let suffix = 1;

  while (true) {
    const slugQuery = query(collection(db, "websites"), where("slug", "==", candidate));
    const snapshot = await getDocs(slugQuery);
    const conflict = snapshot.docs.find((entry) => entry.id !== websiteId);

    if (!conflict) {
      return candidate;
    }

    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }
}

export async function saveWebsite({
  siteData,
  websiteId = null,
  published = false,
  slug = "",
  planId = "free",
}) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be signed in to save websites.");
  }

  const nextSlug = slug || (await buildUniqueSlug(siteData.businessName, websiteId));
  const payload = {
    ownerUid: user.uid,
    ownerEmail: user.email ?? "",
    name: siteData.businessName,
    slug: nextSlug,
    planId,
    published,
    siteData,
    updatedAt: serverTimestamp(),
  };

  if (websiteId) {
    await updateDoc(doc(db, "websites", websiteId), payload);
    return {
      id: websiteId,
      slug: nextSlug,
      planId,
      published,
      siteData,
    };
  }

  const docRef = await addDoc(collection(db, "websites"), {
    ...payload,
    createdAt: serverTimestamp(),
    publishedAt: published ? serverTimestamp() : null,
  });

  return {
    id: docRef.id,
    slug: nextSlug,
    planId,
    published,
    siteData,
  };
}
