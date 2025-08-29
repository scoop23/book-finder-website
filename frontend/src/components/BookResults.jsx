import { FaStar } from 'react-icons/fa';
import BookResultsGrid from './BookResultsGrid';
import { LuStar } from 'react-icons/lu';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';  
import GenreTags from './GenreTags';
import LeftSide from './ui/LeftSide.jsx'
import RightSide from './ui/RightSide.jsx';


// [this should be /search route]
const BookResults = ({ data }) => {
  if(!data) return (
    <div>Try Searching</div>
  )
  
  const filteredLanguage = data.items?.filter(b => b?.volumeInfo.language == "en") // gets only the volumeInfo with en language
  const entopBooks = filteredLanguage?.slice(0, 3); // ?. - safety check data.items if it exists
  const topOneBook = entopBooks?.[0];
  const topTwoBook = entopBooks?.[1];
  const topThreeBook = entopBooks?.[2];
  const remainingBooks = filteredLanguage?.slice(3) || []; // start at index 4
  return (
    <div className='main-content text-black flex flex-col gap-6 items-center max-w-[1300px] font-inter'>
      {!data.items?.length ? (
        <div className='no-data-books'>
          No Books Found!
        </div>
      ) : (
        <>
        <div className='flex flex-row-reverse w-full text-white'>
          <span>129 results found in the Akashic Records. </span>
        </div>
        <div className='main-bar flex gap-4 max-w-[1300px] items-center justify-center '>
          <LeftSide topOneBook={topOneBook}/>
          <RightSide topTwoBook={topTwoBook} topThreeBook={topThreeBook}/>
        </div>

        <button className='page-btn border max-w-[100px] p-2 rounded-[40px] cursor-pointer hover:bg-gray-500 transition-all duration-250'></button>

        <BookResultsGrid remainingBooks={remainingBooks} />
      </>
      ) }
    </div>
  );
}

export default BookResults;