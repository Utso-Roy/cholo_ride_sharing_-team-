import React, { createContext, useEffect, useState, ReactNode } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

interface AuthContextType {
  signup: (email: string, password: string) => Promise<User>;
  loginUser: (email: string, password: string) => Promise<User>;
  googleLogin: () => Promise<User>;
  logOut: () => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const auth = getAuth(app);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(result => result.user);
  };

  const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(result => result.user);
  };

  // Google login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider).then(result => result.user);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const authInfo: AuthContextType = {
    signup,
    loginUser,
    googleLogin,
    logOut,
    user,
    setUser,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
