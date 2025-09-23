import BookCard from './BookCard';
import { useContext, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap'
import { BookSearchContext } from '../context/BookSearchContext';

const BookResultsGrid = ({ remainingBooks }) => {
  // remainingBooks = an array of data.items;
  const bookCardHTMLArray = useRef([]);
  const { state } = useContext(BookSearchContext);  
  const tl = gsap.timeline();
  console.log(state.bookData)
  
  useLayoutEffect(() => {
    // bookCardHTMLArray.current.map((element , index) => {
    //   const ctx = gsap.context(() => {
    //     tl.fromTo(bookCardHTMLArray.current[index] , 
    //       { autoAlpha : 0 , y : 30},
    //       { autoAlpha : 1 , y : 0 , duration : 0.2 , ease : "power3.in", stagger : 0.1}
    //     )
    //   })
    // })
    // DONT NEED .map here because gsap can accept arrays as the first argument in fromTo(element/s , animation_start, animation_end)
    const ctx = gsap.context(() => {
      if(bookCardHTMLArray.current) {
          tl.fromTo(bookCardHTMLArray.current, 
          { autoAlpha : 0 , y : 30},
          { autoAlpha : 1 , y : 0 , duration : 0.4 , ease : "power3.in", stagger : 0.1}
        )
      }
    });

    return (() => {
      ctx.kill()
    })

  }, []);

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-4 gap-12 gap-y-8 max-w-[1300px]'>
        {remainingBooks.map((book , index) => (
          <BookCard key={index} bookData={book} ref={(element) => bookCardHTMLArray.current[index] = element}/> // for each ref for the element inside the bookCard Array via forwardRef store it inside the bookCardGHTMLArray to get their individual DOM.
        ))}
      </div>
    </div>
  )
}

export default BookResultsGrid;