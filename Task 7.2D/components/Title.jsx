import React from 'react'
import { Input } from 'semantic-ui-react'

const InputExampleFluid = (props) => (
  <div >
    <textarea name= {props.name} className="first" cols="3902" rows="2" placeholder={props.placeholderText}></textarea>
  </div>
)

export default InputExampleFluid