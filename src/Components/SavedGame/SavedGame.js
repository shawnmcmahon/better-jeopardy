import React from 'react';
import './SavedGame.css';
import dayjs from 'dayjs'


const SavedGame = ({date, id, questions, score}) => {

  const questionContainer = questions.map(question => {
    return (

        <li>{question.question} | {question.answered_correct ? "Answered Correct" : "Incorrect Answer"}</li>

    )
  })

  return (
    <div className="saved-game-wrapper">
      <article className="saved-game">
        <h2 className="date">Played on: {dayjs(date).format("MM/DD/YYYY")}</h2>
        <h2 className="score">Score: ${score}</h2>
        <ul className="questions">{questionContainer}</ul>
      </article>
    </div>
  )
}

export default SavedGame;
