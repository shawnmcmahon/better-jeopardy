import React from 'react';
import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Results.css';

const Results = ({ newGame, playerSet, player }) => {
  return (
    <section className="results-section">
      <h3>RESULTS</h3>
      <Form className="name-input" playerSet={playerSet} player={player}/>
      <button className="submit-score">Submit Game</button>
      <Link to="/"><button onClick={newGame} className="new-game-button">Go back</button></Link>
    </section>
  )
}

export default Results;
