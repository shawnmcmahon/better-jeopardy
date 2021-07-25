import React from 'react';
import './GameBoard.css';

import Tile from '../Tile/Tile';

const GameBoard = ({numberOfCategories}) => {
  return (
    <h2>{numberOfCategories}</h2>
  )
}

export default GameBoard;
