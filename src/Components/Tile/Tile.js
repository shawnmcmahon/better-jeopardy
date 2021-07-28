import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tile.css';

const Tile = ({id, q, correct, incorrect, prize}) => {
  return (
    <NavLink to={`/game/${id}`}>
      <article>
        <h2>${prize}</h2>
        <p>{q}</p>
      </article>
    </NavLink>
  )
}

export default Tile;
