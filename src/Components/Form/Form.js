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
}

export default Form;
