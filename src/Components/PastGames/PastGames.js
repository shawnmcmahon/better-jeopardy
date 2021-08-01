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
    return renderPastGames = theDataWeNeed[0].map((gameData, index) => {
      console.log('mapData', gameData)
      return (
      <div>
        <SavedGame
            date={gameData.date}
            key={gameData.game_id}
            id={gameData.game_id}
            questions={gameData.questions}
            score={gameData.score}
          /> 
          {/* <SavedGame
            date={gameData[index].date}
            key={gameData[index].game_id}
            id={gameData[index].game_id}
            questions={gameData[index].questions}
            score={gameData[index].score}
          />  */}
      </div> 
        
      )
    })
    // return renderPastGames;
  }
  


  return (
    <section className="past-games-section">
      <Link to="/"><button className="nav-button">Back</button></Link>
      <h2>Past Games</h2>
      {!!pastGameData.length && {renderPastGames}}
    </section>
  )
}

export default PastGames;
