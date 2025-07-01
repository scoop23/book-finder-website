import { animate } from 'motion';
import React from 'react';
import bookImage from '../assets/book_empty.png';

const BookCard = ({ bookData }) => {
  const data = bookData?.volumeInfo;
  const { title, imageLinks, description, publishedDate, authors } = data;
  return (
    <div className="main-bookcard-content max-h-[300px]">
      <div className="content-container rounded-3xl bg-primary-dutch-white max-w-[309px] h-[300px] flex flex-col shadow-custom3 overflow-hidden">
        <div className="bookcard-content flex flex-col p-3 gap-2">
          <div className="main-content-card flex gap-3">
            <div className="flex-shrink-0">
              <img
                className="rounded-2xl border w-[80px] h-[110px] object-cover"
                src={imageLinks?.thumbnail || bookImage}
                alt="Book"
              />
            </div>

            <div className="content-info flex flex-col justify-between text-sm w-full overflow-hidden">
              {/* will make authors a dropdown button or a hover then the user will see all the author/s */}
              <span className="title font-bold line-clamp-2 break-words">{title}</span>
              <div className="text-xs text-gray-900 font-satoshi">Authors: 
                {authors ? authors.map(author => (
                  <div>
                    {author}
                  </div>
                )) : (
                  <div>
                    Unknown Author
                  </div>
                )}</div>
              <div className="text-xs text-gray-900 font-satoshi">Published: {publishedDate || 'N/A'}</div>
            </div>
          </div>

          {/* Description Section */}
          <div className="sub-content w-full h-[110px] bg-white bg-opacity-40 rounded-2xl p-2 overflow-hidden">
            <p className="font-satoshi text-xs text-gray-800 line-clamp-5 break-words">
              {description || 'No description available.'}
            </p>
          </div>

          <button><a href='#'>See More</a></button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
