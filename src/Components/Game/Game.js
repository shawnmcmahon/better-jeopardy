import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './Game.css';

import GameBoard from '../GameBoard/GameBoard';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      numberOfCategories: null
    }
  }

  //component did mount to fetch questions?

  render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route
                exact
                path='/'
                render={() => {
                  return (
                    <section className="categories-selector">
                      //options: 3 and 6
                    </section>
                  );
                }}
              />
            <Route
                exact
                path='/game'
                render={() => {
                  return (
                    <GameBoard />
                  );
                }}
              />
          </Switch>
        </BrowserRouter>
    )
  }
}

export default Game;
