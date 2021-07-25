import React, { Component } from 'react';
import './Form.css';
import { addGame, getPastGames } from '../../utilities/apiCalls'

class Form extends Component {
  constructor() {
    super();
    this.state = {
      q1: '',
      q2: '',
      q3: '',
      date: '',
      score: 0
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    for (let param of ['q1', 'q2', 'q3', 'date', 'score']) {
      if (!this.state[param]) {
        return;
      }
    }
    const pastGame = {
      questions: [
        { question: this.state.q1, correct: true },
        { question: this.state.q2, correct: true },
        { question: this.state.q3, correct: true },
      ],
      date: this.state.date,
      score: this.state.score
    }
    addGame(pastGame)
    .then(response => {

      console.log("it worked")
      return getPastGames()
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <br /><br />
          <input
            type="text"
            name="q1"
            onChange={this.handleChange}
            value={this.state.q1}
            placeholder="Question 1"
          />
          <input
            type="text"
            name="q2"
            onChange={this.handleChange}
            value={this.state.q2}
            placeholder="Question 2"
          />
          <input
            type="text"
            name="q3"
            onChange={this.handleChange}
            value={this.state.q3}
            placeholder="Question 3"
          />
          <input
            type="text"
            name="date"
            onChange={this.handleChange}
            value={this.state.date}
            placeholder="Date"
          />
          <input
            type="text"
            name="score"
            onChange={this.handleChange}
            value={this.state.score}
            placeholder="Score"
          />
        <button onClick={this.handleSubmit}>SUBMIT</button>
        </form>
      )
    }
  }


export default Form;
