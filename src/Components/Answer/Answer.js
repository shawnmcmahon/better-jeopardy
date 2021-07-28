import React from 'react';
import './Answer.css';

const Answer = (props) => {
  const handleClick = () => {
    props.pickAnswer(props.answer);
  }

  return (
    <button className="answer-button" onClick={handleClick}>
      <p>{props.answer}</p>
    </button>
  )
}

export default Answer;
