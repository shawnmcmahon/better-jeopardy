import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './Game.css';

import GameBoard from '../GameBoard/GameBoard';
import { getQuestions, addGame } from '../../utilities/apiCalls';
import { getRandomIndex } from '../../utilities/utils';
const dayjs = require('dayjs');

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
        nextQuestions: [],
        currentQuestion: {},
        roundOver: false,
        answeredQuestions: [],
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

  // Pick question 
  pickQuestion = (selected) => {
    let found = this.state.game.questions.find(question =>  question.question.id === selected)
    this.state.game.currentQuestion = found; 
    this.presentChoices(); 
  }

  presentChoices = () => {
    const { correct_answer, incorrect_answers, question} = this.state.game.currentQuestion; 
    let answers = [correct_answer, ...incorrect_answers]
    answers.forEach(answer => console.log(answer))
  }

  pickAnswer = (choice) => {
    if (choice = this.state.game.currentQuestion.correct_answer) {
      this.game.userScore += this.state.game.currentQuestion.prize
      let correct = {...this.game.state.currentQuestion, answered_correct: true}
      this.state.game.answeredQuestions.push(correct);
    } else {
      let incorrect = {...this.state.game.currentQuestion, answered_correct: false}
      this.state.gane.answeredQuestions.push(incorrect)
    }
    this.checkIfOver();
    this.state.game.categoryQuestions = this.state.game.categoryQuestions.filter(question => question.question_id !== this.currentQuestion.question_id)
  }



  // function that ends the game

  checkIfOver = () => {
    if (this.state.game.answeredQuestions.length === this.state.game.categoryQuestions.length) {
      roundOver = true;
      const pastGame = { 
        date: dayjs('LLLL'),
        numCategories: this.state.game.numCategories, 
        selectedCategories: this.state.game.selectedCategories, 
        categoryQuestions: this.state.game.categoryQuestions,  
        answeredQuestions: this.state.game.answeredQuestions, 
        userScore: this.state.game.userScore,
      }
      // addGame(pastGame);
      console.log('Game over')
      this.resetGame();
    } else {
      console.log('Next Question');
    }
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

  // Reset function to cancel current game

  resetGame = () => {
    this.setState((prevState) => {
      return ({game: {...prevState.game, categoryQuestions: [], numCategories: 0}})
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
                      <button id="startGameBtn" onClick={this.getQuestionsByCategory}>START GAME</button>
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
                    <GameBoard questions={this.state.game.categoryQuestions} reset={this.resetGame}/>
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
