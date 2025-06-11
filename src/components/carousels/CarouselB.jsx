import React from 'react'
import slideData from '../slideDemo.json'
import { useState } from 'react'

const CarouselB = () => {
  const [index, setIndex] = useState(null)


  return (
    <div className='carousel-b-wrapper'>
      <div className='carousel-b-main'>
        <div className='carousel-b max-w-[704px] h-[400px]'>

        </div>
      </div>
    </div>
  )
}

export default CarouselB