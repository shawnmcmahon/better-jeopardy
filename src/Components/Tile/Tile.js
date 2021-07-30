import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Tile.css';

const Tile = ({id, q, correct, incorrect, prize}) => {
  return (
    <div className="tile-wrapper">
      <Link to={`/game/${id}`}>
        <article>
          <h2>${prize}</h2>
          <p>{q}</p>
        </article>
      </Link>
    </div>
  )
}

export default Tile;
