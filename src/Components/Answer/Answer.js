import React from 'react';
import { NavLink } from 'react-router-dom';
import './Answer.css';

const Answer = (props) => {
  return (
    <NavLink to={`/game/${props.id}/results`}>
      <button className="answer-button">
        <p>{props.answer}</p>
      </button>
    </NavLink>
  )
}

export default Answer;
