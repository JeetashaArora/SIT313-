import {initializeApp} from 'firebase/app'
import {collection, getDocs, getFirestore, query} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { useState } from 'react';
const firebaseConfig = {
    apiKey: "AIzaSyBBtdwSMfFaGA_KENeYQ74TPfhI2LR5yUo",
    authDomain: "react-post-e7d02.firebaseapp.com",
    projectId: "react-post-e7d02",
    storageBucket: "react-post-e7d02.appspot.com",
    messagingSenderId: "298731947835",
    appId: "1:298731947835:web:f638c4d5550d4f4838d91e"
  };
const app=initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
export{db,storage};
export const excerpt=(str,count)=>{
  if(structuredClone.length>count)
  {
    str=str.substring(0,count)+"...";
  }
  return str;
}
export async function fetchQuestions(e)
{
  const [fetchedQuestions,setAllQuestions]=useState([])
  e.preventDefault();
  db.collection("Questions")
  .get()
  .then((snapshot)=>{
    if(snapshot.docs.length>0)
    {
      snapshot.docs.foreach((doc)=>{
        setAllQuestions((prev)=>{
          return[...prev,doc.data()];
        })
      })
    }
  })
console.log(fetchedQuestions)
}

