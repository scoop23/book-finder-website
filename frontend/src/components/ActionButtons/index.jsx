import React from 'react'

const ActionButtons = ({ Ypos, hover, children, className }) => {
  return (
    <div className={`action-buttons flex ${className || ''}`}  style={{
      position : 'absolute',
      top : Ypos,
      left : 60
    }}>
      {children}
    </div>
  )
}

export default ActionButtons