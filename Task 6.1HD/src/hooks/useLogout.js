import { useEffect, useState } from 'react'
import { projectAuth,projectFirestore } from '../firebase/config'
import { useAuthContext} from './useAuthContext'
/**
 * Custom Hook: useLogout
 *
 * This hook provides functions and state for user logout and manages the logout process.
 *
 * @returns {Object} - An object containing the logout function, error state, and isPending state.
 */
export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch,user } = useAuthContext()
  //Function for logging out the user
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      //update online status
      const {uid} = user
      //we are using the object of firestore and referencing a particular collectioncalled users 
      //and inside that we are referencing a particular document and updating it
      await projectFirestore.collection('users').doc(uid).update({online:false})
      // sign the user out
      await projectAuth.signOut()
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
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

  return { logout, error, isPending }
}