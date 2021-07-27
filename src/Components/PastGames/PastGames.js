import React, { Component } from 'react';
import './PastGames.css';
import { pastGames } from '../../utilities/apiCalls'

class PastGames extends Component {
  constructor() {
    super()
      this.state = {
        pastGames: []
      }
  }

  componentDidMount = () => {
    pastGames()
      .then(data => this.setState({pastGames: data.pastGames}))
  }

  render() {
    return (
      <h2>Past games!</h2>
    )
  }
}

export default PastGames;
