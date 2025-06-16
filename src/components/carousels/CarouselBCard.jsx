import React, { useEffect, useState } from 'react'

const CarouselBCard = ({ data }) => {


  return (
    <>
      <div className='carouselB-card w-[500px] h-[220px] bg-zinc-800 rounded-[20px] hover:shadow-custom2 hover:-translate-y-1.5 duration-400 shadow-primary-myblue flex flex-col'>
        <div className='flex'></div>
        
        <div className='flex content-wrapper'>
          <img src={data.src} ></img>
        </div>
      </div>
    </>
  )
}

export default CarouselBCard