import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile';
import './GameBoard.css';

const GameBoard = ({categories, questions, reset}) => {
  const questionsAndCategories = categories.map((category, index) => {
      return (
        <div key={index} className="category">
        <h1>{category}</h1>
        <div className="tiles">
        {questions.map(question => {
          if (question.category === category) {
            return (
              <Tile
                id={question.question_id}
                key={question.question_id}
                q={question.question}
                correct={question.correct_answer}
                incorrect={question.incorrect_answers}
                prize={question.prize}
              />
            )
          }
          return null;
        })}
        </div>
      </div>
      )
    })

  return (
    <>
    <button className="exit" data-cy="exit" onClick={reset} >Leave Game</button>
    <div className="questions-container">{questionsAndCategories}</div>
    </>
  )
}

export default GameBoard;

Tile.propTypes = {
  id: PropTypes.number.isRequired, 
  q: PropTypes.string.isRequired,
  prize: PropTypes.number.isRequired
}
