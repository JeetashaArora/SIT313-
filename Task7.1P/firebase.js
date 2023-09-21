import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDrhQnLhZNtaXvbErC9cn7Qryv85y4-X-Q",
  authDomain: "task-7-1p-a8532.firebaseapp.com",
  projectId: "task-7-1p-a8532",
  storageBucket: "task-7-1p-a8532.appspot.com",
  messagingSenderId: "724179068516",
  appId: "1:724179068516:web:be2efc53ab7a0865e52171",
  measurementId: "G-H94NMK9SXC"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();
export const createuserdocfromAuth = async (userAuth, additionalInformation = {}, Lastname) => {
  if (!userAuth.email) return;

  const userDetails = doc(db, 'users', userAuth.uid);
  console.log(userDetails)

  const userSnapShots = await getDoc(userDetails);
  console.log(userSnapShots)
  console.log(userSnapShots.exists())
  if (!userSnapShots.exists()) {
    const { Firstname, email } = userAuth
    const createdAt = new Date();
    try {
      await setDoc(userDetails, {
        Firstname,
        Lastname,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch (error) {
      console.log('error in creating', error.message)
    }
  }
  return userDetails;
}
export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password)
    return
  return await createUserWithEmailAndPassword(auth, email, password)
}
export async function signinAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password)
    return
  return await signInWithEmailAndPassword(auth, email, password)
}

