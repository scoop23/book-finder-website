import React, { useEffect } from 'react'
import image from '../../assets/pictures/NoSearched.png'
import { useRef } from 'react';
import gsap from 'gsap';

const NothingSearch = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if(imageRef.current) {
      gsap.fromTo(imageRef.current, 
        { autoAlpha : 0 },
        { autoAlpha : 1 , duration : 0.4 , ease : "power3.in" }
      )
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-[650px] opacity-0" ref={imageRef}>
      <img className="w-fit h-auto p-2 rounded-[100px] " src={image} alt="No results" />
    </div>
  )
}

export default NothingSearch;