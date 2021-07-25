
export const getHighScore = callback => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    mode: 'cors'
  }

  fetch('http://localhost:3000/api/scores/', requestOptions)
    .then(response => response.text())
    .then(result => callback(JSON.parse(result)))
    .catch(error => console.log('error', error))
}
