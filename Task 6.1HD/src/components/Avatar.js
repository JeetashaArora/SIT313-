import "./Avatar.css"
import React from 'react'

function Avatar({src}) {
  //returning the template
  return (
    <div className="avatar">
       <img src={src} alt="user avatar"/>
    </div>
  )
}

export default Avatar