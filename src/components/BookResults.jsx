import React, { forwardRef, useEffect , useRef } from 'react'
import { FaStar } from 'react-icons/fa';
import BookResultsGrid from './BookResultsGrid';
import { motion , useAnimation } from 'motion/react';
import { LuStar } from 'react-icons/lu';




const RightSideBar = ({ topTwoBook , topThreeBook }) => {
  
  const book2VolumeInfo = topTwoBook?.volumeInfo;
  const title2 = book2VolumeInfo?.title;
  const bookDescription2 = book2VolumeInfo?.description || 'NA';
  const author2 = book2VolumeInfo?.authors?.[0] || 'Unknown Author';
  const imglink2 = book2VolumeInfo?.imageLinks?.thumbnail || book2VolumeInfo?.imageLinks?.smallThumbnail;

  const book3VolumeInfo = topThreeBook?.volumeInfo;
  const title3 = book3VolumeInfo?.title;
  const bookDescription3 = book3VolumeInfo?.description || 'NA';
  const author3 = book3VolumeInfo?.authors?.[0] || 'NA';
  const imglink3 = book3VolumeInfo?.imagelinks?.thumbnail || book3VolumeInfo?.imageLinks?.smallThumbnail;

  const Book2Info = () => {
    return (
      <div className='content-info2 flex flex-col gap-2 min-w-[430px] max-h-[220px] items-baseline'>
          <span className='title2 max-h-[200px] text-[20px] p-1 flex flex-col gap-2'>{title2}
            <span className='text-[13px] block '>by {author2}</span> 
          </span>
          
          <div className='description2 text-[15px] p-2  rounded-2xl max-h-[115px] font-winky overflow-hidden '>
            {bookDescription2}
          </div>
      </div>
    )
  }

  const Book3Info = () => {
    return(
      <div className='content-info3 flex flex-col gap-2 min-w-[430px] max-h-[220px] items-baseline'>
          <span className='title3 max-h-[200px] text-[20px] p-1 flex flex-col gap-2'>{title3}
            <span className='text-[13px] block '>by {author3}</span> 
          </span>
          
          <div className='description3 text-[15px] p-2  rounded-2xl max-h-[115px] font-winky overflow-hidden '>
            {bookDescription3}
          </div>
      </div>
    )
  }

  return (
    <div className='right-main-sidebar flex flex-col gap-5 '>
      <motion.div
        // transition={{ type : "spring" , bounce : 0.4 , duration : 1}}
      >
        <div className='right-sidebar text-black p-4 font-inter text-[100px] max-w-[600px] h-[200px] bg-primary-dutch-white rounded-2xl flex gap-2'>
        <div className='flex gap-3 bg-primary-graychateau p-2 rounded-2xl max-w-[600px]'>
          <div className='pic-div-b2 max-h-[220px] justify-center flex'>
            <img src={`${imglink2}`} alt=""  className='min-w-[100px] rounded-2xl ring-1'/>
          </div>
            <Book2Info />
          </div>
        </div>
        
      </motion.div>
      <motion.div
      >
        <div className='right-sidebar text-black p-4 font-inter text-[100px] max-w-[600px] h-[200px] bg-primary-dutch-white rounded-2xl flex gap-2'>
        <div className='flex gap-3 bg-primary-graychateau p-2 rounded-2xl max-w-[600px]'>
          <div className='pic-div-b2 max-h-[220px] justify-center flex'>
            <img src={`${imglink3}`} alt=""  className='min-w-[100px] rounded-2xl ring-1'/>
          </div>
            <Book3Info />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const LeftSideBar = ({topOneBook}) => {
  // const { title } = topOneBook.volumeInfo;
  const dataVolumeInfo = topOneBook?.volumeInfo;
  const title = topOneBook?.volumeInfo?.title;
  const imglink = topOneBook?.volumeInfo?.imageLinks?.thumbnail;
  const bookDescription = topOneBook?.volumeInfo?.description || "No Description";
  const author = topOneBook?.volumeInfo?.authors?.[0] || 'No Author';

  console.log(dataVolumeInfo);
  const control = useAnimation();

  const AdditonalInfos = () => {
    // Still thinking what to put here :)
    return (
      <div className='flex second-content text-[15px] justify-center h-[100px] items-center'>
        
        <button className='see-more-btn border bg-primary-indochine rounded-3xl p-2 max-h-[40px]'><a href={`${dataVolumeInfo.infoLink}`}> See More </a></button>

      </div>
    )
  }

  const Infos = () => {
    return(
        <div className='content-info flex flex-col gap-2 max-w-[430px] max-h-[220px] items-baseline'>
            <span className='title text-[20px] p-2 flex flex-col gap-2'>{title}
              <span className='text-[13px] block '>by {author}</span>
              <span className='text-[13px] block'> Published Date: {dataVolumeInfo.publishedDate} </span> 
              <span className='text-[13px] block'>Page Count: {dataVolumeInfo.pageCount}</span>
              {/* <div className='text-[13px'></div> */}
            </span>
            
            <div className='description text-[15px] p-2  rounded-2xl max-h-[220px] font-winky overflow-hidden '>
              {bookDescription}
            </div>
        </div>
    )
  }

  return (
    <motion.div
    
    >
      <div className='sidebar p-3 font-inter text-2xl max-w-[700px] max-h-[420px] text-black bg-primary-dutch-white rounded-2xl'>
        <div className='main-content-div flex flex-col justify-start gap-4 p-4 min-h-[400px]'>
          <div className='flex first-content gap-4 bg-primary-graychateau p-4 rounded-4xl'>
            <div className='pic-div max-h-[220px] justify-center flex'>
              <img src={`${imglink}`} alt="book cover"  className='min-w-[140px] rounded-2xl ring-1'/>
            </div>
            <Infos />
          </div>
          <AdditonalInfos />
        </div>
      </div>
    </motion.div>
  )
};


const BookResults = ({ data }) => { 
  const topBooks = data.items?.slice(0, 3); // ?. - safety check data.items if it exists
  const topOneBook = topBooks?.[0];
  const topTwoBook = topBooks?.[1];
  const topThreeBook = topBooks?.[2];
  const remainingBooks = data.items?.slice(3) || []; // start at index 4

  return (
    <div className='main-content text-black flex flex-col gap-6 items-center max-w-[1300px]'>
      <div className='main-bar flex gap-8 max-w-[1300px] items-center justify-center'>
        <LeftSideBar topOneBook={topOneBook}/>
        <RightSideBar topTwoBook={topTwoBook} topThreeBook={topThreeBook}/>
        
      </div>
      <button className='page-btn border max-w-[100px] p-2 rounded-2xl cursor-pointer hover:bg-gray-500 transition-all duration-250'>PAGE {}</button>
      <BookResultsGrid remainingBooks={remainingBooks} />
    </div>
  );
}

export default BookResults;