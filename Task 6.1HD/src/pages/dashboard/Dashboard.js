import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard() {
  //destructuring the user object from useAuthContext hook
  const { user } = useAuthContext()

  //destructuring the user documents and error from useCollections hook
  const { documents, error } = useCollection('projects')

  //Making the state for filter function
  const [filter, setFilter] = useState('all')

  //Function for changing the filter 
  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  //Filtering the projects by using the filter function
  const projects = documents ? documents.filter(document => {
    //using switch case for filtering the projects
    switch (filter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if (u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, filter)
        return document.category === filter
      default:
        return true
    }
  }) : null

  //returning the template
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}