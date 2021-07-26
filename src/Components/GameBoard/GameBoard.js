import React from 'react';
import './GameBoard.css';

import Tile from '../Tile/Tile';

const GameBoard = ({questions}) => {
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
    <div className="tiles">{tiledQuestions}</div>
  )
}

export default GameBoard;
