// import { animate , delay, stagger } from 'motion';
import { animate } from 'motion';
import React, { useEffect, useRef } from 'react'
import bookImage from '../assets/book_empty.png';

const BookCard = ({ bookData }) => {

  const data = bookData?.volumeInfo;
  const { title, imageLinks , description,  publishedDate} = data;

  return (  
    <div className='main-bookcard-content max-h-[300px]'>
      <div className='content-container rounded-3xl bg-primary-dutch-white max-w-[309px] h-[300px] flex flex-col shadow-custom3'>
        {/* TODO : ADD CONTENT FOR CARD */}

        <div className='bookcard-content flex flex-col p-1 justify-center items-center'>
          <div className='main-content-card flex p-4 max-h-[150px] max-w-[309px]'>
            <div className='inner-content flex gap-2'>
              <div className='content-main flex gap-5'>
                { imageLinks?.thumbnail ? (
                  <img className='image rounded-2xl border' src={imageLinks.thumbnail} />
                ) : ( <img className='border bg-primary-blackrock rounded-2xl' src={bookImage} alt="" /> )
                }
                <div className='content-info flex flex-col gap-2 text-[14px] h-[118px]'>
                  <span className='title font-bold'>{title}</span>
                  <div className='block'>Published: {publishedDate}</div>
                </div>
                
              </div>
            </div>  
          </div>

          <div className='sub-content w-[250px] h-[120px] rounded-3xl'>
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default BookCard;