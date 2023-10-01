import React, { useEffect, useState } from 'react'
import QuestionList from '../components/QuestionList'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../utility/firebase';

const FindQues = () => {
  const [loading,setloading]=useState(true);
  const[questions,setQuestions]=useState([]);

  useEffect(()=>{
    const unsub=onSnapshot(
      collection(db,"Questions"),
      (snapshot)=>{
        let list=[]
        snapshot.docs.forEach((doc)=>
        list.push({id:doc.id,...doc.data()}));
        setQuestions(list)
      },(error)=>{
        console.log(error);
      }
    );
    return()=>{
      unsub();
    }
  },[]);
  console.log("questions",questions)
  return (
    <div>
      <h2>Find the Questions!!</h2>  
      <QuestionList questions={questions}></QuestionList>
    </div>
  )
}

export default FindQues