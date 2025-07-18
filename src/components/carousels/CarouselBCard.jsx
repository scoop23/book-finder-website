import React, { useEffect, useState } from 'react'
import GenreTags from '../GenreTags'
import bookImage from '../../assets/book_empty.png';

const CarouselBCard = ({ data , CARDWIDTH}) => {
  const { imageLinks, title, description, categories} = data?.volumeInfo;
  return (
    <>
      <div className="font-satoshi carouselB-card h-[220px] bg-zinc-800 rounded-[20px] hover:shadow-custom2 hover:-translate-y-1.5 duration-400 shadow-primary-myblue flex flex-col justify-center"
      style={{
        width : `${CARDWIDTH}px`
      }}>
        <div className='flex'></div>
        
        <div className='flex flex-row content-wrapper gap-4 p-4'>
          <img className='rounded-2xl select-none ' style={{ width : '128px', height : '196px' }} src={imageLinks?.smallThumbnail || bookImage}></img> {/* 128x196 or 210 */}
          <div className='content-info flex flex-col items-start overflow-hidden gap-2'>
            <div className='card-header flex justify-between'>
              <div className='content-title-header flex justify-between w-[320px]'>
                <p className='title pt-2 line-clamp-2 break-words text-zinc-400 text-[20px]'>{title || "N/A"}</p>
                <div className='flex '>
                  <GenreTags genre={categories}/>
                </div>
              </div>
              
            </div>
            <p className='text-[14px] line-clamp-4 break-words pr-4 '>{description || "No description available."}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarouselBCard