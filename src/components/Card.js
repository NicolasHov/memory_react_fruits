import React from 'react'

const Card = props => {
  // eslint-disable-next-line react/prop-types
  const { x, y, callback, state, image } = props
  return (
      <button
        onClick={() => callback(x, y)}
        style={{ width: '100px', height: '100px', background: state !== 'hidden' ? `url(${image})` : 'none', objectFit: 'fill' }}
      />
  )
}

export default Card
