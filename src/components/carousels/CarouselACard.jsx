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
    console.log(titleRectangle)
    setTitleRect({
      top : titleRectangle.top - 30,
      left : titleRectangle.left
    });
    setIsHovering(true);
  }

  function titleMessageOffHover() {
      setIsHovering(false)
  }

  useEffect(() => {
    if (titleMessageRef.current && isHovering) {
      gsap.to(titleMessageRef.current, {
        opacity: 1,
        y : -30,
        duration: 1
      });
    }
  }, [isHovering, titleRec.top]);



  const hoverTitle = () => {
    return(
      <div className="fixed w-fit h-fit bg-amber-100 text-[12px] text-black z-10 p-1.5 rounded-2xl border-2" ref={titleMessageRef}
      style={{
        opacity : 0,
        bottom : 20
      }}>
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
          src={smallThumbnail || book_empty}
          className="max-w-[120px] rounded-[10px] object-cover h-[200px] border-1 border-primary-blackrock "
        />
        <span 
          className="title text-[15px] line-clamp-1 cursor-pointer"  
          onMouseEnter={() => titleMessageHover()}
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