import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

interface AuthContextType {
  signup: (email: string, password: string) => Promise<User>;
  loginUser: (email: string, password: string) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  googleLogin: () => Promise<User>;
  logOut: () => Promise<void>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const auth = getAuth(app);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = async (email: string, password: string): Promise<User> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  const loginUser = async (email: string, password: string): Promise<User> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async (): Promise<User> => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const logOut = async (): Promise<void> => {
    await signOut(auth);
  };

const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email, {
    url: "http://localhost:5173/login",
  });
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
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
