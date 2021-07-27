import React, { useState, useEffect } from 'react'
import { getHighScore } from '../services/getHighScoreServices'
import { deleteHighScore } from '../services/deleteHighScoreServices'

export const HighScores = () => {
  const [top5, setTop5] = useState([])
  const [highscores, setHighscores] = useState(null)

  useEffect(() => {
    getHighScore(data => {
      setHighscores(data.scores)
    })
  }, [])

  useEffect(() => {
    if (highscores === null) return
    setTop5(highscores.sort((a, b) => Math.sign(b.value - a.value)).slice(0, 5))
  }, [highscores])

  return (
      <ul>{(top5.length)
        ? top5.map(score => (
          <li key={score._id} style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '1rem' }}>{score.value}</div>
            <button onClick={() => {
              deleteHighScore(score._id)
              setHighscores(highscores.filter(x => x._id !== score._id))
            }}>Delete</button>
          </li>
        )
        )
        : <div>...There&lsquo;s no High scores yet</div>
      }</ul>
  )
}

export default HighScores
