import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';  
import bookImage from '../../assets/book_empty.png';
import GenreTags from '../../components/GenreTags';
import ActionButtons from '../ActionButtons';
import { Elastic } from 'gsap';

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

  function onHoverSidebar(likeButtonGroupRef , CircleCxRef) {
    gsap.to(likeButtonGroupRef.current, {
      ease : Elastic.easeInOut.config(0.8 , 0.6),
      duration : 1,
      onUpdate : () => { // while the tween is animating also run this function at the same time for every frame of the animation, Ultimately making it seamless as if the likeButton icon is the parent of the ellipse.
        const Cx = Number(CircleCxRef.current.getAttribute('cx'));
        const Cy = Number(CircleCxRef.current.getAttribute('cy'));
        gsap.set(likeButtonGroupRef.current , {
          attr : { transform : `translate(${Cx - 12} , ${Cy - 12})` }
        })
      }
    })
  }

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
            <span className='content-info text-[20px] p-2 flex flex-col gap-2'>
              <div className='title-genre flex justify-between w-[400px] gap-2'>
                <div className='line-clamp-3'>{title}</div>
                <div className='genre flex justify-center'>
                  {
                    <div>
                      <GenreTags genre={genre}/>
                    </div> 
                  }
                </div>
              </div>
              
              <span className='text-[13px] block '>by {author}</span>
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
      <div style={{boxShadow : "-18px 20px 25px -16px rgba(0,0,0,0.58)"}} className='sidebar py-1 font-inter text-2xl opacity-0 max-w-[620px] text-black bg-[var(--color-base)] rounded-4xl max-h-[420px]' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <ActionButtons hover={hover} sideBarRef={sideBarRef}/>
        <div className='main-content-div flex flex-col justify-start gap-4 p-4 '>
          <div className='flex first-content gap-2 bg-[var(--color-dark)] text-[var(--color-lighter)] px-4 py-3 rounded-4xl shadow-2xl transition-all duration-200 max-h-[370px] relative' ref={sideBarRef}>
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