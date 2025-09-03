import React from 'react'
import SpinnerSVG from './icons/SpinnerSVG.jsx'

const Loading = () => {
  return (
    <div className='fixed inset-0 items-center justify-center w-full h-full'>
      <SpinnerSVG className='w-30 h-30'/>
    </div>
  )
}

export default Loading