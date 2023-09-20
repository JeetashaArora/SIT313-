import Input from "../Input"
import Button from "../Button"
import { useState } from "react"
import '../Header.css'
import { Link } from "react-router-dom"
import Login from "./Login"
import { createAuthUserWithEmailAndPassword, createuserdocfromAuth } from "../utils/firebase"
function Signup() {
  
  const [contact, setcontact] =useState({
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const {displayName,email,password,confirmPassword} =contact
  console.log(contact)
  async function handleClick(event)
  {
   if(password!==confirmPassword)
   {  
    alert('password do not match')
    return;
   }
    try{
    const {user} = await createAuthUserWithEmailAndPassword(email,password)
    await createuserdocfromAuth(user,{displayName})
    console.log(user)
   //Redirection to the login page 
   
    } 
    catch(error){
    console.log('error in creation', error.message)
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
    <div className="header" >
     <br></br>
      <Input
        name = 'displayName'
        type='text'
        placeholder='name'
        onChange ={handlepass}
      />
      <br></br>
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
    
      <Input
        name= 'confirmPassword'
        type='password'
        placeholder='confirmPassword'
        onChange ={handlepass}
        />
      <br></br>
      <button onClick={handleClick}>
      Signup
      </button>
             <br></br>
             <br></br>
      <Link to ='/login'>
      Login
      </Link>
    </div>
)}
export default Signup