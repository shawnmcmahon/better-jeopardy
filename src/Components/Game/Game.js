import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './Game.css';

import GameBoard from '../GameBoard/GameBoard';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      numberOfCategories: 6
    }
  }

  //component did mount to fetch questions?

  //handler on selector to update numberOfCategories in state

  //handler on start game button to change route & start game

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
                      <label for="numberOfCategories">Number of Categories:</label>
                      <select name="numberOfCategories" id="numberOfCategories">
                        <option value="6">6</option>
                        <option value="3">3</option>
                      </select>
                      <button id="startGameBtn">Start Game</button>
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
