import React from 'react'

export default function Textbox(props) {
  return (
    <div >
    {props.heading} :
    <br></br> 
    <textarea rows={props.rows} cols={props.cols} placeholder={props.placeholder}></textarea>
    
    </div>
  )
}
