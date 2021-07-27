
export const deleteHighScore = id => {
  // const myHeaders = new Headers()
  // myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'DELETE',
    // headers: myHeaders,
    redirect: 'follow',
    mode: 'cors'
  }

  fetch('http://localhost:3000/api/scores/' + id, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}
