import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // 🔹 1. Get Firebase ID token
        const idToken = await currentUser.getIdToken();

        // 🔹 2. Store it where client.js expects it
        localStorage.setItem("token", idToken);
      } else {
        // 🔹 3. Clear token when logged out
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);