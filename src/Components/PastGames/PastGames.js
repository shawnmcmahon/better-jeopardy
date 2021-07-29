import React, { useState, useEffect } from 'react';
import './PastGames.css';
import { pastGames } from '../../utilities/apiCalls'

const PastGames = () => {

  const setPastGames = useState([]);

  useEffect(() => {
    pastGames()
      .then((data) => setPastGames(data))
  }, [])

  render() {
    return (
      <h2>Past games!</h2>
    )
  }
}

export default PastGames;
