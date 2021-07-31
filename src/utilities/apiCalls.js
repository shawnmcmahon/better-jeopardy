const url = 'http://localhost:3001'

const getQuestions = () => {
  return fetch('https://better-jeopardy-api.herokuapp.com/api/v1/questions')
    .then(checkResponse)
}

const getSingleQuestion = (id) => {
  return fetch(`https://better-jeopardy-api.herokuapp.com/api/v1/questions/${id}`)
    .then(checkResponse)
}

const getPastGames = () => {
  return fetch('https://better-jeopardy-api.herokuapp.com/api/v1/past-games')
  .then(checkResponse)

}

const addGame = (pastGame) => {
  console.log(pastGame)
  return fetch('http://better-jeopardy-api.herokuapp.com/api/v1/past-games', {
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

export { getQuestions, addGame, getPastGames, getSingleQuestion }
