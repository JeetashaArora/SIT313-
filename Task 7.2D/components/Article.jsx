
import React, { useEffect } from 'react'
import Title from "./Title"
import Textbox from "./Textbox"
import Header from "./Header"
import PostButton from "./Button"
import "./Article.css"
import FontAwesomeIcon from 'react-fontawesome'
import { useState } from 'react'
import ReactTagInput from '@pathofdev/react-tag-input'
import "@pathofdev/react-tag-input/build/index.css"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../utility/firebase'
import { doc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore'


export default function Article() {
  const [title, settitle] = useState(" ")
  const [abstract, setabstract] = useState(" ")
  const [article, setarticle] = useState(" ")
  const [tags, settags] = useState([])
  const [file, setfile] = useState(" ")
  //referencing the database
  const dbref = collection(db, "Articles")
  //Storing images in firebase storage
  const uploadImageInStorage = async (imageFile) => {
    if (!imageFile) {
      // Handle the case where no file is selected
      console.error("No file selected");
      return null;
    }
  
    try {
      const storageRef = ref(storage, 'images/' + imageFile.name);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  //saving data to the database
  const savedata = async (title, abstract, article, tags) => {
    try {
      let ImageUrl = null; // Declare the variable here

      // Check if a file is selected
      if (file) {
        ImageUrl = await uploadImageInStorage(file);
        console.log("Image URL:", ImageUrl);
        // Now you can use ImageUrl to save it in Firestore
        const addData = await addDoc(dbref, {
          Title: title,
          Abstract: abstract,
          Article: article,
          Tags: tags,
          file: ImageUrl
        });
        if (addData) {
          alert("Posted successfully");
        }
      } else {
        // Handle the case where no file is selected
        console.log("No file selected");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleBrowseClick = () => {
    document.getElementById("fileinput").click();
  }

  return (

    <div >
      <Header className="heading" text="What do you want to ask or share"></Header>
      <div className='inlineTextbox'>
        <span className='my-3'><pre>Title </pre></span><textarea className="first" cols="3902" rows="2" placeholder="Enter a descriptive Title" onChange={(e)=>settitle(e.target.value)}></textarea>

      </div>
      <div className='inlineTextbox mt-3 mb-3'>
      Add an image :
      <input style={{ display: "block" }} id="fileinput"  type="file" accept="image/*" className='imageBox form-control' onChange={(e) => {
        console.log(e.target.files[0],"Image");setfile(e.target.files[0])
      }} ></input>
        <div className="browse">
          
          <button onClick={handleBrowseClick}>Browse</button>
          <button onClick={handleBrowseClick}>Upload</button>
        </div>
      </div>

      Abstract :<textarea rows={2} cols={142} placeholder="Enter a 1-paragraph abstract" value={abstract} onChange={(e) => { console.log("New abstract:", abstract); setabstract(e.target.value) }}></textarea>

      <br></br>

      Article Text: <textarea className="mb-3" rows="10" cols="100" placeholder="Enter a 1-paragraph abstract" value={article} onChange={(e) => setarticle(e.target.value)} ></textarea>
      <br></br>
  

      <div className='inlineTextbox '>
        <span className='my-3'><pre>Tags </pre></span><input placeholder="Please add upto 3 tags to describe what your question is about e.g. Java" value={tags} onChange={(e) => settags(e.target.value)}></input>
        <br></br>

      </div>
      <button className='btn-add' value="submit" onClick={() => savedata(title, abstract, article, tags)} type="submit">Post</button>
    </div>
  )
}
