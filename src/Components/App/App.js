import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header/Header';
import Game from '../Game/Game';

const App = () => {

  return (
  <BrowserRouter>
    <main>
      <Header />
      
      <Game />
    </main>
  </BrowserRouter>
  );
}

export default App;
