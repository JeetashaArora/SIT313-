import Input from "../Input"
import Button from "../Button"
import '../Header.css'
import { useState } from "react"
import {Link} from 'react-router-dom'
import {signInWithGooglePopup,createuserdocfromAuth,userDocRef, signinAuthUserWithEmailAndPassword} from '../utils/firebase'

function Login() {
  
  const [contact, setcontact] =useState({
    email:'',
    password:''
  })
   const {email,password}= contact
   console.log(contact)
   async function handleClick(event)
  {
    try{
    const response = await signinAuthUserWithEmailAndPassword(email,password)
    console.log(response)
    } 
    catch(error){
    console.log('error in login', error.message)
    }
  }
  function handlepass(event)
  {
    const value =event.target.value
    const name =event.target.name
    
     setcontact( (prevalue)=>
     {
      return{
        ...prevalue,
        [name]:value
    }
     })
  }
  return (
  
    <div className="header">
     
    <Input
      name = 'email'
      type='email'
      placeholder='email'
      onChange ={handlepass}

    />
    <br></br>
    <Input
        name= 'password'
        type='password'
        placeholder='password'
        onChange ={handlepass}
        />
      <br></br>
      <button onClick={handleClick}>
        Login in
      </button>
      <br></br>
      <br>

</br>
      <Link to= '/signup'>
        Signup Instead
      </Link>

    </div>
)}
export default Login