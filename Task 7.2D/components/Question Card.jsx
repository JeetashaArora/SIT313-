
import { doc,deleteDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react'
import { db } from '../utility/firebase';

const QuestionCard = ({ title, problem, tags ,date,id}) => {
  console.log(problem,"problemCheck");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };
  const handleDelete = async (questionId) => {
    try {
      // Reference the document to be deleted
      const questionDocRef = doc(db, 'Questions', questionId);
  
      // Delete the document from Firestore
      await deleteDoc(questionDocRef);
  
      // Update the state to remove the deleted question
      const updatedQuestions = questions.filter((question) => question.id !== questionId);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question: ', error);
    }
  }

  return (
    
    <Card fluid>
      <Card.Content >
        <Card fluid color='red' header={title} />
        <Card.Meta>Tags: {tags}</Card.Meta>
        <Card.Meta>Date: {date}</Card.Meta>
        {isExpanded ? (
          <Card.Description>{problem}</Card.Description>
        ) : (
          <Card.Description>{problem?problem.substring(0, 50):""}</Card.Description>
        )}
        <div>
          <button className='btn btn-read' onClick={handleReadMoreClick}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
        <div style={{ float: 'right', cursor: 'pointer' }}>
          <Icon name='trash' style={{ margin: '15px' }} size='big' onClick={()=>handleDelete(id)} />
        </div>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;