import React from 'react';
import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Results.css';
import addGame from '../../utilities/apiCalls';


const Results = ({ newGame, playerSet, player, userScore, addGame, setPastGame, pastGame, addGameAndReset}) => {


  return (
    <section className="results-section">
      <h3>RESULTS</h3>
      <h2>Your Score: ${userScore}</h2>
      <Form className="name-input" playerSet={playerSet} player={player}/>
      <button className="submit-score" onClick={addGameAndReset}>Submit Game</button>
      <Link to="/"><button onClick={newGame} className="new-game-button">Go back</button></Link>
    </section>
  )
}

export default Results;
