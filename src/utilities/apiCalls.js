const url = 'http://localhost:3001'

const getQuestions = () => {
  return fetch('https://better-jeopardy-api.herokuapp.com/api/v1/questions')
  // .then(console.log('hello'))
  .then(checkResponse)
  // .then(console.log('hi'))
}

const getPastGames = () => {
  return fetch('https://better-jeopardy-api.herokuapp.com/api/v1/past-games')
  // .then(console.log('what the'))
  .then(checkResponse)
  // .then(console.log('fffffff'))
}

const addGame = (pastGame) => {
  console.log(pastGame)
  return fetch('http://localhost:3001/past-games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pastGame)
  })
  .then(checkResponse)
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Request could not go through.`);
  }
};

export { getQuestions, addGame, getPastGames }
