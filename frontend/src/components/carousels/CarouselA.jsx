import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MaterialSymbolsArrowCircleLeftRounded } from "../icons/MaterialSymbolsArrowCircleLeftRounded";
import { MaterialSymbolsArrowCircleRight } from "../icons/MaterialSymbolsArrowCircleRight";
import gsap from "gsap";
import slideData from "../slideDemo.json";
import CSSPlugin from "gsap/CSSPlugin";
import CarouselACard from "./CarouselACard";

gsap.registerPlugin(CSSPlugin);

const CarouselA = ({ state }) => {
  const [index, setIndex] = useState(0);
  const [slides] = useState(slideData.slideData);
  const rightIcon = useRef();
  const leftIcon = useRef();
  const carRef = useRef();
  const sliderRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const titleRefArray = useRef([]);
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    try {
        if(state.carouselAData) {
        const firstSixBooks = state.carouselAData?.items.slice(0,6);
        setCarouselData(firstSixBooks);
      } 
    } catch(err) {
      if(err.response) {
        console.error("Data: " , err.response.data);
        console.error("Status: " , err.response.status);
      }
    }
  }, [state.carouselAData])

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

  // const onHoverTitle = ()  => {
  //   if(titleRef.current) {
  //     const title = titleRef.current.innerHTML;
  //     return (
  //       <div className="absolute w-[100px] h-[100px] bg-amber-100">
  //         {title}
  //       </div>
  //     )
  //   }

  //   return(
  //     <div className="absolute w-[100px] h-[100px] bg-amber-100">
  //       No Title
  //     </div>
  //   )
  // }
  
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
    <div className="carousel-wrapper font-inter">
      <div className="carousel-main flex justify-center items-center">
        <div className="carousel max-w-[470px] h-[400px] flex flex-row gap-2 justify-center items-center">
          <div className="inner-carousel-wrapper flex flex-col justify-center items-center gap-4 w-[480px]">
            <span className="text-primary-dutch-white text-[15px]  p-3.5 rounded-2xl shadow-custom border-1">
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
              
              <div className="carouselA-outer-wrapper w-[400px] overflow-hidden rounded-2xl z-1" draggable={false}>
                <div className="carouselA-main-wrapper flex flex-row gap-4 transition-all duration-400" ref={sliderRef}>
                  
                  {/* based on the index it moves times 140px horizontally */}
                  {/* CARDS */}
                  
                  {
                    carouselData?.map((data , index) => (
                      <div key={index}>
                        <CarouselACard 
                          data={data}
                          ref={(element) => titleRefArray.current[index] = element}
                          // for each 'element' in the ref which will the the parent will send on the child 
                          // store it on a ref array and set it at that index
                        />
                      </div>
                    ))
                  }
                  
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
