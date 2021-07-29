import React from 'react';
import { Link } from 'react-router-dom'
import './Results.css';

const Results = () => {
  return (
    <>
    <h3>RESULTS</h3>
      <Link exact to="/"><button>Go back</button></Link>
    </>
  )
}

export default Results;
