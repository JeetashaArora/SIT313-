import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { v4 as uuidv4 } from 'uuid';
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
/**
 * ProjectComments Component
 *
 * This component is responsible for displaying project comments and allowing users
 * to add new comments to a project. It also utilizes user authentication and date formatting.
 *
 * @param {Object} project - The project for which comments are displayed and added.
 */
export default function ProjectComments({ project }) {
    //Destructuring the updateDocument and response from useFirestore hook
    const { updateDocument, response } = useFirestore('projects')

    //Generating a new id for the user
    const uniqueId = uuidv4();

    //Destructuring the user object from useAuthcontext
    const { user } = useAuthContext()

    //Using a state variable for comments
    const [newComment, setNewComment] = useState('')

    /**
     * This function handles the posting of a new comment
     *
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: uniqueId,
        }
        //We are updating the documents and firstly we are spreading through the previous comments and 
        //including them and then we are adding new comments which are stored in 
        //commentToAdd
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        //The comment box becomes empty after the new comment is added
        if (!response.error) {
            setNewComment("")
        }
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>
            {/* Displaying the comments */}
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="comment-content">
                            {comment.content}
                        </div>
                    </li>
                ))}
            </ul>
            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}