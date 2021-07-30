import React, { useState, useEffect } from 'react';
// import React, { Component } from 'react';
import './Question.css';

import { getSingleQuestion } from '../../utilities/apiCalls';
import { shuffleAnswers } from '../../utilities/gameUtils.js';
import Answer from '../Answer/Answer';

const Question = ({ selectedQuestion, pickQuestion, pickAnswer }) => {

  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    let isMounted = true;
    getSingleQuestion(selectedQuestion)
    .then(data => {
      if (isMounted) {
        pickQuestion(data)
        setCurrentQuestion(data)
      }
    })
    return () => { isMounted = false };
  }, [])

//   useEffect(() => {
//   let isMounted = true;               // note mutable flag
//   someAsyncOperation().then(data => {
//     if (isMounted) setState(data);    // add conditional check
//   })
//   return () => { isMounted = false }; // cleanup toggles value, if unmounted
// }, []);

  const randomlyPlaceAnswers = () => {
    const { correct_answer, incorrect_answers } = currentQuestion
    return shuffleAnswers([correct_answer, ...incorrect_answers]).map((answer) => {
      return (
        <Answer answer={answer} pickAnswer={pickAnswer} />
      )
    });
  }

  return (
    <>
      {!currentQuestion ? (
        <h3>Question Loading</h3>
      ) : (
        <section className="question">
          <h3>{currentQuestion.category}</h3>
          <h3>{currentQuestion.question}</h3>
          <h3 className="question-value">${currentQuestion.prize}</h3>
          <div className="answer-choices">
            {randomlyPlaceAnswers()}
          </div>
        </section>
      )}
    </>
  )
}

export default Question;
