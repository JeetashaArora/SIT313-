import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'
/**
 * Component: Signup
 *
 * This component provides a sign-up form for new users. Users can enter their
 * email, password, display name, and upload a profile thumbnail. Upon submission,
 * a new user account is created.
 *
 * @returns {JSX.Element} - The JSX element representing the Signup component.
 */
export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const {signup, isPending, error} = useSignup()
     /**
     * Function to handle the form submission for signing up a new user.
     *
     * @param {Event} e - The form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName, thumbnail)
        signup(email, password, displayName, thumbnail)
    }
    /**
    * This function uploads the image uploaded by the user into the firebase storage
    *
    * @param {Event} e - The file input change event.
    */
    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
        
        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image')
            return
        }
        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100kb')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
    }
    //returing the template
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>sign up</h2>
            <label>
                <span>email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>display name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Profile thumbnail:</span>
                <input
                    required
                    type="file"
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button className="btn">Sign up</button>}
            {isPending && <button className="btn" disabled>loading</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}