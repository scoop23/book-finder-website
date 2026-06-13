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
    setLoading(isPending);
  }, [isPending])

  if (loading) return <Loading onFinish={stopLoading} /> // if data is pending return loading component

  // if (!data) { // changed to !data only.
  //   return <NothingSearch />
  // }

  const filteredLanguage = data?.docs.filter(b => b?.language?.includes("eng")) // gets only the volumeInfo with en language
  const entopBooks = data?.docs?.slice(0, 3); // ?. - safety check data.items if it exists
  const topOneBook = entopBooks?.[0];
  const topTwoBook = entopBooks?.[1];
  const topThreeBook = entopBooks?.[2];
  const remainingBooks = data?.docs?.slice(3) || []; // start at index 4
  const totalPages = data?.numFound; // with openlib
  console.log(remainingBooks);

  // totalPages is theoretical aka its sucks
  if (!topOneBook) {
    return <div className='text-white'>Well. this is awkward There are no english results on this page.</div>
    // also awkward because this rarely shows up.
  }

  return (
    <div className='main-content text-black flex flex-col gap-6 items-center max-w-[1300px] font-inter'>

      <svg width="0" height="0" style={{ position: "absolute" }}>
        {/* defs tag is like defining a variable though instead of a variable you define all kinds of things and you can use it by getting the id of the tag you created using url(#someId)*/}
        <defs>
          <filter id="goo" height="300%" y="-100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" result='goo' values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 2 18 -7" />
            {/* these 2 creates a goo by attempting to increase the contrast of the gaussian blur. it takes the result which is blur then store it in "goo" */}
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            {/* only put shadows up top  */}
            <feBlend in2="shadow" in="goo" result="goo" />

            <feBlend in2="goo" in="SourceGraphic" result="mix" />
            {/* original values : 1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7 */}
          </filter>
        </defs>
        {/* this is the goo effect very useful */}
      </svg>

      {!data.docs?.length ? (
        // <div className='no-data-books'>
        //   No Books Found!
        // </div>
        <NothingSearch />
      ) : (
        <>
          {/* {loading && <Loading onFinish={stopLoading}/>} */}
          <div className='flex flex-row-reverse w-full text-white gap-10 items-center'>
            <span className='font-light'>{totalPages} results found in the <span style={{ fontFamily: "'Plainfair Display', serif" }} > Akashic Records. </span></span>
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
