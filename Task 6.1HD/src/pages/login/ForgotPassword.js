import "./Login.css"
import React, { useState } from 'react'
import { projectAuth} from "../../firebase/config"
import { useNavigate } from "react-router-dom"
/**
 * Component: ForgotPassword
 *
 * This component provides a form for users to request a password reset via email.
 * Users provide their email address, and upon submission, they will receive an
 * email with instructions for resetting their password.
 *
 * @returns {JSX.Element} - The JSX element representing the ForgotPassword component.
 */
function ForgotPassword() {
  const navigate= useNavigate()
    const [email, setEmail] = useState('')
/**
 * Function to handle the form submission for requesting a password reset.
 *
 * @param {Event} e - The form submit event.
 */
    const handleResetSubmit =async(e)=>{
      e.preventDefault()
      projectAuth.sendPasswordResetEmail(email).then(
        data=>{
          alert("Check Your Email")
          navigate("./login")
        }
      ).catch(err=>
      {
        alert(err.code)
      }
      )
    }
    //returning the template
  return (
      <form onSubmit={handleResetSubmit} className="auth-form">
          <h2>Forgot Password...</h2>
          <label>
              <span>email:</span>
              <input
                  required
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
              />
          </label>
         <button className="btn">Reset Password</button>
      </form>
  )
}

export default ForgotPassword