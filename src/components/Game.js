import React, { useState, useEffect } from 'react'
import Card from './Card'
import { addHighScore } from '../services/addScoreServices'

const flipCard = (gameState, pos) => {
  const updatedGameState = Array.from(gameState)
  updatedGameState[pos].state = updatedGameState[pos].state === 'hidden' ? 'revealed' : 'hidden'
  return updatedGameState
}

const Game = () => {
  /// GENERATE BOARD ///

  const generateCards = () => {
    const fruitsArray = ['pomme-rouge', 'banane', 'orange', 'citron-vert', 'grenade', 'abricot', 'citron', 'fraise', 'pomme-verte'
      // , 'pêche', 'raisin', 'pastèque', 'prune', 'poire', 'cerise-rouge', 'framboise', 'mangue', 'cerise-jaune'
    ]
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
  const [gameLaunched, setGameLaunched] = useState(false) // TODO: use a gameStatus instead with useState([Launched, Won, Lost])

  /// TIMER LOGIC ///
  const TIME = 60 // time limit to play
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
      // TODO: regenerate grid and launch counter when game ends
      // setCounter(TIME)
    }
  }, [gameLaunched, counter])

  const WIDTH = 6 // width of game board
  const getPos = (x, y) => x * WIDTH + y // to convert position to one dimension tab

  /// PLAYER ACTION ///

  const cardClicked = (x, y) => {
    setGameLaunched(true)
    setClicksHistory(() => {
      const updatedLastClicks = Array.from(clicksHistory)
      updatedLastClicks.push([x, y])
      console.log('updatedLastClicks :', updatedLastClicks)
      return updatedLastClicks
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
      // setGameStatus(Won)
      alert('YOU WIN! Score: ' + counter)
    }
  }

  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    )

  return (
    <>
      {counter < 60 && counter > 0 ? <div>C&lsquo;est parti !</div> : <br />}
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

export default Game
