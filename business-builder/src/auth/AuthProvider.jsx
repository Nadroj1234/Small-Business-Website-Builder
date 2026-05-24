import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/db";
import { isAdminEmail } from "./adminAccess";
import { AuthContext } from "./AuthContext";
import { ensureUserProfile } from "../services/userProfiles";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [accessStatus, setAccessStatus] = useState("logged_out");

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (!nextUser) {
        if (!cancelled) {
          setUser(null);
          setAccessStatus("logged_out");
          setAuthLoading(false);
        }
        return;
      }

      try {
        const profile = await ensureUserProfile(nextUser);

        if (!cancelled) {
          setUser(nextUser);
          setAccessStatus(profile.status ?? "pending");
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);

        if (!cancelled) {
          setUser(nextUser);
          setAccessStatus(isAdminEmail(nextUser.email ?? "") ? "approved" : "pending");
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const isAdminUser = isAdminEmail(user?.email ?? "");
  const isApprovedUser = accessStatus === "approved" || isAdminUser;

  const value = {
    user,
    isAdminUser,
    isApprovedUser,
    accessStatus,
    authLoading,
    signInWithGoogle: async () => {
      await signInWithPopup(auth, googleProvider);
    },
    signOutUser: async () => {
      await signOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
