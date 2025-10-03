import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [globalUser, setGlobalUser] = useState(null);  // ✅ consistent naming
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {  // ✅ password not needed
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    setGlobalUser(null);   
    setGlobalData(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("current_user", user);
      setGlobalUser(user);

      if (!user) {
        console.log("No Active User");
        setGlobalData(null);
        return;
      }

      try {
        setIsLoading(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {};
        if (docSnap.exists()) {
          console.log("Found user data");
          firebaseData = docSnap.data();
        }
        setGlobalData(firebaseData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    globalUser,       
    globalData,
    setGlobalData,
    isLoading,
    signup,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
