// import { animate , delay, stagger } from 'motion';
import React, { useEffect, useRef } from 'react'

const BookCard = ({ bookData }) => {
  
  const data = bookData?.volumeInfo;
  const { title, imageLinks } = data;
  
  return (  
    <div className='main-bookcard-content'>
      <div className='content-container rounded-3xl bg-primary-dutch-white max-w-[309px] min-h-[300px]'>
        {/* TODO : ADD CONTENT FOR CARD */}
        <div className='main-content-card flex p-5 max-h-[150px] max-w-[309px]'>
          <div className='inner-content flex gap-2'>
            <div className='content flex gap-5'>
              { imageLinks?.thumbnail ? (
                <img className='image rounded-2xl' src={imageLinks.thumbnail} />
              ) : (<div> NO IMAGE </div>)
              }
              <span className='title font-bold'>{title}</span>
            </div>
          </div>    
        </div>
      </div>
    </div>
  )
}

export default BookCard;