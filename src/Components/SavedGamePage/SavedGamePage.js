import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import SavedGame from '../SavedGame/SavedGame';
import { getSingleGame } from '../../utilities/apiCalls'

const SavedGamePage = () => {
  const { game_id } = useParams();
  const [gameInfo, setGameInfo] = useState('')

  useEffect(() => {
    getSingleGame(parseInt(game_id))
    .then(data => {
      setGameInfo(data)
    })
  }, [game_id])

  return (
    <>
      {!gameInfo ? <h2>Loading...</h2> : <SavedGame date={gameInfo.date} id={gameInfo.id} questions={gameInfo.questions} score={gameInfo.score} name={gameInfo.name} />}
    </>
  )
}

export default SavedGamePage

SavedGame.propTypes= {
  date: PropTypes.string.isRequired, 
  questions: PropTypes.array.isRequired, 
  score: PropTypes.number.isRequired, 
  name: PropTypes.string.isRequired
}
