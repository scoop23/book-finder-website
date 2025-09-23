import React, { forwardRef } from 'react';
import { useState } from 'react';
import bookImage from '../assets/book_empty.png';

const BookCard = forwardRef(({ bookData } , ref) => {
  const data = bookData?.volumeInfo;
  const { title, imageLinks, description, publishedDate, authors } = data;
  const [isHovering, setIsHovering] = useState(false);

  function hoverSeeMoreButton(){
    
  }

  return (

    <div className="main-bookcard-content max-h-[300px] font-inter" ref={ref}>
      <div className="content-container rounded-3xl bg-[var(--color-base)]  max-w-[309px] h-[300px] flex flex-col shadow-custom3 overflow-hidden">
        <div className="bookcard-content flex flex-col p-3 gap-2 max-h-full">
          <div className="main-content-card flex gap-2">
            <div className="flex-shrink-0">
              <img
                className="rounded-2xl border w-[80px] h-[110px] object-cover"
                src={imageLinks?.thumbnail || bookImage}
                alt="Book"
              />
            </div>

            <div className="content-info flex flex-col justify-between text-sm w-full overflow-hidden">
              {/* will make authors a dropdown button or a hover then the user will see all the author/s */}
              <span className="title text-[var(--color-lighter)] font-bold line-clamp-2 break-words">{title}</span>
              <div className="text-xs text-white  flex flex-col">
                Authors:
                {authors ? ( 
                  <div className='flex flex-col '>
                    {
                      authors.length > 3 ? (
                        <div className='flex flex-col'>
                          {authors.slice(0,3).join(",")}
                          <button className='text-blue flex'>
                            <a href='#' className='text-blue-500'>
                              See More Contributors.
                            </a>
                          </button>
                        </div>
                      ) : ( 
                        <div>
                          {authors.map((author , index) => (
                            <div key={index}>{author}</div>
                          ))}
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <div>
                    Unknown Author
                  </div>
                )}
                </div>
              <div className="text-xs text-white ">Published: {publishedDate || 'N/A'}</div>
            </div>
          </div>

          {/* Description Section */}
          <div className="sub-content w-full h-[110px] bg-[var(--color-dark)] bg-opacity-40 rounded-2xl p-2 overflow-hidden">
            <p className=" text-xs text-[var(--color-lighter)] line-clamp-4 break-words">
              {description || 'No description available.'}
            </p>
          </div>

          <button 
          className='rounded-2xl p-2 bg-[#212129] shadow-2xl cursor-pointer text-white'
          ref={ref}><a href='#'>See More</a></button>
        </div>
      </div>
    </div>
  );
});

export default BookCard;
