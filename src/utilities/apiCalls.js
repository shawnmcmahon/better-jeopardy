const url = 'http://localhost:3001'

const getQuestions = () => {
  return fetch(url + '/questions')
  .then(checkResponse)
}

const getPastGames = () => {
  return fetch(url + '/past-games')
  .then(checkResponse)
}

const addGame = (pastGame) => {
  return fetch(url + '/past-games', {
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
