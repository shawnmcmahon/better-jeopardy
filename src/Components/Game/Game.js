import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './Game.css';

import Question from '../Question/Question';
import GameBoard from '../GameBoard/GameBoard';
import Results from '../Results/Results';
import { getQuestions, addGame } from '../../utilities/apiCalls';
import { getRandomIndex } from '../../utilities/utils';
const dayjs = require('dayjs');

// const [numCategories, setNumCategories] = useState(0);
// const [originalQuestions, setOriginalQuestions] = useState([]);
// const [selectedCategories, setSelectedCategories] = useState([]);
// const [answeredQuestions, setAnsweredQuestions] = useState([]);
// const [currentQuestions, setCurrentQuestions] = useState({});
// const [roundOver, setRoundOver] = useState(false);
// const [hasAnswered, setHasAnswered] = useState(false);
// const [categories, setCategories] = useState(0);
// const [userScore, setUserScore] = useState(0);




class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      game: {
        numCategories: 0,
        originalQuestions: [],
        categories: [],
        selectedCategories: [],
        categoryQuestions: [],
        nextQuestions: [],
        currentQuestion: {},
        roundOver: false,
        answeredQuestions: [],
        userScore: 0,
        hasAnswered: false
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
  pickQuestion = (pickedQuestion) => {
    this.setState((prevState) => {
      return ({game: {...prevState.game, currentQuestion: pickedQuestion, hasAnswered: false}})
    })
    // let found = this.state.game.questions.find(question =>  question.question.id === selected)
    // this.state.game.currentQuestion = found;
    // this.presentChoices();
  }

  presentChoices = () => {
    const { correct_answer, incorrect_answers, question} = this.state.game.currentQuestion;
    let answers = [correct_answer, ...incorrect_answers]
    answers.forEach(answer => console.log(answer))
  }

  letUserPickNext = () => {
    this.setState((prevState) => {
      return ({game: {...prevState.game, hasAnswered: false}})
    })
  }

  updateQuestions = () => {
    let newQuestions = this.state.game.categoryQuestions.filter(question => question.question_id !== this.state.game.currentQuestion.question_id)
    this.setState((prevState) => {
      return ({game: {...prevState.game, categoryQuestions: newQuestions, hasAnswered: true}})
    })
  }

  evaluateChoice = (choice) => {
    if (choice === this.state.game.currentQuestion.correct_answer) {
      let correct = {...this.state.game.currentQuestion, answered_correct: true}
      this.setState((prevState) => ({game: {...prevState.game, answeredQuestions: [...prevState.game.answeredQuestions, correct], userScore: (prevState.game.userScore += parseInt(this.state.game.currentQuestion.prize))}}))
    } else {
      let incorrect = {...this.state.game.currentQuestion, answered_correct: false}
      this.setState((prevState) => ( { game: {...prevState.game, answeredQuestions: [...prevState.game.answeredQuestions, incorrect] } }, this.updateQuestions()))
    }
    // this.updateQuestions();
  }

  pickAnswer = (choice) => {
    // if (choice === this.state.game.currentQuestion.correct_answer) {
    //   let correct = {...this.state.game.currentQuestion, answered_correct: true}
    //   this.setState((prevState) => ({game: {...prevState.game, answeredQuestions: [...prevState.game.answeredQuestions, correct], userScore: (prevState.game.userScore += parseInt(this.state.game.currentQuestion.prize))}}))
    // } else {
    //   let incorrect = {...this.state.game.currentQuestion, answered_correct: false}
    //   this.setState((prevState) => ( { game: {...prevState.game, answeredQuestions: [...prevState.game.answeredQuestions, incorrect] } }))
    // }
    this.evaluateChoice(choice)
    // this.updateQuestions();
    this.checkIfOver();
    // setTimeout(this.updateQuestions(), 50);
    // setTimeout(this.checkIfOver(), 75);
    console.log(this.state.game.answeredQuestions)
    // let newQuestions = this.state.game.categoryQuestions.filter(question => question.question_id !== this.state.game.currentQuestion.question_id)
    // this.setState((prevState) => {
    //   return ({game: {...prevState.game, categoryQuestions: newQuestions, hasAnswered: true}})
    // })
    setTimeout(this.letUserPickNext, 100);
  }

  // componentDidUpdate() {
  //   this.setState((prevState) => {
  //     return ({game: {...prevState.game, hasAnswered: false}})
  //   })
  // }

  // function that ends the game

  checkIfOver = () => {
    if (this.state.game.answeredQuestions.length === (this.state.game.originalQuestions.length)) {
      this.state.game.roundOver = true;
      const pastGame = {
        date: dayjs().$d,
        numCategories: this.state.game.numCategories,
        selectedCategories: this.state.game.selectedCategories,
        categoryQuestions: this.state.game.categoryQuestions,
        answeredQuestions: this.state.game.answeredQuestions,
        userScore: this.state.game.userScore,
      }
      // addGame(pastGame);
      console.log('Game over')
      console.log(pastGame)
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
      return ({game: {...prevState.game, categoryQuestions: relevantQuestions, originalQuestions: relevantQuestions}})
    })
  }

  // Reset function to cancel current game

  resetGame = () => {
    console.log("Resetting Game!!")
    this.setState((prevState) => {
      return ({game: {...prevState.game, categoryQuestions: [], numCategories: 0, userScore: 0, selectedCategories: []}})
    })
  }

  //handler on start game button to change route & start game

  render() {
      return (
        <BrowserRouter>
          <Switch>
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
            <Route
              exact
              path='/game/:question_id'
              render={({match}) => {
                return (
                  <>
                  {!!this.state.game.hasAnswered && <Redirect exact to="/game" />}
                  <Question selectedQuestion={parseInt(match.params.question_id)} pickQuestion={this.pickQuestion} pickAnswer={this.pickAnswer} />
                  </>
                );
              }}
            />
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
          </Switch>
        </BrowserRouter>
    )
  }
}

export default Game;
