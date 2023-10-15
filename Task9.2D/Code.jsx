import React, { useState } from 'react'
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import Markdown from"react-markdown"

import { doc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
import { db, storage } from './utils/firebase'
import "react-bootstrap"
import { v4 as uuidv4 } from "uuid"

export default function Question() {

    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);


    const handleSaveCode = async () => {
        // Capture the code from the state
        const codeToSave = code;
        const quesToSave = ques;

        // Reference to the Firestore collection
        const codeCollection = collection(db, 'codeSnippets');
        try {
            const addData = await addDoc(codeCollection, {
                code: codeToSave,
                questions: quesToSave,
                Date: currentDate,

            });
            if (addData) {
                alert("Posted successfully");
                console.log(currentDate)
                setCode("console.log('Hello World');");
                setQues(" ");
            }
        }
        catch (error) {
            console.error(error);
        }
        // Save the code to Firestore

    };
    const [code, setCode] = useState("console.log('Hello World');")
    const [ques, setQues] = useState("")
    const handleQuesChange = (event) => {
        setQues(event.target.value);
    };
    return (
        <div className='container'>
            <CodeMirror
                value={code}
                height="400px"
                theme={vscodeDark}
                onChange={(value) => setCode(value)}
            />
            <h4><Markdown>*Write in detail about the errors you are encountering in the code..*</Markdown></h4>
            <textarea rows={10} style={{ width: "100%" }} value={ques} placeholder='Enter Your Question' onChange={handleQuesChange}></textarea>
            <button className="positive ui button right floated" onClick={handleSaveCode}>Post</button>
        </div>
    )
}
