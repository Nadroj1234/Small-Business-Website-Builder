import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/db";
import { isAdminEmail } from "./adminAccess";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    isAdminUser: isAdminEmail(user?.email ?? ""),
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
