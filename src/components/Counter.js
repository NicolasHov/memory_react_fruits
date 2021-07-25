import React, { useState, useEffect } from 'react'

/// TIMER LOGIC ///

const Counter = props => {
  // eslint-disable-next-line react/prop-types
  const { TIME, isGameLaunched } = props

  const [gameLaunched, setGameLaunched] = useState(isGameLaunched)
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
      // TODO: regenerate grid when game ends
    }
  }, [gameLaunched, counter])

  return (
    <>
      <div>Countdown: {counter}</div>
      <div style={{ width: ((TIME - counter) * 0.6) + 'rem', height: '3rem', backgroundColor: 'red' }} />
    </>
  )
}

export default Counter
