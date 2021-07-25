import React, { Component } from 'react';
import './Game.css';

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
        //Conditional -- if numberOfCategories null, render this
        <section className="categories-selector">
          //options: 3 and 6
        </section>
        //otherwise render GameBoard
    )
  }
}

export default Game;
