import React from 'react'
import BookCard from './BookCard';

const BookResultsGrid = () => {
  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-4 gap-12 gap-y-8'>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  )
}

export default BookResultsGrid;