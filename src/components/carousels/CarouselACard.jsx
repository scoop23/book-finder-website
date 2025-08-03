import React, { forwardRef, useState, useRef, useEffect} from 'react'
import book_empty from '../../assets/book_empty.png'
import gsap from 'gsap';

const CarouselACard = forwardRef(({data} ,ref) => {
  const [titleRec , setTitleRect] = useState({ top : 0, left : 0 })

  const { smallThumbnail } = data.volumeInfo?.imageLinks || book_empty;
  const title = data.volumeInfo.title;
  const [isHovering , setIsHovering] = useState(false);
  const rectTitleContainer = useRef();
  const titleMessageRef = useRef();

  function titleMessageHover() {
    if(!rectTitleContainer.current) {
      console.log("rectTitleContainer doesnt exist.")
      return;
    }

    
    const titleRectangle = rectTitleContainer.current.getBoundingClientRect();
    setTitleRect({
      top : titleRectangle.top - 30,
      left : titleRectangle.left
    });
    setIsHovering(true)
    console.log(titleRec.top)
    console.log(titleRec.left)
    
  }

  function titleMessageOffHover() {
    setIsHovering(false)
  }

  useEffect(() => {
      if(titleMessageRef.current && isHovering) {
        gsap.from(titleMessageRef.current , {
          x : 0,
          y : 200,
          opacity : 0,
          duration : 1
        })
      } 
  })

  const hoverTitle = () => {
    return(
      <div className="fixed w-fit h-fit bg-amber-100 text-[15px] text-black z-10 p-2 rounded-2xl border-2" ref={titleMessageRef}>
        {title}
      </div>
    )
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
          className="text-[15px] line-clamp-1 cursor-pointer"  
          onMouseEnter={(e) => titleMessageHover(e)}
          onMouseLeave={() => titleMessageOffHover()}
          ref={rectTitleContainer}>
            {title}
        </span>
        {
          isHovering && hoverTitle()
        }
      </div>
  )
})

export default CarouselACard