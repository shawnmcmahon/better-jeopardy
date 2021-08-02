import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import { getSingleQuestion } from '../../utilities/apiCalls';
import { shuffleAnswers } from '../../utilities/gameUtils.js';
import Answer from '../Answer/Answer';

const Question = ({ selectedQuestion, pickQuestion, pickAnswer, isCorrect, hasAnswered }) => {

  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    let mounted = true;
    getSingleQuestion(selectedQuestion)
    .then(data => {
      if (mounted) {
        pickQuestion(data)
        setCurrentQuestion(data)
      }
      return () => mounted = false;
    })
  }, [])

  const randomlyPlaceAnswers = () => {
    const { correct_answer, incorrect_answers } = currentQuestion
    return shuffleAnswers([correct_answer, ...incorrect_answers]).map((answer, index) => {
      return (
        <Answer key={index} answer={answer} pickAnswer={pickAnswer} />
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

Answer.propTypes = {
  answer: PropTypes.string.isRequired, 
  pickAnswer: PropTypes.func.isRequired
}