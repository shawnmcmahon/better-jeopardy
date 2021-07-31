import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import './Game.css';

import Question from '../Question/Question';
import GameBoard from '../GameBoard/GameBoard';
import Results from '../Results/Results';
import PastGames from '../PastGames/PastGames';
import { getQuestions, addGame } from '../../utilities/apiCalls';
import { getRandomIndex } from '../../utilities/utils';
const dayjs = require('dayjs');


const Game = () => {
  const [questions, setQuestions] = useState([])
  const [numCategories, setNumCategories] = useState(0);
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [roundOver, setRoundOver] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [categories, setCategories] = useState(0);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    getQuestions()
    .then(data => {
      setQuestions(data.questions)
      const categoriesFromQuestions = data.questions.reduce((allCategories, currentQuestion) => {
          if (!allCategories.includes(currentQuestion.category)) {
            allCategories.push(currentQuestion.category)
          }
          return allCategories
      }, [])
      setCategories(categoriesFromQuestions)
    })
  }, [])

  useEffect(() => {
    if (!categoryQuestions.length && !!answeredQuestions.length) {
      console.log("Number of questions answered", answeredQuestions.length)
      // setRoundOver(true)
      const pastGame = {
        date: dayjs().$d,
        numCategories,
        selectedCategories,
        categoryQuestions,
        answeredQuestions,
        userScore,
      }
      console.log(pastGame)
      addGame(pastGame);
      setRoundOver(true)
    }
  }, [categoryQuestions.length])


  const gameOver = () => {
    setRoundOver(true)
  }

  const populateRandomCategories = (num) => {

    const generatedCategories = []

    while (generatedCategories.length < num) {
      const randomCategory =  categories[Math.floor(Math.random() * categories.length)]
      if (!generatedCategories.includes(randomCategory)) {
        generatedCategories.push(randomCategory)
      }
    }
    setSelectedCategories(generatedCategories)
  }

  const pickQuestion = (pickedQuestion) => {
    setCurrentQuestion(pickedQuestion)
  }

  const getQuestionsByCategory = () => {
    let relevantQuestions = [];
    if (!selectedCategories.length) {
      return
    }
    selectedCategories.forEach(category => {
      let categoryQuestions = questions.filter(question => question.category === category)
      relevantQuestions = [...relevantQuestions, ...categoryQuestions]
    })
    setCategoryQuestions(relevantQuestions)
    setOriginalQuestions(relevantQuestions)
    setRoundOver(false)
  }

  const checkIfOver = () => {
    if (answeredQuestions.length === originalQuestions.length) {
      console.log("Number of questions answered", answeredQuestions.length)
      setRoundOver(true)
      const pastGame = {
        date: dayjs().$d,
        numCategories,
        selectedCategories,
        categoryQuestions,
        answeredQuestions,
        userScore,
      }
      resetGame();
    } else {
    }
  }

  const updateNumberOfCategories = (event) => {
    event.preventDefault();
    if (!event.target.value) {
      return
    }
    populateRandomCategories(parseInt(event.target.value))
  }

  const resetGame = () => {
    setNumCategories(0)
    setUserScore(0)
    setSelectedCategories([])
    setCategoryQuestions([])
    setAnsweredQuestions([])
  }

  const pickAnswer = (choice) => {
    evaluateChoice(choice)
    updateQuestions()
    checkIfOver();
    setTimeout(letUserPickNext, 100);
  }

  const evaluateChoice = (choice) => {
    if (choice === currentQuestion.correct_answer) {
      let correct = {...currentQuestion, answered_correct: true}
      setAnsweredQuestions([...answeredQuestions, correct])
      setUserScore(userScore + parseInt(currentQuestion.prize))


    } else {
      let incorrect = {...currentQuestion, answered_correct: false}
      setAnsweredQuestions([...answeredQuestions, incorrect])
      setUserScore(userScore - parseInt(currentQuestion.prize))

    }
  }



  const updateQuestions = () => {
    let newQuestions = categoryQuestions.filter(question => question.question_id !== currentQuestion.question_id)
    setCategoryQuestions(newQuestions)
    setTimeout(setHasAnswered(true), 2000)
    setHasAnswered(true)
  }

  const letUserPickNext = () => {
    setHasAnswered(false)
  }

  return (

      <Switch>
        <Route
            exact
            path='/'
            render={() => {
              return (
                <div>
                  { !!categoryQuestions.length && <Redirect to="/game" />}
                  <NavLink exact to="/saved-games"><button className="nav-button">Saved Games</button></NavLink>
                  <section className="categories-selector">
                    <label for="numberOfCategories">Number of Categories:</label>
                    <div className="selector-bg">
                      <select
                        name="numberOfCategories"
                        id="numberOfCategories"
                        onChange={updateNumberOfCategories}
                        >
                        <option></option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <button id="startGameBtn" class="start-game" onClick={getQuestionsByCategory}>START GAME</button>
                  </section>
                </div>
              );
            }}
          />
        <Route
            exact
            path='/results'
            render={() => {
              return (
                <Results newGame={resetGame} />
              )
            }}
          />
        <Route
          exact
          path='/saved-games'
          render={() => {
            return (
              <PastGames />
            )
          }}
        />
        <Route
          exact
          path='/game'
          render={() => {
            return (
              <>
              {!categoryQuestions.length && <Redirect exact to="/" />}
              {!!answeredQuestions.length && !!roundOver && <Redirect exact to="/results" />}
              {!!categoryQuestions.length && <GameBoard categories={selectedCategories} questions={categoryQuestions} reset={resetGame}/>}
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
              {!!hasAnswered && <Redirect exact to="/game" />}
              <Question selectedQuestion={parseInt(match.params.question_id)} pickQuestion={pickQuestion} pickAnswer={pickAnswer} />
              </>
            );
          }}
        />
      </Switch>
  )
}

export default Game;
