import React, { useState } from 'react'
import './App.css'
import Game from './components/Game'
import { getHighScore } from './services/scoreServices'

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
