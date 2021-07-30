import React from 'react';
import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Game from '../Game/Game';

const App = () => {
  return (
    <main>
      <Header />
      <Game />
      <Footer />
    </main>
  );
}

export default App;
