import React from 'react';
import './GameBoard.css';

import Tile from '../Tile/Tile';

const GameBoard = ({categories, questions, reset}) => {
  const questionsAndCategories = categories.map(category => {
      return <div className="category">
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
        })}
        </div>
      </div>
    })

  return (
    <>
    <button className="exit" data-cy="exit" onClick={reset} >EXIT GAME</button>
    <div className="questions-container">{questionsAndCategories}</div>
    </>
  )
}

export default GameBoard;
