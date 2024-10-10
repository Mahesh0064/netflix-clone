import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNjm9PAKz-hJk4ZhRY7Zqo15ExWrn4INY",
  authDomain: "netflix-clone-68036.firebaseapp.com",
  projectId: "netflix-clone-68036",
  storageBucket: "netflix-clone-68036.appspot.com",
  messagingSenderId: "86315383686",
  appId: "1:86315383686:web:067bfb65d1808c96aa0a07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    //alert(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    //alert(error);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, logout, signup };
