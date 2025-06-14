import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import slideData from '../slideDemo.json';


const CarouselA = () => {
  const [index , setIndex] = useState(0);
  const [slides] = useState(slideData.slideData);

  function nextMove() {
    if (index < slides.length - 3){
      setIndex(prev => prev + 1)
    }
    console.log(index)
  }

  useEffect(() => {
    const stop = setInterval(() => {
      setIndex(prev => {
        if(prev < slides.length - 3) {
          return prev + 1
        } else if (prev === 3){
          return prev = 1
        }
      })
    }, 3000);
    return () => clearInterval(stop);
  }, [slides.length]);

  function prevMove() {
    if(index > 0) {
      setIndex(prev => prev - 1)
    }
    console.log(index)
  }

  return (
    <div className='carousel-wrapper'>
      <div className='carousel-main'>
        <div className='carousel max-w-[480px] h-[400px] flex flex-row gap-2 justify-baseline items-center'>
          <div className='inner-carousel-wrapper flex flex-col justify-center items-center gap-8 w-[480px]'>
            <span className='text-primary-dutch-white font-avenir bg-zinc-700 p-2 rounded-2xl shadow-custom border-1 border-primary-dessertsand'>Top Popular Books</span>
            <div className='carousel flex flex-row items-center'>
              <IoIosArrowBack color='' onClick={() => prevMove()} size={40} className='cursor-pointer'/> {/* Left Arrow */}
                  <div className='w-[400px] overflow-hidden rounded-2xl ' draggable={false}>
                    <div className='flex flex-row gap-4 transition-all duration-400' style={{transform : `translateX(-${index * 140}px)`, transition : `0.3s ease`}}> {/* based on the index it moves times 140px horizontally */}

                      {slides.map((slide, idx) => (
                        <div key={idx} className='flex flex-col justify-center items-center text-primary-dessertsand'>
                        <img src={slide.src}  className='max-w-[120px] rounded-[10px] object-cover h-[200px] border-1 border-primary-blackrock'/>
                        <span>{slide.title}</span>
                        </div>
                      ))}
                      
                    </div>
                  </div>
                <IoIosArrowForward onClick={() => nextMove()} size={40} 
              className='cursor-pointer'/> {/* Right Arrow */}
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselA