import React, { useState } from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import Header from '../Header/Header';
import Game from '../Game/Game';
import Form from '../Form/Form'

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
