import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>Better Jeopardy!</h1>
      <p className="tagline">Jeopardy for people who aren't good at Jeopardy.</p>
      <Link to="/saved-games"><button className="api-button">Saved Games</button></Link>
    </header>
  )
}

export default Header;
