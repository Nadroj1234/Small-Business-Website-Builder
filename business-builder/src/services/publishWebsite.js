import { auth, db } from "../firebase/db";
import { deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export async function publishWebsite(website, published) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be signed in to publish a site.");
  }

  const ref = doc(db, "websites", website.id);
  await updateDoc(ref, {
    published,
    publishedAt: published ? serverTimestamp() : null,
    planId: website.planId ?? "free",
    siteData: website.siteData,
    updatedAt: serverTimestamp(),
  });

  const publicRef = doc(db, "publishedWebsites", website.slug);

  if (published) {
    await setDoc(publicRef, {
      websiteId: website.id,
      ownerUid: user.uid,
      slug: website.slug,
      name: website.name ?? website.siteData.businessName,
      planId: website.planId ?? "free",
      siteData: website.siteData,
      published: true,
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await deleteDoc(publicRef);
  }

  return published;
}
