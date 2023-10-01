import React, { useState } from 'react'
import Title from "./Title"
import Textbox from './Textbox'
import PostButton from "./Button"
import Header from "./Header"
import { doc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
import { db, storage } from '../utility/firebase'
import "react-bootstrap"
import {v4 as uuidv4} from "uuid"

export default function Question() {
  const [title,settitle]=useState(" ")
  const [problem,setproblem]=useState(" ")
  const [tags,settags]=useState([])
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const dbref = collection(db, "Questions")
  const savedata = async (title, problem,tags) => {
    const id=uuidv4();
      try{
      const addData = await addDoc(dbref, {
          Title: title,
          Problem:problem,
          Tags: tags,
          Id: id,
          Date: currentDate,
          
        });
        if (addData) {
          alert("Posted successfully");
          console.log(currentDate)
        }
      }
     catch (error) {
      console.error(error);
    }
  }
  const handleBrowseClick = () => {
    document.getElementById("fileinput").click();
  }
  return (
    <div >
    <div >  
        <Header text="What do you want to ask or share"></Header> 
        <div className='inlineTextbox'>
        <span className=''><pre>Title </pre></span>  <input placeholder="Start your question with how what why etc. "value={title} className="QuesTitle" cols="3902" rows="1"  onChange={(e)=>{
          console.log(e.target.value,"Title");settitle(e.target.value)
        }}></input>
        </div>   
        <br></br>
        Describe your problem:
        <textarea className="container mb-3" value={problem} heading="Describe your problem" rows="18" cols="110" onChange={(e)=>{
          console.log(e.target.value,"Problem");setproblem(e.target.value)}}></textarea>
        <br></br>
        <div className='inlineTextbox'>
        <span ><pre className='my-3'>Tags </pre></span><input value={tags} placeholderText="Please add upto 3 tags to describe what your question is about e.g. Java" onChange={(e)=>{
          console.log(e.target.value,"Tags");settags(e.target.value)}}></input>
        </div>
        <br></br>
        <button className='btn-add' onClick={()=>savedata(title,problem,tags)}>Post</button>
        
        </div>
    </div>
  )
}
