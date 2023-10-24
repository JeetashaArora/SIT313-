import { useCollection } from "../hooks/useCollection"
import Avatar from "./Avatar"
import "./OnlineUsers.css"
import React from 'react'
/**
 * OnlineUsers Component
 *
 * This component displays a list of online users, including their avatars and display names.
 */
function OnlineUsers() {
    //destructuring the documents and error from UseCollection hook
    const { documents, error } = useCollection('users')
    //returning the template
    return (
        <div className="user-list">
            <h2>All Users</h2>
            {/* Displaying the error */}
            {error && <div className="error">{error}</div>}
            {/* Mapping through the documents array to display all the users */}
            {documents && documents.map(user => (
                <div key={user.id} className="user-list-item">
                    {user.online && <span className="online-user"></span>}
                    <span>{user.displayName}</span>
                    {/* Displaying the avatar of the user */}
                    <Avatar src={user.photoURL} />
                </div>
            ))}

        </div>
    )
}

export default OnlineUsers