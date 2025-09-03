import React from 'react'
import SpinnerSVG from './icons/SpinnerSVG.jsx'

const Loading = () => {

  return ( // fixed, inset-0 - fixed relative to the viewport no the parent basically left  = 0 ,right =0 ,top =0 , bottom =0 then center it with flex box.
    <div className='fixed inset-0 flex items-center justify-center w-full h-full'>
      <SpinnerSVG className='w-30 h-30'/>
    </div>
  )
}

export default Loading