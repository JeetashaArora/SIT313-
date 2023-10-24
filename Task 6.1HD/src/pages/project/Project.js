import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

// styles
import './Project.css'
import ProjectSummary from "./ProjectSummary"
import ProjectComments from "./ProjectComments"
/**
 * Project Component
 *
 * This component is responsible for displaying detailed information about a project
 * based on the project's ID obtained from the URL parameters. It uses the 'useParams'
 * hook to retrieve the project ID and the 'useDocument' hook to fetch project data.
 */
export default function Project() {
  const { id } = useParams()
  //destructuring the document and error from useDocument
  const { document, error } = useDocument('projects', id)
  //Displaying the error
  if (error) {
    return <div className="error">{error}</div>
  }

  //Displaying the loading component 
  if (!document) {
    return <div className="loading">Loading...</div>
  }
  //returning template
  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  )
}