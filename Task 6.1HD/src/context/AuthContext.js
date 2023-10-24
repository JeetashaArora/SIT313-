import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()
/**
 * Reducer function for managing the user's authentication state.
 *
 * @param {Object} state - The current state containing user and authIsReady properties.
 * @param {Object} action - The action object that specifies how the state should be updated.
 * @returns {Object} - The new state after applying the action.
 */
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}
/**
 * Authentication Context Provider Component.
 *
 * This component provides the authentication context to its children.
 *
 * @param {Object} children - The child components that need access to the authentication context.
 */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  console.log('AuthContext state:', state)
  //Returing the AuthContextProvider function
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}