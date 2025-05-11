import React, { forwardRef, useEffect , useRef } from 'react'
import { FaStar } from 'react-icons/fa';
import BookResultsGrid from './BookResultsGrid';
import { motion , useAnimation, useForceUpdate } from 'motion/react';
import { LuStar } from 'react-icons/lu';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';  
// TODO : ADD ANIMATIONS


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
          <span className='font-avenir title2 max-h-[200px] text-[20px] p-1 flex flex-col gap-2'>{title2}
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
          <span className='font-avenir title3 max-h-[200px] text-[20px] p-1 flex flex-col gap-2'>{title3}
            <span className='text-[13px] block '>by {author3}</span> 
          </span>
          
          <div className='description3 text-[15px] p-2  rounded-2xl max-h-[115px] font-winky overflow-hidden '>
            {bookDescription3}
          </div>
      </div>
    )
  }

  useEffect(() => {
    const tlRightSideBar = gsap.timeline();
    if(book2VolumeInfo && book3VolumeInfo) {
      tlRightSideBar.fromTo(
        ".right-sidebar",
        {
          x : 250,
          opacity: 0,
          ease: "power1.inOut",
          filter : "blur(5px)"
        },
        {
          x : 0,
          opacity : 1,
          filter: "blur(0px)",
          duration: 0.8, 
        }
      )
    }



  } , [book2VolumeInfo, book3VolumeInfo])


  return (
    <div className='right-main-sidebar flex flex-col gap-5 '>
      <motion.div
        // transition={{ type : "spring" , bounce : 0.4 , duration : 1}}
      >
        <div className='right-sidebar text-black p-4 font-inter text-[100px] max-w-[620px] h-[200px] bg-primary-dutch-white rounded-2xl flex gap-2 shadow-custom'>
        <div className='flex gap-3 shadow-custom3 bg-primary-graychateau p-2 rounded-2xl max-w-[570px]'>
          <div className='pic-div-b2 max-h-[220px] justify-center flex'>
            <img src={`${imglink2}`} alt=""  className='min-w-[100px] rounded-2xl ring-1'/>
          </div>
            <Book2Info />
          </div>
        </div>
        
      </motion.div>
      <motion.div
      >
        <div className='right-sidebar text-black p-4 font-inter text-[100px] max-w-[620px] h-[200px] bg-primary-dutch-white rounded-2xl flex gap-2 shadow-custom'>
        <div className='flex gap-3 shadow-custom3 bg-primary-graychateau p-2 rounded-2xl max-w-[570px]'>
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

  if(!dataVolumeInfo) return "No Book" // Will change so that it will output in the parent component

  useEffect(() => {
  const tl = gsap.timeline();
    if(dataVolumeInfo) {

      tl.fromTo(
        ".sidebar",
        { // first instance
          opacity: 0,
          x: -200,
          ease : "power1.inOut",
          filter : "blur(5px)",
        },
        { // end instance
          opacity:1,
          x: 0,
          duration: 0.8,
          ease: "power1.inOut",
          filter : "blur(0px)",
        }
      );

    } 
    return(() => {
      tl.kill();
    })
    
  }, [dataVolumeInfo])

  const AdditonalInfos = () => {
    // Still thinking what to put here :)
    return (
      <div className='flex second-content text-[15px] justify-center h-[100px] items-center'>
        
        <button className='see-more-btn shadow-custom2 bg-primary-indochine rounded-3xl p-2 max-h-[40px]'><a href={`${dataVolumeInfo.infoLink}`}> See More </a></button>

      </div>
    )
  }

  const Infos = () => {
    return(
        <div className='content-info flex flex-col gap-2 max-w-[430px] max-h-[220px] items-baseline'>
            <span className='title text-[20px] p-2 flex flex-col gap-2 font-avenir'>{title}
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
      <div style={{boxShadow : "-18px 20px 25px -16px rgba(0,0,0,0.58)"}} className='sidebar p-3 font-inter text-2xl max-w-[700px] max-h-[420px] text-black bg-primary-dutch-white rounded-2xl'>
        <div className='main-content-div flex flex-col justify-start gap-4 p-4 min-h-[400px]'>
          <div className='flex first-content gap-4 bg-primary-graychateau p-4 rounded-4xl shadow-custom3'>
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