import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types';
import SavedGame from '../SavedGame/SavedGame';
import { getSingleGame } from '../../utilities/apiCalls'
// import 'SavedGamePage.css'

const SavedGamePage = ({ id }) => {
  const [gameInfo, setGameInfo] = useState('')

  useEffect(() => {
    getSingleGame(id)
    .then(data => {
      setGameInfo(data)
    })
  }, [])

  return (
    <>
      {!gameInfo ? <h2>Loading...</h2> : <SavedGame date={gameInfo.date} id={gameInfo.id} questions={gameInfo.questions} score={gameInfo.score} name={gameInfo.name} />}
    </>
  )
}

export default SavedGamePage

SavedGame.PropTypes= {
  date: PropTypes.string.isRequired, 
  questions: PropTypes.array.isRequired, 
  score: PropTypes.number.isRequired, 
  name: PropTypes.string.isRequired
}