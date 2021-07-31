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

  return (
    <section className="past-games-section">
      <Link exact to="/"><button className="nav-button">Back</button></Link>
      <h2>Past games!</h2>
    </section>
  )
}

export default PastGames;
