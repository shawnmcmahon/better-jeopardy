import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Results.css';
import addGame from '../../utilities/apiCalls';


const Results = ({ newGame, playerSet, player, userScore, addGame, setPastGame, pastGame, addGameAndReset}) => {
  const [notifyUser, setNotifyUser] = useState('')

  const checkThenAdd = () => {
    if (!player) {
      setNotifyUser('Please provide name to submit a record of game.')
      return
    }
    setNotifyUser('')
    addGameAndReset()
  }

  return (
    <section className="results-section">
      <h2>RESULTS</h2>
      <h2>Your Score: ${userScore}</h2>
      {!!notifyUser && <h3>{notifyUser}</h3>}
      <Form className="name-input" playerSet={playerSet} player={player}/>
      <button className="submit-score" onClick={checkThenAdd}>Submit Game</button>
      <Link to="/"><button onClick={newGame} className="new-game-button">Go Home</button></Link>
    </section>
  )
}

export default Results;

Form.PropTypes = {
  playerSet: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired
}
