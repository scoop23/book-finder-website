import React from 'react'

export function CodexDotCircle({ active }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="1em" 
      height="1em" 
      viewBox="0 0 24 24" 
      {...props}
    >
      {/* Icon from CodeX Icons by CodeX - https://github.com/codex-team/icons/blob/master/LICENSE */}

    <circle 
      cx="12" 
      cy="12" 
      r="4" 
      fill={active ? "#ffffff" : "none"} 
      stroke="#888888" 
      trokeWidth="2" 
    />
    </svg>
  )
}
export default CodexDotCircle;