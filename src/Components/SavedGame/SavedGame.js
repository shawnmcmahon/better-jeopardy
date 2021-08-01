import React from 'react';
import './SavedGame.css';


const SavedGame = ({date, id, questions, score}) => {
  return (
    <div className="saved-game-wrapper"> 
      <article> 
        <h2 className="id">{id}</h2>
        <h2 className="questions">{questions}</h2>
        <h2 className="date">{date}</h2> 
        <h2 className="score">{score}</h2>
      </article>
    </div>
  )
}

export default SavedGame;