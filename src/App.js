import React from 'react'
import './App.css'
import Game from './components/Game'
import HighScores from './components/HighScores'
import Footer from './components/Footer'
import {
  BrowserRouter as Router
} from 'react-router-dom'

// import Fireworks from 'react-canvas-confetti/dist/presets/fireworks' //from https://www.npmjs.com/package/react-canvas-confetti#Usage

const App = () => {
  return (
    <Router>
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
    </Router>
  )
}

export default App
