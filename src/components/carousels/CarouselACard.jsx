import React, { forwardRef, useState, useRef} from 'react'
import book_empty from '../../assets/book_empty.png'
import gsap from 'gsap';
const CarouselACard = forwardRef(({data} ,ref) => {

  const { smallThumbnail } = data.volumeInfo?.imageLinks || book_empty;
  const title = data.volumeInfo.title;
  const [isHovering , setIsHovering] = useState(false);
  const titleRef = useRef();

  function titleMessageHover() {
    setIsHovering(true)
  }

  function titleMessageOffHover() {
    setIsHovering(false)
  }

  return (
    <div
      className="flex flex-col justify-center items-center text-primary-dessertsand gap-2"
      ref={ref}
      >
        <img
          src={smallThumbnail}
          className="max-w-[120px] rounded-[10px] object-cover h-[200px] border-1 border-primary-blackrock "
        />
        <span 
          className="text-[12px] line-clamp-1"  
          onMouseEnter={() => titleMessageHover()}
          onMouseLeave={() => titleMessageOffHover()}>
            {title}
        </span>
        {
          isHovering && (
            <div className="absolute w-[200px] h-[50px] bg-amber-100 text-[15px]" ref={titleRef}>
             {title}
            </div>
          )
        }
      </div>
  )
})

export default CarouselACard