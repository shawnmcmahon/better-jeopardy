import React from 'react';
import { Link } from 'react-router-dom'
import './Results.css';

const Results = ({ newGame }) => {
  return (
    <>
    <h3>RESULTS</h3>
      <Link exact to="/"><button onClick={newGame}>Go back</button></Link>
    </>
  )
}

export default Results;
