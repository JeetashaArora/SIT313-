import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
// styles & images
import "./Sidebar.css"
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from "./Avatar"
/**
 * Sidebar Component
 *
 * This component represents the sidebar of the application, providing navigation links to the
 * dashboard, project creation, and a motivational quotes page. It also displays the user's avatar
 * and display name.
 */
export default function Sidebar() {
    //Destructuring the user object from useAuthContext hook
    const {user} =useAuthContext()
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    {/* Displaying the user's avatar */}
                    <Avatar src={user.photoURL}/>
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        {/* Navigation link for navigating to the dashboard */}
                        <li>
                            <NavLink exact to="/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        {/* Navigation link for navigating to the Create page  */}
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                        {/* Navigation link for navigating to the Quotes page  */}
                        <li>
                            <NavLink to="/quote">
                                <img src={AddIcon} alt="add project icon" />
                                <span>Get Some Motivation</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}