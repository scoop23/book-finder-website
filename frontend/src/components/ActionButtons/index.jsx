import React from 'react'

const ActionButtons = ({ Ypos, hover, children }) => {
  return (
    <div className='action-buttons flex' style={{
      position : 'absolute',
      top : Ypos,
      left : 50
    }}>
      {children}
    </div>
  )
}

export default ActionButtons