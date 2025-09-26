import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import { LuStar } from 'react-icons/lu';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';  
import bookImage from '../../assets/book_empty.png';
import GenreTags from '../../components/GenreTags';
import BookResultsGrid from '../../components/BookResultsGrid';
import { motion } from 'framer-motion';
const RightSide = ({ topTwoBook , topThreeBook }) => {
  
  const book2VolumeInfo = topTwoBook?.volumeInfo;
  const title2 = book2VolumeInfo?.title;
  const bookDescription2 = book2VolumeInfo?.description || 'NA';
  const author2 = book2VolumeInfo?.authors?.[0] || 'Unknown Author';
  const imglink2 = book2VolumeInfo?.imageLinks?.thumbnail || book2VolumeInfo?.imageLinks?.smallThumbnail;
  const genre2 = book2VolumeInfo?.categories || [];

  const book3VolumeInfo = topThreeBook?.volumeInfo;
  const title3 = book3VolumeInfo?.title;
  const bookDescription3 = book3VolumeInfo?.description || 'NA';
  const author3 = book3VolumeInfo?.authors?.[0] || 'NA';
  const imglink3 = book3VolumeInfo?.imagelinks?.thumbnail || book3VolumeInfo?.imageLinks?.smallThumbnail;
  const genre3 = book3VolumeInfo?.categories || [];
  
  const Book2Info = () => {
    return (
      <div className='content-info2 flex flex-col max-h-[220px] items-baseline font-inter'>
          <div className='flex justify-between w-[430px]'>
            <div className=' title2 max-h-[200px] text-[20px] p-1 flex break-words w-[430px] justify-between '>
                <div className='title-content2 line-clamp-3'>{title2}</div>
              <div className='right-genre flex justify-center '>
                {
                  <GenreTags genre={genre2}/>
                }    
              </div> 
            </div>
          </div>

          <span className='text-[13px] block pl-[5px]'>
            by {author2}
          </span>  

          <div className='description2 text-[15px] p-2  rounded-2xl max-h-[115px] overflow-hidden '>
            {bookDescription2}
          </div>
      </div>
    )
  }

  const Book3Info = () => {
    return(
    
    <div className='content-info3 flex flex-col max-h-[220px] items-baseline'>
      <div className='flex justify-between w-[430px]'>
          <div className='font-inter title2 max-h-[200px] text-[20px] p-1 flex break-words justify-between w-[430px]'>
              <div className='title-content3 line-clamp-2'>{title3}</div>
            <div className='right-genre flex justify-center '>
              {
                <GenreTags genre={genre3} />
              }    
            </div> 
          </div>
        </div>
        
        <span>
          <span className='text-[13px] block pl-[6px]'>by {author3}</span> 
        </span>
        
        <div className='description3 text-[15px] p-2  rounded-2xl max-h-[115px] overflow-hidden '>
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
          duration: 0.5,
          stagger: 0.2,
        }
      )
    }

    return(() => {
      tlRightSideBar.kill();
    });
  } , [book2VolumeInfo, book3VolumeInfo])


  return (
    <div className='right-main-sidebar flex flex-col gap-5 '>
      <motion.div
        // transition={{ type : "spring" , bounce : 0.4 , duration : 1}}
      >
        <div className='right-sidebar text-[var(--color-lighter)] p-4 text-[100px] max-w-[620px] bg-[var(--color-base)] rounded-2xl flex gap-2 shadow-custom opacity-0'>
        <div className='flex first-content gap-3 bg-[var(--color-dark)] p-4 rounded-4xl hover:shadow-custom2 hover:-translate-y-1 transition-all duration-200'>
          <div className='pic-div-b2 max-h-[220px] justify-center flex'>
            <img src={imglink2 || bookImage} alt=""  className='min-w-[100px] rounded-2xl ring-1 object-cover'/>
          </div>
            <Book2Info />
          </div>
        </div>
        
      </motion.div>
      <motion.div
      >
        <div className='right-sidebar text-[var(--color-lighter)] p-4 text-[100px] max-w-[620px] bg-[var(--color-base)] rounded-2xl flex gap-2 shadow-custom opacity-0'>
        <div className='flex first-content gap-3 bg-[var(--color-dark)] p-4 rounded-4xl shadow-2xl hover:shadow-custom2 hover:-translate-y-1 transition-all duration-200'>
          <div className='pic-div-b2 max-h-[220px] justify-center flex'>
            <img src={imglink3 || bookImage} alt=""  className='min-w-[100px] rounded-2xl ring-1 object-cover'/>
          </div>
            <Book3Info />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RightSide;