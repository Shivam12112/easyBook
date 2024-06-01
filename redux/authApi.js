import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../authentication/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const handleLoginWithEmailAndPassword = async (loginDetails) => {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      loginDetails.email,
      loginDetails.password
    );
    const user = res.user;
    const userRef = doc(database, "users", user.uid);
    const userData = await getDoc(userRef);
    return userData.data();
  } catch (error) {
    console.log(error);
  }
};
