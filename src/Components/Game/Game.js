import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Game.css';

import Question from '../Question/Question';
import GameBoard from '../GameBoard/GameBoard';
import Results from '../Results/Results';
import { getQuestions, addGame } from '../../utilities/apiCalls';
import { getRandomIndex } from '../../utilities/utils';
const dayjs = require('dayjs');


const Game = () => {

//   const initialGame = {
//     numCategories: 0,
//     originalQuestions: [],
//     selectedCategories: [],
//     answeredQuestions: [],
//     categoryQuestions: [],
//     currentQuestion: '',
//     roundOver: false,
//     hasAnswered: false,
//     categories: 0,
//     userScore: 0,
//     isCorrect: ''
//   }
//
//   const gameHandler = (state, action) => {
//   switch (action.type) {
//     case 'populate_random_categories':
//       const generatedCategories = []
//
//       while (generatedCategories.length < num) {
//         const randomCategory =  state.categories[Math.floor(Math.random() * state.categories.length)]
//         if (!generatedCategories.includes(randomCategory)) {
//           generatedCategories.push(randomCategory)
//         }
//       }
//       state.selectedCategories = generatedCategories
//       return state
//
//     case 'get_questions_by_category':
//       let relevantQuestions = [];
//       if (!selectedCategories.length) {
//         return
//       }
//       state.selectedCategories.forEach(category => {
//         let categoryQuestions = questions.filter(question => question.category === category)
//         relevantQuestions = [...relevantQuestions, ...categoryQuestions]
//       })
//       setGame({...game, categoryQuestions: relevantQuestions, originalQuestions: relevantQuestions, roundOver: false})
//
//       state.categoryQuestions = relevantQuestions
//       state.originalQuestions = relevantQuestions
//       state.roundOver = false
//       return state
//
//     case '':
//
//       return
//     default:
//       return state;
//   }
// };

  const [questions, setQuestions] = useState([])
  // const [game, setGame] = useState({
  //   numCategories: 0,
  //   originalQuestions: [],
  //   selectedCategories: [],
  //   answeredQuestions: [],
  //   categoryQuestions: [],
  //   currentQuestion: '',
  //   roundOver: false,
  //   hasAnswered: false,
  //   categories: 0,
  //   userScore: 0,
  //   isCorrect: ''
  // })
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
  const [isCorrect, setIsCorrect] = useState('');

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
      // setGame({...game, categories: categoriesFromQuestions})
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
      // setGame({...game, roundOver: true})
      setRoundOver(true)
    }
  }, [categoryQuestions.length])


  const gameOver = () => {
    // setGame({...game, roundOver: true})
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
    // setGame({...game, selectedCategories: generatedCategories})
    setSelectedCategories(generatedCategories)
  }

  const pickQuestion = (pickedQuestion) => {
    // setGame({...game, currentQuestion: pickedQuestion, isCorrect: ''})
    setCurrentQuestion(pickedQuestion)
    setIsCorrect('')
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
    // setGame({...game, categoryQuestions: relevantQuestions, originalQuestions: relevantQuestions, roundOver: false})
    setCategoryQuestions(relevantQuestions)
    setOriginalQuestions(relevantQuestions)
    setRoundOver(false)
  }

  const checkIfOver = () => {
    if (answeredQuestions.length === originalQuestions.length) {
      // setGame({...game, roundOver: true})
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
    if (!event.target.value) {
      return
    }
    populateRandomCategories(parseInt(event.target.value))
  }

  const resetGame = () => {
    // setGame({...game, numCategories: 0, userScore: 0, selectedCategories: [], categoryQuestions: [], answeredQuestions: []})
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
    setTimeout(letUserPickNext, 800);
  }

  const evaluateChoice = (choice) => {
    // const {answeredQuestions, userScore, currentQuestion} = game
    if (choice === currentQuestion.correct_answer) {
      let correct = {...currentQuestion, answered_correct: true}
      // setGame({...game, answeredQuestions: [...answeredQuestions, correct], userScore: (userScore + parseInt(currentQuestion.prize)), isCorrect: true})
      setAnsweredQuestions([...answeredQuestions, correct])
      setUserScore(userScore + parseInt(currentQuestion.prize))
      setIsCorrect(true)

    } else {
      let incorrect = {...currentQuestion, answered_correct: false}
      // setGame({...game, answeredQuestions: [...answeredQuestions, incorrect], userScore: (userScore - parseInt(currentQuestion.prize)), isCorrect: false})
      setAnsweredQuestions([...answeredQuestions, incorrect])
      setUserScore(userScore - parseInt(currentQuestion.prize))
      setIsCorrect(false)
    }
  }



  const updateQuestions = () => {
    let newQuestions = categoryQuestions.filter(question => question.question_id !== currentQuestion.question_id)
    // setGame({...game, answeredQuestions: newQuestions, hasAnswered: true})
    setCategoryQuestions(newQuestions)
    setHasAnswered(true)
  }

  const letUserPickNext = () => {
    // setGame({...game, hasAnswered: false})
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
                  <section className="categories-selector">
                    <label htmlFor="numberOfCategories">Number of Categories:</label>
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
                    <button id="startGameBtn" className="start-game" onClick={getQuestionsByCategory}>Start Game</button>
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
