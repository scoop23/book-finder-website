import React, { useEffect } from 'react'
import BookCard from './BookCard';


const BookResultsGrid = ({ remainingBooks }) => {
  // remainingBooks = an array of data.items;
  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-4 gap-12 gap-y-8 max-w-[1300px]'>
        {remainingBooks.map((book , index) => (
          <BookCard key={index} bookData={book}/>
        ))}
      </div>
    </div>
  )
}

export default BookResultsGrid;