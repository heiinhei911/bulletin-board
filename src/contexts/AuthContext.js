import { useState, useEffect, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { createDbUser } from "../helpers/firebase-crud";
import { getWindowDimensions } from "../helpers/window-dimensions";
import { DESKTOP_BREAKPOINT } from "../defaults";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const { windowWidth } = getWindowDimensions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (regInfo, names) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      regInfo.email,
      regInfo.password
    );
    createDbUser(response.user.uid, names);
  };

  const login = async (loginInfo) => {
    await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password);
  };

  const logout = async () => await signOut(auth);

  const signInWithGoogle = () =>
    windowWidth < DESKTOP_BREAKPOINT
      ? signInWithRedirect(auth, provider)
          .then((response) => console.log(response))
          .catch((e) => console.error(e))
      : signInWithPopup(auth, provider)
          .then((response) => console.log(response))
          .catch((e) => console.error(e));

  const value = { user, register, login, logout, signInWithGoogle };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
