import React, { Component } from 'react';
import './App.css';
import Form from '../Form/Form'

class App extends Component {
  constructor() {
    super();
  }

  render() {
      return (
      <div className="App">
        <Form />
      </div>
    );
  }
}

export default App;
