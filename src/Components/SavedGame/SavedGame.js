import React from 'react';
import './SavedGame.css';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'


const SavedGame = ({date, id, questions, score, name}) => {

  const questionContainer = questions.map(question => {
    return (

        <li>{question.question} | {question.answered_correct ? "Answered Correct" : "Incorrect Answer"}</li>

    )
  })

  return (
    <div className="saved-game-wrapper">
      <article className="saved-game">
        <h2>Player Name: {name}</h2>
        <h2 className="date">Played on: {dayjs(date).format("MM/DD/YYYY")}</h2>
        <h2 className="score">Score: ${score}</h2>
        <ul className="questions">{questionContainer}</ul>
      </article>
      <Link to="/"><button className="back-button">Back</button></Link>
    </div>
  )
}

export default SavedGame;
