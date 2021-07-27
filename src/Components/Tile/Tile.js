import React from 'react';
import './Tile.css';

const Tile = ({id, q, correct, incorrect, prize}) => {
  return (
    <article>
      <h2>${prize}</h2>
      <p>{q}</p>
    </article>
  )
}

export default Tile;
