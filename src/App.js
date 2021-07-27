import React from 'react'
import './App.css'
import Game from './components/Game'
import HighScores from './components/HighScores'

const App = () => {
  return (
    <>
      <div>
        <h1>Memory</h1>
        <h2>Last Scores</h2>
        <HighScores />
      </div>
      <Game />
    </>
  )
}

export default App
