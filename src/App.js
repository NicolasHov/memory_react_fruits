/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './App.css'

const Card = props => {
  // eslint-disable-next-line react/prop-types
  const { x, y, callback, state, image } = props
  return (
    <button
      onClick={() => callback(x, y)}
      style={{ width: '100px', height: '100px', background: state !== 'hidden' ? `url(${image})` : 'none', objectFit: 'fill' }}
    />
  )
}

const flipCard = (gameState, pos) => {
  const updatedGameState = Array.from(gameState)
  updatedGameState[pos].state = updatedGameState[pos].state === 'hidden' ? 'revealed' : 'hidden'
  return updatedGameState
}

const getHighScore = callback => {
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

const addHighScore = score => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    value: score
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    mode: 'cors'
  }

  fetch('http://localhost:3000/api/scores/', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

const Game = () => {
  /// GENERATE BOARD ///

  const generateCards = () => {
    const fruitsArray = ['pomme-rouge', 'banane', 'orange', 'citron-vert', 'grenade', 'abricot', 'citron', 'fraise', 'pomme-verte', 'pêche', 'raisin', 'pastèque', 'prune', 'poire', 'cerise-rouge', 'framboise', 'mangue', 'cerise-jaune']
    const newArray = []
    fruitsArray.forEach((item, _id) => {
      newArray.push({ state: 'hidden', value: item, image: (_id < 10) ? process.env.PUBLIC_URL + '/parts-0' + _id + '.png' : process.env.PUBLIC_URL + '/parts-' + _id + '.png' })
    })
    return newArray
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  const generateGrid = () => {
    const cards = generateCards()
    return shuffle(cards.concat([...cards.map(x => ({ ...x }))]))
  }

  const [gameState, setGameState] = useState(generateGrid())
  const [clicksHistory, setClicksHistory] = useState([])

  const WIDTH = 6 // width of game board
  const getPos = (x, y) => x * WIDTH + y // to convert position to one dimension tab

  /// TIMER LOGIC ///

  const TIME = 60 // time limit to play

  const [gameLaunched, setGameLaunched] = useState(false)
  const [counter, setCounter] = useState(TIME)

  useEffect(() => {
    if (!gameLaunched) {
      return
    }
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000)
    } else {
      alert('YOU LOSE!')
      setGameLaunched(false)
      setCounter(TIME)
      // TODO: regenerate
    }
  }, [gameLaunched, counter])

  /// PLAYER ACTION ///

  const cardClicked = (x, y) => {
    setGameLaunched(true)
    setClicksHistory(() => {
      const updatedLasPosCards = Array.from(clicksHistory)
      updatedLasPosCards.push([x, y])
      console.log('updatedLasPosCards :', updatedLasPosCards)
      return updatedLasPosCards
    })
    const pos = getPos(x, y)
    const card = gameState[pos]

    if (card.state === 'removed') {
      return // do nothing if the card is alredy removed
    }

    if (gameState.filter(card => card.state === 'revealed').length >= 2 && card.state === 'hidden') {
      return // do nothing if there is 2 card already revealed & the card on which I clicked is hidden
    }

    setGameState(flipCard(gameState, pos))
    const revealedCards = gameState.filter(card => card.state === 'revealed')
    if (revealedCards.length === 2) {
      if (revealedCards[0].value === revealedCards[1].value) {
        revealedCards.forEach(card => { card.state = 'removed' })
        setClicksHistory([])
      } else { // automatically flip back the two cards revealed when they are differents
        setTimeout(() => {
          setGameState(flipCard(gameState, pos))
          setGameState(flipCard(gameState, getPos(clicksHistory[0][0], clicksHistory[0][1])))
          setClicksHistory([])
        }, 1000)
      }
    }

    if (gameState.filter(card => card.state === 'removed').length === gameState.length) {
      addHighScore(counter)
      alert('YOU WIN! Score: ' + counter)
    }
  }

  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    )

  return (
    <>
      <div>
        {chunk(gameState, WIDTH).map((row, i) => <div key={i}>{row.map((item, j) =>
          <Card key={getPos(i, j)} x={i} y={j} value={item.value} callback={cardClicked} state={item.state} image={item.image} />
        )}</div>)}
      </div>
      <div>Countdown: {counter}</div>
      <div style={{ width: ((TIME - counter) * 0.6) + 'rem', height: '3rem', backgroundColor: 'red' }} />
    </>
  )
}

const App = () => {
  const [top5, setTop5] = useState([])

  getHighScore(highscores => {
    if (top5.length) return
    setTop5(highscores.scores.sort((a, b) => Math.sign(b.value - a.value)).slice(0, 5))
  })

  return (
    <>
      <div>
        <h1>Memory</h1>
        <h2>Last Scores</h2>
        <ul>{top5.map(x => (<li key={x._id}>{x.value}</li>))}</ul>
      </div>
      <Game />
    </>
  )
}

export default App
