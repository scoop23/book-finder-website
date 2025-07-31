import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MaterialSymbolsArrowCircleLeftRounded } from "../icons/MaterialSymbolsArrowCircleLeftRounded";
import { MaterialSymbolsArrowCircleRight } from "../icons/MaterialSymbolsArrowCircleRight";
import gsap from "gsap";
import slideData from "../slideDemo.json";
import CSSPlugin from "gsap/CSSPlugin";
import book_empty from '../../assets/book_empty.png'

gsap.registerPlugin(CSSPlugin);

const CarouselA = ({ state }) => {
  const [index, setIndex] = useState(0);
  const [slides] = useState(slideData.slideData);
  const rightIcon = useRef();
  const leftIcon = useRef();
  const carRef = useRef();
  const sliderRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const titleRef = useRef();
  const [isTitleHovering, setIsTitleHovering] = useState(false);
  
  const [carouselData, setCarouselData] = useState([]);
  
  // if(state.carouselAData) {
  //     state.carouselAData?.items?.forEach(e => {
  //     console.log(e?.volumeInfo?.title)
  //   });
  // }

  useEffect(() => {
    if(state.carouselAData) {
      setCarouselData(state.carouselAData);
    } 

  }, [state.carouselAData, carouselData])

  function prevMove() {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  }

  function nextMove() {
    if (index < slides.length - 3) {
      setIndex((prev) => prev + 1);
    }
  }

  function titleMessageHover(){
    setIsTitleHovering(true);
  }

  function titleMessageOffHover(){
    setIsTitleHovering(false);
  }

  console.log(isTitleHovering);

  const onHoverTitle = ()  => {
    if(titleRef.current) {
      const title = titleRef.current.innerHTML;
      return (
        <div className="absolute w-[100px] h-[100px] bg-amber-100">
          {title}
        </div>
      )
    }

    return(
      <div className="absolute w-[100px] h-[100px] bg-amber-100">
        No Title
      </div>
    )
  }
  
  // useEffect(() => {
  //   gsap.set([leftIcon.current , rightIcon.current] , {opacity : 0})
  //   const stop = setInterval(() => {
  //     setIndex(prev => {
  //       if(prev < slides.length - 3) {
  //         return prev + 1
  //       } else if (prev === 3){
  //         return 1
  //       }
  //     })
  //   }, 3000);
  //   return () => clearInterval(stop);
  // }, [slides.length]);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: -index * 140,
        duration: 0.01,
        ease: "power2.out",
      });
    }
  }, [index]);

  useEffect(() => {
    if (!isHovering) {
      return;
    }

    if (index === 0) {
      gsap.to(rightIcon.current, { opacity: 1, duration: 0.3 });
      gsap.to(leftIcon.current, { opacity: 0, duration: 0.3 });
    } else {
      gsap.to([leftIcon.current, rightIcon.current], {
        opacity: 1,
        duration: 0.3,
      });
    }
  }, [index, isHovering]);

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleOnLeave = () => {
    setIsHovering(false);
    gsap.to([leftIcon.current, rightIcon.current], {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-main flex justify-center items-center">
        <div className="carousel max-w-[470px] h-[400px] flex flex-row gap-2 justify-center items-center">
          <div className="inner-carousel-wrapper flex flex-col justify-center items-center gap-4 w-[480px]">
            <span className="text-zinc-300 font-satoshi bg-zinc-700 p-2 rounded-2xl shadow-custom border-1">
              Top Popular Books
            </span>
            <div
              className="carousel flex flex-row items-center w-[480px] h-[270px] bg-zinc-900 rounded-2xl p-1.5 border-zinc-600 border-1"
              ref={carRef}
              onMouseEnter={handleHover}
              onMouseLeave={handleOnLeave}
            >
              <MaterialSymbolsArrowCircleLeftRounded
                color=""
                onClick={() => prevMove()}
                className="cursor-pointer p-[4px]"
                ref={leftIcon}
              />{" "}
              {/* Left Arrow */}
              <div
                className="w-[400px] overflow-hidden rounded-2xl"
                draggable={false}
              >
                <div
                  className="flex flex-row gap-4 transition-all duration-400"
                  ref={sliderRef}
                >
                  {" "}
                  {/* based on the index it moves times 140px horizontally */}
                  {carouselData?.items?.map((slide, idx) => {
                    const { smallThumbnail } = slide.volumeInfo?.imageLinks || book_empty;
                    const title = slide.volumeInfo.title;
                    
                    return (
                    <div
                      key={idx}
                      className="flex flex-col justify-center items-center text-primary-dessertsand gap-2"
                    >
                      <img
                        src={smallThumbnail}
                        className="max-w-[120px] rounded-[10px] object-cover h-[200px] border-1 border-primary-blackrock "
                      />
                      <span 
                        className="text-[12px] line-clamp-1" 
                        ref={titleRef} 
                        onMouseEnter={(e) => titleMessageHover(e)}
                        onMouseLeave={() => titleMessageOffHover()}>
                          {title}
                      </span>
                      {isTitleHovering && 
                        (
                        <div className="absolute w-[100px] h-[100px] bg-amber-100">
                          No Title
                        </div>
                        )
                      }
                      
                    </div>
                    )
                  })}
                </div>
              </div>
              <MaterialSymbolsArrowCircleRight
                onClick={() => nextMove()}
                size={40}
                className="cursor-pointer p-[4px]"
                ref={rightIcon}
              />{" "}
              {/* Right Arrow */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselA;
