import React from 'react'
import slideData from '../slideDemo.json'
import { useState } from 'react'

const CarouselB = () => {
  const [index, setIndex] = useState(null)


  return (
    <div className='carousel-b-wrapper'>
      <div className='carousel-b-main w-[700px] h-[400px] flex items-center justify-center'>
        <div className='carousel-b w-[604px] h-[350px] bg-zinc-900 rounded-2xl border-1 border-zinc-600 flex flex-col justify-center items-center overflow-hidden gap-2'>

        {/* why am i 'raw-doggin' animations when i can use keyframes */}
          <div className='genre-tags-wrapper flex gap-4 w-[490px]'>
            <div className='genre-tag w-[70px] h-[25px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[14px] text-center flex justify-center items-center animation'>Romance</div>
            <div className='genre-tag w-[70px] h-[25px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[14px] text-center flex justify-center items-center '>Fiction</div>
            <div className='genre-tag w-[90px] h-[25px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[14px] text-center flex justify-center items-center'>Non Fiction</div>
            <div className='genre-tag w-[70px] h-[25px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[14px] text-center flex justify-center items-center'>Drama</div>
            <div className='genre-tag w-[80px] h-[25px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[14px] text-center flex justify-center items-center'>Adventure</div>
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