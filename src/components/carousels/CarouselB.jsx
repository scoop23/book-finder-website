import { useState } from 'react'
import CarouselBCard from './CarouselBCard.jsx'
import slideData from '../slideDemo.json';

const CarouselB = () => {
  const [index, setIndex] = useState(0)
  const [data] = useState(slideData.slideData)
  
  function nextIndex() {
    console.log(index)
    if(index < data.length) {
      setIndex(prev => prev + 1);
    } else {
      setIndex(0);
    }
  }

  function prevIndex() {
    if(index > 0) {
      setIndex(prev => prev - 1);
      console.log(index)
    }
  }
  
  return (
    <div className='carousel-b-outer-wrapper flex justify-center font-satoshi text-zinc-100 '>
      {/* <span className=''>Genres</span> */}
      <div className='carousel-b-main-wrapper w-[700px] h-[400px] flex items-center justify-center'>
        
        <div className='carousel-b w-[650px] h-[350px] bg-zinc-900 rounded-2xl border-1 border-zinc-600 flex flex-col justify-center items-center gap-2'>

        {/* why am i 'raw-doggin' animations when i can use keyframes */}
          <div className='genre-tags-wrapper flex gap-4 w-[490px] flex-wrap h-[24px]'>
            <div className='genre-tag w-[80px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer p-0.5 text-[13px] text-center flex justify-center items-center '>Romance</div>
            <div className='genre-tag w-[70px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Fiction</div>
            <div className='genre-tag w-[100px] h-[24px]  rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Non Fiction</div>
            <div className='genre-tag w-[70px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Drama</div>
            <div className='genre-tag w-[80px] h-[24px] rounded-4xl bg-zinc-600 text-zinc-300 cursor-pointer text-[13px] text-center flex justify-center items-center p-0.5'>Adventure</div>
          </div>

        <div className='flex gap-3 items-center'>
          <button className='h-[30px] p-2 flex items-center rounded-[40px] bg-zinc-400' onClick={() => prevIndex()}>prev</button>
          <div className='carouselB-main flex  w-[510px] h-[250px] overflow-hidden  items-center '>
              <div className='flex gap-30 carouselB-main' style={{ transform: `translateX(-${index * 619}px)`, transition : `0.4s ease`, transformStyle : `preserve-3d`}}>
                {
                  data.map((demo , index) => (
                    <div key={index}>
                      <CarouselBCard data={demo}/> 
                    </div>
                  ))
                }
              </div>
              {/* <div className='carouselB-card w-[500px] h-[220px] bg-zinc-800 rounded-[20px] hover:shadow-custom2 hover:-translate-y-1.5 duration-400 shadow-zinc-600 flex'>
              </div> */} 
          </div>
          <button className='h-[30px] p-2 flex items-center rounded-[40px] bg-zinc-400' onClick={() => nextIndex()}>next</button>
        </div>
      </div>
          
          
    </div>
  </div>
  )
}

export default CarouselB