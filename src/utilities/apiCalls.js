const url = 'http://localhost:3001'

const getQuestions = () => {
  return fetch(url + '/questions')
  .then(checkResponse)
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Request could not go through.`);
  }
};
