import BookCard from './BookCard';
import { useContext, useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap, { Elastic } from 'gsap'
import { BookSearchContext } from '../context/BookSearchContext';
import { useSearchParams } from 'react-router-dom';
import BookCardModal from './BookCardModal';
import { useQueryClient } from "@tanstack/react-query";

const BookResultsGrid = ({ remainingBooks, openBookId }) => {

  const queryClient = useQueryClient();
  // remainingBooks = an array of data.items;
  const bookCardHTMLArray = useRef([]);
  const { state } = useContext(BookSearchContext);
  const tl = gsap.timeline();
  const prevBooks = useRef([]);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isBookModal, setIsBookModal] = useState(false);
  // console.log(remainingBooks.map(r => r.id));

  const prefetchImage = (coverId) => {
    if (!coverId) return;
    console.log("Prefetching image for coverId: ", coverId);
    const img = new Image();
    img.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }

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
    // const e = remainingBooks.filter(
    //   b => prevBooks.current.some(prevbook => b.id === prevbook.id)
    // )
    // const newBooks = remainingBooks.filter(
    //   b => !prevBooks.current.some(prev => prev.id === b.id)
    // );

    const ctx = gsap.context(() => {
      if (bookCardHTMLArray.current) {
        tl.fromTo(bookCardHTMLArray.current,
          { autoAlpha: 0, y: 30, },
          { autoAlpha: 1, y: 0, duration: 1, ease: Elastic.easeInOut.config(0.5, 0.5), stagger: 0.1 }
        )
      }
    });
    prevBooks.current = remainingBooks;
    return (() => {
      ctx.kill()
    })

  }, [page]);


  // const workData = useQuery({
  //   queryKey: ["workdata", workId],
  //   queryFn: () => fetchWorks(workId),
  //   retry: 0,
  //   enabled: !!workId && isModal,
  //   refetchOnWindowFocus: false,
  //   gcTime: 10 * 60 * 1000,
  //   staleTime: 5 * 60 * 1000
  // })

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-4 gap-12 gap-y-8 max-w-[1300px]'>
        {remainingBooks.map((book, index) => (
          <BookCard
            key={index}
            isBookModal={isBookModal}
            setIsBookModal={setIsBookModal}
            bookData={book}
            OnHover={() => prefetchImage(book.cover_i)}
            onSelect={() => setSelectedBookId(book.key)}
            ref={(element) => bookCardHTMLArray.current[index] = element}
          /> // for each ref for the element inside the bookCard Array via forwardRef store it inside the bookCardGHTMLArray to get their individual DOM.
        ))}
        {
          selectedBookId && (
            <BookCardModal
              key={selectedBookId}
              isModal={isBookModal}
              setIsModal={setIsBookModal}
              workId={selectedBookId}
            />
          )
        }
      </div>
    </div>
  )
}

export default BookResultsGrid;
