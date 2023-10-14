import React from 'react'
import Navbar from "./Navbar"
import { Outlet } from 'react-router-dom'
function Navigation() {
  return (
    <div><Navbar/> <br></br>
    <Outlet/></div>
  )
}

export default Navigation