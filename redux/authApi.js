import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import moment from "moment";
import { auth, database } from "../authentication/firebaseConfig";

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
    return error.message;
  }
};

export const handleRegister = async (userDetails) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );
    const user = auth.currentUser;
    const userRef = doc(database, "users", user.uid);
    console.log(user);
    setDoc(userRef, {
      displayName: userDetails.fullName,
      email: userDetails.email,
      uid: user.uid,
      dateOfJoin: moment().unix(),
    });
    const userData = await getDoc(userRef);
    return userData.data();
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const updateProfileData = async (payload) => {
  try {
    const userDocRef = doc(database, "users", payload.uid);
    await setDoc(
      userDocRef,
      {
        profilePicture: payload?.profileUrl ? payload?.profileUrl : null,
        gender: payload?.gender,
        dateOfBirth: payload?.dateOfBirth,
        displayName: payload?.displayName,
      },
      { merge: true }
    );
    const userData = await getDoc(userDocRef);
    return userData.data();
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
