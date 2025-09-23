import { FaStar } from 'react-icons/fa';
import BookResultsGrid from './BookResultsGrid';
import { LuStar } from 'react-icons/lu';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';  
import GenreTags from './GenreTags';
import LeftSide from './ui/LeftSide.jsx'
import RightSide from './ui/RightSide.jsx';
import Loading from './Loading.jsx';
import { BookSearchContext } from '../context/BookSearchContext.jsx';
import { useContext, useEffect, useState } from 'react';
import SearchPagePaginationResults from './SearchPagePaginationResults.jsx';
import NothingSearch from './ui/NothingSearch.jsx';


// [this should be /search route]
const BookResults = ({ data , isPending }) => {
  const [loading , setLoading] = useState(isPending);

  function stopLoading() {
    setTimeout(() => {
      setLoading(false);
    }, 100);  
  }

  useEffect(() => {
    if(isPending) {
      setLoading(true)
    }
  }, [isPending])

  if(loading) return <Loading onFinish={stopLoading} /> // if data is pending return loading component
  
  if (!data?.items) {
    return <NothingSearch />
  }


  const filteredLanguage = data.items?.filter(b => b?.volumeInfo.language == "en") // gets only the volumeInfo with en language
  const entopBooks = filteredLanguage?.slice(0, 3); // ?. - safety check data.items if it exists
  const topOneBook = entopBooks?.[0];
  const topTwoBook = entopBooks?.[1];
  const topThreeBook = entopBooks?.[2];
  const remainingBooks = filteredLanguage?.slice(3) || []; // start at index 4
  const totalPages = data?.totalItems;
  if(!topOneBook) {
    return <div className='text-white'>Well. this is awkward There are no english results on this page.</div>
  }

  return (
    <div className='main-content text-black flex flex-col gap-6 items-center max-w-[1300px] font-inter'>
      {!data.items?.length ? (
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
            <LeftSide topOneBook={topOneBook}/>
            <RightSide topTwoBook={topTwoBook} topThreeBook={topThreeBook}/>
          </div>

          {/* <button className='page-btn border max-w-[100px] px-[15px] py-[10px] rounded-[15px] cursor-pointer hover:bg-gray-500 transition-all duration-250 text-center'> 1 </button> */}

          <BookResultsGrid remainingBooks={remainingBooks} />
        </>
      ) }
    </div>
  );
}

export default BookResults;
