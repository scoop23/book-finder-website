import BookCard from './BookCard';
import { useRef } from 'react';

const BookResultsGrid = ({ remainingBooks }) => {
  // remainingBooks = an array of data.items;
  const bookCardHTMLArray = useRef([]);


  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-4 gap-12 gap-y-8 max-w-[1300px]'>
        {remainingBooks.map((book , index) => (
          <BookCard key={index} bookData={book} ref={(element) => bookCardHTMLArray[index] = element}/> // for each ref for the element inside the bookCard Array via forwardRef store it inside the bookCardGHTMLArray to get their individual DOM.
        ))}
      </div>
    </div>
  )
}

export default BookResultsGrid;