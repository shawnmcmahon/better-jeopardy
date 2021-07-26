import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './Game.css';

import GameBoard from '../GameBoard/GameBoard';
import { getQuestions } from '../../utilities/apiCalls';
import { getRandomIndex } from '../../utilities/utils'

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      game: {
        numCategories: 0,
        categories: [],
        selectedCategories: [],
        categoryQuestions: [],
        roundOver: false,
        answeredQuestions: [],
        userInputNumber: 0,
        userScore: 0
      }
    }
  }

  //component did mount to fetch questions?
  componentDidMount = () =>  {
    getQuestions()
      .then(data => {
        this.setState({questions: data.questions})
        this.populateAllCategories()
      })
  }


  //handler on selector to update numberOfCategories in state
  updateNumberOfCategories = (event) => {

    this.populateRandomCategories(parseInt(event.target.value))

    // this.setState((prevState) => {
    //
    //   return ({game: {...prevState.game, numCategories: event.target.value}})
    //
    // })
    // update categories
  }

  populateRandomCategories = () => {
    const cats = this.state.game.categories;
    console.log('cats', cats)
    const generatedCategories = []
    console.log(this)
    while (generatedCategories.length < parseInt(this.state.game.numCategories)) {
      const randomCategory =  cats[Math.floor(Math.random() * cats.length)]
      console.log('randomCategory', randomCategory)
      if (!generatedCategories.includes(randomCategory)) {
        generatedCategories.push(randomCategory)
      }
    }
    console.log('generatedCategories', generatedCategories)


  }

  //function that inputs all available categories to state
  populateAllCategories = () => {
    const categories = this.state.questions.reduce((allCategories, currentQuestion) => {
        if (!allCategories.includes(currentQuestion.category)) {
          allCategories.push(currentQuestion.category)
        }
        return allCategories
    }, [])
    this.setState((prevState) => {
      return ({game: {...prevState.game, categories: categories}})
    })
  }

  // function that picks three random categories
  populateRandomCategories = (num) => {
    const cats = this.state.game.categories;
    const generatedCategories = []
    while (generatedCategories.length < num) {
      const randomCategory =  cats[Math.floor(Math.random() * cats.length)]
      if (!generatedCategories.includes(randomCategory)) {
        generatedCategories.push(randomCategory)
      }
    }
    console.log(generatedCategories)
    // this.setState((prevState) => {
    //   return ({game: {...prevState.game, categories: categories}})
    // })
  }

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
                    <div>
                      { !!this.state.questions.length &&
                      <section className="categories-selector">
                      <label for="numberOfCategories">Number of Categories:</label>
                      <select
                          name="numberOfCategories"
                          id="numberOfCategories"
                          onChange={(event) => this.updateNumberOfCategories(event)}
                          >
                        <option value="6">6</option>
                        <option value="3">3</option>
                      </select>
                      <button id="startGameBtn">Start Game</button>
                      </section>
                      }
                    </div>

                  );
                }}
              />
            <Route
                exact
                path='/game'
                render={() => {
                  return (
                    <GameBoard numberOfCategories={this.state.numberOfCategories} />
                  );
                }}
              />
          </Switch>
        </BrowserRouter>
    )
  }
}

export default Game;
