import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PastGames.css';
import { getPastGames } from '../../utilities/apiCalls'
import SavedGame from '../SavedGame/SavedGame';
import Tile from '../Tile/Tile';

const PastGames = () => {

  const [pastGameData, setPastGames] = useState([]);

  useEffect(() => {
    getPastGames()
      .then((data) => {
        setPastGames(data)
        // console.log('data', data)
      })
      .catch((err) => console.log(err))
  }, [])

  let renderPastGames
  if (!!pastGameData.pastGames) {
    const theDataWeNeed = [pastGameData.pastGames];
    console.log('hi', theDataWeNeed);
    renderPastGames = theDataWeNeed.map((gameData) => {
      return (
      <SavedGame
        date={gameData.date}
        key={gameData.game_id}
        id={gameData.game_id}
        questions={gameData.questions}
        score={gameData.score}
        />    
      )
    })
    return renderPastGames;
  }
  


  return (
    <section className="past-games-section">
      <Link to="/"><button className="nav-button">Back</button></Link>
      <h2>Past Games</h2>
      {!!pastGameData.length && <div>{renderPastGames}</div>}
    </section>
  )
}

export default PastGames;
