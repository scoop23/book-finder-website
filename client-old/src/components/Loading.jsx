import React from 'react'
import SpinnerSVG from './icons/SpinnerSVG.jsx'

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full min-h-[500px]'>
      <SpinnerSVG className='w-30 h-30 '/>
    </div>
  )
}

export default Loading