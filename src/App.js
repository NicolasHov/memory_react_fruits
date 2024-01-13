import React from 'react'
import './App.css'
import Game from './components/Game'
import HighScores from './components/HighScores'
import Footer from './components/Footer'
// import Fireworks from 'react-canvas-confetti/dist/presets/fireworks' //from https://www.npmjs.com/package/react-canvas-confetti#Usage

const App = () => {
  return (
    <div className={'App'}>
      <div style={{ textAlign: 'center' }}>
        <div>
          <h1 className="gradient-red">Memory</h1>
          <HighScores />
        </div>
        <Game />
      </div>
      <Footer />
    </div>
  )
}

export default App
