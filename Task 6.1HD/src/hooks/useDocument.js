//new 
import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"
/**
 * Custom Hook: useDocument
 *
 * This hook allows you to fetch and listen to a single document in a Firestore collection.
 *
 * @param {string} collection - The name of the Firestore collection containing the document.
 * @param {string} id - The ID of the document to fetch.
 *
 * @returns {Object} - An object containing the document data and any potential error.
 */
export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime document data
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot(snapshot => {
            // need to make sure the doc exists & has data
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            }
            else {
                setError('No such document exists')
            }
        }, err => {
            console.log(err.message)
            setError('failed to get document')
        })

        // unsubscribe on unmount
        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}