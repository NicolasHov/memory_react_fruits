import React, { useState, useEffect } from 'react'
import { getHighScore } from '../services/getHighScoreServices'
import { deleteHighScore } from '../services/deleteHighScoreServices'

export const HighScores = () => {
  // const [top5, setTop5] = useState([])
  const [highscores, setHighscores] = useState([])

  useEffect(() => {
    getHighScore(rawData => {
      setHighscores(rawData)
    })
  }, [])

  // TODO: select top5 scores
  // useEffect(() => {
  //   if (highscores === null) return
  //   console.log(highscores.length)
  //   // setTop5(highscores.sort((a, b) => Math.sign(a.value - b.value)).slice(0, 5))
  // }, [highscores])

  return (
    <section className='highscores'>
      <h2>🏆</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {(highscores.length)
          // TOFIX: use only top5
          ? highscores
            .map(score => (
              <div key={score._id} style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '1rem' }}>{score.value} seconds</div>
                {/* <div style={{ marginRight: '1rem' }}> {score.name} -</div> */}
                <div style={{ marginRight: '1rem' }}> {score.timeScore}</div>
                <button onClick={() => {
                  deleteHighScore(score._id)
                  setHighscores(highscores.filter(x => x._id !== score._id))
                }}>X</button>
              </div>
            )
            )
          : <div>...There&lsquo;s no scores yet</div>
        }</div>
    </section>
  )
}

export default HighScores
