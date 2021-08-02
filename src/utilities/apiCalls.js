const url = 'http://localhost:3001'

const getQuestions = () => {
  return fetch('https://better-jeopardy-api-v2.herokuapp.com/api/v1/questionszzz')
    .then(checkResponse)
    // .catch(error => console.log('apiCallCatch', error))
}

const getSingleQuestion = (id) => {
  return fetch(`https://better-jeopardy-api-v2.herokuapp.com/api/v1/questions/${id}`)
    .then(checkResponse)
}

const getSingleGame = (id) => {
  return fetch(`https://better-jeopardy-api-v2.herokuapp.com/api/v1/past-games/${id}`)
    .then(checkResponse)
}

const getPastGames = () => {
  return fetch('https://better-jeopardy-api-v2.herokuapp.com/api/v1/past-games')
    .then(checkResponse)

}

const addGame = (pastGame) => {
  console.log(pastGame)
  return fetch('http://better-jeopardy-api-v2.herokuapp.com/api/v1/past-games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pastGame)
  })
  .then(checkResponse)
  // .then(console.log('Success!'))
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return `Request could not go through.`
    // throw new Error(`Request could not go through.`);
  }
};

export { getQuestions, addGame, getPastGames, getSingleQuestion, getSingleGame }
