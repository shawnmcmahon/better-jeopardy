import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
    if (!event.target.value) {
      return
    }
    this.populateRandomCategories(parseInt(event.target.value))
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
    this.setState((prevState) => {
      return ({game: {...prevState.game, selectedCategories: generatedCategories}})
    })
  }

  // function that gets questions based on categoryQuestions

  getQuestionsByCategory = () => {
    let relevantQuestions = [];
    if (!this.state.game.selectedCategories.length) {
      return
    }
    this.state.game.selectedCategories.forEach(category => {
      let categoryQuestions = this.state.questions.filter(question => question.category === category)
      relevantQuestions = [...relevantQuestions, ...categoryQuestions]
    })
    // console.log(relevantQuestions)
    this.setState((prevState) => {
      return ({game: {...prevState.game, categoryQuestions: relevantQuestions}})
    })
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
                      { !!this.state.game.categoryQuestions.length && <Redirect to="/game" />}
                      { !!this.state.questions.length &&
                      <section className="categories-selector">
                      <label for="numberOfCategories">Number of Categories:</label>
                      <select
                          name="numberOfCategories"
                          id="numberOfCategories"
                          onChange={(event) => this.updateNumberOfCategories(event)}
                          >
                        <option></option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                      </select>
                      <button id="startGameBtn">Start Game</button>
                      <button onClick={this.getQuestionsByCategory}>TEST BUTTON</button>
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
                    <>
                    {!this.state.game.categoryQuestions.length && <Redirect exact to="/" />}
                    <GameBoard numberOfCategories={this.state.game.categories} />
                    </>
                  );
                }}
              />
          </Switch>
        </BrowserRouter>
    )
  }
}

export default Game;
