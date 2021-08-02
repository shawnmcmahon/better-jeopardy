import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './PastGames.css';
import { getPastGames } from '../../utilities/apiCalls'
import SavedGameCard from '../SavedGameCard/SavedGameCard';

const PastGames = () => {

  const [pastGameData, setPastGames] = useState([]);

  useEffect(() => {
    getPastGames()
      .then(data => {
        setPastGames(data.pastGames)
      })
      .catch((err) => console.log(err))
  }, [])

  const renderPastGames = () => {
    return pastGameData.sort((a, b) => {return b.score-a.score}).map(data => {
      const { game_id, date, score, name } = data;
      return (
        <SavedGameCard
          key={game_id}
          date={date}
          id={game_id}
          score={score}
          name={name}
        />
      )
    })
  }
<<<<<<< HEAD
  
=======
>>>>>>> ff5b72f1189ac9fd6efd9a48a00b6a6612ce262e

  return (
    <section className="past-games-section">
      <Link to="/"><button className="back-button">Go Back</button></Link>
      <h2>Past Games</h2>
      {pastGameData.length ? <div>{renderPastGames()}</div> : <h3>Loading...</h3>}
    </section>
  )
}

export default PastGames;

<<<<<<< HEAD
SavedGameCard.propTypes = {
=======
SavedGameCard.PropTypes = {
  key: PropTypes.number.isRequired,
>>>>>>> ff5b72f1189ac9fd6efd9a48a00b6a6612ce262e
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}
