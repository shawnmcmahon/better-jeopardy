import React from 'react';
import './GameBoard.css';

import Tile from '../Tile/Tile';

const GameBoard = ({categories, questions, reset}) => {

  const questionsAndCategories = categories.map(category => {
      return <div>
        <h1>{category}</h1>
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
    })


  const tiledQuestions = questions.map(question => {
    return <Tile
      id={question.question_id}
      key={question.question_id}
      q={question.question}
      correct={question.correct_answer}
      incorrect={question.incorrect_answers}
      prize={question.prize} />
  })

  return (
    <>
    <button className="exit" data-cy="exit" onClick={reset} >EXIT GAME</button>
    {questionsAndCategories}
    </>
  )
}

export default GameBoard;
