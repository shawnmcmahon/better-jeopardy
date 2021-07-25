import React, { Component } from 'react';
import './Form.css';

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
        this.state.q1,
        this.state.q2,
        this.state.q3
      ],
      date: this.state.date,
      score: this.state.score
    }
    fetch('http://localhost:3001/past-games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pastGame)
    })
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
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
          <button onClick={this.handleSubmit} />
        </form>
      )
    }
  }
}

export default Form;
