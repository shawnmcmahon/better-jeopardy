import React from 'react';
import './Answer.css';

const Answer = (props) => {
  const handleClick = () => {
    props.pickAnswer(props.answer);
  }

  return (
    <button className="answer-button" onClick={handleClick}>{props.answer}</button>
  )
}

export default Answer;
