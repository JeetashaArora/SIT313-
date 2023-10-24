import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"
/**
 * Custom Hook: useCollection
 *
 * This hook allows you to fetch and listen to a collection of documents in Firestore.
 *
 * @param {string} collection - The name of the Firestore collection to query.
 * @param {Array} _query - An optional array representing query conditions (e.g., where clauses).
 * @param {Array} _orderBy - An optional array representing order-by conditions for sorting.
 *
 * @returns {Object} - An object containing the documents from the collection and any potential error.
 */
export const useCollection = (collection, _query, _orderBy) => {
  //Creating a state for documents
  const [documents, setDocuments] = useState(null)
  //Creating a state for the error
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, query, orderBy])

  return { documents, error }
}