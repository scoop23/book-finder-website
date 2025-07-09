import React, { forwardRef, useEffect , useRef } from 'react'
import { FaStar } from 'react-icons/fa';
import { LuStar } from 'react-icons/lu';
import BookResultsGrid from '../../components/BookResultsGrid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';  
import bookImage from '../../assets/book_empty.png';
import GenreTags from '../../components/GenreTags';


const LeftSide = ({topOneBook}) => {
  // const { title } = topOneBook.volumeInfo;
  const dataVolumeInfo = topOneBook?.volumeInfo;
  const title = topOneBook?.volumeInfo?.title;
  const imglink = topOneBook?.volumeInfo?.imageLinks?.thumbnail;
  const bookDescription = topOneBook?.volumeInfo?.description || "No Description";
  const author = topOneBook?.volumeInfo?.authors?.[0] || 'No Author';
  const genre = topOneBook?.volumeInfo?.categories || []
  
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
          duration: 0.5,
          ease: "power1.inOut",
          filter : "blur(0px)",
        }
      );

    } 
    return(() => {
      tl.kill();
    })
    
  }, [dataVolumeInfo])


  function onHover() {

  }

  const AdditionalInfos = () => {
    // Still thinking what to put here :)
    return (
      <div className='flex second-content text-[15px] justify-center h-[100px] items-center'>
        <button className='see-more-btn bg-primary-indochine rounded-3xl p-5 max-h-[40px] flex justify-center items-center cursor-pointer hover:-translate-y-1.5 duration-200 transition-all hover:shadow-2xl'><a className='' href={`${dataVolumeInfo.infoLink}`}>See More</a></button>
      </div>
    )
  }

  const Infos = () => {
    return(
        <div className='content-info-wrapper flex flex-col gap-2 max-w-[430px] max-h-[220px] items-baseline'>
            <span className='content-info text-[20px] p-2 flex flex-col gap-2 font-satoshi'>
              <div className='flex justify-between w-[400px] '>
                <div className='line-clamp-3'>{title}</div>
                <div className='flex justify-center'>
                  {
                    <div>
                      <GenreTags genre={genre}/>
                    </div> 
                  }
                </div>
              </div>
              
              <span className='text-[13px] block '>by {author}</span>
              <span className='text-[13px] block'> Published Date: {dataVolumeInfo.publishedDate} </span> 
              <span className='text-[13px] block'>Page Count: {dataVolumeInfo.pageCount}</span>
              {/* <div className='text-[13px'></div> */}
            </span>
            
            <div className='description text-[15px] p-2  rounded-2xl max-h-[220px] font-satoshi overflow-hidden '>
              {bookDescription}
            </div>
        </div>
    )
  }

  return (
      <div style={{boxShadow : "-18px 20px 25px -16px rgba(0,0,0,0.58)"}} className='sidebar p-3 font-satoshi text-2xl max-w-[700px] max-h-[420px] text-black bg-primary-dutch-white rounded-2xl'>
        <div className='main-content-div flex flex-col justify-start gap-4 p-4 min-h-[400px]'>
          <div className='flex first-content gap-4 bg-primary-graychateau p-4 rounded-4xl shadow-2xl hover:shadow-custom2 hover:-translate-y-1 transition-all duration-200 max-h-[250px]'>
            <div className='pic-div max-h-[220px] justify-center flex object-cover'>
              <img src={imglink || bookImage} alt="book cover"  className='min-w-[140px] rounded-2xl ring-1'/>
            </div>
            <Infos />
          </div>
          <AdditionalInfos />
        </div>
      </div>
  )
};

export default LeftSide;