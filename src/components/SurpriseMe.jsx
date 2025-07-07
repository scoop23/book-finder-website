import React, { useEffect } from 'react'
import { useRef } from 'react';
import gsap from 'gsap';

const SurpriseMe = () => {
  const clickMeRef = useRef();

  function hoverClickMe() {
    const tl = gsap.timeline()
    if(clickMeRef.current) {
      tl.to(clickMeRef.current, {
        duration : 0.5,
        opacity : 1,  
      })
    }
  }

  function offHover() {
    const tl = gsap.timeline()
    if(clickMeRef.current) {
      tl.to(clickMeRef.current, {
        duration : 0.5,
        opacity : 0,  
      })
    }
  }
  
  useEffect(() => {
    
  }, [])

  return (
    <div className='surprise-me-wrapper h-full'>
      <div className='surprise-me-main flex justify-center items-center h-full'>
        <div className='surprise-me bg-zinc-900 w-[250px] h-[265px] rounded-2xl border-1 border-zinc-400'>
          <div className='inner-main flex w-full h-full justify-center items-center cursor-pointer' onMouseEnter={hoverClickMe} onMouseLeave={offHover}>
          
            <div className='click-me text-white text-[30px] opacity-0 ' draggable={false} ref={clickMeRef}>
              Click me!
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SurpriseMe;  