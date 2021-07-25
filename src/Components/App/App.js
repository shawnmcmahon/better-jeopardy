import React from 'react';
import './App.css';

import Game from '../Game/Game';

const App = () => {
  return (
    <main>
      <Game />
      {
        //App renders:
          //Game
            //Game renders choose difficulty form, then game board
              //game board renders questions & answers
          //Header at some point
      }
    </main>
  );
}

export default App;
