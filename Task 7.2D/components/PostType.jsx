
import React, { Component, useState } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import Question from './Question';
import Article from './Article';
const NewPost=()=>{
const [type,setType]=useState("question");
const handlePostChange=(e,{value})=>setType(value)
return (
  <Form className='form container'>
  {/* <Header className=" upline " text="New Post"></Header> */}
  <h5 className='bg_header'>New Post</h5>
    <div className='inlineTextbox'>
    <Form.Field>
      Selected one option 
    </Form.Field>
    <br></br>
    <Form.Field>
      <Radio
        label='Question'
        name='post'
        value='question'
        checked={type === 'question'}
        onChange={handlePostChange}
      />
    </Form.Field>
    <Form.Field>
      <Radio
        label='Article'
        name='post'
        value='article'
        checked={type === 'article'}
        onChange={handlePostChange}
      />
    </Form.Field>
    </div>
    {type==="question"? <Question/>:<Article/>}
  </Form>
)
};
export default NewPost;

