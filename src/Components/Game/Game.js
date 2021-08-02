import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import './Game.css';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import Question from '../Question/Question';
import GameBoard from '../GameBoard/GameBoard';
import Results from '../Results/Results';
import PastGames from '../PastGames/PastGames';
import Form from '../Form/Form';
import SavedGamePage from '../SavedGamePage/SavedGamePage'
import { getQuestions, addGame } from '../../utilities/apiCalls';
import { getRandomIndex } from '../../utilities/utils';
const dayjs = require('dayjs');


const Game = ({ player }) => {

  const [playerName, setPlayerName] = useState('');
  const [questions, setQuestions] = useState([])
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [roundOver, setRoundOver] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [categories, setCategories] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState('');
  const [pastGame, setPastGame] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [notify, setNotify] = useState('')

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
    .catch(error => {
      setErrorMessage(error)
    })
  }, [])

  useEffect(() => {
    if (!categoryQuestions.length && !!answeredQuestions.length) {
      setRoundOver(true)
    }
  }, [categoryQuestions.length])

  const addGameAndReset = () => {
    if (!playerName) {
      return
    }
    if (!categoryQuestions.length && !!answeredQuestions.length) {
      const pastGame = {
        questions: [...answeredQuestions],
        date: dayjs().$d,
        name: playerName,
        score: userScore
      }
      setPastGame(pastGame);
      addGame(pastGame);
      resetGame();
    }
  }

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
    setIsCorrect('')
  }

  const getQuestionsByCategory = () => {
    let relevantQuestions = [];
    if (!selectedCategories.length) {
      setNotify('Please choose number of categories to play.')
      return
    }
    setNotify('')
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
      setRoundOver(true)
      const pastGame = {
        questions: [...answeredQuestions],
        date: dayjs().$d,
        score: userScore
      }
      resetGame();
    }
  }

  const updateNumberOfCategories = (event) => {
    event.preventDefault();
    if (!event.target.value || !questions) {
      return
    }
    populateRandomCategories(parseInt(event.target.value))
  }

  const resetGame = () => {
    setUserScore(0)
    setSelectedCategories([])
    setCategoryQuestions([])
    setAnsweredQuestions([])
    setPlayerName('')
  }

  const pickAnswer = (choice) => {
    evaluateChoice(choice)
    updateQuestions()
    checkIfOver();
    setTimeout(() => {
      setHasAnswered(false)
    }, 500);
  }

  const evaluateChoice = (choice) => {
    if (choice === currentQuestion.correct_answer) {
      let correct = {...currentQuestion, answered_correct: true}
      setAnsweredQuestions([...answeredQuestions, correct])
      setUserScore(userScore + parseInt(currentQuestion.prize))
      setIsCorrect(true)

    } else {
      let incorrect = {...currentQuestion, answered_correct: false}
      setAnsweredQuestions([...answeredQuestions, incorrect])
      setUserScore(userScore - parseInt(currentQuestion.prize))
      setIsCorrect(false)
    }
  }



  const updateQuestions = () => {
    let newQuestions = categoryQuestions.filter(question => question.question_id !== currentQuestion.question_id)
    setCategoryQuestions(newQuestions)
    setHasAnswered(true)
  }

  return (
      <Switch>
        <Route
            exact
            path='/'
            render={() => {
              return (
                <div>
                  {!!errorMessage && <ErrorComponent />}
                  { !!categoryQuestions.length && <Redirect to="/game" />}
                  <section className="categories-selector">


                 <label htmlFor="numberOfCategories">Choose Number of Categories:</label>
                    <div className="selector-bg">
                      <select
                        name="numberOfCategories"
                        id="numberOfCategories"
                        onChange={updateNumberOfCategories}
                        >
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    {!!notify && <h3>{notify}</h3>}
                    <button id="startGameBtn" className="start-game" onClick={getQuestionsByCategory}>Start Game</button>
                    <NavLink exact to="/saved-games"><button className="nav-button">Saved Games</button></NavLink>
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
                <>
                  {!answeredQuestions.length && <Redirect exact to="/" />}
                  <Results
                  newGame={resetGame}
                  playerSet={setPlayerName}
                  player={playerName}
                  userScore={userScore}
                  answeredQuestions={answeredQuestions}
                  setPastGame={setPastGame}
                  pastGame={pastGame}
                  addGameAndReset={addGameAndReset}
                  />
                </>
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
          path='/saved-games/:game_id'
          render={({match}) => {
            return (
              <>
              <SavedGamePage id={parseInt(match.params.game_id)} />
              </>
            );
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
              <h1 className="in-correct">{!isCorrect && hasAnswered && "Incorrect!"}{!!isCorrect && hasAnswered && "Correct!"}{!hasAnswered && "Pick a Question"}</h1>
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
              <Question selectedQuestion={parseInt(match.params.question_id)} isCorrect={isCorrect} pickQuestion={pickQuestion} pickAnswer={pickAnswer} hasAnswered={hasAnswered} />
              </>
            );
          }}
        />
      </Switch>
  )
}

export default Game;
