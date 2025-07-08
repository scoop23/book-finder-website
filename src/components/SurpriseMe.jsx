import React, { useEffect } from 'react'
import { useRef } from 'react';
import gsap from 'gsap';

const SurpriseMe = () => {
  const clickMeRef = useRef();
  const canvasRef = useRef();
  function hoverClickMe() {
    const tl = gsap.timeline()
    if(clickMeRef.current) {
      tl.to(clickMeRef.current, {
        duration : 0.5,
        opacity : 1,  
      })
    }
  }
  
  // ---------------------------------------------------
  // get the width and height for boundaries
  // 10 is padding
  const outerBoxFn = (sizeW, sizeH) => `
      M 31.7 3.1
      L ${sizeW - 10} 0
      L ${sizeW - 23} ${sizeH}
      L 0 ${sizeH - 8}
      Z
  `;


  function SvgExample({ sizeWidth, sizeHeight }) {
    

    const outerD = outerBoxFn(sizeWidth , sizeHeight)

    return (
      <svg className='absolute' viewBox='0 0 300 300' width="230" height="200">
        
          {/* <path
            className="outer-box"
            d="M 10 160 L 160 140 L 140 210 L 0 210 Z"
            fill="white"
          /> */}
        <path
          className="inner-box"
          d={outerD}
          fill="black"
        />

        
      </svg>
    );
  }
  // ---------------------------------------------------

  function onClickMe() {
    let particle = []
    function createParticle() {
      return{
        x : Math.random() * canvas.width,
        y : Math.random(),
      }
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
          <div className='inner-main flex w-full h-full justify-center items-center cursor-pointer relative' onMouseEnter={hoverClickMe} onMouseLeave={offHover}>

            <canvas ref={canvasRef} id='my-canvas' className='absolute' width={250} height={260}></canvas>

            <SvgExample sizeWidth={200} sizeHeight={100}/>

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