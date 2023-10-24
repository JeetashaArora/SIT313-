import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
/**
 * Custom Hook: useLogin
 *
 * This hook provides functions and state for user login and manages the login process.
 *
 * @returns {Object} - An object containing the login function, isPending state, and error state.
 */
export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
/**
   * Function to perform user login.
   *
   * @param {string} email - The user's email for authentication.
   * @param {string} password - The user's password for authentication.
   */
  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      //update online status
      //we are using the object of firestore and referencing a particular collectioncalled users 
      //and inside that we are referencing a particular document and updating it
      await projectFirestore.collection('users').doc(res.user.uid).update({ online: true })
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}