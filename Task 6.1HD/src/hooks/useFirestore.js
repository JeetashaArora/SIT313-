import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}
/**
 * Reducer function for managing the state of Firestore operations.
 *
 * @param {Object} state - The current state containing document, isPending, error, and success properties.
 * @param {Object} action - The action object that specifies how the state should be updated.
 * @returns {Object} - The new state after applying the action.
 */
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}
/**
 * Custom Hook: useFirestore
 *
 * This hook provides methods to add, delete, and update documents in a Firestore collection.
 *
 * @param {string} collection - The name of the Firestore collection to interact with.
 *
 * @returns {Object} - An object containing the addDocument, deleteDocument, updateDocument functions,
 * and the response object with information about the operation status.
 */
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  const updateDocument = async (id,updates)=>{
    dispatch({type:'IS_PENDING'})
    try {
      const updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({type:'UPDATED_DOCUMENT',payload:updatedDocument})
      return updatedDocument
    }
    catch(err)
    {
      dispatchIfNotCancelled({type:'ERROR',payload:err.message})
      return null
    }

  }
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument ,response }

}

