import React from 'react'
import slideData from '../slideDemo.json'
import { useState } from 'react'

const CarouselB = () => {
  const [index, setIndex] = useState(null)


  return (
    <div className='carousel-b-wrapper'>
      <div className='carousel-b-main w-[700px] h-[400px] flex items-center justify-center'>
        <div className='carousel-b w-[604px] h-[350px] bg-zinc-900 rounded-2xl border-1 border-zinc-600 flex flex-col justify-center items-center overflow-hidden'>

          <div className='genre-tags-wrapper flex gap-4 w-[460px]'>
            <div className='w-[45px] h-[20px] rounded-4xl bg-zinc-600'></div>
            <div className='w-[45px] h-[20px] rounded-4xl bg-zinc-600'></div>
            <div className='w-[45px] h-[20px] rounded-4xl bg-zinc-600'></div>
            <div className='w-[45px] h-[20px] rounded-4xl bg-zinc-600'></div>
            <div className='w-[45px] h-[20px] rounded-4xl bg-zinc-600'></div>
          </div>

          <div className='flex overflow-hidden w-[900px] h-[250px] items-center justify-center'>
            <div className='carouselB-card w-[500px] h-[220px] bg-zinc-800 rounded-[20px] hover:shadow-custom2 hover:-translate-y-1.5 duration-400 shadow-zinc-600 flex'>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}

export default CarouselB