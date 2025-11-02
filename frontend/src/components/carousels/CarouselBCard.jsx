import React, { forwardRef, useRef } from 'react'
import GenreTags from '../GenreTags'
import bookImage from '../../assets/book_empty.png';
import gsap from 'gsap'
import TablerArrowBadgeRightFilled from '../ui/arrow-badge-right-filled.jsx'


const CarouselBCard = forwardRef(({ data, CARDWIDTH, whileHover, offHoverCard} , ref) => {
  const { imageLinks, title, description, categories} = data?.volumeInfo || [];
  const seeMoreBtnRef = useRef();
  const iconRef = useRef();

  function onHover() {
    if (seeMoreBtnRef.current && iconRef.current) {
      gsap.to(seeMoreBtnRef.current, {
        duration: 0.5,
        width: 110,
        ease : 'power1.out'
      })

      gsap.to(iconRef.current, {
        duration: 0.6,
        opacity: 1,
        x : 2,
      });
    }
  }

  function offHover() {
    if(seeMoreBtnRef.current && iconRef.current) {
      gsap.to(seeMoreBtnRef.current, {
        duration : 0.5,
        width : 100,
        ease : 'power1.out'
      })

      gsap.to(iconRef.current, {
        duration : 0.6,
        opacity : 0,
        x : -5
      })
    }
  }
 // hover:shadow-custom2 hover:-translate-y-1.5 duration-400
  
  return (
    <>
      <div className={`font-inter carouselB-card h-[220px] bg-zinc-800 rounded-[20px]  flex flex-col justify-center `}
      style={{
        width : `${CARDWIDTH}px`,
      }} onMouseEnter={whileHover} onMouseLeave={offHoverCard} ref={ref}>
        <div className='flex'></div>
        
        <div className='flex flex-row content-wrapper gap-4 p-2 pb-2 max-h-full'>
          <img className='rounded-2xl select-none ' style={{ width : '128px', height : '196px' }} src={imageLinks?.smallThumbnail || bookImage}></img> {/* 128x196 or 210 */}
          <div className='content-info flex flex-col items-start overflow-hidden justify-between w-full h-full'>

            <div className='content-title-description-wrapper flex flex-col gap-2 w-full'>
              <div className='card-header flex justify-between w-full'>
                <div className='content-title-header flex justify-between w-full'>

                  <p className='title pt-2 pr-2 line-clamp-2 break-words text-zinc-400 text-[20px]'>
                    {title || "N/A"}
                  </p>

                  <div className='flex'>
                    <GenreTags genre={categories}/>
                  </div>
                </div>
                
                </div>
                <div className='text-[14px] line-clamp-4 break-words pr-4 '>
                  {description || "No description available."}
                </div>
            </div>

            <div className=' w-full h-[100px] flex items-end justify-end p-2'> 
              <button className='rounded-2xl flex justify-center gap-2 items-center'>
                <div className='bg-amber-50 flex rounded-2xl justify-center items-center cursor-pointer ' ref={seeMoreBtnRef} style={{ transition : 'width 0.3 ease' , height : "35px" , width : "100px"}} onMouseEnter={onHover} onMouseLeave={offHover}>
                  <div className='text-black text-[12px] rounded-2xl self-center cursor-pointer flex items-center justify-center p-2'>
                    See more.
                  </div>
                  <TablerArrowBadgeRightFilled
                  style={{ 
                    opacity : 0,
                    transform : 'translateX(-20px)',
                    position : 'absolute',
                    right : '20px',
                  }} 
                  ref={iconRef}
                  />
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
});

export default CarouselBCard