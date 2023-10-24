import { Link } from "react-router-dom"
import "./ProjectList.css"
import React from 'react'
import Avatar from "./Avatar"
/**
 * ProjectList Component
 *
 * This component is responsible for displaying a list of projects, including their names,
 * due dates, and assigned users.
 *
 * @param {Array} projects - An array of projects to be displayed in the list.
 */
function ProjectList({projects}) {
  return (
    <div className="project-list">
        {projects.length===0  && <p>No projects yet!</p>}
        {/* We need a key component for each project because we output it as a parameter */}
        {projects.map(project=>(
            <Link to={`/projects/${project.id}`} key={project.id}>
                <h4>{project.name}</h4>
                <p>Due by : {project.dueDate.toDate().toDateString()}</p>
               <div className="assigned-to">
                <ul>
                {project.assignedUsersList.map(user=>(
                <li key={user.photoURL}>
                        <Avatar src={user.photoURL}/>
                </li>
                ))}
                </ul>
               </div>
            </Link>
        ))}
    </div>
  )
}
export default ProjectList