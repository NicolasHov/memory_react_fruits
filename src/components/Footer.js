import React from 'react'
import {
  Link
} from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 'small' }}>
        <Link to='https://github.com/NicolasHov/memory_react_fruits'>Codebase</Link>
        {/* <div>Client : <a href=''>https://github.com/NicolasHov/memory_react_fruits</a></div>
            <div>API Highscores : <a href='https://github.com/NicolasHov/memory_fruits_server'>https://github.com/NicolasHov/memory_fruits_server</a></div> */}
      </div>
    </>
  )
}

export default Footer
