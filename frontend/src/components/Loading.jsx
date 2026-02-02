import React from 'react'
import SpinnerSVG from './icons/SpinnerSVG.jsx'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loading = ({ onFinish }) => {
  const loadRef = useRef(null);

  useEffect(() => {
    if (loadRef.current) {
      gsap.fromTo(
        loadRef.current,
        { autoAlpha: 0, scale: 0.2 },
        { autoAlpha: 1, scale: 1.2, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [])

  useEffect(() => {
    return () => {
      // This runs right before React removes the component
      // because this is a cleanup 
      if (loadRef.current) {
        gsap.to(loadRef.current, {
          autoAlpha: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "power3.in",
          onComplete: onFinish
        })
      }
    }
  })

  return ( // fixed, inset-0 - fixed relative to the viewport no the parent basically left  = 0 ,right =0 ,top =0 , bottom =0 then center it with flex box.
    <div className='fixed inset-0 flex items-center justify-center w-full h-full pointer-events-none' ref={loadRef} >
      <SpinnerSVG className='w-30 h-30 pointer-events-auto' />
    </div>
  )
}

export default Loading
