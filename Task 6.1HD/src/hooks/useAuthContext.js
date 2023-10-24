import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
/**
 * Custom Hook: useAuthContext
 *
 * This hook allows components to access the authentication context provided by the AuthContextProvider.
 *
 * @returns {Object} - The authentication context containing user information and authentication state.
 */
export const useAuthContext = () => {
  //Using the useContext hook to use the AuthContext
  const context = useContext(AuthContext)
  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}