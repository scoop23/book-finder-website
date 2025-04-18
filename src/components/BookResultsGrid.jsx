import React from 'react'
import BookCard from './BookCard';

const BookResultsGrid = () => {
  return (
    <div className='flex'>
      <div className='grid grid-cols-4'>
        <BookCard />
        <BookCard />
      </div>
    </div>
  )
}

export default BookResultsGrid;