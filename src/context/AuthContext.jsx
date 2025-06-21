// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Define your admin emails here (ideally from a secure backend or env variable)
const ADMIN_EMAILS = ["sankalpgupta481@gmail.com", "superadmin@newsapp.com"];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = ADMIN_EMAILS.includes(firebaseUser.email);
        setUser({ ...firebaseUser, isAdmin }); // attach isAdmin flag
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
