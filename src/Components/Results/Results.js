import React from 'react';
import { Link } from 'react-router-dom'
import './Results.css';

const Results = ({ newGame }) => {
  return (
    <section className="results-section">
      <h3>RESULTS</h3>
      <Link exact to="/"><button onClick={newGame} className="new-game-button">Go back</button></Link>
    </section>
  )
}

export default Results;
