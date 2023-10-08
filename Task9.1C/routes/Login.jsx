import Input from "../Input"
import Button from "../Button"
import '../Header.css'
import { useState } from "react"
import { Link, Navigate, redirect, useLocation, useNavigate } from 'react-router-dom'
import { signInWithGooglePopup, createuserdocfromAuth, userDocRef, signinAuthUserWithEmailAndPassword } from '../utils/firebase'
import { reload } from "firebase/auth"
import Label from "../Label"

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [contact, setcontact] = useState({
    email: '',
    password: ''
  })
  const { email, password } = contact
  console.log(contact)
  function handleNavigate() {
    navigate("/home")
  }
  async function handleClick(event) {
    try {
      const response = await signinAuthUserWithEmailAndPassword(email, password)
      console.log(response.user);
      if (response) { handleNavigate() }

    }
    catch (error) {
      if (error = "auth/invalid-login-credentials") {
        setError("Invalid Credentials")
      }
      console.log('error in login', error.message)

    }
  }
  function handleLogin(event) {
    const value = event.target.value
    const name = event.target.name

    setcontact((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }
  return (

    <div className="header">
      <button className="my-2 sign_up_btn_shift ">
        <Link to='/signup'>
          Signup</Link>
      </button>

      <br></br>
      Your Email Id <br></br>
      <Input
        name='email'
        type='email'
        placeholder='email'
        onChange={handleLogin}

      />
      <br></br>
      Your Password <br></br>
      <Input
        name='password'
        type='password'
        placeholder='password'
        onChange={handleLogin}
      />
      <br></br>
      <Label text={error} />

      <button className="my-2" onClick={handleClick}>
        Login in
      </button>
      <br></br>
      <br>
      </br>
    </div>
  )
}
export default Login