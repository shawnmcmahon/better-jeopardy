import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>Better Jeopardy!</h1>
      <p className="tagline">Jeopardy for people who aren't good at Jeopardy.</p>
    </header>
  )
}

export default Header;
