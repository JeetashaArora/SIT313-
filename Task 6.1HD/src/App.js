import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// styles
import './App.css'

// pages & components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'
import ForgotPassword from './pages/login/ForgotPassword'
import React, { Suspense, lazy } from 'react'
//import Quote from './pages/quote/Quote'
const Quote = lazy(() => import('./pages/quote/Quote'))
/**
 * App Component
 *
 * This is the main application component that handles routing and rendering various pages and components.
 */
function App() {
  const { authIsReady, user } = useAuthContext()
  //returning the template
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              {/* Different Routes */}
              <Route
                path="/" element={user ? <Dashboard /> : <Navigate to="/login" />}
              />

              <Route
                path="/create" element={user ? <Create /> : <Navigate to="/login" />}
              />

              <Route
                path="/quote" element={user ? <Suspense fallback={<div>Loading...</div>}><Quote />   </Suspense> : <Navigate to="/login" />}
              />

              <Route
                path="/reset" element={!user ? <ForgotPassword /> : <Navigate to="/login" />}
              />

              <Route
                path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />}
              />
              <Route
                path="/login" element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup" element={user ? <Navigate to="/" /> : <Signup />}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}
export default App