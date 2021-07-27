import React from 'react'
import './App.css'
import Game from './components/Game'
import HighScores from './components/HighScores'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <div style={{ minHeight: 'calc(100vh - 90px)' }}>
      <div>
        <h1>Memory</h1>
        <h2>High Scores</h2>
        <HighScores />
      </div>
      <Game />
    </div>
      <Footer />
    </>
  )
}

export default App
