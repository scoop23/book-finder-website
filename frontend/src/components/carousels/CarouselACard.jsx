import React, { forwardRef, useState, useRef, useEffect, } from 'react'
import { createPortal } from 'react-dom';
import book_empty from '../../assets/book_empty.png'
import gsap from 'gsap';

const CarouselACard = forwardRef(({ data } ,ref) => {
  const [titleRec , setTitleRect] = useState({ top : 0, left : 0 })
  const { smallThumbnail } = data.volumeInfo?.imageLinks || book_empty;
  const title = data.volumeInfo.title;
  const [isHovering , setIsHovering] = useState(false);
  const rectTitleContainer = useRef();
  const titleMessageRef = useRef();

  function titleMessageOnHover() {
    if(!rectTitleContainer.current) {
      console.log("rectTitleContainer doesnt exist.")
      return;
    }

    const titleRectangle = rectTitleContainer.current.getBoundingClientRect();
    setTitleRect({ // set the position of the tooltip
      top : titleRectangle.top - 30,
      left : titleRectangle.left + (titleRectangle.width / 2)
    });
    setIsHovering(true);
  }

  function titleMessageOffHover() {
    if(titleMessageRef.current && isHovering) {
      gsap.to(titleMessageRef.current, {
        y : 0,
        duration : 0.2,
        opacity : 0,
        scale : 1,
        onComplete: () => {
          setIsHovering(false)
        }
      });
    } else {
      console.error("Ref doesn't exist.")
    }
  }

  useEffect(() => {
    const tooltip = titleMessageRef.current;

    if(tooltip && isHovering) {
      const tooltipWidth = tooltip.offsetWidth;
      const left = titleRec.left - (tooltipWidth / 2);
      // titleRectangle.left + (titleRectangle.width / 2) - (tooltipWidth / 2)

      gsap.set(tooltip , { left });
      gsap.to(tooltip , {
        y : -15,
        scale : 1.25,
        duration : 0.5,
        opacity : 1
      })
    }

  }, [isHovering, titleRec.top, titleRec]);

  const hoverTitle = () => {
    return createPortal(
      <div className="fixed w-fit h-fit bg-amber-100 text-[9px] text-black z-2 p-1.5 rounded-2xl border-2 font-inter" ref={titleMessageRef}
      style={{
        opacity : 0,
        left : titleRec.left,
        top : titleRec.top
      }}>
        {title}
      </div>, 
      document.body
    )
  }
  
  

  return (
    <div
      className="flex flex-col justify-center items-center text-primary-dessertsand gap-2"
      ref={ref}
      >
        <img
          src={smallThumbnail || book_empty}
          className="max-w-[120px] rounded-[10px] object-cover h-[200px] border-1 border-primary-blackrock"
        />
        <div 
          className="title text-[11px] line-clamp-1 cursor-pointer"  
          onMouseEnter={() => titleMessageOnHover()}
          onMouseLeave={() => {
            // console.log('Mouse leave triggered. Moving to:', e.relatedTarget);
            // console.log('Is tooltip?', titleMessageRef.current?.contains(e.relatedTarget));
              titleMessageOffHover();
          }}
          ref={rectTitleContainer}>
            {title}
          {
          isHovering && hoverTitle() // stationed inside the span because of hover problems
          } 
          
        </div>
        
      </div>
  )
})

export default CarouselACard