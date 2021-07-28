import React from 'react';
import './Answer.css';

const Answer = ({answer}) => {
  console.log(answer);
  return (
    <button className="answer-button">
      <p>{answer}</p>
    </button>
  )
}

export default Answer;
