import Avatar from "../../components/Avatar"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import { useNavigate } from "react-router-dom"

/**
 * ProjectSummary Component
 *
 * This component is responsible for displaying a summary of a project, including its
 * name, creator, due date, details, assigned users, and an option to mark the project as complete.
 *
 * @param {Object} project - The project details to be summarized.
 */
export default function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    /**
    * This function handles the click event to mark the project as complete
    *
    * @param {Event} e - The click event on the "Mark as Complete" button.
    */
    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/')
    }
    //returning the template
    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p>By : {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && (
                <button className="btn" onClick={handleClick}>Mark as Complete</button>
            )}
        </div>
    )
}