import React, { forwardRef, useState, useRef, useEffect} from 'react'
import book_empty from '../../assets/book_empty.png'
import gsap from 'gsap';

const CarouselACard = forwardRef(({data} ,ref) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const { smallThumbnail } = data.volumeInfo?.imageLinks || book_empty;
  const title = data.volumeInfo.title;
  const [isHovering , setIsHovering] = useState(false);
  const titleRef = useRef();

  function titleMessageHover(e) {
    setPosX(e.clientX);
    setPosY(e.clientY);
    setIsHovering(true)
  }

  function titleMessageOffHover() {
    setIsHovering(false)
  }

  useEffect(() => {
      if(titleRef.current) {
        gsap.fromTo(titleRef.current , {
          x : 0,
          y : 0
        }, {
          x : posX,
          y : posY
        })
      }
  }, [posX ,posY])

  const hoverTitle = () => {
    return(
      <div className="absolute w-fit h-fit bg-amber-100 text-[15px] z-10 p-2" ref={titleRef}>
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
          className="text-[12px] line-clamp-1"  
          onMouseEnter={(e) => titleMessageHover(e)}
          onMouseLeave={() => titleMessageOffHover()}>
            {title}
        </span>
        {
          isHovering && hoverTitle()
        }
      </div>
  )
})

export default CarouselACard