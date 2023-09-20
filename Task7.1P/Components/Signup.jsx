import Input from "../Input"
import Button from "../Button"
import { useState } from "react"
import '../Header.css'
import { Link, useNavigate } from "react-router-dom"
import Login from "./Login"
import { Navigate } from "react-router-dom"
import { createAuthUserWithEmailAndPassword, createuserdocfromAuth } from "../utils/firebase"
function Signup() {
  const navigate = useNavigate()
  function handlenavigation() {
    navigate("/login")
  }
  const [contact, setcontact] = useState({
    Firstname: '',
    Lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { Firstname, Lastname, email, password, confirmPassword } = contact
  console.log(contact)

  async function handleClick(event) {
    if (password !== confirmPassword) {
      alert('The current password does not match with the password you entered before')
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createuserdocfromAuth(user, { Firstname })
      console.log(user)
      //Redirection to the login page
      if (user)
        handlenavigation()

    }
    catch (error) {
      console.log('error in creation', error.message)
    }
  }

  function handlepass(event) {
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
      <h1>Create your Dev@Deakin account</h1>
      <div className="form header">
        <div className="form-body">
          <div className="username">
            <label className="form__label">First Name </label>
            <Input
              name='Firstname'
              type='text'
              placeholder='First name'
              onChange={handlepass}
            />
          </div>
          <div className="lastname">
            <label className="form__label">Last Name </label>
            <Input
              name='Lastname'
              type='text'
              placeholder='Last name'
              onChange={handlepass}

            />                </div>
          <div className="email">
            <label className="form__label" for="email">Email </label>
            <Input
              name='email'
              type='email'
              placeholder='email'
              onChange={handlepass}

            />                </div>
          <div className="password">
            <label className="form__label" for="password">Password </label>
            <Input
              name='password'
              type='password'
              placeholder='password'
              onChange={handlepass}

            />                </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">Confirm Password </label>
            <Input
              name='confirmPassword'
              type='password'
              placeholder='confirmPassword'
              onChange={handlepass}
            />                </div>
        </div>

        <div class="footer">
          <button onClick={handleClick}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
export default Signup
