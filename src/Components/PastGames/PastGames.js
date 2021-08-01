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
        setPastGames(data.pastGames)
        // console.log('data', data)
      })
      .catch((err) => console.log(err))
  }, [])

  let renderPastGames
  if (!!pastGameData) {
    const theDataWeNeed = pastGameData
    
    console.log('hi', theDataWeNeed);
    return renderPastGames = theDataWeNeed.map((gameData, index) => {
      console.log('mapData', gameData)
      const {date, game_id, questions, score} = gameData;
      return (
      <div>
        <SavedGame
            date={date}
            key={game_id}
            id={game_id}
            questions={questions}
            score={score}
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
