import React from 'react'
import {auth} from "./utils/firebase"
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate=useNavigate();
    const handleLogout = async()=>{
        try{
            await auth.signOut()
            navigate("/signup")
            
        }
        catch(error)
        {
            console.log("Error :- "+error);
        }
    };
  return (
    <button onClick={handleLogout}>Signout</button>
  )
}

export default Logout