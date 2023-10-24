import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import 'animate.css';
import TrackVisibility from 'react-on-screen';

// styles & images
import './Navbar.css'
import Temple from '../assets/temple.svg'
/**
 * Navbar Component
 *
 * This component represents the navigation bar of the application. It includes the application logo,
 * login and signup links when the user is not logged in, and a logout button when the user is logged in.
 */
export default function Navbar() {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();
    return (
        <nav className="navbar">

            <ul>
                <TrackVisibility className='logo'>
                    {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__fadeInDown" : ""} >
                            <li className="logo">
                                <img src={Temple} alt="dojo logo" />
                                <span>Manage it Well!</span>
                            </li>
                        </div>
                    }
                </TrackVisibility>

                {/* If the user is not logged in or signed up we will 
                show these navlinks */}
                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
                {user && (
                    <li>

                        {/* This button will only be shown if we are not currently trying to logout
                which means that is pending is false */}
                        {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                        {/* When we click on logout button then isPending becomes true for some time.
                    That time user will be shown a differnt button  */}
                        {isPending && <button className="btn">Logging out...</button>}
                    </li>
                )}
            </ul>
        </nav>
    )
}