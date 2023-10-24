import { useState, useEffect } from 'react'
import { projectAuth ,projectStorage,projectFirestore} from '../firebase/config'
import { useAuthContext } from './useAuthContext'
/**
 * Custom Hook: useSignup
 *
 * This hook provides functions and state for user signup and manages the signup process.
 *
 * @returns {Object} - An object containing the signup function, error state, and isPending state.
 */
export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  /**
     * Function to perform user signup.
     *
     * @param {string} email - The user's email for authentication.
     * @param {string} password - The user's password for authentication.
     * @param {string} displayName - The user's display name.
     * @param {File} thumbnail - The user's profile thumbnail image file.
     */
  const signup = async (email, password, displayName,thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }
      //update user thumbnail
      //$ sign is because the thumbnail.name and res.user.uid property will change dynamically
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL();
      // add display name to user
      await res.user.updateProfile({ displayName ,photoURL:imgUrl})
      //create user document
      await projectFirestore.collection("users").doc(res.user.uid).set({
        online:true,
        displayName:displayName,
        photoURL:imgUrl
      })
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

  return { signup, error, isPending }
}