import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';  
import bookImage from '../../assets/book_empty.png';
import GenreTags from '../../components/GenreTags';
import ActionButton from '../ActionButton';
import { Elastic } from 'gsap';
import ActionButtons from '../ActionButtons/ActionButtons.jsx';
import LikeButton from '../ActionButtons/LikeButton.jsx';
import BookmarkButton from '../ActionButtons/BookmarkButton.jsx';

const LeftSide = ({topOneBook}) => {
  // const { title } = topOneBook.volumeInfo;
  const dataVolumeInfo = topOneBook?.volumeInfo;
  const title = topOneBook?.volumeInfo?.title;
  const imglink = topOneBook?.volumeInfo?.imageLinks?.thumbnail;
  const bookDescription = topOneBook?.volumeInfo?.description || "No Description";
  const author = topOneBook?.volumeInfo?.authors?.[0] || 'No Author';
  const genre = topOneBook?.volumeInfo?.categories || []
  const [hover , setIsHovered] = useState(false);
  const sideBarRef = useRef(null)

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

  //  if(!dataVolumeInfo) return "no left book"// Will change so that it will output in the parent component

  const AdditionalInfos = () => {
    // Still thinking what to put here :)
    return (
      <div className='flex second-content text-[15px] justify-center items-center'>
        {/* <button className='see-more-btn bg-[#212129] rounded-3xl p-5 max-h-[40px] flex justify-center items-center cursor-pointer hover:-translate-y-0.5 duration-200 transition-all hover:shadow-2xl text-white'><a className='' href={`${dataVolumeInfo?.infoLink || "N/A"}`}>See More</a></button> */}
      </div>
    )
  }

  const Infos = () => {
    return(
        <div className='content-info-wrapper flex flex-col gap-2 items-baseline'>
            <span className='content-info text-[20px] px-2 flex flex-col gap-2'>
              <div className='title-genre flex justify-between items-center w-[400px] gap-1'>
                <div className='line-clamp-3'>{title}</div>
                <div className='genre flex justify-center'>
                  {
                    <div className=''> 
                      <GenreTags genre={genre}/>
                    </div> 
                  }
                </div>
              </div>
              
              <span className='text-[13px] block'>by {author}</span>
              <span className='text-[13px] block'> Published Date: {dataVolumeInfo?.publishedDate || "No Published Date"}</span> 
              <span className='text-[13px] block'>Page Count: {dataVolumeInfo?.pageCount || "N/A"}</span>
              {/* <div className='text-[13px'></div> */}
            </span>
            
            <div className='description text-[15px] p-2  rounded-2xl max-h-[220px] overflow-hidden '>
              {bookDescription}
            </div>
        </div>
    )
  }  

  return (
    // outer color : --color-base ?
    // inner color : --color-base ?
      <div style={{ //  bg-[var(--color-darker)]
        boxShadow: 'inset 0 1px 3px #ffffff30, 0 2px 4px #00000030, 0 2px 5px #00000015'
      }} className='sidebar py-1 font-inter text-2xl opacity-0 max-w-[620px] text-black relative rounded-2xl min-h-[420px] max-h-[420px]' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* if you want to adjust this change the Ypos */}
        <ActionButtons Ypos={-65.5} Xpos={30} hover={hover} sideBarRef={sideBarRef} className={``}>
        </ActionButtons>
        <div className='main-content-div flex flex-col justify-start gap-4 p-4 '>
          <div style={{
            // boxShadow : 'var(--inset-shadow-1)'
          }} className='flex first-content gap-2 bg-[var(--color-dark)] text-[var(--color-lighter)] px-4 py-5 rounded-2xl shadow-2xl transition-all duration-200 max-h-[380px] min-h-[380px] -z-1' ref={sideBarRef}>
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