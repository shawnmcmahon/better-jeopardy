import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>Better Jeopardy!</h1>
      <p className="tagline">Jeopardy for people who aren't good at Jeopardy.</p>
      <a className="api-link" href="https://github.com/hoomberto/better-jeopardy-API" target="_blank"><button className="api-button">Saved Games</button></a>
    </header>
  )
}

export default Header;
