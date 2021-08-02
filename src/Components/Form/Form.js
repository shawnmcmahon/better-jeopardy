import React from 'react';
import './Form.css';

const Form = ({player, playerSet}) => {

  return (
      <input
        type="text"
        className="player-name"
        onChange={(event) => playerSet(event.target.value)}
        value={player}
        placeholder="Enter Player Name"
      />
  )
}

export default Form;
