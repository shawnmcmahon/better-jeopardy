import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './PastGames.css';
import { getPastGames } from '../../utilities/apiCalls'
import SavedGameCard from '../SavedGameCard/SavedGameCard';
import Tile from '../Tile/Tile';

const PastGames = () => {

  const [pastGameData, setPastGames] = useState([]);

  useEffect(() => {
    getPastGames()
      .then(data => {
        setPastGames(data.pastGames)
        console.log(pastGameData)
      })
      .catch((err) => console.log(err))
  }, [])

  const renderPastGames = () => {
    return pastGameData.sort((a, b) => {return b.score-a.score}).map(data => {
      const { game_id, date, questions, score, name } = data;
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
  // if (!!pastGameData.length) {
  //   const theDataWeNeed = pastGameData
  //
  //   console.log('hi', theDataWeNeed);
  //   return renderPastGames = theDataWeNeed.map((gameData, index) => {
  //     console.log('mapData', gameData)
  //     const {date, game_id, questions, score} = gameData;
  //     return (
  //     <div>
  //       <SavedGame
  //           date={date}
  //           key={game_id}
  //           id={game_id}
  //           questions={questions}
  //           score={score}
  //         />
  //         {/* <SavedGame
  //           date={gameData[index].date}
  //           key={gameData[index].game_id}
  //           id={gameData[index].game_id}
  //           questions={gameData[index].questions}
  //           score={gameData[index].score}
  //         />  */}
  //     </div>
  //
  //     )
  //   })
  //   // return renderPastGames;
  // }

  return (
    <section className="past-games-section">
      <Link to="/"><button className="back-button">Go Back</button></Link>
      <h2>Past Games</h2>
      {pastGameData.length ? <div>{renderPastGames()}</div> : <h3>Loading...</h3>}
    </section>
  )
}

export default PastGames;

SavedGameCard.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}
