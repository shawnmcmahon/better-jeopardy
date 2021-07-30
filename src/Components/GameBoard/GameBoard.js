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

  return (
    <>
<<<<<<< HEAD
      <button className="exit" data-cy="exit" onClick={reset} >EXIT GAME</button>
      <div className="tiles">{tiledQuestions}</div>
=======
    <button className="exit" data-cy="exit" onClick={reset} >EXIT GAME</button>
    <div>{questionsAndCategories}</div>
>>>>>>> 0330e60210fa4f37b82d2d58527a715b1c32b0e6
    </>
  )
}

export default GameBoard;
