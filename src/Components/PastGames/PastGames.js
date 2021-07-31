import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PastGames.css';
import { getPastGames } from '../../utilities/apiCalls'

const PastGames = () => {

  const [pastGameData, setPastGames] = useState([]);

  useEffect(() => {
    getPastGames()
      .then((data) => setPastGames(data))
  }, [])

  console.log(pastGameData.pastGames);

  const renderPastGames = () => {
    return pastGameData.pastGames.map((gameData) => {
      <article className="past-game-card">
        <h3>{gameData.date}</h3>
      </article>
    })
  }

  return (
    <section className="past-games-section">
      <Link to="/"><button className="nav-button">Back</button></Link>
      <h2>Past Games</h2>
      {renderPastGames}
    </section>
  )
}

export default PastGames;
