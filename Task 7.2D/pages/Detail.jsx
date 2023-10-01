import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useState,useEffect } from 'react'
import {useParams} from "react-router-dom"
const Detail = () => {
  const {id} = useParams();
  const [ques,setques]=useState(null);

  useEffect(()=>{
  id && getQuesDetail();
  },[id])
  const getQuesDetail = async()=>{
    const docRef=doc(db,"Questions",id);
    const questionDetail = await getDoc(docRef);
    setques(questionDetail.data())

  }
  return (
    <div className='single'>
      <div className="ques-title-box" style={{backgroundImage:`url("https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg")`}}>
      <div className="overlay">
      <div className='ques-title'>
      {/* <span>{ques.timestamp.ToDate().toDateString()}</span> */}
      <h2>{ques.title}</h2>
      </div>
      </div>
      <div className='container-fluid pb-4 pt-4'></div>
      <div>
        <div className='mx-0'>
         <h3>The Tags marked in this question are :- 
          <p>{ques?.tags}</p>
          <p>
            {ques?.problem}
          </p>
         </h3>
        </div>
        
      </div>

      </div>

    </div>
  )
}

export default Detail