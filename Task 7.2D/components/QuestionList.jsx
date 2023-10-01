import React, { useState } from 'react';
import QuestionCard from "./Question Card"
import { Card, Icon } from 'semantic-ui-react'
import { db } from '../utility/firebase';
import { deleteDoc } from 'firebase/firestore';

    
    
const QuestionList = ({ questions }) => {
    const [filterCriteria, setFilterCriteria] = useState({
        date: '',
        tag: '',
        title: '',
      });
    
      const [filteredQuestions, setFilteredQuestions] = useState(questions);

      const filterQuestions = () => {
        const { date, tag, title } = filterCriteria;
    
        // Perform filtering based on date, tag, and title
        const filtered = questions.filter((question) => {
          return (
            (date === '' || question.Date.includes(date)) &&
            (tag === '' || question.Tags.includes(tag)) &&
            (title === '' || question.Title.toLowerCase().includes(title.toLowerCase()))
          );
        });
    
        // Update the filtered questions state
        setFilteredQuestions(filtered);
      };

  return (
    <div>
      <h2>Question List</h2>
      {/* Add filter inputs here */}
      <div>
        <input
          type="text"
          placeholder="Date"
          value={filterCriteria.date}
          onChange={(e) => setFilterCriteria({ ...filterCriteria, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tag"
          value={filterCriteria.tag}
          onChange={(e) => setFilterCriteria({ ...filterCriteria, tag: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={filterCriteria.title}
          onChange={(e) => setFilterCriteria({ ...filterCriteria, title: e.target.value })}
        />
        <button onClick={filterQuestions}>Filter</button>
      </div>
      {(filterCriteria.date === '' && filterCriteria.tag === '' && filterCriteria.title === '') ?
        questions.map((question) => (
           <QuestionCard
           key={question.id}
           title={question.Title}
           problem={question.Problem}
           tags={question.Tags}
           date={question.Date}
           id={question.id}
           
         />
            
        )):
        filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              title={question.Title}
              problem={question.Problem}
              tags={question.Tags}
              date={question.Date}
              id={question.id}
            />
          ))
        }

      
    </div>
  );
};

export default QuestionList;
