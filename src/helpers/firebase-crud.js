import {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../firebase-config";

const projectsRef = collection(db, "projects");
const usersRef = collection(db, "users");

const errorHandling = (error, uid) => {
  switch (error.code) {
    case "auth/operation-not-allowed":
      return console.error("Operation is not allowed:", error);
    case "auth/insufficient-permission":
      if (uid !== process.env.REACT_APP_DEMO_UID) {
        return console.error("Permission Error: ", error);
      }
    default:
      return console.error(error);
  }
};

const getDbDataFromProjects = async (setProjects, setBoards) => {
  try {
    const querySnap = await getDocs(projectsRef);
    querySnap.forEach((doc) => {
      const projectsFormat = {
        _id: doc.id,
        name: doc.data().name,
        display: doc.data().display,
        boards: doc.data().boards,
      };
      const boardsFormat = doc.data().boardOrder;

      setProjects((prevProjects) => [...prevProjects, projectsFormat]);
      if (setBoards) setBoards((prevBoards) => [...prevBoards, boardsFormat]);
    });
  } catch (error) {
    errorHandling(error);
  }
};

// const getDbDataFromUsers = async (setUsers) => {
//   try {
//     const querySnap = await getDocs(usersRef);
//     querySnap.forEach((doc) => {
//       const usersFormat = {
//         _id: doc.id,
//         name: doc.data().name,
//       };
//       setUsers((prevUsers) => [...prevUsers, usersFormat]);
//     });
//   } catch (error) {
//     errorHandling(error);
//   }
// };

const userDbExists = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().name;
    }
    return false;
  } catch (error) {
    errorHandling(error);
  }
};

const createDbUser = async (newId, names) => {
  const newUser = {
    name: { firstName: names.firstName, lastName: names.lastName },
    role: "user",
  };
  try {
    await setDoc(doc(db, "users", newId), newUser);
    // await addDoc(usersRef, newUser);
  } catch (error) {
    errorHandling(error);
  }
};

const createDbProject = async (newId, newProjObj) => {
  try {
    await setDoc(doc(db, "projects", newId), newProjObj);
    // await addDoc(projectsRef, newProjObj);
  } catch (error) {
    errorHandling(error);
  }
};

const updateDbField = async (ref, projectId, task) => {
  try {
    await updateDoc(doc(db, ref, projectId), task);
  } catch (error) {
    console.log(error);
  }
};

const removeDbField = async (ref, projectId) => {
  try {
    await updateDoc(doc(db, ref, projectId), { third: deleteField() });
  } catch (error) {
    errorHandling(error);
  }
};

const removeDbDoc = async (ref, projectId) => {
  try {
    await deleteDoc(doc(db, ref, projectId));
  } catch (error) {
    errorHandling(error);
  }
};

export {
  projectsRef,
  usersRef,
  createDbUser,
  getDbDataFromProjects,
  // getDbDataFromUsers,
  createDbProject,
  updateDbField,
  removeDbField,
  removeDbDoc,
  userDbExists,
};
