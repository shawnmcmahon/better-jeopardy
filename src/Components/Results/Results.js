import React from 'react';
import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Results.css';

const Results = ({ newGame, playerSet, player, userScore, answeredQuestions, addGame}) => {

  // const findCorrect = () => {
  //   const correct = answeredQuestions.reduce((acc, currentQuestion) => {
  //    if (currentQuestion.answered_correct) {
  //      acc.correct++
  //    }
  //   acc.totalQuestions++

  //     return acc
  //   }, {correct: 0, totalQuestions: 0})
  //   return correct
  // }

  return (
    <section className="results-section">
      <h3>RESULTS</h3>
      <h2>Your Score: ${userScore}</h2>
      {/* <h2>{findCorrect()} </h2> */}
      <Form className="name-input" playerSet={playerSet} player={player}/>
      <button className="submit-score" onClick={addGame}>Submit Game</button>
      <Link to="/"><button onClick={newGame} className="new-game-button">Go back</button></Link>
    </section>
  )
}

export default Results;
