import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { onSnapshot } from "firebase/firestore";
import {
  getDbDataFromProjects,
  // getDbDataFromUsers,
  projectsRef,
  usersRef,
} from "../helpers/firebase-crud";

const SignedInContext = createContext();
const useSignedIn = () => useContext(SignedInContext);

const SignedInProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [boards, setBoards] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.uid === process.env.REACT_APP_DEMO_UID) {
      getDbDataFromProjects(setProjects, setBoards);
    } else {
      const unsubscribe = onSnapshot(
        projectsRef,
        // { includeMetadataChanges: true },
        (snapshot) => {
          // const source = snapshot.docs[1].metadata.hasPendingWrites
          //   ? "Local"
          //   : "Server";
          // console.log(source, " data: ", snapshot.docs[1].data());
          setProjects(
            snapshot.docs.map((doc) => ({
              _id: doc.id,
              name: doc.data().name,
              display: doc.data().display,
              boards: doc.data().boards,
            }))
          );
          setBoards(snapshot.docs.map((doc) => doc.data().boardOrder));
        }
      );
      return unsubscribe;
    }
  }, []);

  useEffect(
    () =>
      onSnapshot(usersRef, (snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            _id: doc.id,
            name: doc.data().name,
          }))
        );
      }),
    []
  );

  const value = { projects, boards, users, setProjects, setBoards };
  return (
    <SignedInContext.Provider value={value}>
      {users.length > 0 && children}
    </SignedInContext.Provider>
  );
};

export { SignedInProvider, useSignedIn };
