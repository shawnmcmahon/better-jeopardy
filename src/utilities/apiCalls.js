const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

const getQuestions = () => {
  return fetch(`${API_BASE_URL}/api/v1/questions`)
    .then(checkResponse)
}

const getSingleQuestion = (id) => {
  return fetch(`${API_BASE_URL}/api/v1/questions/${id}`)
    .then(checkResponse)
}

const getSingleGame = (id) => {
  return fetch(`${API_BASE_URL}/api/v1/past-games/${id}`)
    .then(checkResponse)
}

const getPastGames = () => {
  return fetch(`${API_BASE_URL}/api/v1/past-games`)
    .then(checkResponse)
}

const addGame = (pastGame) => {
  return fetch(`${API_BASE_URL}/api/v1/past-games`, {
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
    return `Request could not go through.`
  }
};

export { getQuestions, addGame, getPastGames, getSingleQuestion, getSingleGame }
