import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, Navigate, NavLink, useParams } from 'react-router-dom';
import './Game.css';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import Question from '../Question/Question';
import GameBoard from '../GameBoard/GameBoard';
import Results from '../Results/Results';
import PastGames from '../PastGames/PastGames';
import SavedGamePage from '../SavedGamePage/SavedGamePage'
import { getQuestions, addGame } from '../../utilities/apiCalls';
const dayjs = require('dayjs');

const SavedGameWrapper = () => {
  const { game_id } = useParams();
  return <SavedGamePage id={parseInt(game_id)} />;
};

const QuestionWrapper = ({ isCorrect, pickQuestion, pickAnswer, hasAnswered }) => {
  const { question_id } = useParams();
  return (
    <>
      {!!hasAnswered && <Navigate to="/game" replace />}
      <Question selectedQuestion={parseInt(question_id)} isCorrect={isCorrect} pickQuestion={pickQuestion} pickAnswer={pickAnswer} hasAnswered={hasAnswered} />
    </>
  );
};

const Game = () => {

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
      <Routes>
        <Route
            path='/'
            element={
              <>
                {!!errorMessage && <ErrorComponent />}
                { !!categoryQuestions.length && <Navigate to="/game" replace />}
                <div>
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
                    <NavLink to="/saved-games"><button className="nav-button">Saved Games</button></NavLink>
                  </section>
                </div>
              </>
            }
          />
        <Route
            path='/results'
            element={
              <>
                {!answeredQuestions.length && <Navigate to="/" replace />}
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
            }
          />
        <Route
          path='/saved-games'
          element={<PastGames />}
        />
        <Route
          path='/saved-games/:game_id'
          element={<SavedGameWrapper />}
        />
        <Route
          path='/game'
          element={
            <>
            {!categoryQuestions.length && <Navigate to="/" replace />}
            {!!answeredQuestions.length && !!roundOver && <Navigate to="/results" replace />}
            <h1 className="in-correct">{!isCorrect && hasAnswered && "Incorrect!"}{!!isCorrect && hasAnswered && "Correct!"}{!hasAnswered && "Pick a Question"}</h1>
            {!!categoryQuestions.length && <GameBoard categories={selectedCategories} questions={categoryQuestions} reset={resetGame}/>}
            </>
          }
        />
        <Route
          path='/game/:question_id'
          element={<QuestionWrapper isCorrect={isCorrect} pickQuestion={pickQuestion} pickAnswer={pickAnswer} hasAnswered={hasAnswered} />}
        />
        <Route
          path='*'
          element={<Navigate to="/" replace />}
        />
      </Routes>
  )
}

export default Game;

Question.propTypes = {
  selectedQuestion: PropTypes.number.isRequired,
  pickQuestion: PropTypes.func.isRequired,
  pickAnswer: PropTypes.func.isRequired,
}

Results.propTypes = {
  newGame: PropTypes.func.isRequired, 
  playerSet: PropTypes.func.isRequired, 
  player: PropTypes.string.isRequired, 
  userScore: PropTypes.number.isRequired,
  addGameAndReset: PropTypes.func.isRequired,
}

SavedGamePage.propTypes = {
  id: PropTypes.number.isRequired
}

GameBoard.propTypes = {
  categories: PropTypes.array.isRequired, 
  questions: PropTypes.array.isRequired, 
  reset: PropTypes.func.isRequired
}
