import { FaStar } from 'react-icons/fa';
import BookResultsGrid from './BookResultsGrid';
import LeftSide from './ui/LeftSide.jsx'
import RightSide from './ui/RightSide.jsx';
import Loading from './Loading.jsx';
import { BookSearchContext } from '../context/BookSearchContext.jsx';
import { useEffect, useState } from 'react';
import SearchPagePaginationResults from './SearchPagePaginationResults.jsx';
import NothingSearch from './ui/NothingSearch.jsx';

// [this should be /search route]
const BookResults = ({ data, isPending }) => {
  const [loading, setLoading] = useState(isPending);
  function stopLoading() {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }

  useEffect(() => {
    if (isPending) {
      setLoading(true)
    }
  }, [isPending])

  if (loading) return <Loading onFinish={stopLoading} /> // if data is pending return loading component

  if (!data?.docs) {
    return <NothingSearch />
  }

  const filteredLanguage = data?.docs.filter(b => b?.language?.includes("eng")) // gets only the volumeInfo with en language
  const entopBooks = data?.docs?.slice(0, 3); // ?. - safety check data.items if it exists
  const topOneBook = entopBooks?.[0];
  const topTwoBook = entopBooks?.[1];
  const topThreeBook = entopBooks?.[2];
  const remainingBooks = filteredLanguage?.slice(3) || []; // start at index 4
  const totalPages = data?.numFound;

  // totalPages is theoretical aka its sucks
  if (!topOneBook) {
    return <div className='text-white'>Well. this is awkward There are no english results on this page.</div>
    // also awkward because this rarely shows up.
  }

  return (
    <div className='main-content text-black flex flex-col gap-6 items-center max-w-[1300px] font-inter'>
      {!data.docs?.length ? (
        <div className='no-data-books'>
          No Books Found!
        </div>
      ) : (
        <>
          {/* {loading && <Loading onFinish={stopLoading}/>} */}
          <div className='flex flex-row-reverse w-full text-white gap-10 items-center'>
            <span>{totalPages} results found in the Akashic Records. </span>
          </div>
          <div className='main-bar flex gap-4 max-w-[1300px] items-center justify-center '>
            <LeftSide key={topOneBook.title.split(" ").join("-")} topOneBook={topOneBook} />

            {topThreeBook && topTwoBook && <RightSide key={[topTwoBook, topThreeBook].join("-")} topTwoBook={topTwoBook} topThreeBook={topThreeBook} />}
          </div>

          {/* <button className='page-btn border max-w-[100px] px-[15px] py-[10px] rounded-[15px] cursor-pointer hover:bg-gray-500 transition-all duration-250 text-center'> 1 </button> */}

          <BookResultsGrid key={remainingBooks.map(b => b.id || b.title).join('-')} remainingBooks={remainingBooks} />
          {/* // give this a key for react to trigger the animation again. because react checks if its the same component or not | will it remount it or not, rerendering and remounting aren't the same. in rerendering react checks if the key of the component, if its the same it will simply just rerender it and change its props and doesn't trigger the animation because useEffect and useLayoutEffect only executes on mount and unmount, else if it DOES have a key it remounts it meaning, remove the component and then trigger the animation again. for more info check reconcilliation on react docu, itz a diffing algo */}
        </>
      )}
    </div>
  );
}

export default BookResults;
