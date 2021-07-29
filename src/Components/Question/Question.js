import React, { Component } from 'react';
import './Question.css';

import { getSingleQuestion } from '../../utilities/apiCalls';
import Answer from '../Answer/Answer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: ''
    }
  }

  componentDidMount() {
    getSingleQuestion(this.props.selectedQuestion)
      .then(data => {
        this.props.pickQuestion(data)
        this.setState({question: data}) })
  }

  randomlyPlaceAnswers() {
    let answers = [];
    let incorrect_answers = this.state.question.incorrect_answers;
    answers.push(this.state.question.correct_answer);
    incorrect_answers.forEach((answer) => {
      answers.push(answer);
    })
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers.map((answer) => {
      return (
        <div className="answer-choices" >
          <Answer answer={answer} pickAnswer={this.props.pickAnswer} />
        </div>
      )
    });
  }

  render() {
    return (
      <>
      {!this.state.question ? (
        <h3>Question Loading</h3>
      ) : (
        <section className="question">
          <h3>{this.state.question.category}</h3>
          <h3>{this.state.question.question}</h3>
          <h3 className="question-value">${this.state.question.prize}</h3>
          {this.randomlyPlaceAnswers()}
        </section>
      )}
      </>
    )
  }
}

export default Question;
